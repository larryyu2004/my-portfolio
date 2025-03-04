# Pre-Knowledges

## 1. root@c3d92067625a:~/XV-6-Lab# make CPUS=1 qemu-gdb
        xv6 kernel is booting
        (qemu) info mem
        vaddr            paddr            size             attr
        ---------------- ---------------- ---------------- -------
        0000000000000000 0000000087f61000 0000000000001000 rwxu-a-
        0000000000001000 0000000087f5e000 0000000000001000 rwxu-a-
        0000000000002000 0000000087f5d000 0000000000001000 rwx----  --> guard page (no PTE_U, user cannot access)
        0000000000003000 0000000087f5c000 0000000000001000 rwxu-ad
        0000003fffffe000 0000000087f70000 0000000000001000 rw---ad  --> Trapframe page
        0000003ffffff000 0000000080007000 0000000000001000 r-x--a-  --> Trampoline page

## 2. ecall's next instruction is somewhere that stvec points to (The start address of Trampoline)
        Change to a different register:

        (gdb) i r stvec
        stvec          0x3ffffff000	274877902848

        Since Trampoline page cannot be assessed by user, we are in supervisor mode
        And store the previous pc to sepc:
        
        (gdb) i r sepc
        sepc           0xdec	3564

## 3. Ecall's job:
        The registers involved are: stvec, sepc, scause, sstatus
        1. User mode -> supervisor mode  
        2. Store the previous pc to sepc
        3. Let pc = stvec
        4. Jump to pc
        5. Set scause to record the reason for trapping

## 4. In kernel/Trampoline.s:
        1. Save the user registers in TRAPFRAME:
        # save the user registers in TRAPFRAME
        sd ra, 40(a0)
        sd sp, 48(a0)
        ......
        sd t5, 272(a0)
        sd t6, 280(a0)
        

        2. Switch to kernel page table:
        # restore kernel page table from p->trapframe->kernel_satp
        ld t1, 0(a0)
        csrw satp, t1
        sfence.vma zero, zero

        3. Create or find a kernel stack, let the stack pointer points to kernel stack:
        # restore kernel stack pointer from p->trapframe->kernel_sp
        ld sp, 8(a0)

        more..

## 5. In kernel/Trampoline.s:
        # swap a0 and sscratch
        # so that a0 is TRAPFRAME
        csrrw a0, sscratch, a0

        (gdb) i r a0
        a0             0x2	2
        (gdb) i r sscratch
        sscratch       0x3fffffe000	274877898752
        (gdb) si
        0x0000003ffffff004 in ?? ()
        (gdb) i r a0
        a0             0x3fffffe000	274877898752
        (gdb) i r sscratch
        sscratch       0x2	2

        So that kernel can use user mode data in the TRAPFRAME

## 6. In kernel/trampoline.S
        uservec function:
        1. Store the data from user mode
        2. Load kernel page table, kernel stack, and current CPU number to register
        3. Jump to kernel/trap.c, call usertrap()
    
## 7. In kernel/stap.c
```CPP
        p->trapframe->epc = r_sepc(); // to save the user program counter.
        p->trapframe->epc += 4; // sepc points to the ecall instruction, but we want to return to the next instruction.
```
        Modified stvec and sepc
        set `scause` (register) to record the reason for trapping
        then call syscall()

## 8. print p->trapframe->a7, it is 16
        (gdb) b syscall
        Breakpoint 4 at 0x80001f68: file kernel/syscall.c, line 134.
        (gdb) c
        Continuing.

        Breakpoint 4, syscall () at kernel/syscall.c:134
        134	{
        (gdb) n
        136	  struct proc *p = myproc();
        (gdb) n
        138	  num = p->trapframe->a7;
        (gdb) n
        139	  if(num > 0 && num < NELEM(syscalls) && syscalls[num]) {
        (gdb) p p->trapframe->a7
        $1 = 16
    
## 9. In kernel/syscall.h, we can find #define SYS_write  16
        so after that, it call sys_write() and back to kernel/trap.c, usertrap():
        In kernel/trap.c, which_dev is to check if it's an external interrupt or software interrupt, and handle it.
            returns 2 if timer interrupt,
            1 if other device,
            0 if not recognized.
        then call usertrapret();
    
## 10. In kernel/trap.c, usertrapret() is to return to user space:
        1. Fill the trapframe's content:
            // set up trapframe values that uservec will need when
            // the process next re-enters the kernel.
            p->trapframe->kernel_satp = r_satp();         // kernel page table
            p->trapframe->kernel_sp = p->kstack + PGSIZE; // process's kernel stack
            p->trapframe->kernel_trap = (uint64)usertrap;
            p->trapframe->kernel_hartid = r_tp();         // hartid for cpuid()

        2. Resume stvec and sepc's values (supervisor mode registers)
    
## 11. In kernel/trampoline.S, userret function (corresponds to 6. In kernel/trampoline.S uservec function)
        1. Store the data from kernel mode
        2. Load user page table, user stack to register
        3. Execute sret instruction

## 12. sret instruction:
        1. Switch back to user mode
        2. Values from sepc register will copy back to pc register
 
---

# Step-by-Step Process

## 1. In Makefile, user/user.h, user/usys.pl, kernel/syscall.h, kernel/syscall.c, add syscalls and give them own syscall number.
    Impact: Now user mode can call sigalarm() and sigreturn()

## 2. In kernel/sysproc.c, define sys_sigalarm() and define sys_sigreturn();
        Using argint() and argaddr() to fetch the ticks (int) and handler (pointer)
    Impact:

## 3. In kernel/proc.h, modify the structure of the process:
        1. Add int alarm_interval; // interval of the alarm
        2. Add void (*alarm_handler)(); // address of sigreturn()
        3. Add int alarm_ticks; // rest time
        4. Add struct trapframe *alarm_trapframe; //store the context
        5. int alarm_goingoff; //Is there any alarm triggering

## 4. In kernel/proc.c, allocproc() and freeproc()
        1. init alarm_interval
        2. init alarm_handler
        3. init alarm_ticks
        4. init alarm_goingoff
        5. In allocproc(), try to alloc a memory space for alarm_trapframe
        6. In freeproc(), try to free a memory space for alarm_trapframe
    
## 5. In kernel/trap.c, implement sigalarm(int ticks, void (*handler)()):
        1. Set p->alarm_interval = ticks;
        2. Set p->alarm_handler = handler;
        3. Set p->alarm_ticks = ticks;
    
## 6. In kernel/trap.c, implement sigalarm(int ticks, void (*handler)()):
        1. Resume the original trapframe
        2. p->alarm_goingoff = 0; // Now there is no alarm triggering, allowing new alarm triggering

## 7. In kernel/trap.c, when which_dev == 2 (timer interrupt)
        1. Check if there is a process, Check if user has set alarm using sigalarm()
        2. --p->alarm_ticks: minus 1 when passing each time unit, check if alarm_ticks <= 0 and check !p->alarm_goingoff, make sure there is no sigreturn() is executing
        3. p->alarm_ticks = p->alarm_interval, reset alarm_ticks
        4. Store current trapframe to alarm_trapframe, store the context
        5. Modify epc(the program counter of ecall) to alarm_handler, make sure jump to sigreturn()
        6. set alarm_goingoff = 1, telling OS that there is a sigreturn() is executing.
# Chapter 2 - Operating system organization


2.1 Abstracting physical resources

2.2 User mode, supervisor mode, and system calls

2.3 Kernel organization

2.4 Code: xv6 organization

2.5 Process overview
```CPP []
File            Description
bio.c           Disk block cache for the file system.
console.c       Connect to the user keyboard and screen.
entry.S         Very first boot instructions.
exec.c          exec() system call.
file.c          File descriptor support.
fs.c            File system.
kalloc.c        Physical page allocator.
kernelvec.S     Handle traps from kernel, and timer interrupts.
log.c           File system logging and crash recovery.
main.c          Control initialization of other modules during boot.
pipe.c          Pipes.
plic.c          RISC-V interrupt controller.
printf.c        Formatted output to the console.
proc.c          Processes and scheduling.
sleeplock.c     Locks that yield the CPU.
spinlock.c      Locks that don’t yield the CPU.
start.c         Early machine-mode boot code.
string.c C      string and byte-array library.
swtch.S         Thread switching.
syscall.c       Dispatch system calls to handling function.
sysfile.c       File-related system calls.
sysproc.c       Process-related system calls.
trampoline.S    Assembly code to switch between user and kernel.
trap.c          C code to handle and return from traps and interrupts.
uart.c          Serial-port console device driver.
virtio_disk.c   Disk device driver.
vm.c            Manage page tables and address spaces.
```

The xv6 kernel maintains many pieces of state for each process, which it gathers into a **struct proc**
**p->pagetable** is a pointer to the process’s page table.
**p->state** indicates whether the process is allocated, ready to run, running, waiting for I/O, or
exiting.

---

# Chapter 4 Traps and system calls


4.1 RISC-V trap machinery

4.2 Traps from user space

4.3 Code: Calling system calls

The user code places the arguments for exec in registers **a0** and **a1**, and puts the system call number in **a7**.

When the system call implementation function returns, syscall records its return value in **p->trapframe->a0**

4.4 Code: System call arguments

The functions **argint**, **argaddr**, and **argfd** retrieve the n’th system call argument from the trap frame as an integer, pointer, or a file descriptor
     
File system calls such as exec use **fetchstr** to retrieve string file-name arguments from user space. **fetchstr** calls **copyinstr** to do the hard work.
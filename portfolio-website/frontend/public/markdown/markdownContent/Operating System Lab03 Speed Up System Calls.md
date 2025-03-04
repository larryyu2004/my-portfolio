# Pre-Knowledges

## 1. In the kernek/memlayout, we can find:
        #define TRAMPOLINE (MAXVA - PGSIZE)
        #define TRAPFRAME (TRAMPOLINE - PGSIZE)
        #define USYSCALL (TRAPFRAME - PGSIZE)
        So we know that:
        ------------- -> MAXVA --
        | TRAMPOLINE             |---> PGSIZE (4096)
        -------------          --
        | TRAPFRAME
        -------------
        | USYSCALL
        -------------
        | ......
        -------------
        So we need to map the USYSCALL just below TRAPFRAME
    
## 2. In the kernel/riscv.h, we can find:
```CPP []
        #define PTE_V (1L << 0) // valid
        #define PTE_R (1L << 1) // read
        #define PTE_W (1L << 2) // write
        #define PTE_X (1L << 3) // executable
        #define PTE_U (1L << 4) // 1 -> user can access
```
        These set different permission to the PTE

## 3. In kernel/proc.c, allocproc() is responsible for initializing a new peocess

## 4. In kernel/proc.c, proc_pagetable is to map the PageTable to physical page

## 5. In kernel/proc.c, freeproc() is to release the page allocate for USYSCALL 

## 6. In kernel/proc.c, proc_freepagetable(), we can free (unmap) pagetable
    
## 7. In user/ulib.c, ugetpid(), it convert USYSCALL PageTable to a struct -> usyscall,
        Because USYSCALL can be visted by user mode, so we can get the pid from usyscall,
        and it is no need to enter kernel mode.
 
---

# Step-by-Step Process

## 1. In kernel/proc.c, allocproc(), allocate a page for USYSCALL mapping
        Store the process's PID in the usyscall struct

## 2. In kernel/proc.c, proc_pagetable(), Map the usyscall just below TRAPFRAME and set USYSCALL permission to PTE_R and PTE_U

## 3. In kernel/proc.c, freeproc(), free the physical page

## 4. In kernel/proc.c, proc_freepagetable(), unmap usyscall page.
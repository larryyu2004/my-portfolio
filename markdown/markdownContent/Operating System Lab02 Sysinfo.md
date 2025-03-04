# Pre-Knowledges

## 1. Forward declaration is a structure that tells the compiler that a structure with a given name exists.
        The complete structure definition is located in another file.
        You can deal with a pointer or reference types to that structure.
```CPP []
        struct sysinfo;  // Forward declaration
        int sysinfo(struct sysinfo *);  // Function that uses a pointer
```

## 2. In the kernel/kalloc.c, kmen.freelist is a pointer to the first `struct run` in the list,
        Representing the head of the free memory blocks.
    
## 3. In the kernel/param.h, NPROC is the maximum number of processes

## 4. In the kernel/proc.h, there are serval process states:
        UNUSED, USED, SLEEPING, RUNNABLE, RUNNING, ZOMBIE

---

# Step-by-Step Process

## 1. Add user/sysinfotest to the UPROGS in the makefile

## 2. Declear the prototype for the sysinfo system call in user/user.h
    Impact: invoke sysinfo syscall in the kernel/sysinfo

## 3. Update kernel/syscall.h to define a unique syscall number for sysinfo

## 4. Add entry in the kernel.syscall.c
    Impact: Implement the sysinfo syscall in the kernel.

## 5. In kernel/kalloc.c, add a function to calculate the amount of the free memory
        As long as pointer can point to next node, count++;

## 6. In kernel/proc.c, add a function to calculate the number of the processes
        Traversal the max number of processes
        As long as p->state is not UNUSED, which means the process is processing, count++ 

v7. In kernel/sysproc, Implement the sys_info system call and copy to the user space
        call Step5 and Step6
        Using copyout() to copy into user space
    
    

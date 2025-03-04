# Pre-Knowledges

## 1. user/user.h -> it contains declearations for user-space function, constants and macros.
        It includes prototypes for system call functions that user programs can invoke.
    
## 2. The user/usys.pl script in the xv6 operating system plays a crucial role in generating system call stubs for user space.

## 3. kernel/sysproc.c is part of the kernel space and incldues the logic for handling specific calss that user programs can invoke

## 4. In the kernel/syscall.h file, you will see sth like this:
```CPP []
        #define SYS_fork    1
        #define SYS_exit    2
        #define SYS_wait    3
        ......
        #define SYS_close  21
```
        Here, we use bitmask, when you want to trace certain system calls:
            trace 0 (trace 2^0 -> trace fork())
            trace 2097152 (trace 2^21 -> trace close())
            Also, we can trace sth at same time:
            trace 34 (trace 2^1+2^5 -> trace exit() and read())
        Using the bitmap, we know what do we want to trace.

        Let's say if we treat number of syscalls to be some decimal numbers
        When you want to trace 34, how should OS know which kinds of syscall that you want to trace.

## 5.How does each syscall do in the kernel/syscall.c:
        The syscall function doesn't know in advance which system calls a process will make.
        It reacts to each system call as it is invoke.
        An example:
            If we want to trace 34 (100010)
            When num = 1, p -> trace_mask >> num = 10001, AND with 1 -> 1, trace syscall which num = 1;
            When num = 2, p -> trace_mask >> num = 1000, AND with 1 -> 0, don't trace.
            When num = 3, p -> trace_mask >> num = 100, AND with 1 -> 0, don't trace.
            When num = 4, p -> trace_mask >> num = 10, AND with 1 -> 0, don't trace.
            When num = 5, p -> trace_mask >> num = 1, AND with 1 -> 0, trace syscall which num = 5;
            ......
            
---

# Step-by-Step Process
## 1. Add trace syscall to User space:
        1. Add a protopype for the trace syscall in user/user.h
        2. Add a stub for the trace system call in user/usys.pl
        3. Assign a system call number in kernel/syscall.h
## 2. Implement sys_trace function:
        1. Implement sys_trace in kernel/sysproc.c to handle the trace syscall
        2. Store the mask value in the proc structure to control which syscall are traced
## 3. Modify fork Implementation:
        1. Modify the fork implementation in kernel/pro.c to copy teh trace mask from the parent to child process
        Impact: Ensure that child processes inherit the trace setting, allowing for consistent tracing across generations.
v4. Update syscall function:
        1. Print trace Output, modify the syscall function in kernel/syscall.c to print trace output if the syscall number is set in the trace mask.
        2. Add an array of syscalls name to make the trace output more readable.
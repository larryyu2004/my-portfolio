# Pre-Knowledges

## 1. The Stack (See in the Lab3/Lecture5):      
                --------------------    ----  
                |   Return Address          |
                --------------------        |
                |   To Prev. Frame          |
                --------------------        |
                |   Saved Registers         | ----> Stack Frame
                --------------------        |
                |   Local Variables         |
                --------------------        |
                |   ......                  |
                --------------------    ----
                --------------------  <----------------------------------
                |   Return Address                                       |
                --------------------                                     |
                |   To Prev. Frame (fp) -> top of current Frame          |
                --------------------                                     |
                |   Saved Registers                                      |
                --------------------                                     |
                |   Local Variables                                      |
                --------------------                                     |
                |   ......                                               |
                --------------------                                     |
        fp      --------------------                                     |
        fp-8    |   Return Address                                       |
                --------------------                                     |
        fp-16   |   To Prev. Frame (fp)----------------------------------
                --------------------
                |   Saved Registers
                --------------------
                |   Local Variables
                --------------------
                |   ......
                -------------------- -> sp (Botton of Stack)

    From the tips from lab4, Backtrace, we know that
    return address lives at a fixed offset (-8) from the frame pointer of a stackframe
    and that the saved frame pointer lives at fixed offset (-16) from the frame pointer. 
    
## 2. In XV-6, sp -> stack pointer; s0/fp -> frame pointer (frame in stack)

## 3. The stack grows from higher addresses to lower addresses, each box called stack frame.
        It must be return address at the top of the stack
        sp is stack pointer, which is to point to the top stack (the lower address), store in the register.
        At the same time, each stack store Prev. Frame

---

# Step-by-Step Process

## 1. Copy this code to the kernel/riscv.h
```CPP
    static inline uint64
    r_fp()
    {
    uint64 x;
    asm volatile("mv %0, s0" : "=r" (x) );
    return x;
    }
```
    In ordered to retrieve the frame pointer from s0 register

## 2. In kernel/printf.c, implement backtrace() and add backtrace() in the kernel/defs.c

## 3. In kernel/sysproc.c, we call backtrace() at the line 73
    Impact: When we call `addr2line -e kernel/kernel` in the ubuntu:
        root@c3d92067625a:~/XV-6-Lab# addr2line -e kernel/kernel
        0x0000000080002144

        it will return:
        /root/XV-6-Lab/kernel/sysproc.c:74

        which is the next line of the backtrace() (next the line 73) in kernel/sysproc.c

## 4. In kernel/prinf.c, call traceback() in the panic()
    Impact: panic will lead program into a infinite loop, need traceback()
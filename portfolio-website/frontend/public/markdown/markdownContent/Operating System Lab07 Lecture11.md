# Two main strategies for running multiple threads in parallel:
    1. Use multiple CPUs, each CPU running one thread
    2. A CPU switches back and forth between multiple threads

---

# Threads scheduling:
    1. How to implement thread switching? XV-6 creates a thread scheduler for each CPU core.
    2. When you want to actually switch from one thread to another, where can you save and restore the thread state?
    3. How to deal with compute bound threads? Since some threads may need hours and they cannot cede the CPU to other threads to run.
    
---

# How to deal with computationally intensive threads?
    To use timer interrupts:
        On each CPU core, there exists a Hardware devide that periodically generates interrupts
    (pre-emptive scheduling)
    
---

# Different threads are distinguished by state:
    1. RUNNING, where the thread is currently running on some CPUs
    2. RUNABLE, where the thread is not yet running on a certain CPU but can run as soon as there is a free CPU
    3. SLEEPING, the threas is waiting for some I/O event, and it will only run after an I/O event has occurred.
    
---

# When XV-6 switches from the kernel thread of the CC program to the kernel thread of LS program:
    1. XV-6 first stores the kernel registers of the kernel thread of the CC program in a context object.
    2. Now LS state must be RUNABLE, and this also means that the userspace state of the LS program is stored in the corresponding trapframe
        LS program's kernel threads are stored in the corresponding context object
        So next, XV-6 restores the context object of the kernel thread of the LS program, that is, the register of the kernel thread.
    3. LS will continue on its kernel thread stack and complete its interrupt handler.
    4. It then returns to the LS program in userspace by restoring the user space state in the trapframe of the LS program
    5. Finally, the execution of LS is resumed.
    

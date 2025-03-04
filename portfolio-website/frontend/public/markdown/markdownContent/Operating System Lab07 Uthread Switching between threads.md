# Pre-Knowledges

## 1. Steps:
        1. Proc_1 is executing
        2. In kernel/proc.c, usertrap() and kerneltrap(), Due to the timer interrupt, it will call yield();
        3. In kernel/proc.c, yield() will change current process's state to RUNNABLE and call sched();
        4. In kernel/proc.c, it will call swtch(&p->context, &mycpu()->context);
            It save Proc_1's 14 registers to Proc_1.ctx (Proc_1.context)
            load scheduler.ctx
        5. In kernel/proc.c, scheduler(), scheduler find next RUNNABLE process
            Save scheduler's 14 registers to scheduler.ctx
            load Proc_2.ctx
        6. Proc_2 from kernel/proc.c, sched() return to kernel/proc.c yield()
        7. Proc_2 is executing

## 2. swtch(ctx1, ctx2);
        1. save called process to ctx1
        2. load ctx2 to called process

## 3. Two important registers:
        ra: ra register saves where should swtch() back after finishing calling swtch()
        sp: sp register is stack pointer, points to top of Function call stack

## 4. In user/uthread.c, thread_switch() can refer to kernel/swtch.S, swtch(),  whose job is to save registers

## 5. In user/uthread.c, thread_create() is to create a new thread. After we call swtch(), it is the `ra` that determains where to jump.
        And the `sp` register that determains the callee saved register to recover

## 6. In user/uthread.c, thread_schedule() has the same usage of In kernel/proc.c, scheduler(), which is, current process calls yield(),
        it will find a RUNNABLE process, and executes it. In thread_schedule(), we also need to call thread_switch()
 
---

# Step-by-Step Process

## 1. In user/uthread_switch.S, copy the thread registers from kernel/swtch.S
    Impact: So that when you call thread_switch(), it can move the current process's registers information to new process's registers

## 2. In user/uthread.c, copy the thread registers from kernel/proc.h
    Impact: So that it can saved registers for user context switches.

## 3. In user/uthread.c, thread_create(), Update the context.ra and context.sp, here, sp should point to top address of the stack;
    Impact: After creating new thread, it can go to correct place

## 4. In user/uthread.c, thread_schedule(), call thread_switch()

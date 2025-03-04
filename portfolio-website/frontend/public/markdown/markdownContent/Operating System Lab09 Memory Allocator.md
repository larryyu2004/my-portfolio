# Pre-Knowledges

## 1. In kernel/kalloc.c, our original implement of the kalloc(), we only have one large lock,
        which is to maintain the `freelist`. This will lead to each time when programs want to allocate memory,
        they have to compete the lock of the freelist

        We can find that there is impossible for many CPUS to call kalloc() and kfree()
        It greatly reduces the efficiency of memory allocation

        $ kalloctest
        start test1
        test1 results:
        --- lock kmem/bcache stats
        lock: kmem: #test-and-set 96659 #acquire() 433086
        lock: bcache: #test-and-set 0 #acquire() 2106

        After testing, we can find kmem is the most competitive lock of all

## 2. In this lab, from the instruction of the hints, we need to allocate a freelist for each CPU
        When certain CPU wants to allocate memory, we only need to lock that CPU

        This will bring us a new issue:
        It may happen that some CPUS have enough memory but others not. 
        Although it has enough space to allocate memory, some CPUS cannot allocate
        So we need to steal some frame from other CPUS

---
 
 
# Step-by-Step Process

## 1. You can use the constant NCPU from kernel/param.h
        1. In kernel/kalloc.c, update struct kmem: struct kmem kmemArray[NCPU];
        2. In kernel/kalloc.c, update kinit(), use a loop to init every kmemArray[NCPU]'s lock

## 2. The function `cpuid` returns the current core number, but it's only safe to call it and use its result when interrupts are turned off.
        You should use `push_off()` and `pop_off()` to turn interrupts off and on. 
        1. In kernel/kalloc.c, kinit()
            1. Use a loop and init each CPU's lock
        2. In kernel/kalloc.c, kfree() 
            1. turn interrupts off first
            2. get the cpuid
            3. Update all kmem to kmem[cpuid]
        
## 3. In kernel/kalloc.c, kalloc():
        1. turn interrupts off
        2. get the cpuid
        3. lock the cpuid
        4.1 If the cpu's freelist has memory space: get one node for allocating
        4.2 If the cpu's freelist has no memory space:
            4.2.1 Use a loop and traversal each cpu (except i = cpuid)
            4.2.2 When it finds the CPU has enough memory space
            4.2.3 Set three pointers, pre, p, fp (each time fp moves two nodes and p moves one node)
                4.2.4.1 If the cpu has only one page, steal the only page and cpu's freelist set to NULL
                4.2.4.1 If the cpu has multiple pages, steal half of the pages and pre->next = NULL
        5. Unlock cpuid and check if it works, if so, quit the loop

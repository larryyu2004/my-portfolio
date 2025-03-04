# Why do we use lock:
    When application wants to use multiple cores
    Kernel must be able to handle parallel system calls
    Access shared data structure in parallel

    => locks for correct sharing
        locks can limit performance 
    
---

# Why locks:
    Avoid race conditions

     -----------    
    |   CPU0    |-------     -------------------------------------------
     -----------        |   |   DRAM                                    |
                        |-->|   freelist -> free_block1 -> free_block2  |
     -----------        |   |                                           |
    |   CPU1    |-------     -------------------------------------------
     -----------
     When we calling kalloc(), we must use lock, or both CPUs call kalloc and kalloc() may allocate free_block1 to them
    
---

# Lock abstraction:
```CPP []
    struct lock{
          
    }

    acquire(&);
    |
    |   Cretical Section
    |
    release(&);
```

    Only one precess can enter or acquire the lock
    
---

# When to lock:
    conservative rule: 2 processes access a shared data structure
        one of them is a writer or an updater, which means they wanna modify the shared data structure
        Then you need lock the shared data structure
    
---

# Lock perspectives
    1. lock help avoid lost updates
    2. locks make multi-step operaations atomic
    3. locks help maintain an invariant
    
---

# Deadlock
    1. The same process acquire the same lock again -> Deadlock 
    2. CPU1 acquire(&d1); CPU2 acquire(&d2);
        Then, CPU1 wants to acquire(&d2) and CPU2 wants to acquire(&d1) -> dead embrace
        Solution: order locks and acquire locks in order
    
---

# Locks vs performance
    1. Need to split up data structure
    2. Start with coarse-grained locks -> measure -> redesign
    
---

# Spin lock
    lock == 0 -> no one get the lock, process can acquire the lock.
    Once process acquired the lock, lock == 1, program will keep on spin until process call release.
    
---

# Hardware test-and-set support:
    amoswap (atomic memory swap) accept address, register1, register2
    tmp <- addr
    *addr <- register1
    register2 <- tmp
    unlock


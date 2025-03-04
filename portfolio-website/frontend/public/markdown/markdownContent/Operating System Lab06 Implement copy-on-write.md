# Pre-Knowledges

## 1. Copy-on-Write (cow) technology:
        After executing fork(),
        Original:
            Copy parent process's pa to child, parent's va map to its va, child 's va map to its va.

        Optimised:
            Child process's va map to parent process's pa (save pa)
            When parent/child process wants to do some modify on its PTE
            Copy that pagetable to new memory space and give some others permission
            Map parent/child's va to new pa

## 2. Step:
        Fork:
            1. Map child process's va to parent process's pa
            2. ban PTE_W

        Page fault:
            1. When parent or child try to do writing on that PTE, page fault will happen.
            2. Check the page fault is due to cow?
            3. unmap va, copy PTE;

        When releasing pa, the pa may have other va's mapping?
            1. Using "reference count" to solve the issue.

## 3. Use r_stval to get the faulting va, see Lab5/Lecture8

## 4. COW - Parent: When parent wants to write in PTE, just change the flags of PTE.
        Since child's PTE's flags are still read-only, it can guarantee the data isolation;
        When child wants to write, it will copy the original PTE.

---

# Step-by-Step Process

## 1. In kernel/riscv.h, define PTE_COW

## 2. From Lab5/Lazytests and Usertests, we know fork will call uvmcopy():
        1. Mark parent page as read-only;
        2. Mark that PTE as COW;
        3. Also, we can use uint flags = PTE_FLAGS(*pte) to get all PTE's flag information
        4. map va to parent's PTE;
    Impact: Now child could read parent's data and it will not take up memory

## 3. In kernel/trap.c, define reference number refNum[];

## 4. In kernel/vm.c, mappages():
        1. check when pa >= KERNELBASE, reference number++

## 5. In kernel/vm.c, mappages():
        1. check when pa >= KERNELBASE, reference number--;
        2. free the page when only one mapping (only child map the PTE)

## 6. In kernel/trap.c, usertrap(), modify it can let it can detect COW page and handle them
        1. check when page fault happens, see Pre-Knowledges1 in Lab5/Lazy allocation & Tests
        2. copy fault page using uvmcowcopy(), and if there is no enough memory can be allocated, kill the process

## 7. Modify copyout() to use the same scheme as page faults when it encounters a COW page. 
        1. check if this page is a COW page when we want to write
        2. allocate a block of the memory and let mem point to that memory block (char *mem = kalloc())
        3. When refNum == 2, which means only parent and child point to this PTE, We can just change it's PTE flags
        4. When refNum > 2, which means not only two processes mapped to this PTE, copy the memory block 
    
    
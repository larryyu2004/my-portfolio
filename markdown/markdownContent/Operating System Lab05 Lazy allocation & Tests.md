# Pre-Knowledges

1.  **mcause** exception code
        13 -> Load page fault
        15 -> Store page fault

---

# Step-by-Step Process

## 1. In kernel/sysproc.c, sys_sbrk(), delete growproc()
        Add myproc()->sz += n;
    Impact: This will be caught by kernel/trap.c, since we didn't give a PTE to uvmunmap(), it can help us to map;

## 2. In kernel/trap.c, usertrap(), 
```CPP []
        else if(r_scause() == 13 || r_scause() == 15){
            uint64 va = r_stval(); //see lecture8 (When page fault happens, it will put the faulting address into that stval register)
            if(is_lazy_alloc_va(va)){
                if(lazy_alloc(va) < 0){
                    printf("lazy_alloc fail!\n");
                    p->kill = 1;
                }
            }
        }
```

## 3. In kernel/proc.c
```CPP []
        int
        is_lazy_alloc_va(uint64 va){
            struct proc *p = myproc();
            if(va >= p->sz){
                return 0;
            }
            return 0;
        }

        int 
        lazy_alloc(uint64 va)
        {
            va = PGROUNDDOWN(va);
            char *mem = kalloc();
            if(mem == 0){
                return -1;
            }
            memset(mem, 0, PGSIZE);
            struct proc *p = myproc();
            if(mappages(p->pagetable, va, PGSIZE, (uint64)mem, PTE_W|PTE_X|PTE_R|PTE_U) != 0){
                kfree(mem);
                return -1;
            }
            return 0;
        }
```

## 4. In kernel/defs.h, register is_lazy_alloc_va(uint64) and lazy_alloc(uint64 va)

## 5.In kernel/vm.c, uvmunmap(), modify:
```CPP []
        //Try to find the pagetable, if pte == 0, it is empty.
        if((pte = walk(pagetable, a, 0)) == 0){
            Continue;
        }
        if((*pte & PTE_V) == 0){
            Continue;
        }
```
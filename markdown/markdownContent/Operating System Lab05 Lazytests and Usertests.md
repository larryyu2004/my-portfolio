# Pre-Knowledges

---

# Step-by-Step Process

## 1. In kernel/sysproc.c, sbrk(), modify:
```CPP
        uint64
        sys_sbrk(void)
        {
            int addr;
            int n;

            //if(argint(0, &n) < 0)
            //    return -1;
            myproc()->sz += n;
            if(n > 0){
                addr = myproc()->sz;
            }else{
                if(myproc() -> sz + n < 0){
                    return -1;
                }else{
                    myproc()->sz = uvmdealloc(myproc()->pagetable, myproc()->sz, myproc()->sz + n);
                }
            }
            return addr;
        }
```

## 2. Since In kernel/proc.c, fork() call uvmcopy(), so
        In kernel/vm.c, uvmcopy(), do modify:
```CPP
            int
            uvmcopy(pagetable_t old, pagetable_t new, uint64 sz)
            {
            pte_t *pte;
            uint64 pa, i;
            uint flags;
            char *mem;

            for(i = 0; i < sz; i += PGSIZE){
                if((pte = walk(old, i, 0)) == 0)
                    //panic("uvmcopy: pte should exist");
                    continue;
                if((*pte & PTE_V) == 0)
                    //panic("uvmcopy: page not present");
                    continue;
                pa = PTE2PA(*pte);
                flags = PTE_FLAGS(*pte);
                if((mem = kalloc()) == 0)
                    goto err;
                memmove(mem, (char*)pa, PGSIZE);
                if(mappages(new, i, PGSIZE, (uint64)mem, flags) != 0){
                    kfree(mem);
                    goto err;
                }
            }
            return 0;

            err:
            uvmunmap(new, 0, i / PGSIZE, 1);
            return -1;
            }
```

## 3. In kernel/trap.c, usertrap():
```CPP
        else if(r_scause() == 13 || r_scause() == 15){
            uint64 va = r_stval(); //see lecture8 (When page fault happens, it will put the faulting address into that stval register)
            if(is_lazy_alloc_va(va)){
                if(lazy_alloc(va) < 0){
                   printf("lazy_alloc fail!\n");
                  p->kill = 1;
                }
            }else{
                printf("Detecting user try to access an illedge va\n");
                p->kill = 1;
            }
        }
```

## 4. In kernel/proc.c
```CPP
        int
        is_lazy_alloc_va(uint64 va){
            struct proc *p = myproc();
            if(va >= p->sz){
                return 0;
            }
            //On the guard page
            if(va < PGROUNDDOWN(p->trapframe->sp) && va >= PGROUNDDOWN(p->trapframe->sp) - PGSIZE){
                return 0;
            }
            return 0;
        }
```

## 5.In kernel/vm.c, do modify in walkaddr():
```CPP
        uint64
        walkaddr(pagetable_t pagetable, uint64 va)
        {
        pte_t *pte;
        uint64 pa;

        if(va >= MAXVA)
            return 0;

        pte = walk(pagetable, va, 0);
        if(pte == 0 || (*pte & PTE_V) == 0)
            if(is_lazy_alloc_va(va)){
                if(lazy_alloc(va) < 0){
                    return 0;
                }
                return walkaddr(pagetable, va);
            }
            return 0;
        
        pa = PTE2PA(*pte);
        return pa;
        }
```

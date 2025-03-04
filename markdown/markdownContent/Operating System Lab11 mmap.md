# Pre-Knowledges

## 1. Create a file -> kernel/vma.h:
```CPP
        #define MAX_VMA 16  // Maximum number of memory-mapped regions
        struct vma {
            uint64 addr;       // Start address of mapped region
            uint64 length;     // Length of mapping
            int prot;          // Protection flags (e.g., PROT_READ, PROT_WRITE)
            int flags;         // MAP_SHARED (changes are written back to file) or MAP_PRIVATE (changes are not written back)
            struct file *f;    // Pointer to file being mapped
        };
        struct proc {
            ...
            struct vma vmas[MAX_VMA]; // Array of VMA structures
        };
```

# Step-by-Step Process

## 1. Syscall

## 2.Implement sys_mmap()
        1. Get the current process using myproc()
        2. Extract system call arguments (len, prot, flags, fd) and check its validation.
        3. Check if the fd < 0 || fd >= NOFIEL || (f = p->ofile[fd] == 0 (the file is not open)), return -1
        4. Finding a Free VMA Slot:
```CPP
            // Find a free VMA slot
            struct vma *v = 0;
            for (int i = 0; i < MAX_VMA; i++) {
                if (p->vmas[i].addr == 0) {
                    v = &p->vmas[i];
                    break;
                }
            }
            if (v == 0) return -1; // No free slots
```
        5. Finding a Free Memory Region
```CPP
            // Find free memory space
            addr = PGROUNDUP(p->sz);
            p->sz = addr + len; // Reserve space
```
        6. Saving the Mapping Information:
```CPP
            v->addr = addr;
            v->length = len;
            v->prot = prot;
            v->flags = flags;
            v->f = filedup(f); // Increase file reference
            return addr;
```
## 3. Handling Page Faults in usertrap()
        1. Condition Check:
```CPP
                if (r_stval() >= p->vmas[i].addr && 
                r_stval() < p->vmas[i].addr + p->vmas[i].length)
```
            r_stval() retrieves the faulting address.
	        This checks whether the faulting address belongs to a mapped region.
        2. Allocating and Loading the Page
```CPP
                // Allocate a page and read file content
                char *mem = kalloc();
                if (!mem) panic("mmap: kalloc failed");
                struct inode *ip = p->vmas[i].f->ip;
                ilock(ip);
                readi(ip, 0, (uint64)mem, 0, PGSIZE);
                iunlock(ip);
                mappages(p->pagetable, r_stval(), PGSIZE, (uint64)mem, p->vmas[i].prot);
```
            allocates a physical page.
            Reads data from the mapped file using readi().
            Maps the page to the process page table (mappages()).

## 4. Implementing sys_munmap():{{{
        1. Extracts the unmap address (addr) and size (len) from user arguments and check its validation.
        2. Finding the Mapping:
```CPP
                for (int i = 0; i < MAX_VMA; i++) {
                    struct vma *v = &p->vmas[i];
                    if (v->addr == addr && v->length == len) {
                        ...
                    }
                }
```
            Searches for a VMA that matches the given address and length.
        3. Writing Back Changes (if MAP_SHARED)
```CPP
                if (v->flags & MAP_SHARED) {
                    // Write modified pages back to file
                    struct inode *ip = v->f->ip;
                    ilock(ip);
                    writei(ip, 0, addr, 0, len);
                    iunlock(ip);
                }
```
            If MAP_SHARED is set, writes back modified pages to the file.
        4. Unmapping the Memory:
```CPP
                            uvmunmap(p->pagetable, addr, len / PGSIZE, 1);
                            fileclose(v->f);  // Decrease file reference count
                            v->addr = 0;
                            return 0;
                        }
                    }
                    return -1;  // Address not found
                }
```
            uvmunmap() removes page mappings.
            fileclose(v->f) decreases the file reference count.
            Marks the VMA as free (addr = 0).

## 5. Handling fork() and exit():
        1. Copying VMA in fork()
```CPP
                np->vmas[i] = p->vmas[i];
                np->vmas[i].f = filedup(p->vmas[i].f);
```
            Copies the parent’s VMA array to the child.
	        Calls filedup() to increase the reference count.
        2. Cleaning Up in exit()
```CPP
                for (int i = 0; i < MAX_VMA; i++) {
                    if (p->vmas[i].addr) {
                        sys_munmap(p->vmas[i].addr, p->vmas[i].length);
                    }
                }
```
            Calls sys_munmap() for every active mapping when a process exits.



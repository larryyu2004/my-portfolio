# Page Fault
# Plan:
    1. Implement VM
    2. Feature using page fault
        lazy allocation
        copy-and-write (cow) fork
        demand paging
        memory map files (mmap)

---

# VM benefits:
    1. Isolation
    2. level of indirection
        trampoline
        guard page
    3. Static mapping
        but using page fault, make this maps dynamic

---

# Page fault
    The faulting virtual address in memory that instruction wants to access:
        The page fault basically invokes the same trap machinery
        When page fault happens, it will put the faulting address into that stval register
        When page fault happens, kernel wants to respond to this page fault
        We need the faulting virtual address
    The type of page fault:
        In `scause` register, there are three different type: read, write and instruction
    The va of instruction that cause page fault
        sepc 
        
---

# Allocation
    When the application starts, sbrk points bottom of heap and top of stack same place as p->sz points to.
    sbrk is a eager allocation (as soon as sbrk() called, the kernel will immediately allocate the physical memory that the application is asking for)
        means the address space will grow quite a bit even with the memory does actually never used by the application
        
---

# Lazy Allocation:
    sbrk(): p->sz + n (now we didn't allocate a memory for program)
    When instruction want to access block of memory, it will cause page fault (va < p->sz && p > stack)
    Then we allocate a memory for program
    reexecute instruction
        
---

# Zero fill on demand
    For some PTEs in va, PTEs are NULL, we can set a page table in pa and let it == NULL
    With read-only permission
        
---

# Copy-and-write (cow) fork
    When encounting page fault (when instruction want to write but that PTE with read-only permission)
    We need to copy the PTE and give write permission
        
---

# Demand paging
    When application starts, when loading the first instruction, we will get page fault;
    It will note that this is one of these on demand pages.

    Read block/page from memory from file into memory
    map the memory into page table
    restart the instruction

    If out-of-memory:
    evict a page and write to the file back -> evict LRU (least recently used) -> PTE_A (if not be accessed, we can evict)
    use the new just free page
    restart instruction again
        
---

# Memory map files (mmap)
    mmap(va, length, protection, flags, fd, offset);
    Used to map the this file descripter to va
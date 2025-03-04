# Pre-Knowledges

## 1.  A user-space, program makes a system call using an ecall instruction
        Before this, the program places the system call number and its arguments in specific register(e.g.., a0, a1, a2, etc)

        The ecall causes a trap into the kernel, which executes the system call handler
        The kernel extracts the system call number to determine which system call to execute

        The system call handler retrives the arguments from the appropriate user-space register or memory.
        Here, we need to use function like argaddr() and argint()
        
        Aspect	            argaddr()	                                argint()
        Purpose	            Retrieves a pointer or memory address.	    Retrieves an integer value.
        Return Type	        uint64 (64-bit)	                            int (32-bit).
        Common Use Case	    Memory buffer addresses.	                Numeric arguments like IDs or flags.

        In user/pgtbltest.c, void pgaccess_test(), it call pgaccess(buf, 32, &abits)
        the first parameter is `buf`
        the second parameter is `32`
        the third parameter is `&abits`
        So in the kernel/sysproc.c, we need to use argaddr() argint() with this sequence

## 2. In kernel/vm.c, copyout() is designed to copy from kernel to user
        copyout(pagetable_t pagetable, uint64 dstva, char *src, uint64 len)
        1. pagetable
        2. destination virtual address
        3. source address
        4. length of source
    
## 3. In kernel/vm.c, walk() is to get the mapping from VA to PA
        In each level page table, if PTE is valid, enter next level page table
        if PTE is invalid, alloc it in the memory

## 4. In kernel/vm.c, walkaddr() is to get the PA using walk() (If PTE is valid)
    
## 5. In book-riscv-rev1.pdf, page 31/110
                                                          --> Reserved for supervisor software (8-9)
                                                         |
        -----------------------------------------------------------------------------------------
        |   Reserved    |   Physical Page Number    |   RSW     | D | A | G | U | X | W | R | V |
        -----------------------------------------------------------------------------------------
                                                                  |   |   |   |   |   |   |   |
                                                                  |   |   |   |   |   |   |    --> V - Valid (0)
                                                                  |   |   |   |   |   |    ------> R - Readable (1)
                                                                  |   |   |   |   |    ----------> W - Writable (2)
                                                                  |   |   |   |    --------------> X - Executable (3)
                                                                  |   |   |    ------------------> U - User (4)
                                                                  |   |    ----------------------> G - Global (5)
                                                                  |    --------------------------> A - Accessed (6)
                                                                   ------------------------------> D - Dirty (7)
    
## 6. In kernel/riscv.h, we can find:
        #define PTE2PA(pte) (((pte) >> 10) << 12)
        In the each PTE:
             44            10
        -------------------------
        |   PPN     |   Flags   |
        -------------------------
        Physical address:
             44           12
        --------------------------
        |   PPN     |   Offset   |
        --------------------------
        PTE firstly discard 10 bits (Flags) then add another 12 bits (Offset)
    
## 7. struct pro *p = myproc();
        Retrive the current process structure.

## 8. In kernel/vm.c, walk() is to Return the address of the PTE in page table pagetable that corresponds to virtual address

---

# Step-by-Step Process

## 1. Based on the Pre-Knowledges 5, we know that PTE_A should be put at 6th position
        In kernel/riscv.h, define PTE_A

## 2. In kernel/sysproc.c:
        Get the starting virtual address (va) of the memory range to check
        Get the number of page to check, starting from addr and check its valid range
        Get a user-space address where the result bitmask will be written 
        Retrive the current process structure.
        Traversal pagetable:
            Virtual address = va + i * PGSIZE
            Using kernel/vm.c vm_pgaccess() to check the access bit (1 or 0)
            Write into res
        Using copyout() to copy into user space (Introduced in Pre-Knowledges 2)
    
## 3. In kernel/vm.c:
        Define a pagetable entry (pte)
        Check the virtual address (va) is valid
        Using walk() to get the PTE (pte) in pagetable that corresponds to the virtual address (va) (Introduced in Pre-Knowledges 8)
        Check the PTE_A flag
            If PTE_A == 1, reset it and return 1;
            else return 0

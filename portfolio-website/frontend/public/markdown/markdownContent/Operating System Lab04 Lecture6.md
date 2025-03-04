## How to actually get execution to transfer from running in the shell and user space with user privileges after running in the kernel supervisor privileges

---

# Supervisor
    Read/Write
    Control
    STAP
    STVEC pointer, which controls where traps going the kernel
    SEPC, this register that holds the save program counter during a trap in SSCATCH register plus a few others
    SSCATCH, register
    Use PTEs (PTE_U)

---

# Shell:
    write()
    ecall<--------------------------------------------------------------------------------------
      |                                                                                         |
    --|-----------------------------------------------------------------------------------------|--------------------------------
      |                                                                                         |
      | (uservec.S (Part of the tranpoline (in trampoline.S in kernel source)))-----------------|--(userret())
      | (In kernel/trap.c, usertrap())                                                          | (In kernel/trap.c, usertrapret())
      | (kernel/syscall -> get the syscall number)----------------------------------------------
      |    |
      |    | After executing
    sys_write()

---

# Ecall changes three things:
    1. Ecall changes mode from user to supervisor
    2. Ecall saves the program counter (PC (Address of next instruction)) register in the sepc register
    3. Ecall jumps to the instruction that stvec points to

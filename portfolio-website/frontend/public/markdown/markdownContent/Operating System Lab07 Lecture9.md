# Interrupt:
    Hardware wants to attention now;
    Software has to save its work;
    Process interrupt;
    Resume its work;
Asynchronous
Concurrency
Program devices

---

# Driven manages device:
    bottom: interrupt handler
    top: syscall from kernel

---

# Programming devide
    memory mapped I/O and program them using ordinary load and store instruction to those address -> using read/write control register

---

# How $ is printed:
    1. Puts the character of the $ in UART register
    2. UART register generates interrupt when the character has been sent.
    
    ls: 
    1. the keyboard is connected to the receive line.
    2. generate and interrupt to tell the processor.

---

# RISC-V support for interrupts:
    1. SIE (supervisor interrupt enable register), it has a bit for external interrupts
    2. UART from software interrupts
    3. Timer interrupt
    4. SSTATUS: supervisor state register, it has a bit to enable and disable interrupts on this particular core
    5. SIP register, supervisor interrupt pending register
    6. SCAUSE register
    7. STVEC register

---

# Interrupt (hw)
    1. SIE bit set (the supervisor interrupt enable bit set)
    2. The first thing that hw does is clear the SIE bit (stop any further interrupts coming in so we can deal with these interrupt first)
    3. If we want more interrupts, we have to re-enable that bit to prevent further interrupts.
    4. Then it sets the SEPC to the exception program counter to the current PC
    5. Save current mode
    6. mode <- supervisor
    7. Sets the program counter to stvec

---

# Interrupt Concurrency
    1. The device and CPU run in parallel
    2. The interrupt stops the current program (interrupt enable/disable)
    3. Top of the driver and the bottom of the driver may run in parallel using locks

---

# Producer/Consumer:
    p(write)
     |
    $
    |
    p(read)

---

# Polling
    1. CPU spins until device has data (waste cpu cycles if device slow, but if device is fast, saves entry/exit cost)

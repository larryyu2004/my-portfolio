# Plan:
    1. Address space
    2. Paging hardware (RISC-V)
    3. XV-6 virtual memory code + layout

Isolation

Address space

Pagetables (hardware)
    0x1000 (Virtual Address) -> MMU (Translate to Physical Address (PA)) -> memory
    Stap (Supervisor Address Translation and Protection):
```CPP []
    VA      |      PA
    0x??    |      0x??
    0x??    |      0x??
    0x??    |      0x??
    0x??    |      0x??
```
    Stap always hold the Physical Address of the root page Table
    beacuse Physical memory is directly addressable by the hardware

    Registers are 64 bits wide

    Physical Address: | PPN (Page Table Num) | Offset |
                                44                12
    
    Virtual Address: | EXT | L2 | L1 | L0 | Offset |
                              9    9    9      12
    
    TLB (Translation look-aside buffer): store the cache of page table entries and PTE entries.
    TLB store [VA, PA] mapping

---

# XV-6
    When XV-6 boot, the Root Address -> 0x8000
    Address below 0x8000, may go to different IO devices

    Physical Address:
    --------------------- -> 2^56-1     ----
    |        Unused                         |
    |                                       |
    ---------------------                   |
    |   Physical memory (RAM)               |----> DRAM 
    |                                       |      (If we point to Address below 0x8000, point to other conponents in motherboard)
    |                                       |
    |                                       |
    |                                       |
    --------------------- -> 0x8000     ----
    |       Unused
    |   and other I/O devices
    ---------------------
    |   VIRTIO disk -> interact with disk
    ---------------------
    |   UART0 -> interact with console and display
    ---------------------
    |
    ---------------------
    |
    ---------------------
    |   PLIC (interrupt)
    ---------------------
    |
    ---------------------
    |   CLINT (interrupt)
    ---------------------
    |   Unused
    ---------------------
    |   boot ROM
    --------------------- -> 0x1000
    |   Unused
    --------------------- ->0
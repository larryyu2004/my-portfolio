# Plan:
    C -> ASM / Processors
    RISC-V & x86
    Registers
    Stack + calling conventions
    Struct Layout in memory

C -> ASM -> Binary

x86-64 -> CISC (Complex instructions) (15000 instructions)
RISC (Reduced instruction set)

```CPP []
int sum_to(int n){
    int acc = 0;
    for(int i = 0; i <= n; i++){
        acc += i;
    }
    return acc;
}
```

```assembly
sum_to:
    mv t0, a0 # move the input in a0 (n) to t0 (temporary registers)
    li a0, 0 # Initialize a0 to 0 (This will accumulate the sum)
    loop:
        add a0, a0, t0 # Add current value of t0 to a0 (accumulate the sum)
        addi t0, t0, -1 # Decrement t0 by 1
        bnez t0, loop # If t0 is not zero, go back to loop
        ret # Return, with the sum in a0
```
---
```CPP []
The Stack:     
--------------------  <---------    
|   Return Address          |   |
--------------------        |   |   
|   To Prev. Frame (fp) ----|---
--------------------        |
|   Saved Registers         | ----> Stack Frame
--------------------        |
|   Local Variables         |
--------------------        |
|   ......                  |
--------------------    ----
--------------------
|   Return Address
--------------------
|   To Prev. Frame (fp) -> top of current Frame
--------------------
|   Saved Registers
--------------------
|   Local Variables
--------------------
|   ......
--------------------
--------------------
|   Return Address
--------------------
|   To Prev. Frame (fp)
--------------------
|   Saved Registers
--------------------
|   Local Variables
--------------------
|   ......
-------------------- -> sp (Botton of Stack)
```
---
```assembly
.global sum_then_double
sum_then_double:
    addi sp, sp, -16 # Adjust the stack pointer (sp) to reserve space for the stack frame
    sd ra 0(sp) # Store the current return address (ra) at the first location of the stack frame
    call sum_to
    li t0, 2
    mul a0, a0, t0
    ld ra, 0(sp) # Restore the return address (ra) that was saved at the begining of the function
    addi sp, sp, 16 # Deallocate the stack by restoring the stack pointer (sp) to its previous position
    ret
```
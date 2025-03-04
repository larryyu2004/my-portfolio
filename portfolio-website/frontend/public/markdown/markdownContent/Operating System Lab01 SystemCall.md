## System call is not normal function, it will jump into the kernel
---
# fd = open("out", 1)
    fd -> file descripter
    open() -> a system call to open file, open filename = "out"
    1 -> read mode
---
# write(fd, "hello/n", 6)
    write() -> system call to write file
    fd -> write in fd
    "hello/n" ->  write hello/n
    6 -> apply for 6 bytes address for writing
---
# pid = fork();
    pid -> process identifier
    fork() -> returns the process identifier (pid) of the new process
    pid > 0 -> parent process
    pid = 0 -> child process
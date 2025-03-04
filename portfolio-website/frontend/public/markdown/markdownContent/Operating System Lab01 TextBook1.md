## Chapter 1 - Operating system interfaces

---
# Processes and memory
    
```CPP []
//fork() here create a new Process
    int pid = fork();
    pid == 0 -> Child Process
    pid > 0 -> Parent Process

    exit(0) -> success
    exit(1) -> failure
```
---
```CPP []
    int pid = fork();
    if(pid > 0){
        printf("parent: child=%d\n", pid);
        pid = wait((int *) 0); //-> parent wait child
        printf("child %d is done\n", pid);
    } else if(pid == 0){
        printf("child: exiting\n");
        exit(0);
    } else {
        printf("fork error\n");
    }
```
    Output:
        parent: child=1234
        child: exiting
        parent: child 1234 is done
    
```CPP []
    char *argv[3];
    argv[0] = "echo"; //-> argv[0] store syscall name
    argv[1] = "hello"; //-> argv[1] store syscall content
    argv[2] = 0; //-> argv[2] = 0;
    exec("/bin/echo", argv); //-> execute relevant syscall
    printf("exec error\n"); // if success, no longer execute this
```

---

# I/O and File descriptors

```CPP []
    char buf[512];
    int n;
    for(;;){
        //call read()
        //0 -> file descriptors
        //buf -> content
        //sizeof buf -> buf's size;
        n = read(0, buf, sizeof buf);

        //Read nothing
        if(n == 0)
            break;
        
        //Failed read
        if(n < 0){
            fprintf(2, "read error\n");
            exit(1);
        }

        //call write()
        //The content of writing should be same as write
        if(write(1, buf, n) != n){
            fprintf(2, "write error\n");
            exit(1);
        }
    }
```
    Input:
    hello
    world
    Processes:
    //First read: n == 6 for 'hello'
    //Second read: n == 1 for the newline character '\n'
    //Third read: n == 6 for 'world'

    Syscall -- cat()
    Syscall -- close()

    Here is a simplified version of the code a shell runs for the command cat < input.txt:
```CPP []
    char *argv[2];
    argv[0] = "cat";
    argv[1] = 0;

    if(fork() == 0) {
        close(0);  // Close standard input (file descriptor 0).
        open("input.txt", O_RDONLY);  // Open "input.txt" for reading (standard input is redirected).
        exec("cat", argv)
    }
```
    The second argument to open consists of a set of flags:
    See kernel/fcntl.h:
```CPP []
    #define O_RDONLY  0x000 //-> read only
    #define O_WRONLY  0x001 //-> write only
    #define O_RDWR    0x002 //-> read and write
    #define O_CREATE  0x200 //-> create file if it doesn't exist
    #define O_TRUNC   0x400 //-> truncate the file to zero length
```

    Syscall -- dup() -> duplicates an existing file descriptor, returning a new one that refers to the same underlying I/O object

---
# Pipes

```CPP []
    int p[2];
    char *argv[2];
    argv[0] = "wc";
    argv[1] = 0;
    pipe(p); //// Create a pipe, p[0] is read end, p[1] is write end
    if(fork() == 0) {
        close(0);
        dup(p[0]);
        close(p[0]);
        close(p[1]);
        exec("/bin/wc", argv);
    } else {
        close(p[0]);
        write(p[1], "hello world\n", 12);
        close(p[1]);
    }
```

    grep fork sh.c | wc -l:
    The child process creates a pipe to connect the left end of the pipeline with the right end
    a | b | c:
    which itself forks two new child processes (one for b and one for c). Thus, the shell may create a tree of processes.
    The leaves of this tree are commands and the interior nodes are processes that wait until the left and right children complete.
---
# File system

    Syscall -- fstat (See kernel/stat.h)
```CPP []
    #define T_DIR 1 // Directory
    #define T_FILE 2 // File
    #define T_DEVICE 3 // Device
    struct stat {
        int dev; // File system’s disk device
        uint ino; // Inode number
        short type; // Type of file
        short nlink; // Number of links to file
        uint64 size; // Size of file in bytes
    };
```

---
# Real world


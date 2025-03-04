## Operating System: xv6;

## RISC-V: Operating System runs on RISC-V microprocessor and a certain amount of surrounding hardware (memory, disk, console interface)

## QEMU: machine simulator
---
# How to build environment?

    1. Download ubuntu.tar (environment) from: https://tarplkpqsm.feishu.cn/docs/doccnxrUYjtjuoNnAyxwajplSyf
    2. Download Docker and open terminal, cd to your project file (ubunyu.tar should in the same root)
    3. Create a mirror image document: enter `docker import buntu. tar ubuntu` in the terminal
    4. Launch a container: enter `docker run -i -t -w /root --name ubuntu ubuntu bash` in the terminal
    5. Enter the container: enter `docker start -i ubuntu` in the terminal
    6. Enter `make`
    7. Enter `make qemu` to enter xv6's shell
    8. nter `ls` to see files in current root 

    if you see sth like this -> Successfully build the environment!
    2024-11-04 21:36:28 .              1 1 1024
    2024-11-04 21:36:28 ..             1 1 1024
    2024-11-04 21:36:28 README         2 2 2226
    2024-11-04 21:36:28 xargstest.sh   2 3 93
    2024-11-04 21:36:28 cat            2 4 23888
    2024-11-04 21:36:28 echo           2 5 22720
    2024-11-04 21:36:28 forktest       2 6 13080
    2024-11-04 21:36:28 grep           2 7 27248
    2024-11-04 21:36:28 init           2 8 23824
    2024-11-04 21:36:28 kill           2 9 22696
    2024-11-04 21:36:28 ln             2 10 22648
    2024-11-04 21:36:28 ls             2 11 26120
    2024-11-04 21:36:28 mkdir          2 12 22792
    2024-11-04 21:36:28 rm             2 13 22784
    2024-11-04 21:36:28 sh             2 14 41656
    2024-11-04 21:36:28 stressfs       2 15 23792
    2024-11-04 21:36:28 usertests      2 16 156008
    2024-11-04 21:36:28 grind          2 17 37968
    2024-11-04 21:36:28 wc             2 18 25032
    2024-11-04 21:36:28 zombie         2 19 22184
    2024-11-04 21:36:28 console        3 20 0
---
# Git
    1. Clone lab code: enter `git clone git://g.csail.mit.edu/xv6-labs-2021`
    2. enter `cd xv6-labs-2021`
    3. enter `git checkout util``
    4. Copy lab code into your own respository
    
    Now, you can write code in the vscode and use git pull in your Docker
---
# Docker
	1. Delete file `rm -rf xv6-labs-2021/`.
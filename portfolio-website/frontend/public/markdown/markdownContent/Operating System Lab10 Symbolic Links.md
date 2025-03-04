# Pre-Knowledges

## 1. In kernel/sysfile.c sys_open(void)
        omode is the mode flag passed to sys_open()
        O_NOFOLLOW is a flag that prevents following symbolic links
        If O_NOFOLLOW is not set, we processd to resolve symbolic links.
        We also allow a maximum of 10 symbolic link resolutions to prevent infinite loops (if symlink point to itself):
```CPP
            int i = 0;
            for (; i < 10 && ip->type == T_SYMLINK; i++)
```
        Reads the symlink target (path it points to) into path, readi() reads the content of symlink
        If reading fails, release the inode and return an error.
        Release the old inode (ip), switch to the resolved inode (dp), and lock it.
        If we reach 10 symlink resolutions, assume it’s a loop and return an error.
    
---

# Step-by-Step Process

## 1. In kernel/sys_symlink (void):
        1. parameters:
```CPP
                char target[MAXPATH], path[MAXPATH];
                struct inode *dp, *ip;
```
            target: the file or directory the symlink should pointer to.
            path: The path where the new symbolic link will be create.
            dp: Inode for new symlink
            ip: Inode for the target (used to check if it is a directory)
        2. extracts the arguments from user space and check if they are valid
        3. using begin_op() to starts a new file system operation
        4. Disallow symlinking to directories to avoid unintended behavior:
```CPP
            if (ip->type == T_DIR) {
                goto bad;
            }
```
        5. Calls create() to create a new inode for the symlink and The new file’s type is T_SYMLINK:
```CPP
            if((dp = create(path, T_SYMLINK, 0, 0)) == 0) {
                goto bad;
            } 
```
        6. Writes target as the content of the symlink and if writei() fails, panic:
```CPP
            if (writei(dp, 0, (uint64)target, 0, MAXPATH) != MAXPATH) {
                panic("symlink: writei");
            }
```
        7. Unlock and release the new symlink inode, End the file system operation and return success:
```CPP
            iunlockput(dp);
            end_op();
            return 0;
```
        8. If anything goes wrong, clean up and return an error:
```CPP
            bad:
                end_op();
                return -1;
```

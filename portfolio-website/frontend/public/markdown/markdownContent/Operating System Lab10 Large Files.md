# Pre-Knowledges

## 1. In kernel/fs.c, bmap(struct inode *ip, uint bn) is to find or allocate the disk block for a given block number in a file;
        ip: Pointer to the inode structure.
        bn: The block number we are looking for.

## 2. In kernel/fs.c, itrunc(struct inode *ip) is to truncate (delete) a file by freeing all blocks associated with it
        ip: Pointer to the inode structure.
    
## 3. In kernel/fs.h, we will find:
```CPP
        struct dinode {
            short type;           // File type
            short major;          // Major device number (T_DEVICE only)
            short minor;          // Minor device number (T_DEVICE only)
            short nlink;          // Number of links to inode in file system
            uint size;            // Size of file (bytes)
            uint addrs[NDIRECT + 1];   // Data block addresses
        };
        NDIRECT == 11
```
        which means the first 11 blocks are direct blocks and the rest 1 block is indirect block

---

# Step-by-Step Process

## 1. In bmap():
        1. Direct Block Handling: 
            If bn < number of direct and ip -> addr[bn] == 0 (which means it has not been allocated)
            allocate a new block using balloc(ip->dev);
        2. Single Indirect Block Handling
            If bn is between NDIRECT and NDIRECT + NINDIRECT, which means it was stored in the indirect blocks.
            ip->addrs[NDIRECT] stores the address of block containing indirect block address.
            And if it is not allocated, allocate it.
            read the indirect block from disk using bread() and also get the data to a
            a[bn] == 0 means we should allocate a new block
            writes back(log_write(bp)) and releases buffer (brelse(bp));
        3. Double Indirect Block Handling (Large Files)
            If bn is beyond the indirect block range, which means bn is a double indirect address.
            pointers to indirect blocks using ip -> addr[NDIRECT+1]
            if NDIRECT+1 (double indirect Pointer) is empty, allocate a block;
            reads the first-level indirect block using bp = bread(ip->dev, addr);
            get the data using a = (uint*)bp->data;
            also get the index using uint idx_b1 = bn / NINDIRECT; and if it is 0, allocate a new block.
            reads the second-level indirect block using bp = bread(ip->dev, addr);
            allocate if necessary

## 2. In itrunc():
        1. Free Direct Blocks:
            Loops through NDIRECT direct blocks
            If a block exists, free it using bfree(ip -> dev, ip -> addrs[i])
            sets the pointer to 0;
        2. Free Indirect Blocks:
            if(ip -> addrs[NDIRECT]) means if single indirect block exists, read it.
            Loop through all entries and free them:
```CPP
            for(j = 0; j < NINDIRECT; j++){
                if(a[j])
                bfree(ip->dev, a[j]);
            }
```
            Free the indirect block itself.
        3. Free Double Indirect Blocks:
            Reads double indirect block.
            Loops through first-level indirect blocks:
```CPP
            for(j = 0; j < NINDIRECT; j++){
                if(a[j]) {
                struct buf *bp2 = bread(ip->dev, a[j]);
                uint *a2 = (uint*)bp2->data;
                ...
                brelse(bp2);
                bfree(ip->dev, a[j]);
                }
            }
```
            Reads second-level indirect blocks and frees them.
```CPP
            for(int k = 0; k < NINDIRECT; k++){
                if(a2[k])
                bfree(ip->dev, a2[k]);
            }
```
            Finally, frees first-level and double indirect blocks.
        4. Update Inode Metadata
            Resets file size.
            Updates inode metadata.

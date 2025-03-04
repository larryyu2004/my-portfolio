## logging is sth that after the fs crush, it can recover the data

# Disk
    1. bitmap can represent each data block has been allocated or is free
    2. inode is a data structure. Each inode stores the attributes and disk block locations of the object's data

    bitmap and inode -> metablock
                        data block
    
    In XV-6, there is another log, it has header log: it will record each following log block belongs to which block

    We have some user programs who will call write and read to modify the system files.
    In the XV-6 kernel, it has block cache.
    The initial write request will be sent to block cache.
    Block cache is the copy of block from disk in the memory.

    After calling write, the updates are copied in the log, then we will update header block to indicate current transaction has been done
    In the fs code, any function call can change the file, there will be a `begin_go` at somewhere, which indicates we will update the fs soon
    After `begin_go`, fs start to update.
    `end_op` is to tell fs it has finished all the updates
    So in the `begin_go` and `end_op`, all the write block operations will only be in the block cache
    When the system call goes into `end_op`, fs will copy the block cache to the log.

    When finishing copy, fs will write the number of blocks into the header block of log by a disk. it is called `commit point`.
    If crush happens before `commit point`, when restarting, all the change will not be applied.
    After `commit point` but crash happens, the number of blocks in log header will not be 0, then it will write the number to the fs area from log.
    All the operations should be atomic between `begin_go` and `end_op`.
    
# How ext3 imporves its performence:
    1. It provides asynchronous:
        Syetem can modify the block in the buffer and go back and it will not trigger the operation on the disk.
        But it doesn't mean that the system has finished its job since all the following operations are in the buffer.
        So we need a tool that called `fsync`. When whole system crushed and then recover, `fsync` can help u to finish the following works.
        
    2. It provides batching:
        ext3 has an open transaction. There are multiple operations in one transaction.
        Each 5s, ext3 will generate a new transaction, in the end, ext3 will commit the whole transaction.
    3. Concurrency

    stop() function will not lead to commit of the transaction, it just tells the system that the number of syscall of the transaction decrease 1.
    Unless all the operations on the buffer are done. Otherwise the transaction cannot commit.

# The steps of ext3 transaction commit:
    1. When a transaction is commiting, we dont wanna a new syscall so we should prevent new syscall.
        (This will actually influence the performance of syscall)
    2. We should wait until all the operations in the transaction finish.
    3. As long as all the operations in the transaction finish, system will allocate a new transaction for next 5s.
    4. log in the ext3 includes descriptor, data and commit block.
        Since now the transaction contains all the blocks that system need to handle, now the descriptor block will update can it will contains all the blocks that in the transaction that need to modify.
    5. Since now all the information is in the buffer. It will write all the information into log of the disk.
        In this step, all the operations in transaction have finished.
    6. We need to wait until writing process finishes.
    7. Then we can do commit block.
    8. We need to wait until `commit block` finishes. 
        technically speaking, when transaction reaches to `commit point`, 
        Even through the whole system crushes right now, when it recovers, all the information will go back.
        But if the system crushes before `commit point`, all the information will disappear immediately.
    9. Then we can handle the block in the really fs.
    10. After Step9, we can reuse the log in the transaction.

# How ext3 file system recovers
    We know that there is no any other kind of block that will start with 32 bits (we call that magic number)
    If there is a block that start with 32 bits after a commit block, it is a descriptor block, defintely.
    So the recover software will scan from super block until:
    1. There is a block that is not a descriptor block after commit block.
    2. Or there is a block that is a descriptor block after commit block but according to the descriptor block, we cannot find the original commit block.
    


     
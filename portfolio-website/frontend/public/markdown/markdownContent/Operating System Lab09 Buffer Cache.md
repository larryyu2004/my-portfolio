# Pre-Knowledges

## 1. In XV-6, we can't access disk directly
        If we really want to access, we need copy the date to a buffer, then read the data from that buffer

## 2. In XV-6, the smallest unit of data on the disk is a block, which size is 1024kb.
        We can at least read 1024kb from the disk

## 3. In kernel/bio.c, When access the disk, we need to call bread(), 
```CPP
static struct buf*
bget(uint dev, uint blockno)
{
  struct buf *b;

  acquire(&bcache.lock);

  // Is the block already cached?
  for(b = bcache.head.next; b != &bcache.head; b = b->next){
    if(b->dev == dev && b->blockno == blockno){
      b->refcnt++;
      release(&bcache.lock);
      acquiresleep(&b->lock);
      return b;
    }
  }

  // Not cached.
  // Recycle the least recently used (LRU) unused buffer.
  for(b = bcache.head.prev; b != &bcache.head; b = b->prev){
    if(b->refcnt == 0) {
      b->dev = dev;
      b->blockno = blockno;
      b->valid = 0;
      b->refcnt = 1;
      release(&bcache.lock);
      acquiresleep(&b->lock);
      return b;
    }
  }
  panic("bget: no buffers");
}
```
    If so, return the buffer.
    If not, it will go to find LRU (Least Recently Used) buffer, and allocate that buffer to current block
    We can see all the buffer blocks are on a doubly linked list.
    The first element on the linklist was used recently, the last element is LRU

    Each time calling bget(), it will traversal the linklist first to check current block has been loaded in the buffer or not
    If not, it traversal from the back to the start (from LRU), until it finds refcnt == 0 (the program is not using the block on the buffer)

    This cause each time when we want to allock block on the buffer, we have to compete the lock of the doubly linked list.
 
---

# Step-by-Step Process

## 1. Define the number of the bucket (NBUC)

## 2. In kernel/bio.c, binit(), init each hashtable bucket's lock and init sleep lock of each buffer

## 3. In kernel/bio.c, implement a function called replaceBuffer(struct buf *lrubuf, uint dev, uint blockno, uint ticks),
        which can update urlbuf's dev, blockno and ticks
        also its valid status and its refcnt

## 4. In kernel/bio.c, bget():
        1. struct lastbuf and b (b is current buffer), and get the bucket number (num) from blockno%NBUC
        2. lock the bucket in the hashtable
        3. use a loop to traversal the buckets of hashtable
            3.1 Always update the lastbuf 
            3.2 If the bucket match the b (dev && blockno) -> correct bucket and correct buffer
                3.2.1 update its refcnt
                3.2.2 release the lock and return
            3.3 If not , traversal all the buffer using structure bcache (bcache stores all the buffers)
                go and find whose refnum == 0 and has the lowest tick (inactive and accessed longest time ago)
                assign that buf to lrubuf 
            3.4 oldNum is the number of bucket of the lrubuf and oldTick is the tick of the buffer
            3.5 if oldNum == 0 (this buffer in the bucket is never been accessed), replace the Buffer directly
            3.6 if not (this buffer in the bucket is been accessed before)
                3.6.1 if oldNum ! Num (if the lrubuf and buffer (the buffer now i want to access)) is not in the same bucket
                    3.6.1.1 lock the bucket of lrubuf and replace the buffer
                    3.6.1.2 remove the lrubuf from old bucket
                    3.6.1.3 if the lrubuf is not the last one, remember to update its->next->prev
                    3.6.1.4 Global Buffer Cache (bcache), we should update the lastbuf's next and lrubuf's prev and next
                3.6.2 if not (they are on the same bucket)
                    3.6.2.1 just replace it 
            3.7 unlock the bcache
            3.8 unlock the hashtable
            Note: There is no need to always put lrubuf to the last node of a bucket
                because it doesn't matter the sequence in the hashtable
                but in Global Buffer Cache (bcache): LRU Order Matters

## 5. In kernel/bio.c, update pint() and bunpin()

## 6. In kernel/bio.h, set int tick
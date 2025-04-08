# Memory Pool Framework

---

## 1.In general, all the memory pools do same things:
    1. Apply a memory block from the system.
    2. Managed by application layer (When programe is running, the allocation and recycle of the memory pool is managed by application layer) so that it can decrease the number of system calls.

---

## 2. Multiple fixed-length memory allocators based on hash mapping
```CPP []
+-----------------------------+     +-----------------------------+      
|         Hash Bucket         |     |         MemoryPool          |
+-----------------------------+     +-----------------------------+
|  1  |  2  |  3  |  4  |  5 -+---> | - SlotSize: 48B             |
+--+--------------------------+     | - BlockSize: 4096B          |
   |                                | - ptr to freeSlot           |
   v                                | - ptr to firstBlock         |  
+-----------------------------+     +-----------------------------+
|         MemoryPool          |
+-----------------------------+
| - SlotSize: 8B              |
| - BlockSize: 4096B          |
| - ptr to freeSlot           |
| - ptr to curSlot            |
| - ptr to firstBlock         |
+-----------------------------+
                |
                |
                v
+---------------------------------+
|          Real memory            |
+---------------------------------+
| - ptr to nextBlock | many slots |
| - ptr to nextBlock | many slots |
| - ptr to nextBlock | many slots |
+---------------------------------+
```

---

## 3. Main work
    1. Maintain a hash bucket, each element in the hash bucket is a memory pool.

    2. Each Blocksize of memory pool is same (4096 bytes (4KB), we can set them to be differnet)

    3. But the Slotsize of memory pool can be different (they can be 8, 16, 32, ... 512 bytes). 
    3.1 When user want apply 8 bytes and 12 bytes memory, system should allocate 8 bytes and 16 bytes of Slotsize from different memory pool.
    3.2.1 When Slotsize > 512 bytes, we should use new/malloc. 
    3.2.2 Because memory pool is to solve the fragment problem from the small memory and performance problem from continuous allocation from small memory.

---

## 4. The framework of memory pool
```CPP []
+-----------------------------+
|         MemoryPool          |
+-----------------------------+       +--------------------------------------------+
| - SlotSize: 8B              |       |            list of freed slots             |     
| - BlockSize: 4096B          |       +--------------------------------------------+
| - ptr to freeSlot ----------+-------+----->p1, p2----->p1, p2----->p1, p2----->  |
| - ptr to curSlot -----------+--+    +-------+-----------+-----------+-------------
| - ptr to firstBlock         |  |            |           |           |
+-----+-----------------------+  +------------+-----------+-----------+-------------------+
      |                                       |           |           |                   |
      |           +---------------------------+           |           +-------+           |
      |           |                       +---------------+                   |           |
      |           |                       |                                   |           |
      |           |                       |                                   |           |                    +--> ptr to last slot
      |           |                       |                                   |           |                    |
+-----+-----------+-----------------------+-----------------------------------+-----------+--------------------+-----------+
|     |           |                       |              Memory Pool          |           |                    |           |
+-----v-----+-----v-----+-----------+-----v-----+-----------+-----------+-----v-----+-----v-----+--------------+-----------+
|   Slot1   |   Slot2   |   Slot3   |   Slot4   |   Slot5   |   Slot6   |   Slot7   |   Slot8   |      ...     |   Slotn   |
+-----------+-----------+-----------+-----------+-----------+-----------+-----------+-----------+--------------+-----------+
|ptr  |pad  |           |           |           |           |           |           |           |              |           |
|to   |area | freed     | used      | freed     | used      | used      | freed     | unused    |              | unused    |
|next |     | slot      | slot      | slot      | slot      | slot      | slot      | slot      |              | slot      |   
|block|     |           |           |           |           |           |           |           |              |           |
+--+--------+-----------+-----------+-----------+-----------+-----------+-----------+-----------+--------------+-----------+
|  |        |           |                                                                                                  |
|  |        +-slot size-+                                                                                                  |
|  |                                                                                                                       |
+--+-------------------------------------------- Block Size = 4096 bytes (4KB) --------------------------------------------+
   |
   |
+--v----------------------------+
| ptr to nextBlock | many slots |
+-------------------------------+
```

---

## 5. Solt currentBlock, Slot freeSlot and Slot currentSlot
    1.1 Solt currentBlock: memory pool is actually some blocks linked by link list. Each block is a big memory block. 
    1.2 Like ptr to firstBlock on the graph above.
    1.3 If there is an insufficient memory, it will ask OS to apply some new blocks and add it into the link list.

    2.1 Slot freeSlot: each object were released will be put into the freeSlot. 
    2.2 When first create memory pool, the freeSlot is empty. 
    When user create object and release it, here, memory pool will not return memory block to the OS, it will be put into the freeSlot. 
    2.3 Later when user create object again, memory pool will find any free slot from freeSlot first.

    3.1 Solt currentSlot: When user create object, it will check freeSlot first. 
    3.2 If freeSlot is not empty (there are some freeSlots), it will allocate a slot for applying object.
    3.3 If freeSlot is empty (There is no any freeSlots), it will allocate currentSlot first.
    3.4 If there is no any currentSlot, it will ask OS to allocate a new block.

---

## 6. newElement and deleteElement
    1. newElement:
```CPP []
template <typename T, typename... Args>
T* newElement(Args&&... args);
```
    1.1 User needs to call newElement<T>() to apply memory when constructing T, newElement will calculate the size of T and passing it into hash bucket.
    1.2 Hash bucket will base on the hash map to choose the size of the slot of memory pool.
    1.3 When allocating, it will find free slot first based on FreeList_.
    1.4 If not, then it will find curSlot, If curSlot >= lastSlot, it will allocate a new memory block for user.
    1.5 When finishing newElement(), it will return the address of T to user.

    2. deleteElement:
```CPP []
template <typename T>
void deleteElement(T* p);
```
    2.1 It will add slots into FreeList_ of relevent memory pool based on hash mapping.

---

## 7. RAW memory
### 1. operator delete(cur);
``` CPP []
    MemoryPool::~MemoryPool() {
        Slot* cur = firstBlock_;
        while (cur) {
            Slot* next = cur->next;

            operator delete(reinterpret_cast<void *>(cur));
            cur = next;
        }
    }
```
    1.1 MemoryPool uses custom allocation
    1.2 If cur was allocated as a raw memory, it is not constructed with new.
    1.3 So if we call delete directly could cause undefined behavior.
    1.4 delete and new
```CPP []
Slot* s1 = new Slot; // Calls constructor
delete s1; // Calls destructor + deallocates memory
```
    1.5 operator new and operator delete
```CPP []
Slot* s2 = static_cast<Slot*>(operator new(sizeof(Slot))); // Allocate raw memory
operator delete(s2); // Deallocates memory (without destructor call)
```
### 2. operator delete(reinterpret_cast<void*>(cur));
    2.1 reinterpret_cast<void*> ensures cur is treated as raw memnory.
    2.2 So operator delete(void*) properly deallocates it without assuming an object exists.
    2.3 If we remove void*, it will call destructor and it will cause undefined behavior.

---

## 8. Processes
    1.1 In v1/test/UnitTest.cpp, we have some class. Let's pick a class P3 (int id_[10]: 10 ints in a list -> 40 bytes)
    1.2 In the v1/test/UnitTest.cpp, it will call ashBucket::initMemoryPool(). 
    It initlizes the Memory Pool by by creating multiple Memory Pool instances, 
    each with special slot size (In v1/include/MemoryPool.h, #define SLOT_BASE_SIZE 8)
    1.2.1 In the v1/src/MemoryPool.cpp, initMemoryPool(), it will firstly call getMemoryPool().
     In the getMemoryPool(), it will firstly create a Memory Pool with the size of MEMORY_POOL_NUM 
     (Which was already defined in the v1/include/MemoryPool.h, #define MEMORY_POOL_NUM 64) 
     and return the index of the Memory Pool to the initMemoryPool().
    1.2.2 Since MemoryPool& HashBucket::getMemoryPool(int index) in the v1/src/MemoryPool.cpp is a MemoryPool scope. 
    So then in the initMemoryPool(), it will call init() which is from slot class:
    it will define the Solt size, pointer for the firstBlock, pointer for the current slot. pointer for the freeList and the pointer to the last slot.
    1.3 In v1/test/UnitTest.cpp BenchmarkMemoryPool(), it will call newElement<P3>() -> 2.X and deleteElement<P3> -> 3.X

    2.1 In v1/include/MemoryPool.h, we have defined an interface for newElement(),



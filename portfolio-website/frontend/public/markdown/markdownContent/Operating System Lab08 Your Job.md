# Pre-Knowledges

## 1. E1000 uses DMA (direct memory access), it can transfer packet it received to the memory
        When sending, it can also put packets into the memory and E1000 will go and find the packets
        When NIC receiving a packet, it will generate an interrupt.

## 2. Table 3-1. Receive Descriptor (RDESC) Layout:
    -------------------------------------------------------------------------
    |                         Buffer Address [63:0]                         |
    -------------------------------------------------------------------------
    |   Special   |   Errors   |   Status   |  Packet Checksum   | Length   |
    |   [7:0]     |   [15:8]   |  [23:16]   |     [31:24]        | [47:32]  |
    -------------------------------------------------------------------------
    So in the XV-6, in kernel/e1000_dev.h:
```CPP []
    struct rx_desc
    {
        uint64 addr;       /* Address of the descriptor's data buffer */
        uint16 length;     /* Length of data DMAed into data buffer */
        uint16 csum;       /* Packet checksum */
        uint8 status;      /* Descriptor status */
        uint8 errors;      /* Descriptor Errors */
        uint16 special;
    };
```
    Here, `status` has mamy status:
        1. PIF (bit 7) -> Passed in-exact filter
        2. IPCS (bit 6) -> IP Checksum Calculated on Packet
        3. TCPCS (bit 5) -> TCP Checksum Calculated on Packet
        4. RSV (bit 4) -> Reserved
        5. VP (bit 3)
        6. IXSM (bit 2) -> Ignore Checksum Indication
        7. EOP (bit 1) -> End of Packet
        8. DD (bit 0) -> Descriptor Done: Indicates whether hardware is done with the descriptor. When set along with EOP, the received packet is complete in main memory

## 3. rx - Ring Queue:

        Circular Buffer Queues (Receive Queue)
        +---------------------+ <-- Base
        |                     |
        |                     |
        +---------------------+
        |                     | <-- Head
        |                     |
        |                     |
        |    Receive Queue    |
        |                     |     Owned By
        |                     |     Hardware
        |                     |
        |                     |
        |                     | <-- Tail
        +---------------------+
        |                     | 
        +---------------------+ <-- Wrap-around to Base && <-- Base + Size
        1. From Head to Tail, packets has been handled by software.
        2. If a new packet arrive, head++;
        3. If software has handled one packet, tail++;

## 4. In the XV-6, in kernel/e1000_dev.h:
```CPP []
        struct tx_desc
        {
            uint64 addr;
            uint16 length;
            uint8 cso;
            uint8 cmd;
            uint8 status;
            uint8 css;
            uint16 special;
        };
```
        There are several cmd types:
            1. IDE (bit 7) -> Interrupt Delay Enable
            2. VLE (bit 6) -> VLAN Packet Enable
            3. DEXT (bit 5) -> Extension (0b for legacy mode)
            4. RPS/RSV (bit 4) -> Report Packet Sent
            5. RS (bit 3) -> Report Status: NIC will report the packet status (When finishing sending, NIC will set DD)
            6. IC (bit 2) -> Insert Checksum
            7. IFCS (bit 1) -> Insert FCS
            8. EOP (bit 0) -> End Of Packet: When set, indicates the last descriptor making up the packet. One or many descriptors can be used to form a packet.

## 5. tx - Ring Queue
        Circular Buffer Queues (Transmit Queue) 
        +---------------------+ <-- Base
        |                     |
        |                     |
        +---------------------+
        |                     | <-- Head
        |                     |
        |                     |
        |    Receive Queue    |
        |                     |     Owned By
        |                     |     Hardware
        |                     |
        |                     | <-- Tail
        +---------------------+
        |                     | 
        +---------------------+ <-- Wrap-around to Base && <-- Base + Size
        Here, Head - Tail is the packets that haven't been sent
        After sending a packet, head++;
        When there is a new packet needs to be sent, tail++;

## 6. In kernel/net.h, 
```CPP []
    struct mbuf {
        struct mbuf  *next; // the next mbuf in the chain
        char         *head; // the current start position of the buffer
        unsigned int len;   // the length of the buffer
        char         buf[MBUF_SIZE]; // the backing store
    };
```
    mbuf's structure:
        // The above functions manipulate the size and position of the buffer:
        //            <- push            <- trim
        //             -> pull            -> put
        // [-headroom-][------buffer------][-tailroom-]
        // |----------------MBUF_SIZE-----------------|
        //
        // These marcos automatically typecast and determine the size of header structs.
        // In most situations you should use these instead of the raw ops above.
        #define mbufpullhdr(mbuf, hdr) (typeof(hdr)*)mbufpull(mbuf, sizeof(hdr))
        #define mbufpushhdr(mbuf, hdr) (typeof(hdr)*)mbufpush(mbuf, sizeof(hdr))
        #define mbufputhdr(mbuf, hdr) (typeof(hdr)*)mbufput(mbuf, sizeof(hdr))
        #define mbuftrimhdr(mbuf, hdr) (typeof(hdr)*)mbuftrim(mbuf, sizeof(hdr)) 

---

# Step-by-Step Process

## 1.1.First ask the E1000 for the TX ring index at which it's expecting the next packet, by reading the E1000_TDT control register. 
        1. Acquire the lock first, beacuse there may have a lot of threads sent packet at same time.
        2. Since #define E1000_TDT is the /* TX Descripotr Tail - RW */, use E1000_TDT to get first ring descriptor and store in the index
        3. From the regs, get the tx_desc from that index;

## 1.2. Then check if the the ring is overflowing. If E1000_TXD_STAT_DD is not set in the descriptor indexed by E1000_TDT, 
        the E1000 hasn't finished the corresponding previous transmission request, so return an error. 
        1. Since E1000_TXD_STAT_DD is to check if the ring queue is overflowing, check it
        2. If so, which means there has no empty space for tail, release first then return -1;

## 1.3. Otherwise, use mbuffree() to free the last mbuf that was transmitted from that descriptor (if there was one). 
        1. Check is there is a descriptor
        2. If so, use mbuffree()

## 1.4. Then fill in the descriptor. m->head points to the packet's content in memory, and m->len is the packet length. 
        Set the necessary cmd flags (look at Section 3.3 in the E1000 manual) and stash away a pointer to the mbuf for later freeing. 
        1. Update desc's address to current mbuf's head
        2. Update desc's length to current mbuf's length

## 1.5. Finally, update the ring position by adding one to E1000_TDT modulo TX_RING_SIZE. 
        1. Update regs[E1000_TDT], and mod TX_RING_SIZE
        2. return 0;

## 2.1. First ask the E1000 for the ring index at which the next waiting received packet (if any) is located, 
        by fetching the E1000_RDT control register and adding one modulo RX_RING_SIZE.
        1. The first note is that in kernel/e1000.c, e1000_recv(), we need to read all packets at once.
            We need to add a loop that reads the descriptor at tail until its status is not completed;
        2. Since Tail is a empty buffer and Tail -> Head is packet buffer, so we get the index from tail+1 and mod by RX_RING_SIZE

## 2.2. Then check if a new packet is available by checking for the E1000_RXD_STAT_DD bit in the status portion of the descriptor. If not, stop. 
        1. check desc's status using E1000_RXD_STAT_DD
        2. If not, which means there is no longer any packet in the desc, we can quit ther loop;

## 2.3. Otherwise, update the mbuf's m->len to the length reported in the descriptor. 
        Deliver the mbuf to the network stack using net_rx(). 
        1. update the mbuf's m->len = desc->length
        2. call net_rx() to deliver the network stack

## 2.4. Then allocate a new mbuf using mbufalloc() to replace the one just given to net_rx(). 
        Program its data pointer (m->head) into the descriptor.
        Clear the descriptor's status bits to zero. 
        1. Since the previous mbuf has given to the net_rx(), we need to allocate one again.
        2. Update rx_ring table using rx_mbufs[i]'s head
        3. Set desc's status to zero

## 2.5. Finally, update the E1000_RDT register to be the index of the last ring descriptor processed. 
        1. Update regs[E1000_RDT] to current index

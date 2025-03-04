# Network Senario:

     --------------- 
    |               |        ------- PC
    |      ETH      |------ |
    |     (LAN)     |        ------- HTTP Server
     ---------------        |
                             ------- Switch

     ---------------
    |               |
    |     LAN1      |------- 
    |               |       |
     ---------------        |
                          Router1
     ---------------        |
    |               |       |
    |     LAN2      |-------|
    |               |       |
     ---------------        |
                          Router2
     ---------------        |
    |               |       |
    |     LAN3      |-------
    |               |
     ---------------

---

# In kernel/net.h, we will see:
```CPP
    struct eth {
        uint8  dhost[ETHADDR_LEN];
        uint8  shost[ETHADDR_LEN];
        uint16 type;
    } __attribute__((packed));
```
     ---------------------------------------------------------------
    |   PAYLOAD     |   TYPE    |   SOURCE    |     DESTINATION     |
     ---------------------------------------------------------------
     ETH address: 48bits (24bits (manufacturer serial number) + 24bits (manufacturer assign))

---

# tcpdump:
    tepdump output:
    15:27:40.862370 ARP, Request who-has 10.0.2.15 tell 10.0.2.2, length 28
            0x0000: ffff ffff ffff 5255 0a00 0202 0806 0001 ...RU...
            0x0010: 0800 0604 0001 5255 0a00 0202 0a00 0202 ...RU...
            0x0020: 0000 0000 0000 0a00 020f                ........
    
    Info1: Packet receiving time
    Info2: The first 48 bits are boardcast address -> 0xffffffffffff
    Info3: And the next 48 bits are the source address -> 5255 0a00 0202
    Info4: Next 16 bits are the type of the packet -> Here is 0806, which refers to ARP
    Info5: The rest part is the payload of the ARP packet

---

# ARP 
    In kernel/net.h
```CPP
    struct arp {
        uint16 hrd; // format of hardware address
        uint16 pro; // format of protocol address
        uint8  hln; // length of hardware address
        uint8  pln; // length of protocol address
        uint16 op;  // operation

        char   sha[ETHADDR_LEN]; // sender hardware address
        uint32 sip;              // sender IP address
        char   tha[ETHADDR_LEN]; // target hardware address
        uint32 tip;              // target IP address
    } __attribute__((packed));
    #define ARP_HRD_ETHER 1 // Ethernet
    enum {
        ARP_OP_REQUEST = 1, // requests hw addr given protocol addr
        ARP_OP_REPLY = 2,   // replies a hw addr given protocol addr
    };
```
    15:27:40.862370 ARP, Request who-has 10.0.2.15 tell 10.0.2.2, length 28
            0x0000: ffff ffff ffff 5255 0a00 0202 0806 0001 ...RU...
            0x0010: 0800 0604 0001 5255 0a00 0202 0a00 0202 ...RU...
            0x0020: 0000 0000 0000 0a00 020f                ....

    info1: The first 14 bytes are Ethernet's header, includes address of the Ethernet (48bits), Type (16bits)
    info2: The last 4 bytes are TIP (target IP), sender wants to get the Ethernet address of this IP address -> 0a00 020f (10.0.2.15)
    info3: And the next 6 bytes forward are THA (the destination Ethernet address), now it's unknown, so it's all zero -> 0000 0000
    info4: And the next 4 bytes forward are SIP (IP address of sender) -> 0a00 0202 (10.0.2.2)
    info5: And the next 6 bytes forward are SHA (Ethernet address of sender) -> 5255 0a00 0202
    info6: The rest 8 bytes are the formats of Ethernet and IP address what we are interested in

---

# Network protocols are nested
     ----------------------------------------------------
    |    DNS     |    UDP     |     IP     |     ETH     |
     ----------------------------------------------------

---

# UDP
    In kernel/net.c:
```CPP
    struct udp {
        uint16 sport; // source port
        uint16 dport; // destination port
        uint16 ulen;  // length, including udp header, not including IP header
        uint16 sum;   // checksum
    };
```

---

# Network Stack
    Browser DNS -> Sockets -> UDP/TCP -> IP/ARP -> NIC
    After we receive a packet, it will be copied into packet buffer.
    The packet buffer will be passed through Network Stack.
    Nornally, there are some queues (link-list) between different protocal layers.
    buffer interface name: MBUF

---

# Ring buffer
    When NIC receiving a packet, it will generate an interrupt, interrupt handler will place packet into a queue.
    NIC has not enough memory to store packets so we have to copy packets to Computer's memory.

    NIC -> WTR -> IP Thread -> UDP -> IP Thread -> NTR -> NIC

---

# E1000 NIC
    1. When receiving a packet, NIC will copy it to host's memory.
    2. The packet in the memory will wait until driver read it.
    3. Here, NIC should know where should the packet be copied.
        1. DMA ring in the host is aiming to store the pointer of the packet. DMA ring is an array, each element is a pointer points to Packet
        2. When host initializing NIC, it will allocate certain length of the packet buffer and an array contains 16 pointers
        3. It is a ring because when the last pointer is used, next it will use the first buffer
    4. Also, NIC knows where should the packet be sent, there is a TX ring


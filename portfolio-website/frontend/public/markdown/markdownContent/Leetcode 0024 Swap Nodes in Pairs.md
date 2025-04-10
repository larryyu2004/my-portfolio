# Problem: Leetcode 24. Swap Nodes in Pairs

### Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

---

# THINKING

## 1. FIRST OF ALL, whether we should create a dummy node?
N1(Head) -> N2 -> N3 -> N4 -> N5 -> ......

Think about is, we need to swap two nodes, right? **Head** has pointed to N1, N1 then swaps with N2. Now, you want to start from N2, but **Head** still point to N1, it makes us feel confused. It is not as good as creating a dummy node. How to use it? When we return, set a pointer **ans** , **ans** is the next node of dummy, delete dummy, return **ans**.

## 2. What nodes do we need?
### N2 -> N1(previous) -  N4 -> N3 -  N5 ->......
2.1 **previous** , after we have swaped nodes in pairs. How we connect them with previous one? So we should set **previous**.

### N1(node1) -> N2(node2) -> N3 -> N4 -> N5 -> ......
2.2 **node1** , **node2** , these two nodes are used to store what we want to swap. 

### N1(node1) -> N2(node2) -> N3(next) -> N4 -> N5 -> ......
2.3 **next** , **next** is for the start of the next group that we want to swap. Why we need **next** ? If we don't, how can we get the next node1(After swapping, the address of **node1** and **node2** are swapped, why not store the start of the next group advanced?)

## 3. Initialize
    1. What if there is no node? We need to deal it first.
    2. At the begining of executing, we do not use previous , so previous can be initialised to dummy node.
    3. Set node1 to head.
    4. Set node2 later, becuase we need to judge whether it can be swapped with rest amount(s) of nodes(use node1 to judge).
    5. setnext to the next node of node1 before swapped.

---

# PROCESS
## 1. About dummy node:
```CPP
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if(head == nullptr || head -> next == nullptr) return head;
        ListNode* dummy = new ListNode(0);

        /*
        ......
        */

        ListNode* ans = dummy -> next;
        delete dummy;
        return ans;
    }
};
```
## 2. Initialize:
```CPP
        //0(pre)- 1->2->3...
        ListNode* previous = dummy;

        //0(pre)- 1(node1)->2->3...
        ListNode* node1 = head;

        while(node1 != nullptr && node1 -> next != nullptr){

            //0(pre)- 1(node1)->2(node2)- 3(next)...
            ListNode* node2 = node1 -> next;
            ListNode* next = node2 -> next;
            node2 -> next = nullptr;

            /*
            ......
            */

        }
```
## 3. Swapping
```CPP
while(node1 != nullptr && node1 -> next != nullptr){

            /*
            ......
            */

            //0(pre)- 2(node2)->1(node1)- 3(next)...
            node1 -> next = node2 -> next;
            node2 -> next = node1;

            //0(pre)->2(node2)->1(node1)- 3(next)...
            previous -> next = node2;
            previous = node1;
            node1 = next;
        }
```
## 4. Deal with odd amount(s) of the listnode
```CPP
        if(node1 != nullptr) previous -> next = node1;
```

---

# COMPLEXITY
Time Complexity: **O(n)**

Space Complexity: **O(1)**

---

# CODE
```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if(head == nullptr || head -> next == nullptr) return head;
        ListNode* dummy = new ListNode(0);

        //0(pre)- 1->2->3...
        ListNode* previous = dummy;

        //0(pre)- 1(node1)->2->3...
        ListNode* node1 = head;

        while(node1 != nullptr && node1 -> next != nullptr){

            //0(pre)- 1(node1)->2(node2)- 3(next)...
            ListNode* node2 = node1 -> next;
            ListNode* next = node2 -> next;
            node2 -> next = nullptr;

            //0(pre)- 2(node2)->1(node1)- 3(next)...
            node1 -> next = node2 -> next;
            node2 -> next = node1;
            
            //0(pre)->2(node2)->1(node1)- 3(next)...
            previous -> next = node2;
            previous = node1;
            node1 = next;
        }
        //deal with odd amount(s) of the listnode
        if(node1 != nullptr) previous -> next = node1;
        ListNode* ans = dummy -> next;
        delete dummy;
        return ans;
    }
};
```






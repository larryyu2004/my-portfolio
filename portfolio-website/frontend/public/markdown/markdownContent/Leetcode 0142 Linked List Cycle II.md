# Problem: Leetcode 142 Linked List Cycle II

### Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. 
### There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.
### Do not modify the linked list.
---
# THINKING
It seems that the question is really easy, right? Unfortunately, it is hard to test whether the node is in the endless loop. How to solve that, we can set an anchor, the function of the anchor is to check whether we are in the endless loop.

And there is an another small question, once we have known the node is in the endless loop, how can we find the start of the endless loop? These two questions above is the keys of the question. Now, hold on, think for a while, and then, come back to see.



How to test the node is in endless loop? Think about this, there is a circle, father and son. father always walks faster than son. In the end, father will catch up with his son, right? In this question, we can set a node **fast** and a node **anchor** , **fast** always moves forward two steps, and anchor always moves forward one step. If there is a circle exists in the ListNode, **fast** will definately catch up with the **anchor** . What if there is not a circle exists in the ListNode: we need to test the node of **fast** and the next node of the **fast** (Because fast always moves forward, you do not want the father fall off a cliffe, right? So always see further). And you may confuse why I let the son be **anchor** not the **slow** . Well, see further, I will tell you soon.

After the **fast** has caught up with the **anchor**, now the function of the anchor is more like a real anchor. What is the anchor? Anchor something that can make a moving boat stops or a kind of basis that something has to follow. Now we set a node **slow** starts from the start of the Listnode to find the start of the loop. How to move the **slow** ? or, how we know **fast** has experienced a whole loop? Now, **anchor** works. **anchor** now stop at the node, **fast** keeps on moving but step by step. Once **fast == anchor** , it indicates that **fast** has experienced a loop, but still did not find the **slow** , **slow** then moves forward until **slow == fast**.

---

# PROCESS
Step1:
```CPP []
        if(head == nullptr || head -> next == nullptr) return nullptr;
```
Step2:
```CPP []
        ListNode* slow = head;
        ListNode* fast = slow -> next;
        ListNode* anchor = slow;

```
Initialise **slow**, **fast**, **anchor**
Small detail: **anchor** must be initialised to **slow** not **slow -> next** or **slow -> next -> next**.
#if **slow -> next** , now **anchor == fast**, even **anchor** and **fast** is not in circle, it will quit.
#if **slow -> next -> next** , when **anchor** moves forward one step and **fast** moves forward two steps, It will lead to **anchor ==fast** , even **anchor** and **fast** is not in circle, it will quit.

Step3:
```CPP []
        while(fast != anchor && fast != nullptr && fast -> next != nullptr){
            fast = fast -> next -> next;
            anchor = anchor -> next;
        }
```
**fast** now is catching with **anchor**
Pay attention for a ListNode without circle

Step4:
```CPP []
        if(fast == nullptr || fast -> next == nullptr) return nullptr;
```
When we quit the while loop last one, it has two cases, one is **fast == anchor** and this is what we want. Another is **fast == nullptr || fast -> next == nullptr** , that means the ListNode without circle.

Step5:
```CPP []
        fast = fast -> next;
```
Small detail: Why we need this? Just continue reading.

Step6:
```CPP []
        while(slow != fast){
            if(fast == anchor){
                slow = slow -> next;
            }
            if(fast == slow) return slow;
            fast = fast -> next;
        }
        return slow;
```
if we do not **fast = fast -> next;** It will be always **fast == anchor** , **slow** will move forward one step first which indicates that **anchor** doesn't work at first, so we need **fast = fast -> next** , just to make sure **fast != anchor** and let anchor works.
Once fast finished one circle. slow move forward one step unitl they meet.

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
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if(head == nullptr || head -> next == nullptr) return nullptr;
        ListNode* slow = head;
        ListNode* fast = slow -> next;
        ListNode* anchor = slow;
        while(fast != anchor && fast != nullptr && fast -> next != nullptr){
            fast = fast -> next -> next;
            anchor = anchor -> next;
        }
        if(fast == nullptr || fast -> next == nullptr) return nullptr;
        fast = fast -> next;
        while(slow != fast){
            if(fast == anchor){
                slow = slow -> next;
            }
            if(fast == slow) return slow;
            fast = fast -> next;
        }
        return slow;
    }
};
```
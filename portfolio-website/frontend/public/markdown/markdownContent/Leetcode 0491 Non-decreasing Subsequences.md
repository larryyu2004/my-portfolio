# Problem: Leetcode 491 Non-decreasing Subsequences

### Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.

# Before Start
NO.491 Non-decreasing Subsequences is a really good questions to review how to do traceback questions. I believe after you solve this question, you will have a good command of some basic operations about dynamic array and unordered_set.

---

# Pre-Knowledges

### unordered_set
**unordered_set** will generate a set that can avoid duplication. For example, If you insert two same elements in the set, once if you want to print all the elements of set, it will only print once.

### .begin()
**.begin()** return the first element in the array.

### .back()
**.back()** return the last element in the array.

### .end()
**.end()** return an iterator that is at the next place of last element. You can easily understand it as a pointer (Not a real pointer) that points to null.

Tips: When we want to use hashtable, we usually use hashtable.find(num) == hashtable.end(). Here, if hashtable find nums in it, it will return an exact index. If not, it will point to the next place of last element. This can also be used in array **(array.find(num) == array.end())** and unordered_set **(set.find(num) == set.end())**.

---

# Process
## Define public arguments
```CPP []
    vector<int> nums_g;
    vector<int> path;
    vector<vector<int>> res;
```
**nums_g**: **nums** to public.

**path**: store a path, push into **res** in the end.

**res**: return result.

## Assign public arguments

```CPP []
    vector<int> nums_g;
    vector<int> path;
    vector<vector<int>> res;
```
Assign **nums** to **nums_g**.

Call function **traceback()**.

After function **traceback()**, return **res**.

## In the function
```CPP []
    void traceback(int startIndex){
        if(static_cast<int>(path.size()) >= 2){
            res.emplace_back(path);
        }
        unordered_set<int> uset;
        for(int i = startIndex; i < static_cast<int>(nums_g.size()); i++){
            if((!path.empty() && nums_g[i] < path.back()) || uset.find(nums_g[i]) != uset.end()){
                continue;
            }
            uset.insert(nums_g[i]);
            path.emplace_back(nums_g[i]);
            traceback(i+1);
            path.pop_back();
        }
    }
```

Void type function, because we always do change in the public arguments. Use **startIndex**, because in each traceback, **nums** should be started at different index.

Return at least two elements, so in each **path**, **static_cast<int>(path.size())** should ≥ 2. As long as **path.size() >= 2**, push into res.

Use **uset**, **uset** is an unordered_set, aim to avoid duplication (Tips, if **nums_g = {1,2,2}**, without unordered_set, it will return double {1,2}, so we need to avoid duplication).

In the for loop, when **path** is not empty and **nums_g[i]**'s value (What we are traversing) is smaller than the last element of path or duplication happens **(uset.find(nums_g[i] != uset.end())**, skip this round.

Insert **nums_g[i]** into **uset**, avoid next same path comes out.

Push **nums[i]** into path.

Call **traceback()** function, **startIndex** is updated to i+1.

After **traceback()** function, pop last element that we just push in.

---
# Complexity

Time Complexity: O(n*2^n)

Space Complexity: O(n)

---
# Code
```C++ []
using namespace std;
class Solution {
public:
    vector<int> nums_g;
    vector<int> path;
    vector<vector<int>> res;
    
    void traceback(int startIndex){
        if(static_cast<int>(path.size()) >= 2){
            res.emplace_back(path);
        }
        unordered_set<int> uset;
        for(int i = startIndex; i < static_cast<int>(nums_g.size()); i++){
            if((!path.empty() && nums_g[i] < path.back()) || uset.find(nums_g[i]) != uset.end()){
                continue;
            }
            uset.insert(nums_g[i]);
            path.emplace_back(nums_g[i]);
            traceback(i+1);
            path.pop_back();
        }
    }
    
    vector<vector<int>> findSubsequences(vector<int>& nums) {
        nums_g = nums;
        traceback(0);
        return res;
    }
};
```

---
# Optimise Version
We can avoid to use **unordered_set**. Set an array that have 201 elements (Beacuse **-100 <= nums[i] <= 100** in the question). nums[i] == 0 will be index 100 in **uset**.


---
# Code (Optimised)
```cpp []
class Solution {
public:
    vector<int> nums_g;
    vector<int> path;
    vector<vector<int>> res;
    
    void traceback(int startIndex){
        if(static_cast<int>(path.size()) >= 2){
            res.emplace_back(path);
        }
        int uset[201] = {0};
        for(int i = startIndex; i < static_cast<int>(nums_g.size()); i++){
            if((!path.empty() && nums_g[i] < path.back()) || uset[nums_g[i]+100] == 1){
                continue;
            }
            uset[nums_g[i] + 100] = 1;
            path.emplace_back(nums_g[i]);
            traceback(i+1);
            path.pop_back();
        }
    }
    
    vector<vector<int>> findSubsequences(vector<int>& nums) {
        nums_g = nums;
        traceback(0);
        return res;
    }
};
```


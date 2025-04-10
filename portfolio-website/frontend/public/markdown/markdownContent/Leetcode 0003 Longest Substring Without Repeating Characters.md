# Problem: Leetcode 3. Longest Substring Without Repeating Characters

### Given a string s, find the length of the longest substring without duplicate characters.

---

# Thinking

### FIRST OF ALL, what happens when it comes to duplicate characters?
    1. We will find the length of the longest substring without duplicate characters. 
    So when it comes to duplicate characters, we should remove the same character that already exists.
### How to record the occurrence of each character
    2. We need to use unordered_map to store and update the occurrences for each character.
    3. When traversing the array, we should record the occurrences of each character.
### How to operate the unordered_map
    4. When the occurrence of certain character is 2, move the left side of the slide window,
    and minus occurrence of left side of the characters until the occurrence of right side character == 1

---

# PROCESS
### Initialization
    1. Initialize the length of the character list;
    2. Define the res;
```C++
        int sSize = static_cast<int>(s.size());
        int res = 0;
```
    3.0 Define the unordered_map<char, int>
    3.1 char -> record the character
    3.2 int -> record the time of occurrence for each character.
    4. Define the left size of the slide window
```C++
        std::unordered_map<char, int> cnt;
        int left = 0;
```

### Window Sliding
    1. Use a for loop to traversal right side
```C++
for(int right = 0; right < sSize; right++) {
    ```
}
```
    2. Increase the time of occurrence of the character on the right side
```C++
            char c = s[right];
            cnt[c] ++;
```
    3. Check when the time of occurrence of the character on the right side == 2
    4.0 Move the left side and decrement the time of occurrence of the character on the left side
    4.1 Decrease the time until the time of occurrence of the character on the right side back to 1
```C++
            while(cnt[s[right]] > 1) {
                cnt[s[left]] --;
                left ++;
            }
```
    5. Record the max of the window side 
```C++
res = std::max(res, right - left + 1);
```
### Return
```C++
        return res;
```

---

# COMPLEXITY
Time Complexity: **O(n)**

Space Complexity: **O(1)**

---

# CODE
```C++
class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        int sSize = static_cast<int>(s.size());
        int res = 0;

        std::unordered_map<char, int> cnt;
        int left = 0;
        for(int right = 0; right < sSize; right++) {
            char c = s[right];
            cnt[c] ++;
            while(cnt[s[right]] > 1) {
                cnt[s[left]] --;
                left ++;
            }
            res = std::max(res, right - left + 1);
        }
        return res;
    }
};
```
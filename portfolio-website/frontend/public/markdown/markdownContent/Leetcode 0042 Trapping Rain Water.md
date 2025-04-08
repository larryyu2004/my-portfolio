# Problem: Leetcode 42. Trapping Rain Water

### Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

---

# Approach 1: Presuffix Decomposition

### 1. This is the easiest approach. We can use a prefix array and a suffix array to calculate the amount of water that can be trapped but it is hard to come up with it.

### 2. Imaging a cuboid rock and there are a lot indentations on that, and wind from opposite directon blow it. It is not hard to find the place that the wind can not pass by is the indentation that can store water.

1. **leftMax** and **rightMax** are to store the max height from left and right -> So we need two for loop from left and from right.

```CPP []
        int heightSize = static_cast<int> (height.size());
        int res = 0;
        vector<int> leftMax(heightSize);
        vector<int> rightMax(heightSize);
        
        int leftM = 0;
        for(int i = 0; i < heightSize; i++) {
            leftM = max(leftM, height[i]);
            leftMax[i] = leftM;
        }
        
        int rightM = 0;
        for(int i = heightSize-1; i >= 0; i--) {
            rightM = max(rightM, height[i]);
            rightMax[i] = rightM;
        }
```

2. After that, we should get the shape of the rock with water in it -> So that when each height of index in the array minus the original shape of the rock, we will get the res.
```CPP []
        for(int i = 0; i < heightSize; i++) {
            res += min(leftMax[i], rightMax[i]) - height[i];
        }
```

## Complexity
Time Complexity: **O(n)**

Space Complexity: **O(1)**

## Code

```CPP []
class Solution {
public:
    int trap(vector<int>& height) {
        int heightSize = static_cast<int> (height.size());
        int res = 0;
        vector<int> leftMax(heightSize);
        vector<int> rightMax(heightSize);
        
        int leftM = 0;
        for(int i = 0; i < heightSize; i++) {
            leftM = max(leftM, height[i]);
            leftMax[i] = leftM;
        }
        
        int rightM = 0;
        for(int i = heightSize-1; i >= 0; i--) {
            rightM = max(rightM, height[i]);
            rightMax[i] = rightM;
        }
        
        
        for(int i = 0; i < heightSize; i++) {
            res += min(leftMax[i], rightMax[i]) - height[i];
        }
        
        return res;
    }
};
```
---

# Approach 2: Monotonic Stack

### 1. When we walk on the steep road in the rainy day, if we find the road becomes lower and lower, we will not think it can store water. Only if the road suddenly goes up, we will know there is an indentation that can store water.

### 2. We can use Monotonic Stack to handle this situation.

### 3. We can define a monotone decrement stack -> which store monotone decrement element. Once there is a new element is pushed into the stack and it is larger than the top of the stack, we should continue to pop the top of the stack until the top of the stack is larger than the new element (decrement).

### 4. Example: 

### 4.1 original stack: [5, 4, 3, 1, 0 (top)]; 
### 4.2 new element: 2; 
### 4.3 pop 0 but 2 > 1;
### 4.4 pop 1 and now 3 > 2 (decrement);
### 4.5 push 2 into the stack;
### 4.6 latest stack: [5, 4, 3, 2 (top)];

# Processes
    0. Assume Height = [1,0,2], and a Monotonic stack st
```CPP []
    int trap(vector<int>& height) {
        int res = 0;
        stack<int> st;
        ...
    }
```

    1. Push 1 (index = 0) into the stack (st = [1])
```CPP []
        st.push(0);
```

    2. 1 > 0 (index = 1), so push 0 into the stack (st = [1,0])
```CPP []
        for(int index = 1; index < height.size(); index++){
            while(!st.empty() && height[index] > height[st.top()]){
                ...
            }
            st.push(index);
        }

    3. 0 < 2 (index = 2), pop 0 and record mid = st.top() -> 0 (st = [1])
```CPP []
        for(int index = 1; index < height.size(); index++){
            while(!st.empty() && height[index] > height[st.top()]){
                int mid = st.top();
                st.pop();
                ...
            }
            st.push(index);
        }
```
    4. Now st is not empty, H = min(height[st.top()], height[index]) - st[mid] -> (min(leftHeight, rightHeight) - midHight), w = index - st.top() - 1
```CPP []
                if(!st.empty()){
                    int h = min(height[st.top()], height[index]) - height[mid];
                    int w = index - st.top() - 1;
                    ...
                }
```
    5. res += w * H
```CPP []
                if(!st.empty()){
                    ...
                    res += h*w;
                }
```

## Complexity
Time Complexity: **O(n)**

Space Complexity: **O(n)**

## Code

```CPP []
class Solution {
public:
    int trap(vector<int>& height) {
        int res = 0;
        stack<int> st;
        st.push(0);
        for(int index = 1; index < height.size(); index++){
            while(!st.empty() && height[index] > height[st.top()]){
                int mid = st.top();
                st.pop();
                if(!st.empty()){
                    int h = min(height[st.top()], height[index]) - height[mid];
                    int w = index - st.top() - 1;
                    res += h*w;
                }
            }
            st.push(index);
        }
        return res;
    }
};
```

---

# Approach 3: Two pointers

### We can use left and right to solve this problem. When we find a higher bar on the right then the water we can store will based on the height of left and vice versa.

## Processes
    0. Assume height = [1 (l), 2, 0, 4, 1, 3 (r)]; leftMax = 0 and rightMax = 0;
```CPP []
    int trap(vector<int>& height) {
        int heightSize = static_cast<int> (height.size());
        int res = 0;
        int l = 0;
        int r = heightSize - 1;
        
        int leftMax = 0;
        int rightMax = 0;
    }
```

    1. Update leftMax = 1 and rightMax = 3;
```CPP []
        while(l < r) {
            leftMax = max(leftMax, height[l]);
            rightMax = max(rightMax, height[r]);
            ...
        }
```

    2. Now height[l] < height[r], leftMax - height[l] = 1 - 1 = 0; l++;
``` CPP []
            if(height[l] < height[r]) {
                res += leftMax - height[l];
                l++;
            }
```

    3. height = [1, 2 (l), 0, 4, 1, 3 (r)], Update leftMax = 2 and rightMax = 3;
    4. Now height[l] < height[r], leftMax - height[l] = 2 - 2 = 0; l++;
    5. height = [1, 2, 0 (l), 4, 1, 3 (r)], Update leftMax = 2 and rightMax = 3;
    6. Now height[l] < height[r], leftMax - height[l] = 3 - 0 = 3; l++;
    7. height = [1, 2, 0, 4 (l), 1, 3 (r)], Update leftMax = 4 and rightMax = 3;
    8. Now height[l] > height[r], rightMax - height[r] = 3 - 0 = 3; r--;
```CPP []
            else {
                res += rightMax - height[r];
                r--;
            }
```

    9. height = [1, 2, 0, 4 (l), 1 (r), 3], Update leftMax = 4 and rightMax = 3;
    10. Now height[l] > height[r], rightMax - height[r] = 3 - 1 = 2; r--;
    11. Now l == r, quit the while loop;

## Complexity
Time Complexity: **O(n)**

Space Complexity: **O(1)**

## Code 
```CPP []
class Solution {
public:
    int trap(vector<int>& height) {
        int heightSize = static_cast<int> (height.size());
        int res = 0;
        int l = 0;
        int r = heightSize - 1;
        
        int leftMax = 0;
        int rightMax = 0;
        while(l < r) {
            leftMax = max(leftMax, height[l]);
            rightMax = max(rightMax, height[r]);
            
            if(height[l] < height[r]) {
                res += leftMax - height[l];
                l++;
            } else {
                res += rightMax - height[r];
                r--;
            }
        }
        return res;
    }
};
```

---










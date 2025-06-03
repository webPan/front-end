# 算法

## 大O表示法

在算法分析中，常见的时间复杂度（大O表示法）从高到低（即效率从高到低）排序如下：

1. **O(1)** 常数级（如哈希表直接访问、数组下标访问）
2. **O(log n)** 对数级（如二分查找、平衡二叉树查找）
3. **O(n)** 线性级（如一次遍历、哈希表查找、简单查找、计数排序）
4. **O(n log n)** 线性对数级（如归并排序、快速排序、堆排序、部分分治算法）
5. **O(n²)** 平方级（如冒泡排序、选择排序、插入排序、两层嵌套循环）
6. **O(n³)** 立方级（如三重循环暴力解）
7. **O(2ⁿ)** 指数级（如斐波那契递归、子集枚举）
8. **O(n!)** 阶乘级（如全排列、旅行商问题暴力解）

::: details 总结表

| 时间复杂度   | 典型算法/场景                | 效率排序（高→低） |
|--------------|------------------------------|-------------------|
| O(1)         | 哈希表查找、数组下标访问      | 最高              |
| O(log n)     | 二分查找、平衡树查找          |                   |
| O(n)         | 一次遍历、哈希表插入/查找     |                   |
| O(n log n)   | 快速排序、归并排序、堆排序    |                   |
| O(n²)        | 冒泡/选择/插入排序、两层循环  |                   |
| O(n³)        | 三层嵌套循环                  |                   |
| O(2ⁿ)        | 递归枚举、子集、斐波那契递归  |                   |
| O(n!)        | 全排列、暴力解旅行商问题      | 最低              |

**注意：**  

- O(1)效率最高，O(n!)效率最低。
- 实际应用中，尽量选择时间复杂度低的算法，尤其是数据量大时。

:::

## 冒泡排序

- 重复地遍历要排序的数组
- 每次比较相邻的两个元素，如果它们的顺序错误就把它们交换过来
- 就像气泡一样，每次遍历都会把最大的元素"浮"到数组的末尾，因此得名冒泡排序

::: details 示例代码

```javascript
function bubbleSort(arr) {
    // i是j需要遍历的次数
    // 每一轮会将最大的数冒泡到最后
    // 所以下一轮就不需要再比较已经排好序的部分
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

:::

## 二分查找

- 不断将搜索区间缩小一半来查找目标元素

::: details 示例代码

```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

// 示例使用
let sortedArray = [1, 3, 5, 7, 9, 11];
let targetElement = 7;
let result = binarySearch(sortedArray, targetElement);
console.log(result);
```

:::

## 实现数组去重

### 核心答案

可以使用 `Set` 结构或 `filter + indexOf` 方法实现数组去重，`Set` 是最简洁高效的方式。

### 原理讲解

- `Set` 是 ES6 新增的数据结构，能自动去除重复值。将数组转为 `Set` 后再转回数组即可实现去重，时间复杂度为 O(n)。
- 传统方法如 `filter + indexOf`，通过判断元素首次出现的位置是否等于当前索引来去重，适用于不支持 ES6 的环境，但效率略低。
- 还可以用对象（哈希表）记录出现过的元素，适合处理基本类型。

::: details 示例代码

```js
// 方法一：使用 Set（推荐，简洁高效）
function uniqueWithSet(arr) {
  // 利用 Set 的唯一性特性去重
  return [...new Set(arr)];
}

// 方法二：使用 filter + indexOf
function uniqueWithFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 方法三：使用哈希表
function uniqueWithObject(arr) {
  const seen = {};
  return arr.filter(item => {
    if (seen[item]) {
      return false;
    }
    seen[item] = true;
    return true;
  });
}

// 测试用例
const arr = [1, 2, 2, 3, 4, 4, 5, 1, 6];
console.log(uniqueWithSet(arr));      // [1, 2, 3, 4, 5, 6]
console.log(uniqueWithFilter(arr));   // [1, 2, 3, 4, 5, 6]
console.log(uniqueWithObject(arr));   // [1, 2, 3, 4, 5, 6]
```

:::

## 实现深拷贝和浅拷贝

### 核心答案

浅拷贝可以用 `Object.assign` 或扩展运算符，深拷贝常用递归或 `JSON.parse(JSON.stringify(obj))`，但后者有局限。

### 原理讲解

- **浅拷贝**：只复制一层属性，嵌套对象仍然是引用关系。常用 `Object.assign({}, obj)` 或 `{...obj}`。
- **深拷贝**：递归复制所有层级，互不影响。`JSON.parse(JSON.stringify(obj))` 适合简单对象，但不能处理函数、`undefined`、循环引用等。
- 更通用的深拷贝需手写递归，判断类型并分别处理数组、对象、基本类型。

::: details 示例代码

```js
// 浅拷贝
function shallowClone(obj) {
  return {...obj};
}

// 深拷贝（递归实现，支持数组和对象）
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj); // 处理循环引用
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}

// 测试用例
const source = {a: 1, b: {c: 2}, d: [3, 4]};
const shallow = shallowClone(source);
const deep = deepClone(source);
source.b.c = 99;
console.log(shallow.b.c); // 99，浅拷贝引用同一个对象
console.log(deep.b.c);    // 2，深拷贝互不影响
```

:::

## 实现防抖和节流函数

### 核心答案

防抖（debounce）让事件在停止触发一段时间后才执行，节流（throttle）让事件在规定时间内只执行一次。

### 原理讲解

- **防抖**：每次触发事件时都清除上一次的定时器，只有最后一次触发后等待指定时间才执行。适合输入框实时搜索等场景。
- **节流**：规定时间内只执行一次，可以用时间戳或定时器实现。适合滚动、窗口缩放等高频事件。

::: details 示例代码

```js
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime > interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 示例：防抖和节流在输入和滚动事件中的应用
window.addEventListener('resize', debounce(() => {
  console.log('窗口大小变化（防抖）');
}, 500));

window.addEventListener('scroll', throttle(() => {
  console.log('页面滚动（节流）');
}, 200));
```

:::

## 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

### 深度优先搜索（DFS）+ 回溯算法

::: details 示例代码

```javascript
// 深度优先搜索（DFS）+ 回溯算法
const findPath = (arr, value, paths) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        paths.push(item.id)

        if (item.id === value) {
            return paths // 找到目标值，返回当前路径
        }

        if (item.children?.length) {
            const result = findPath(item.children, value, paths)
            if (result) {
                return result // 在子节点中找到路径，继续向上返回
            }
            paths.pop() // 该分支未找到，回溯
        } else {
            paths.pop() // 叶子节点未找到，回溯
        }
    }

    return null // 当前分支未找到，返回 null
}
```

:::

## 实现广度优先遍历和深度优先遍历

### 核心答案

广度优先遍历（BFS）用队列，深度优先遍历（DFS）用递归或栈。

### 原理讲解

- **BFS**：每次取出队首节点，访问其所有子节点并加入队列，适合层序遍历。
- **DFS**：递归或用栈，先访问一个分支到底再回溯，适合路径搜索。

::: details 深度优先遍历

```javascript
// 递归 1
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
}

// 递归 2
let deepTraversal2 = (node) => {
    let nodes = []
    if (node !== null) {
      nodes.push(node)
      let children = node.children
      for (let i = 0; i < children.length; i++) {
        nodes = nodes.concat(deepTraversal2(children[i]))
      }
    }
    return nodes
  }

// 非递归
let deepTraversal3 = (node) => {
  let stack = []
  let nodes = []
  if (node) {
    // 推入当前处理的node
    stack.push(node)
    while (stack.length) {
      let item = stack.pop()
      let children = item.children
      nodes.push(item)
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
```

:::

::: details 广度优先遍历

```javascript
let widthTraversal2 = (node) => {
  let nodes = []
  let stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      let children = item.children
      nodes.push(item)
        // 队列，先进先出
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
```

:::

## 实现扁平数组转树形结构

### 核心答案

通过遍历数组，利用对象映射关系，将每个节点挂载到其父节点的 `children` 属性下，最终返回根节点数组。

### 原理讲解

- 先遍历数组，将每个节点的 id 映射到节点对象，方便后续查找。
- 再次遍历数组，根据每个节点的 `parentId`，将其添加到父节点的 `children` 数组中。
- 没有父节点（`parentId` 为 null 或 0）的节点即为根节点。

::: details 示例代码

### 哈希表映射方式

这是一个**扁平数组转树形结构**的算法，核心原理如下：

1. **哈希表映射**

   ```javascript
   const map = list.reduce((res, v) => (res[v.id] = v, res), {})
   ```

- 用 map 存储 id 到节点的映射关系
- 便于快速查找父节点

2. **构建树形结构**
    - 遍历原数组，处理两种情况：
        1. `parentId === 0`：作为根节点直接放入结果数组
        2. 其他节点：找到父节点，添加为其子节点

```js
function arrayToTree(items) {
  const map = {};
  const result = [];
  // 先建立 id 到节点的映射
  items.forEach(item => {
    map[item.id] = {...item, children: []};
  });
  // 再组装树结构
  items.forEach(item => {
    const node = map[item.id];
    if (item.parentId) {
      // 有父节点，挂到父节点的 children 下
      map[item.parentId].children.push(node);
    } else {
      // 没有父节点，作为根节点
      result.push(node);
    }
  });
  return result;
}

// 测试用例
const arr = [
  {id: 1, name: 'A', parentId: null},
  {id: 2, name: 'B', parentId: 1},
  {id: 3, name: 'C', parentId: 1},
  {id: 4, name: 'D', parentId: 2}
];
console.log(JSON.stringify(arrayToTree(arr), null, 2));
```

### 外层过滤，内层过滤

```javascript
function convertFilter(array) {
    let reslutArray = array.filter((item) => {
        let children = array.filter((child) => {
            return item.id === child.parentId
        })
        item.children = children
        return item.parentId === 0
    })
    return reslutArray
}
```

### 递归查找

- 通过递归方式，自顶向下逐层构建树形结构，每一层都查找当前节点的所有子节点。

```javascript
function convert(source, parentId = 0) {
    let trees = [];
    for (let item of source) {
        if (item.parentId === parentId) {
            let children = convert(source, item['id']);
            if (children.length) {
                item.children = children
            }
            trees.push(item);
        }
    }
    return trees;
}
```

:::

## 实现树形结构转扁平数组

### 核心答案

通过递归或迭代遍历树，将每个节点展开为数组元素，并可记录其父节点信息。

### 原理讲解

- 递归遍历每个节点，将节点自身加入结果数组。
- 如果有 `children`，递归处理 `children` 并合并结果。
- 可选地为每个节点添加 `parentId` 字段，便于还原树结构。

::: details 示例代码

```js
function treeToArray(tree, parentId = null) {
  let result = [];
  tree.forEach(node => {
    const {children, ...rest} = node;
    result.push({...rest, parentId});
    if (children && children.length) {
      result = result.concat(treeToArray(children, node.id));
    }
  });
  return result;
}

// 测试用例
const tree = [
  {
    id: 1, name: 'A', children: [
      {id: 2, name: 'B', children: [
        {id: 4, name: 'D', children: []}
      ]},
      {id: 3, name: 'C', children: []}
    ]
  }
];
console.log(treeToArray(tree));
```

:::

## 找出数组中出现次数最多的元素

### 核心答案

使用哈希表统计每个元素出现的次数，遍历哈希表找到出现次数最多的元素。

### 原理讲解

- 遍历数组，用对象（哈希表）记录每个元素出现的次数。
- 再遍历哈希表，找出最大值对应的元素。
- 时间复杂度 O(n)，空间复杂度 O(n)。

::: details 示例代码

```js
function findMostFrequent(arr) {
  const map = {};
  let maxCount = 0, maxElement = null;
  for (let num of arr) {
    map[num] = (map[num] || 0) + 1;
    if (map[num] > maxCount) {
      maxCount = map[num];
      maxElement = num;
    }
  }
  return maxElement;
}

// 测试用例
console.log(findMostFrequent([1,2,2,3,3,3,4])); // 3
```

:::

## 实现斐波那契数列（递归与非递归）

### 核心答案

递归法直接调用自身，非递归法用循环迭代，推荐非递归避免重复计算。

### 原理讲解

- 递归法：fib(n) = fib(n-1) + fib(n-2)，但有大量重复计算，效率低。
- 非递归法：用变量保存前两项，迭代计算，效率高。
- 也可用记忆化递归优化。

::: details 示例代码

```js
// 递归
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 非递归
function fibIterative(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

// 测试用例
console.log(fibRecursive(6)); // 8
console.log(fibIterative(6)); // 8
```

:::

## 实现冒泡、选择、插入、快速排序

### 核心答案

冒泡排序两两比较相邻元素，选择排序每次选最小，插入排序将元素插入已排序区间，快速排序分治递归。

### 原理讲解

- **冒泡排序**：每轮将最大元素“冒泡”到末尾，O(n²)。
- **选择排序**：每轮选择最小元素放到前面，O(n²)。
- **插入排序**：每次将当前元素插入到前面已排序区间，O(n²)。
- **快速排序**：选基准值分区递归，平均 O(n log n)。

::: details 示例代码

```js
// 冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return arr;
}

// 选择排序
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

// 插入排序
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 测试用例
console.log(bubbleSort([3,2,1]));      // [1,2,3]
console.log(selectionSort([3,2,1]));   // [1,2,3]
console.log(insertionSort([3,2,1]));   // [1,2,3]
console.log(quickSort([3,2,1]));       // [1,2,3]
```

:::

## 实现链表的反转

### 核心答案

通过遍历链表，依次将当前节点的 `next` 指向前一个节点，最终返回新的头节点。

### 原理讲解

- 需要三个指针：`prev`（前一个节点）、`curr`（当前节点）、`next`（下一个节点）。
- 每次循环将 `curr.next` 指向 `prev`，然后三个指针整体向后移动，直到遍历完链表。

::: details 示例代码

```js
// 定义链表节点
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 反转链表
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let next = curr.next; // 保存下一个节点
    curr.next = prev;     // 当前节点指向前一个节点
    prev = curr;          // prev 向后移动
    curr = next;          // curr 向后移动
  }
  return prev; // 新的头节点
}

// 构建链表 1->2->3->null
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

// 反转后 3->2->1->null
let newHead = reverseList(head);
while (newHead) {
  console.log(newHead.val); // 3 2 1
  newHead = newHead.next;
}
```

:::

## 实现二叉树的前序、中序、后序遍历（递归与非递归）

### 核心答案

递归遍历直接调用自身，非递归遍历用栈模拟递归过程。

### 原理讲解

- **前序遍历**：根-左-右
- **中序遍历**：左-根-右
- **后序遍历**：左-右-根
- 递归实现简单，非递归用栈保存节点，按遍历顺序处理。

::: details 示例代码

```js
// 二叉树节点定义
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// 递归实现
function preorder(root, res = []) {
  if (!root) return res;
  res.push(root.val);
  preorder(root.left, res);
  preorder(root.right, res);
  return res;
}
function inorder(root, res = []) {
  if (!root) return res;
  inorder(root.left, res);
  res.push(root.val);
  inorder(root.right, res);
  return res;
}
function postorder(root, res = []) {
  if (!root) return res;
  postorder(root.left, res);
  postorder(root.right, res);
  res.push(root.val);
  return res;
}

// 非递归实现（以中序为例）
function inorderIterative(root) {
  const stack = [], res = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    res.push(curr.val);
    curr = curr.right;
  }
  return res;
}

// 构建二叉树
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);

// 测试
console.log(preorder(root));         // [1,2,4,3]
console.log(inorder(root));          // [4,2,1,3]
console.log(postorder(root));        // [4,2,3,1]
console.log(inorderIterative(root)); // [4,2,1,3]
```

:::

## 查找链表的中间节点

### 核心答案

使用快慢指针，快指针每次走两步，慢指针每次走一步，快指针到尾时慢指针即为中间节点。

### 原理讲解

- 快慢指针法能在一次遍历中找到中间节点，时间复杂度 O(n)，空间复杂度 O(1)。
- 如果链表节点数为偶数，通常返回中间两个节点中的第二个。

::: details 示例代码

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function findMiddleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// 构建链表 1->2->3->4->5
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

console.log(findMiddleNode(head).val); // 输出 3
```

:::

## 合并两个有序数组/链表

### 核心答案

双指针遍历两个有序结构，依次比较元素大小，将较小的元素加入结果，直到遍历完毕。

### 原理讲解

- 数组合并时，使用两个指针分别指向两个数组头部，逐步比较并插入新数组。
- 链表合并时，创建虚拟头节点，依次连接较小节点，最后连接剩余部分。

::: details 示例代码

```js
// 合并有序数组
function mergeSortedArrays(a, b) {
  let i = 0, j = 0, res = [];
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      res.push(a[i++]);
    } else {
      res.push(b[j++]);
    }
  }
  return res.concat(a.slice(i)).concat(b.slice(j));
}

// 合并有序链表
function ListNode(val) {
  this.val = val;
  this.next = null;
}
function mergeTwoLists(l1, l2) {
  let dummy = new ListNode(0), curr = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}

// 测试用例
console.log(mergeSortedArrays([1,3,5], [2,4,6])); // [1,2,3,4,5,6]
```

:::

## 判断字符串是否为回文串

### 核心答案

使用双指针从两端向中间比较字符，全部相等则为回文。

### 原理讲解

- 左右指针分别指向字符串首尾，逐步向中间移动并比较字符。
- 可忽略大小写和非字母数字字符（如需更通用）。

::: details 示例代码

```js
function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// 测试用例
console.log(isPalindrome('abba')); // true
console.log(isPalindrome('abcba')); // true
console.log(isPalindrome('abc')); // false
```

:::

## 字符串全排列

### 核心答案

通过回溯算法递归生成所有可能的字符排列，常用交换或标记数组实现。

### 原理讲解

- 回溯法：每次选择一个未使用的字符加入当前排列，递归处理剩余字符，回溯时撤销选择。
- 可用 swap 交换法或 visited 数组标记法，避免重复使用同一字符。
- 若有重复字符，需去重处理。

::: details 示例代码

```js
function permute(str) {
  const res = [];
  const used = Array(str.length).fill(false);
  function backtrack(path) {
    if (path.length === str.length) {
      res.push(path.join(''));
      return;
    }
    for (let i = 0; i < str.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(str[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([]);
  return res;
}

// 测试用例
console.log(permute('abc')); // ['abc','acb','bac','bca','cab','cba']
```

:::

## 实现 LRU 缓存机制

### 核心答案

用哈希表和双向链表结合，哈希表 O(1) 查找，链表维护访问顺序，最近使用的放头部，淘汰尾部。

### 原理讲解

- 哈希表存储 key 到节点的映射，便于 O(1) 查找。
- 双向链表维护节点顺序，最近访问的节点移到头部，超出容量时移除尾部节点。
- get/set 操作都需更新节点顺序。

::: details 示例代码

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    // 先删除再重新插入，保证顺序
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      // 删除最久未使用的（Map 的第一个元素）
      this.map.delete(this.map.keys().next().value);
    }
  }
}

// 测试用例
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1
lru.put(3, 3);           // 淘汰 key=2
console.log(lru.get(2)); // -1
```

:::

## 实现 Promise.all、Promise.race

### 核心答案

`Promise.all` 等待所有 Promise 完成，全部成功才 resolve，有一个失败就 reject；`Promise.race` 只要有一个 Promise 完成（无论成功或失败）就返回。

### 原理讲解

- `Promise.all` 用计数器统计完成数量，全部 resolve 后返回结果数组。
- `Promise.race` 只要有一个 Promise 状态改变（resolve/reject）就返回。

::: details 示例代码

```js
// Promise.all 实现
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const results = [];
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        count++;
        if (count === promises.length) resolve(results);
      }, reject);
    });
  });
}

// Promise.race 实现
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}

// 测试用例
promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1,2]
promiseRace([Promise.resolve(3), new Promise(r => setTimeout(() => r(4), 100))]).then(console.log); // 3
```

:::

## 实现数组的 map、filter、reduce

### 核心答案

遍历数组，map 返回新数组，filter 返回符合条件的新数组，reduce 累加处理返回最终结果。

### 原理讲解

- `map`：对每个元素执行回调，返回新数组。
- `filter`：对每个元素执行回调，返回满足条件的元素组成的新数组。
- `reduce`：累加器模式，依次处理每个元素，返回最终累计值。

::: details 示例代码

```js
Array.prototype.myMap = function(callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this));
  }
  return res;
};

Array.prototype.myFilter = function(callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) res.push(this[i]);
  }
  return res;
};

Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  let i = initialValue !== undefined ? 0 : 1;
  for (; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

// 测试用例
const arr = [1, 2, 3];
console.log(arr.myMap(x => x * 2));      // [2,4,6]
console.log(arr.myFilter(x => x > 1));   // [2,3]
console.log(arr.myReduce((a, b) => a + b, 0)); // 6
```

:::

## 实现大数相加

### 核心答案

将两个大数转为字符串，从低位到高位逐位相加，处理进位，最后反转结果。

### 原理讲解

- 普通数字加法会溢出，需用字符串模拟加法。
- 从末尾开始逐位相加，记录进位，直到两数都处理完。

::: details 示例代码

```js
function addBigNumber(a, b) {
  let i = a.length - 1, j = b.length - 1, carry = 0, res = '';
  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? +a[i--] : 0;
    const y = j >= 0 ? +b[j--] : 0;
    const sum = x + y + carry;
    res = (sum % 10) + res;
    carry = Math.floor(sum / 10);
  }
  return res;
}

// 测试用例
console.log(addBigNumber('123456789123456789', '987654321987654321')); // '1111111111111111110'
```

:::

## 两数之和/三数之和

### 核心答案

两数之和用哈希表记录已遍历的数，三数之和先排序后用双指针。

### 原理讲解

- **两数之和**：遍历数组，判断 target-当前数 是否已在哈希表中，O(n)。
- **三数之和**：排序后，固定一个数，剩下用双指针，跳过重复，O(n²)。

::: details 示例代码

```js
// 两数之和
function twoSum(arr, target) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    if (map[target - arr[i]] !== undefined) {
      return [map[target - arr[i]], i];
    }
    map[arr[i]] = i;
  }
  return [];
}

// 三数之和
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (nums[left] === nums[left + 1]) left++;
        while (nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}

// 测试用例
console.log(twoSum([2,7,11,15], 9)); // [0,1]
console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]
```

:::

## 判断括号字符串是否有效

### 核心答案

用栈依次压入左括号，遇到右括号时弹出栈顶并匹配，全部匹配则有效。

### 原理讲解

- 左括号入栈，右括号时判断栈顶是否为对应左括号。
- 最终栈为空且全部匹配则有效。

::: details 示例代码

```js
function isValidParentheses(s) {
  const stack = [];
  const map = {')': '(', ']': '[', '}': '{'};
  for (let c of s) {
    if (['(', '[', '{'].includes(c)) {
      stack.push(c);
    } else {
      if (stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}

// 测试用例
console.log(isValidParentheses('()[]{}')); // true
console.log(isValidParentheses('([)]'));   // false
```

:::

## 寻找数组中的第 K 大元素

### 核心答案

常用快速选择（Quick Select）算法，平均时间复杂度 O(n)，也可直接排序后取第 K 大。

### 原理讲解

- 快速选择是快速排序的变种，每次划分后判断目标下标，递归只处理一边，平均 O(n)。
- 直接排序法简单但效率低，O(n log n)。
- 也可用最小堆维护 K 个最大元素，适合处理大数据流。

::: details 示例代码

```js
// 快速选择
function findKthLargest(nums, k) {
  function quickSelect(left, right, index) {
    const pivot = nums[right];
    let i = left;
    for (let j = left; j < right; j++) {
      if (nums[j] > pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    if (i === index) return nums[i];
    else if (i < index) return quickSelect(i + 1, right, index);
    else return quickSelect(left, i - 1, index);
  }
  return quickSelect(0, nums.length - 1, k - 1);
}

// 测试用例
console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
```

:::

## 实现 JSON.stringify 和 JSON.parse

### 核心答案

`JSON.stringify` 递归遍历对象/数组，拼接字符串；`JSON.parse` 可用 `eval` 或 `Function`，但需注意安全。

### 原理讲解

- `JSON.stringify` 递归处理对象、数组、基本类型，注意循环引用、函数、undefined 等特殊情况。
- `JSON.parse` 可用原生方法，也可用 `eval`/`Function` 实现，但有安全风险。

::: details 示例代码

```js
// 简易版 stringify
function jsonStringify(obj) {
  if (obj === null) return 'null';
  if (typeof obj === 'string') return `"${obj}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    return `[${obj.map(jsonStringify).join(',')}]`;
  }
  if (typeof obj === 'object') {
    const props = Object.keys(obj).map(key => 
      `"${key}":${jsonStringify(obj[key])}`
    );
    return `{${props.join(',')}}`;
  }
}

// 简易版 parse（不建议生产环境使用）
function jsonParse(str) {
  return (new Function('return ' + str))();
}

// 测试用例
const obj = {a: 1, b: 'x', c: [2, 3]};
const str = jsonStringify(obj);
console.log(str); // {"a":1,"b":"x","c":[2,3]}
console.log(jsonParse(str)); // { a: 1, b: 'x', c: [ 2, 3 ] }
```

:::

## 实现深度优先搜索（DFS）和广度优先搜索（BFS）

### 核心答案

DFS 用递归或栈，BFS 用队列，适用于树、图等结构的遍历和搜索。

### 原理讲解

- DFS：优先深入分支，递归或用栈实现，适合路径、连通性等问题。
- BFS：逐层扩展，队列实现，适合最短路径、层序遍历等问题。
- 图结构需记录已访问节点，防止死循环。

::: details 示例代码

```js
// 图的邻接表表示
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
};

// DFS 递归
function dfs(node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);
  for (let neighbor of graph[node]) {
    dfs(neighbor, visited);
  }
}

// BFS
function bfs(start) {
  const queue = [start];
  const visited = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    console.log(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// 测试用例
dfs('A'); // A B D E F C
bfs('A'); // A B C D E F
```

:::

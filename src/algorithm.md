# 算法类

[参考](https://www.cnblogs.com/onepixel/articles/7674659.html)

## a^n 怎么用小于 O(n) 的算法实现

## 快排的原理

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
![快排的原理](./assets/images/quick-sort.gif)

## 数组去重

```javascript
function unique(arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
```

## 排序算法，时间复杂度

![排序算法，时间复杂度](./assets/images/sort-time.png)

## 介绍下深度优先遍历和广度优先遍历，如何实现？

### 深度优先遍历

深度优先遍历DFS 与树的先序遍历比较类似。
假设初始状态是图中所有顶点均未被访问，则从某个顶点v出发，首先访问该顶点然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，直至图中所有和v有路径相通的顶点都被访问到。若此时尚有其他顶点未被访问到，则另选一个未被访问的顶点作起始点，重复上述过程，直至图中所有顶点都被访问到为止。

```javascript
/*深度优先遍历三种方式*/
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

### 广度优先遍历

广度优先遍历 BFS
从图中某顶点v出发，在访问了v之后依次访问v的各个未曾访问过的邻接点，然后分别从这些邻接点出发依次访问它们的邻接点，并使得“先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，直至图中所有已被访问的顶点的邻接点都被访问到。 如果此时图中尚有顶点未被访问，则需要另选一个未曾被访问过的顶点作为新的起始点，重复上述过程，直至图中所有顶点都被访问到为止。

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

## 冒泡排序

- 重复地遍历要排序的数组
- 每次比较相邻的两个元素，如果它们的顺序错误就把它们交换过来
- 就像气泡一样，每次遍历都会把最大的元素"浮"到数组的末尾，因此得名冒泡排序

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

## 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```
深度优先搜索（DFS）+ 回溯算法
```

```javascript
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

## 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

### 哈希表映射方式

```javascript
function convert(list) {
    const res = []
    const map = list.reduce((res, v) => (res[v.id] = v, res), {})
    for (const item of list) {
        if (item.parentId === 0) {
            res.push(item)
            continue
        }
        if (item.parentId in map) {
            const parent = map[item.parentId]
            parent.children = parent.children || []
            parent.children.push(item)
        }
    }
    return res
}
```

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

# React

## React 18 生命周期方法有哪些？各自何时触发？

### 核心答案

React 18 的生命周期方法主要包括挂载阶段（如 constructor、componentDidMount）、更新阶段（如 shouldComponentUpdate、componentDidUpdate）、卸载阶段（如 componentWillUnmount）以及部分新生命周期（如 getDerivedStateFromProps、getSnapshotBeforeUpdate）。它们分别在组件创建、更新和销毁时被调用。

### 原理细节

React 生命周期方法分为三个阶段：

1. **挂载阶段（Mounting）**  
   - `constructor`：组件实例化时调用，用于初始化 state 和绑定方法。
   - `static getDerivedStateFromProps`：在 render 之前调用，无论是挂载还是更新，返回对象用于更新 state。
   - `render`：渲染 UI，必须的生命周期方法。
   - `componentDidMount`：组件挂载到 DOM 后调用，适合进行副作用操作（如数据请求、订阅等）。

2. **更新阶段（Updating）**  
   - `static getDerivedStateFromProps`：同上。
   - `shouldComponentUpdate`：决定组件是否需要重新渲染，返回布尔值。
   - `render`：重新渲染 UI。
   - `getSnapshotBeforeUpdate`：在更新前获取快照（如滚动位置），返回值会作为 componentDidUpdate 的第三个参数。
   - `componentDidUpdate`：组件更新后调用，适合进行 DOM 操作或网络请求。

3. **卸载阶段（Unmounting）**  
   - `componentWillUnmount`：组件从 DOM 中移除前调用，适合做清理工作（如取消定时器、移除事件监听等）。

4. **错误处理（Error Handling）**  
   - `componentDidCatch`：捕获子组件的 JavaScript 错误。
   - `static getDerivedStateFromError`：用于渲染备用 UI。

**注意：**  
React 16 以后，部分旧生命周期方法（如 componentWillMount、componentWillReceiveProps、componentWillUpdate）已被废弃或标记为不安全。

### 示例代码

::: details 类组件生命周期方法示例

```jsx
import React from "react";

class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("constructor: 初始化");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 每次 props 变化都会调用
    console.log("getDerivedStateFromProps: props 变化", nextProps);
    return null; // 通常返回 null 或新的 state
  }

  componentDidMount() {
    // 组件挂载后调用
    console.log("componentDidMount: 组件已挂载");
    // 适合发起网络请求、添加订阅等副作用
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 决定是否需要更新
    console.log("shouldComponentUpdate: 是否需要更新", nextState);
    return true; // 返回 false 可阻止更新
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 更新前获取快照
    console.log("getSnapshotBeforeUpdate: 获取快照", prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 组件更新后调用
    console.log("componentDidUpdate: 组件已更新", prevState, snapshot);
  }

  componentWillUnmount() {
    // 组件卸载前调用
    console.log("componentWillUnmount: 组件将卸载");
    // 适合清理定时器、取消订阅等
  }

  render() {
    console.log("render: 渲染 UI");
    return (
      <div>
        <p>计数：{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </div>
    );
  }
}

export default LifecycleDemo;
```

:::

::: details 错误边界生命周期方法示例

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 发生错误时更新 state
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 可以将错误日志上报
    console.error("捕获到错误：", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出现错误了！</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

:::

## 什么是 Fiber 架构？

### 核心答案

Fiber 架构是 React 16 引入的新架构，用于实现可中断、可分片的渲染，使 React 能够更好地支持高优先级任务和异步渲染，提高页面响应性能。

### 原理细节

- 传统 React（Stack Reconciler）采用递归方式同步渲染，无法中断，导致大组件树渲染时主线程被长时间占用，影响用户体验。
- Fiber 架构将渲染过程拆分为多个小单元（Fiber），每个 Fiber 表示一个组件节点。渲染时可以分片执行，每渲染一小段就让出主线程，浏览器可优先处理高优先级任务（如用户输入、动画）。
- 这样实现了“可中断渲染”、“优先级调度”、“时间切片”等特性，为 React 18 的并发特性（如 startTransition、Suspense）打下基础。

### 示例代码

::: details Fiber 架构可中断渲染示意

```jsx
// 伪代码，仅用于说明 Fiber 架构思想
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // 时间片用尽，交还主线程
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop); // 继续下一个时间片
  }
}
requestIdleCallback(workLoop);
```

:::

## 你如何理解 React 的批量更新机制？

### 核心答案

合成事件是 React 对原生 DOM 事件的封装，提供跨浏览器兼容的事件对象和统一的事件机制。与原生事件不同，合成事件采用事件委托和批量更新机制，提升性能和一致性。合成事件的执行顺序通常是：React 合成事件 → 原生事件（捕获/冒泡阶段）。

### 原理细节

- **实现方式**：React 并没有将事件直接绑定到每个真实 DOM 节点上，而是通过事件委托，将所有事件统一绑定到根节点（如 document），由 React 统一管理。
- **SyntheticEvent**：React 构建了一个合成事件对象（SyntheticEvent），模拟原生事件的所有属性和方法，并做了兼容性处理。合成事件会自动回收，减少内存消耗。
- **批量更新**：在合成事件中，setState 是批量异步的，能合并多次状态变更，减少渲染次数；而原生事件中（如 addEventListener），setState 可能是同步的（React 18 之前）。
- **事件冒泡**：合成事件的冒泡和捕获机制与原生事件类似，但事件冒泡只在 React 虚拟 DOM 树中进行，最终才会冒泡到原生 DOM。
- **事件解绑**：组件卸载时，React 会自动解绑对应的事件，避免内存泄漏。
- **执行顺序**：
  1. 先执行 React 合成事件（如 onClick）。
  2. 再执行原生事件监听器（如 addEventListener）。
  3. 如果两者都绑定在同一元素，合成事件优先于原生事件执行。

::: details 合成事件与原生事件对比

```jsx
import React from "react";

function SyntheticEventDemo() {
  // React 合成事件
  const handleClick = (e) => {
    console.log("合成事件", e); // SyntheticEvent
    console.log("原生事件", e.nativeEvent); // 原生事件对象
  };

  React.useEffect(() => {
    // 原生事件
    const btn = document.getElementById("nativeBtn");
    btn.addEventListener("click", () => {
      console.log("原生事件");
    });
  }, []);

  return (
    <div>
      <button onClick={handleClick}>React 合成事件</button>
      <button id="nativeBtn">原生事件</button>
    </div>
  );
}

export default SyntheticEventDemo;
```

:::

::: details 合成事件与原生事件执行顺序

```jsx
import React, { useEffect, useRef } from "react";

function EventOrderDemo() {
  const ref = useRef();

  useEffect(() => {
    // 绑定原生事件
    ref.current.addEventListener("click", () => {
      console.log("原生事件");
    });
  }, []);

  const handleClick = () => {
    console.log("合成事件");
  };

  return (
    <button ref={ref} onClick={handleClick}>
      点击我
    </button>
  );
}

export default EventOrderDemo;

// 点击按钮时，控制台输出顺序：
// 1. 合成事件
// 2. 原生事件
```

:::

::: details 合成事件的批量更新特性

```jsx
import React, { useState } from "react";

function BatchUpdateDemo() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 2);
    // 在合成事件中，setState 是批量合并的，最终只渲染一次
    setTimeout(() => {
      setCount(count + 3);
      // 在 setTimeout（原生事件）中，React 18 之前 setState 是同步的
    }, 0);
  };

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={handleClick}>批量更新</button>
    </div>
  );
}

export default BatchUpdateDemo;
```

:::

---

**总结**：合成事件让 React 具备更好的跨平台兼容性和性能优化能力，开发者可以通过 e.nativeEvent 获取原生事件对象，理解其执行顺序有助于调试和性能优化。

## 什么是虚拟DOM？它的作用是什么？它如何提升性能？

### 核心答案

虚拟DOM（Virtual DOM）是 React 用 JavaScript 对象模拟的 DOM 结构。它通过 diff 算法高效比较新旧虚拟DOM，最终只将必要的变更同步到真实 DOM，从而提升性能。

### 原理细节

- 虚拟DOM是对真实DOM的抽象表示，本质是一个 JS 对象树。
- 每次状态变化，React 会生成新的虚拟DOM树，与上一次的虚拟DOM树进行 diff，找出最小的变更集合（patch）。
- 最后只对真实DOM做最小化的操作，避免了频繁的、低效的 DOM 操作。
- 这样可以提升渲染性能，尤其在大规模节点更新时优势明显。

### 示例代码

::: details 虚拟DOM diff 原理简化示例

```js
// 简化版虚拟DOM结构
const oldVDOM = { type: "div", props: { children: "Hello" } };
const newVDOM = { type: "div", props: { children: "World" } };

// diff 算法伪代码
function diff(oldVDOM, newVDOM) {
  if (oldVDOM.type !== newVDOM.type) {
    // 替换整个节点
  } else if (oldVDOM.props.children !== newVDOM.props.children) {
    // 只更新文本内容
  }
  // ... 其他属性比较
}
```

:::

## React 中如何实现父子组件通信？兄弟组件通信呢？

### 核心答案

父子组件通信通过 props 传递，子组件可通过回调函数向父组件传值。兄弟组件通信可通过提升 state 到共同父组件、Context、或全局状态管理（如 Redux）。

### 原理细节

- 父组件通过 props 向子组件传递数据和方法。
- 子组件通过调用 props 传递的回调函数，将数据传回父组件。
- 兄弟组件通信常见方式：
  1. 将 state 提升到最近的共同父组件，由父组件协调数据流。
  2. 使用 React Context 实现跨层级通信。
  3. 使用 Redux、MobX 等全局状态管理工具。

### 示例代码

::: details 父子通信示例

```jsx
// 父组件
function Parent() {
  const [msg, setMsg] = React.useState("");
  return (
    <div>
      <Child onSend={setMsg} />
      <p>来自子组件的信息：{msg}</p>
    </div>
  );
}

// 子组件
function Child({ onSend }) {
  return (
    <button onClick={() => onSend("Hello from Child!")}>
      发送信息给父组件
    </button>
  );
}
```

:::

::: details 兄弟通信（状态提升）示例

```jsx
function Parent() {
  const [data, setData] = React.useState("");
  return (
    <div>
      <SiblingA onSend={setData} />
      <SiblingB data={data} />
    </div>
  );
}

function SiblingA({ onSend }) {
  return <button onClick={() => onSend("A的数据")}>发送给B</button>;
}

function SiblingB({ data }) {
  return <div>B收到：{data}</div>;
}
```

:::

::: details 兄弟通信（Context）示例

```jsx
const MsgContext = React.createContext();

function Parent() {
  const [msg, setMsg] = React.useState("");
  return (
    <MsgContext.Provider value={{ msg, setMsg }}>
      <SiblingA />
      <SiblingB />
    </MsgContext.Provider>
  );
}

function SiblingA() {
  const { setMsg } = React.useContext(MsgContext);
  return <button onClick={() => setMsg("Context的数据")}>发送</button>;
}

function SiblingB() {
  const { msg } = React.useContext(MsgContext);
  return <div>B收到：{msg}</div>;
}
```

:::

## 什么是合成事件？它和原生事件有什么区别？

### 核心答案

合成事件是 React 对原生 DOM 事件的封装，提供跨浏览器兼容的事件对象和统一的事件机制。与原生事件不同，合成事件采用事件委托和批量更新机制，提升性能和一致性。

### 原理细节

- React 并没有直接把事件绑定到真实 DOM 节点上，而是通过事件委托，将所有事件统一绑定到根节点（如 document）。
- 当事件触发时，React 会在内部构建一个合成事件对象（SyntheticEvent），模拟原生事件的所有属性和方法，并进行兼容性处理。
- 合成事件会自动回收，减少内存消耗。
- 合成事件支持批量更新（如 setState 的批量合并），而原生事件不会。
- 你仍然可以通过 `event.nativeEvent` 访问原生事件对象。

### 示例代码

::: details 合成事件与原生事件对比

```jsx
import React from "react";

function SyntheticEventDemo() {
  // React 合成事件
  const handleClick = (e) => {
    console.log("合成事件", e); // SyntheticEvent
    console.log("原生事件", e.nativeEvent); // 原生事件对象
  };

  React.useEffect(() => {
    // 原生事件
    const btn = document.getElementById("nativeBtn");
    btn.addEventListener("click", () => {
      console.log("原生事件");
    });
  }, []);

  return (
    <div>
      <button onClick={handleClick}>React 合成事件</button>
      <button id="nativeBtn">原生事件</button>
    </div>
  );
}

export default SyntheticEventDemo;
```

:::

## 你如何防止组件重复渲染？

### 核心答案

防止组件重复渲染的常用方法有：使用 React.memo、PureComponent、useMemo、useCallback、shouldComponentUpdate 等，避免不必要的 state/props 变化和函数/对象引用变化。

### 原理细节

- React 组件只要 state 或 props 发生变化就会重新渲染。
- 可以通过 React.memo（函数组件）或 PureComponent（类组件）实现浅层 props 比较，阻止无关更新。
- useMemo、useCallback 用于缓存计算结果或函数，避免因引用变化导致子组件重复渲染。
- shouldComponentUpdate 可自定义更新逻辑。
- 合理拆分组件、提升 state、减少父组件无关更新也很重要。

### 示例代码

::: details React.memo 防止子组件重复渲染

```jsx
const Child = React.memo(({ value }) => {
  console.log("Child 渲染");
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <Child value="不会因 count 变化而重复渲染" />
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

:::

::: details useCallback 缓存函数引用

```jsx
function Parent() {
  const [count, setCount] = React.useState(0);
  const handleClick = React.useCallback(() => {
    // 只有依赖变化时才会重新创建
    setCount((c) => c + 1);
  }, []);
  return <Child onClick={handleClick} />;
}
```

:::

## 什么是 hooks？常用的 hooks 有哪些？

### 核心答案

Hooks 是 React 16.8 引入的函数组件状态和副作用管理机制。常用 hooks 有 useState、useEffect、useContext、useRef、useMemo、useCallback、useReducer 等。

### 原理细节

- hooks 只能在函数组件顶层调用，不能在循环、条件或嵌套函数中调用。
- useState 用于声明状态，useEffect 处理副作用，useContext 访问上下文，useRef 获取引用，useMemo/useCallback 优化性能，useReducer 管理复杂状态。
- hooks 让函数组件拥有类组件的所有能力，代码更简洁、复用性更强。

### 示例代码

::: details 常用 hooks 示例

```jsx
import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } from "react";

const MyContext = createContext();

function HooksDemo() {
  const [count, setCount] = useState(0); // 状态
  const ref = useRef(); // 引用
  const double = useMemo(() => count * 2, [count]); // 记忆化
  const handleClick = useCallback(() => setCount(count + 1), [count]); // 缓存函数

  useEffect(() => {
    // 副作用
    document.title = `count: ${count}`;
  }, [count]);

  return (
    <MyContext.Provider value={count}>
      <button ref={ref} onClick={handleClick}>增加</button>
      <p>count: {count}, double: {double}</p>
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  const count = useContext(MyContext); // 上下文
  return <div>子组件获取到的 count: {count}</div>;
}
```

:::

## setState 是同步还是异步的？为什么？

### 核心答案

setState 在 React 的合成事件和生命周期中是“异步”的（批量更新），在 setTimeout、原生事件等场景下是同步的。React 18 后，几乎所有场景都批量异步更新。

### 原理细节

- “异步”指的是 setState 不会立即更新 this.state，而是等事件循环结束后统一更新并触发一次渲染。
- 这样做可以合并多次 setState，减少渲染次数，提高性能。
- 在 setTimeout、原生事件等场景下，setState 可能是同步的（React 18 之前）。
- React 18 开启自动批量更新，所有场景下 setState 都是批量异步的。

### 示例代码

::: details setState 异步批量更新示例

```jsx
class Demo extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // 这里拿到的还是旧值
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count); // React 18 前，这里是新值；React 18 后，依然是批量异步
    }, 0);
  };

  render() {
    return <button onClick={this.handleClick}>增加</button>;
  }
}
```

:::

## 你如何优化 React 应用的性能？

### 核心答案

优化 React 性能常用方法包括：组件拆分、懒加载、使用 React.memo/PureComponent、useMemo/useCallback、避免不必要的渲染、虚拟列表、代码分割、合适使用 Context/Redux、减少不必要的 state、合成事件等。

### 原理细节

- **组件拆分**：将大组件拆分为小组件，减少渲染范围。
- **懒加载和代码分割**：使用 React.lazy 和 Suspense 实现路由级或组件级懒加载，减少首屏包体积。
- **React.memo/PureComponent**：避免 props 未变化时的重复渲染。
- **useMemo/useCallback**：缓存计算结果和函数引用，防止子组件无谓渲染。
- **虚拟列表**：如 react-window、react-virtualized，仅渲染可视区域的列表项，提升大数据量渲染性能。
- **减少 state 层级和数量**：只在必要组件维护 state，避免 state 频繁变化导致的级联渲染。
- **合成事件**：减少事件绑定数量。
- **避免匿名函数和对象**：防止每次渲染都生成新引用。
- **服务端渲染（SSR）**：提升首屏渲染速度和 SEO。

### 示例代码

::: details 懒加载和代码分割

```jsx
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

:::

::: details 虚拟列表

```jsx
import { FixedSizeList as List } from "react-window";

function VirtualListDemo() {
  const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
  );

  return (
    <List
      height={150}
      itemCount={1000}
      itemSize={35}
      width={300}
    >
      {Row}
    </List>
  );
}
```

:::

## React 中如何实现懒加载和代码分割？

### 核心答案

React 通过 React.lazy 和 Suspense 实现组件级懒加载，通过 Webpack 等工具实现路由级或模块级代码分割，提升首屏加载速度和性能。

### 原理细节

- **React.lazy** 用于动态导入组件，只有在需要时才加载对应代码。
- **Suspense** 用于包裹懒加载组件，提供加载中的 fallback UI。
- **代码分割** 通常依赖 Webpack 的动态 import()，将应用拆分为多个 chunk，按需加载。
- 路由懒加载常与 React Router 配合使用。

### 示例代码

::: details 组件懒加载

```jsx
import React, { Suspense, lazy } from "react";

const OtherComponent = lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

:::

::: details 路由懒加载

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>页面加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

:::

## React 中如何实现服务端渲染（SSR）？

### 核心答案

React 服务端渲染（SSR，Server-Side Rendering）是指在服务器端将 React 组件渲染为 HTML 字符串，直接返回给客户端浏览器，提升首屏渲染速度和 SEO。常用方式有使用 `react-dom/server` 的 `renderToString` 方法，或借助 Next.js 等框架实现。

### 原理细节

- **渲染流程**：服务器接收到请求后，使用 React 组件生成 HTML 字符串，将其嵌入到 HTML 模板中返回给浏览器。浏览器加载后，React 会在客户端“水合”（hydrate）这些 HTML，绑定事件，实现同构。
- **优点**：
  - 首屏渲染更快，用户更早看到内容。
  - 有利于 SEO，爬虫能直接抓取完整 HTML。
  - 更好的社交分享体验（如微信、微博预览）。
- **缺点**：
  - 服务端压力大，渲染速度受限于服务器性能。
  - 实现和部署复杂度提升。
  - 某些只在浏览器环境下可用的 API 需特殊处理（如 window、document）。
- **常用方案**：
  - 原生 SSR：使用 `react-dom/server` 的 `renderToString` 或 `renderToPipeableStream`。
  - 框架化 SSR：如 Next.js，封装了路由、数据预取、代码分割等，开发体验更好。

### 示例代码

::: details 原生 React SSR 基本用法

```js
// server.js
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

const server = express();

server.get("*", (req, res) => {
  // 1. 用 React 组件生成 HTML 字符串
  const html = renderToString(<App />);
  // 2. 返回完整 HTML 页面
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Demo</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("服务端渲染服务器已启动：http://localhost:3000");
});
```

:::

::: details 客户端“水合”同构

```js
// index.js（客户端入口）
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

// 用 hydrateRoot 代替 createRoot，实现事件绑定和同构
hydrateRoot(document.getElementById("root"), <App />);
```

:::

::: details Next.js 框架 SSR 示例

```js
// pages/index.js
export default function Home({ data }) {
  return <div>服务端渲染数据：{data}</div>;
}

// getServerSideProps 会在服务端执行，返回的数据作为 props 传给页面组件
export async function getServerSideProps() {
  // 可以在这里请求接口、读取数据库等
  return {
    props: {
      data: "Hello SSR!"
    }
  };
}
```

:::

## React 中的 key 有什么作用？为什么要用 key？

### 核心答案

key 是 React 用于标识列表中每个元素的唯一性，帮助 React 高效地进行虚拟 DOM diff，准确判断哪些元素需要更新、重排或复用，提升渲染性能。

### 原理细节

- key 只在同级元素之间必须唯一。
- 没有 key 或 key 不唯一时，React 会用索引作为 key，可能导致不必要的重渲染或状态错乱。
- 正确使用 key 可以减少 DOM 操作，提升性能，避免组件状态丢失。

### 示例代码

::: details key 的作用示例

```jsx
function ListDemo({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li> // 推荐用唯一 id
      ))}
    </ul>
  );
}
```

:::

## 什么是高阶组件（HOC）？它的应用场景有哪些？

### 核心答案

高阶组件（HOC, Higher-Order Component）是一个函数，接收一个组件作为参数并返回一个新的组件。它用于复用组件逻辑、增强组件功能，常见于权限控制、数据注入、埋点统计等场景。

### 原理细节

- **本质**：HOC 是一个纯函数，签名通常为 `const NewComponent = hoc(OldComponent)`，不会修改原组件，而是通过包裹的方式扩展功能，符合“组合优于继承”的思想。
- **实现方式**：HOC 可以通过 props 传递、生命周期劫持、渲染劫持等方式，实现逻辑复用和功能增强。
- **常见应用场景**：
  1. **权限校验**：根据用户权限决定是否渲染组件或跳转。
  2. **数据请求**：为组件注入异步获取的数据。
  3. **主题切换**：为组件注入主题相关的 props。
  4. **埋点统计**：在组件生命周期内自动上报日志。
  5. **表单处理**：统一管理表单状态和校验逻辑。
- **注意事项**：
  - HOC 不会修改被包裹组件的实现，只是通过 props 或生命周期扩展功能。
  - HOC 需要正确传递 props（使用 `{...props}`），避免丢失原有属性。
  - HOC 嵌套过多可能导致调试困难，可结合 React DevTools 辅助排查。

### 示例代码

::: details 日志埋点 HOC 示例

```jsx
// 日志埋点高阶组件
function withLogger(WrappedComponent) {
  return function(props) {
    React.useEffect(() => {
      console.log("组件挂载", WrappedComponent.name);
    }, []);
    return <WrappedComponent {...props} />;
  };
}

// 使用 HOC
function Hello(props) {
  return <div>Hello, {props.name}</div>;
}

const HelloWithLogger = withLogger(Hello);

// <HelloWithLogger name="React" />
```

:::

::: details 权限校验 HOC 示例

```jsx
// 权限校验高阶组件
function withAuth(WrappedComponent) {
  return function(props) {
    const isLogin = Boolean(localStorage.getItem("token"));
    if (!isLogin) {
      return <div>请先登录</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// 使用
function Dashboard() {
  return <div>仪表盘内容</div>;
}

const ProtectedDashboard = withAuth(Dashboard);

// <ProtectedDashboard />
```

:::

::: details 数据注入 HOC 示例

```jsx
// 数据请求高阶组件
function withData(WrappedComponent, fetchData) {
  return function(props) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
      fetchData().then(setData);
    }, []);
    if (!data) return <div>加载中...</div>;
    return <WrappedComponent {...props} data={data} />;
  };
}

// 使用
function UserList({ data }) {
  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

const fetchUsers = () => fetch("/api/users").then(res => res.json());
const UserListWithData = withData(UserList, fetchUsers);

// <UserListWithData />
```

:::

## useEffect 和 useLayoutEffect 有什么区别？

### 核心答案

useEffect 在浏览器完成布局与绘制后异步执行，不阻塞渲染；useLayoutEffect 在 DOM 更新后、浏览器绘制前同步执行，适合需要读取/修改 DOM 的场景。

### 原理细节

- useEffect：不会阻塞浏览器渲染，适合执行副作用（如数据请求、订阅等）。
- useLayoutEffect：在 DOM 变更后立即执行，阻塞浏览器绘制，适合需要同步读取布局、测量 DOM 或强制同步更新的场景。
- 若副作用不影响布局，优先用 useEffect，避免阻塞渲染。

### 示例代码

::: details useEffect vs useLayoutEffect

```jsx
import React, { useEffect, useLayoutEffect, useRef } from "react";

function Demo() {
  const ref = useRef();

  useEffect(() => {
    // 这里读取到的 DOM 可能已经被浏览器绘制
    console.log("useEffect", ref.current.getBoundingClientRect());
  }, []);

  useLayoutEffect(() => {
    // 这里读取到的 DOM 是最新的，尚未绘制
    console.log("useLayoutEffect", ref.current.getBoundingClientRect());
  }, []);

  return <div ref={ref}>Hello</div>;
}
```

:::

## React 中如何实现表单校验？

### 核心答案

React 表单校验可通过受控组件结合自定义校验逻辑实现，也可借助第三方库（如 Formik、react-hook-form、Yup）实现复杂校验和错误提示。

### 原理细节

- 受控组件：表单元素的 value 受 state 控制，onChange 事件更新 state。
- 校验逻辑可在 onChange、onBlur 或 onSubmit 时触发，更新错误信息 state。
- 第三方库可简化表单管理、校验、错误提示等流程。

### 示例代码

::: details 受控组件+自定义校验

```jsx
function FormDemo() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length < 3) {
      setError("长度不能小于3");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && value) {
      alert("提交成功");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleChange} />
      {error && <span style={{ color: "red" }}>{error}</span>}
      <button type="submit">提交</button>
    </form>
  );
}
```

:::

## 你如何理解 React 的单向数据流？

### 核心答案

React 的单向数据流指数据只能由父组件通过 props 传递给子组件，子组件不能直接修改父组件数据，保证数据流动清晰、可控、易于调试。

### 原理细节

- 父组件通过 props 向下传递数据，子组件通过回调函数向上传递事件或数据。
- 这种单向流动方式避免了数据混乱和难以追踪的问题。
- 若需要跨层级通信，可用 Context 或全局状态管理（如 Redux）。

### 示例代码

::: details 单向数据流示例

```jsx
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Child value={count} onChange={setCount} />;
}

function Child({ value, onChange }) {
  return (
    <div>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)}>增加</button>
    </div>
  );
}
```

:::

## 什么是 React Portals？应用场景有哪些？

### 核心答案

React Portals 允许将子节点渲染到父组件 DOM 层级以外的 DOM 节点中，常用于模态框、弹窗、全局提示等场景。

### 原理细节

- 通过 ReactDOM.createPortal(child, container) 实现，将组件渲染到指定的 DOM 节点。
- 解决了弹窗、模态框等组件因层级、样式、事件冒泡等问题导致的渲染困扰。
- 事件冒泡依然按照 React 组件树进行。

### 示例代码

::: details Portals 用法

```jsx
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root")
  );
}

// 使用
function App() {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>打开弹窗</button>
      {show && (
        <Modal>
          <div>
            <p>这是一个弹窗</p>
            <button onClick={() => setShow(false)}>关闭</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
```

:::

## 你如何处理 React 项目中的错误边界？

### 核心答案

React 通过类组件的错误边界（Error Boundary）捕获子组件树中的 JavaScript 错误，防止整个应用崩溃，并渲染备用 UI。常用方法有 static getDerivedStateFromError 和 componentDidCatch。

### 原理细节

- 错误边界只能捕获其子组件树中的渲染、生命周期、构造函数中的错误，无法捕获事件处理、异步代码、服务端渲染等错误。
- 通过 static getDerivedStateFromError 更新 UI，componentDidCatch 记录错误信息。
- 通常将错误边界包裹在高层组件或关键区域，提升应用健壮性。

### 示例代码

::: details 错误边界组件

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 以渲染备用 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 可以将错误信息上报
    console.error("捕获到错误：", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了！</h1>;
    }
    return this.props.children;
  }
}

// 使用
// <ErrorBoundary><MyComponent /></ErrorBoundary>
```

:::

## Redux 和 Context 有什么区别？

### 核心答案

Redux 是专门的全局状态管理库，适合复杂状态和多组件共享场景，具备中间件、时间旅行等功能；Context 主要用于轻量级跨层级数据传递，不适合频繁变更的大型状态管理。

### 原理细节

- Redux 采用单一数据源（store）、不可变数据流、action/reducer 机制，支持中间件、插件、开发者工具。
- Context 适合主题、语言、用户信息等全局静态数据，频繁变更会导致全量组件重渲染，性能较差。
- Redux 更适合大型项目和复杂业务，Context 适合简单场景。

### 示例代码

::: details Context 用法

```jsx
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={theme}>按钮</button>;
}
```

:::

## 什么是 PureComponent？和 Component 有什么区别？

### 核心答案

PureComponent 是 React 提供的优化型类组件，自动实现浅层 props 和 state 对比，阻止无关更新；Component 不做任何优化，所有 props/state 变化都会触发渲染。

### 原理细节

- PureComponent 内部实现了 shouldComponentUpdate，进行浅比较。
- 适合 props/state 为简单类型或不可变数据结构的场景。
- 若 props/state 为复杂对象且经常变更引用，需谨慎使用。

### 示例代码

::: details PureComponent 示例

```jsx
import React, { PureComponent, Component } from "react";

class MyPure extends PureComponent {
  render() {
    console.log("PureComponent 渲染");
    return <div>{this.props.value}</div>;
  }
}

class MyNormal extends Component {
  render() {
    console.log("Component 渲染");
    return <div>{this.props.value}</div>;
  }
}

// 父组件每次传递相同 props，PureComponent 不会重复渲染，Component 会
```

:::

## 什么是 Context.Provider 和 Context.Consumer？

### 核心答案

Context.Provider 用于提供 context 数据，包裹需要共享数据的组件；Context.Consumer 用于消费 context 数据，获取最近一层 Provider 提供的值。

### 原理细节

- Provider 通过 value 属性传递数据，所有后代 Consumer 都能访问到。
- Consumer 采用 render props 模式，获取 context 值。
- 也可用 useContext 钩子简化消费过程（函数组件）。

### 示例代码

::: details Provider 和 Consumer 用法

```jsx
const UserContext = React.createContext();

function App() {
  return (
    <UserContext.Provider value="张三">
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  return (
    <UserContext.Consumer>
      {user => <div>用户名：{user}</div>}
    </UserContext.Consumer>
  );
}
```

:::

## 你如何理解 React 的 Context API？

### 核心答案

Context API 是 React 提供的跨组件层级共享数据的机制，避免多层 props 传递，适合全局主题、用户信息等场景。

### 原理细节

- 通过 createContext 创建 context 对象，Provider 提供数据，Consumer 或 useContext 消费数据。
- 仅当 context value 变化时，相关组件才会重新渲染。
- 不适合频繁变更的大型状态管理。

### 示例代码

::: details Context API 用法

```jsx
const LangContext = React.createContext("zh");

function App() {
  return (
    <LangContext.Provider value="en">
      <Child />
    </LangContext.Provider>
  );
}

function Child() {
  const lang = React.useContext(LangContext);
  return <div>当前语言：{lang}</div>;
}
```

:::

## React 组件有哪几种？分别有什么区别？

### 核心答案

React 组件主要分为函数组件和类组件。函数组件语法简洁、无状态，配合 Hooks 可拥有完整功能；类组件通过继承 React.Component，支持生命周期和 state，语法相对复杂。

### 原理细节

- **函数组件**：本质是一个函数，接收 props，返回 JSX。React 16.8 以后可通过 Hooks 管理状态、副作用等，推荐使用。
- **类组件**：通过 class 继承 React.Component，拥有生命周期方法和 state，适合需要复杂逻辑的场景。未来 React 发展趋势是以函数组件为主。
- 还有少量特殊组件，如 PureComponent、高阶组件（HOC）、受控/非受控组件等。

### 示例代码

::: details 函数组件与类组件对比

```jsx
// 函数组件
function Hello(props) {
  return <div>Hello, {props.name}</div>;
}

// 类组件
import React from "react";
class HelloClass extends React.Component {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}
```

:::

## React 中如何实现动画效果？

### 核心答案

React 动画可通过 CSS 动画、原生 JS 动画、第三方库（如 react-transition-group、framer-motion、react-spring）等方式实现，推荐使用 react-transition-group 或 framer-motion。

### 原理细节

- **CSS 动画**：直接给元素添加 className，配合 CSS3 transition/animation 实现。
- **react-transition-group**：提供 Transition、CSSTransition、TransitionGroup 等组件，配合状态切换实现进出场动画。
- **framer-motion**：声明式动画库，支持复杂交互和物理动画。
- **react-spring**：基于弹性物理模型的动画库，适合复杂动画。

### 示例代码

::: details react-transition-group 动画

```jsx
import { CSSTransition } from "react-transition-group";
import "./fade.css"; // 需自定义动画样式

function FadeDemo({ show }) {
  return (
    <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
      <div className="box">淡入淡出动画</div>
    </CSSTransition>
  );
}

// fade.css
// .fade-enter { opacity: 0; }
// .fade-enter-active { opacity: 1; transition: opacity 300ms; }
// .fade-exit { opacity: 1; }
// .fade-exit-active { opacity: 0; transition: opacity 300ms; }
```

:::

::: details framer-motion 动画

```jsx
import { motion } from "framer-motion";

function MotionDemo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      渐变动画
    </motion.div>
  );
}
```

:::

## Redux 的工作原理是什么？有哪些核心概念？

### 核心答案

Redux 通过单一 store 管理全局状态，采用不可变数据流和纯函数 reducer，所有状态变更都通过 action 描述，支持中间件扩展。核心概念有 store、action、reducer、dispatch、middleware。

### 原理细节

- **store**：唯一的状态树，保存应用所有状态。
- **action**：描述状态变化的普通对象，必须有 type 字段。
- **reducer**：纯函数，接收旧 state 和 action，返回新 state。
- **dispatch**：派发 action，触发 reducer 计算新 state。
- **middleware**：扩展 dispatch 功能，如异步处理、日志等。
- 状态只读，所有变更都必须通过 action，保证数据流可追踪、可调试。

### 示例代码

::: details Redux 基本用法

```js
import { createStore } from "redux";

// reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}

// 创建 store
const store = createStore(counter);

// 订阅
store.subscribe(() => console.log(store.getState()));

// 派发 action
store.dispatch({ type: "INCREMENT" });
```

:::

## React 18 有哪些新特性？

### 核心答案

React 18 主要新特性有：自动批量更新、并发特性（Concurrent Rendering）、startTransition、Suspense SSR、useId、useSyncExternalStore、useInsertionEffect 等。

### 原理细节

- **自动批量更新**：所有 setState 场景下都自动批量合并更新，提升性能。
- **并发特性**：支持并发渲染，提升响应速度和流畅度。
- **startTransition**：区分高优先级和低优先级更新，提升交互体验。
- **Suspense SSR**：服务端渲染支持 Suspense，提升首屏体验。
- **新 Hooks**：如 useId（生成唯一 id）、useSyncExternalStore（外部状态同步）、useInsertionEffect（样式插入前副作用）。

### 示例代码

::: details startTransition 用法

```jsx
import { startTransition, useState } from "react";

function TransitionDemo() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
    startTransition(() => {
      // 低优先级更新
      setList(new Array(10000).fill(e.target.value));
    });
  };

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <ul>
        {list.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}
```

:::

## React 的核心原理是什么？

### 核心答案

React 的核心原理是通过虚拟DOM（Virtual DOM）和高效的 diff 算法，将 UI 状态映射为视图，并在状态变化时以最小代价更新真实 DOM，实现高效渲染和响应式界面。

### 原理细节

- **声明式 UI**：开发者只需描述“状态到视图”的映射，React 负责根据状态变化自动更新 UI。
- **虚拟DOM**：用 JS 对象描述 DOM 结构，状态变化时生成新的虚拟DOM树。
- **Diff 算法**：高效比较新旧虚拟DOM，找出最小变更集合（patch）。
- **批量更新**：合并多次状态变更，减少 DOM 操作次数。
- **组件化**：UI 拆分为可复用的组件，每个组件有独立的状态和生命周期。
- **Fiber 架构**：自 React 16 起，渲染过程可中断、分片，支持并发和优先级调度。

### 示例代码

::: details 虚拟DOM与diff原理简化示例

```js
// 虚拟DOM结构
const vdom1 = { type: "div", props: { children: "A" } };
const vdom2 = { type: "div", props: { children: "B" } };

// diff 算法伪代码
function diff(oldVDOM, newVDOM) {
  if (oldVDOM.type !== newVDOM.type) {
    // 替换节点
  } else if (oldVDOM.props.children !== newVDOM.props.children) {
    // 更新文本内容
  }
  // ... 其他属性比较
}
```

:::

## 什么是受控组件和非受控组件？

### 核心答案

受控组件是指表单元素的值由 React state 控制，所有变更都通过 state 驱动；非受控组件则直接操作 DOM，通过 ref 获取值，适合简单场景。

### 原理细节

- **受控组件**：value 受 state 控制，onChange 事件更新 state，数据流可控，适合复杂表单和校验。
- **非受控组件**：不受 state 控制，直接通过 ref 访问 DOM 节点，适合简单、无需频繁交互的场景。
- 受控组件更符合 React 的数据流理念，推荐优先使用。

### 示例代码

::: details 受控组件

```jsx
function ControlledInput() {
  const [value, setValue] = React.useState("");
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="受控组件"
    />
  );
}
```

:::

::: details 非受控组件

```jsx
function UncontrolledInput() {
  const inputRef = React.useRef();
  const handleClick = () => {
    alert(inputRef.current.value);
  };
  return (
    <div>
      <input ref={inputRef} placeholder="非受控组件" />
      <button onClick={handleClick}>获取值</button>
    </div>
  );
}
```

:::

# React

## React 的核心原理是什么？

### 核心答案

React 的核心原理是通过虚拟 DOM（Virtual DOM）实现高效的 UI 渲染和状态管理，采用组件化开发模式，利用声明式编程简化 UI 构建，并通过 Diff 算法和批量更新机制提升性能。

### 原理讲解

React 首先会将 UI 以组件的形式进行拆分，每个组件拥有自己的状态和生命周期。组件的 UI 结构会被描述成虚拟 DOM（一个 JavaScript 对象树），当状态发生变化时，React 会重新生成新的虚拟 DOM，然后通过 Diff 算法对比新旧虚拟 DOM，找出需要变更的部分，最后只对实际 DOM 进行最小化的更新，从而提升性能。此外，React 采用声明式编程，开发者只需描述“界面应该是什么样”，React 会自动处理 UI 的更新逻辑。

::: details 示例代码

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

export default Counter;
```

:::

在上面的例子中，`Counter` 组件通过 `useState` 管理状态，每次点击按钮都会触发状态变化，React 会自动通过虚拟 DOM 和 Diff 算法只更新需要变更的部分，实现高效渲染。

## 什么是虚拟DOM？它的作用是什么？它如何提升性能？

### 核心答案

虚拟 DOM（Virtual DOM）是 React 用 JavaScript 对象模拟真实 DOM 结构的一种技术。它的作用是提升 UI 更新的性能，通过在内存中对比新旧虚拟 DOM，只将变化部分同步到真实 DOM，减少不必要的 DOM 操作。

### 原理讲解

虚拟 DOM 是对真实 DOM 的一次抽象表示，每当组件状态发生变化时，React 会生成新的虚拟 DOM 树，然后与上一次的虚拟 DOM 树进行对比（Diff），找出变化的部分，最后只将这些变化应用到真实 DOM。由于操作真实 DOM 的代价较高，而操作 JavaScript 对象的速度很快，这样可以显著提升性能，避免了频繁的、全量的 DOM 重绘。

::: details 示例代码

```jsx
import React, { useState } from 'react';

function Demo() {
  const [text, setText] = useState('Hello');

  return (
    <div>
      <p>{text}</p>
      <button onClick={() => setText('Hello, React!')}>修改文本</button>
    </div>
  );
}

export default Demo;
```

:::

每次点击按钮，`text` 状态变化，React 会生成新的虚拟 DOM，和旧的虚拟 DOM 对比后，只更新 `<p>` 标签的内容，而不会重新渲染整个 DOM 结构。

### React 18 生命周期方法有哪些？各自何时触发？

- **挂载阶段**：组件首次渲染到DOM时
  - `constructor()`：初始化state和绑定方法
  - `static getDerivedStateFromProps()`：根据props更新state
  - `render()`：渲染UI
  - `componentDidMount()`：DOM渲染完成后执行操作

- **更新阶段**：props或state变化时
  - `static getDerivedStateFromProps()`：同上，但在更新时调用
  - `shouldComponentUpdate()`：决定是否需要重新渲染
  - `render()`：重新渲染UI
  - `getSnapshotBeforeUpdate()`：在DOM更新前获取信息
  - `componentDidUpdate()`：DOM更新完成后执行操作

- **卸载阶段**：组件从DOM中移除时
  - `componentWillUnmount()`：执行清理操作

- **错误处理**：渲染过程中出错时
  - `static getDerivedStateFromError()`：渲染备用UI
  - `componentDidCatch()`：记录错误信息

### 原理与使用场景

:::details 挂载阶段

组件被创建并插入DOM的过程：

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // 初始化状态和绑定方法的地方
  }
  
  static getDerivedStateFromProps(props, state) {
    // 根据props计算并返回新的state
    if (props.initialCount !== state.count) {
      return { count: props.initialCount };
    }
    return null; // 不更新state则返回null
  }
  
  componentDidMount() {
    // 组件挂载后执行，适合：
    // - 网络请求获取数据
    // - 添加事件监听器
    // - 设置定时器
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  
  render() {
    // 返回要渲染的JSX
    return <div>Count: {this.state.count}</div>;
  }
}
```

:::

:::details 更新阶段

当props或state变化时，组件重新渲染的过程：

```jsx
class UpdateComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 性能优化：决定是否需要重新渲染
    // 返回false则跳过本次渲染
    return nextProps.value !== this.props.value;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在DOM更新前捕获一些信息（如滚动位置）
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // DOM已更新，可以：
    // - 对比新旧props进行操作
    // - 使用getSnapshotBeforeUpdate返回的值
    if (snapshot !== null) {
      this.listRef.current.scrollTop = 
        this.listRef.current.scrollHeight - snapshot;
    }
  }
}
```

:::

::: details 卸载和错误处理

```jsx
class CleanupComponent extends React.Component {
  componentWillUnmount() {
    // 组件卸载前执行清理操作：
    // - 清除定时器
    // - 取消网络请求
    // - 移除事件监听器
    document.removeEventListener('click', this.handleClick);
    clearInterval(this.intervalId);
  }
}

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    // 更新state以显示备用UI
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    // 记录错误信息
    console.error('Error caught:', error, info);
    // 可以将错误上报给服务器
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>出错了，请稍后再试</h1>;
    }
    return this.props.children;
  }
}
```

:::

## React 组件有哪几种？分别有什么区别？

### 核心答案

React 组件主要分为函数组件和类组件。函数组件是用函数声明的组件，主要用于展示和逻辑复用；类组件是用 ES6 class 声明的组件，拥有更多生命周期方法和状态管理能力。React 16.8 之后，函数组件通过 Hooks 也能实现状态和副作用管理。

### 原理讲解

- **函数组件**：本质是一个接收 props 并返回 React 元素的普通函数。自从 Hooks 出现后，函数组件也能拥有自己的状态和副作用逻辑。
- **类组件**：通过继承 `React.Component` 创建，可以使用生命周期方法（如 `componentDidMount`、`componentDidUpdate` 等）和 `this.state` 管理状态。
- 现在推荐优先使用函数组件，因其语法更简洁，逻辑复用性更强。

::: details 示例代码

**函数组件：**

```jsx
function Hello(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

**类组件：**

```jsx
import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

:::

## 什么是受控组件和非受控组件？

### 核心答案

受控组件是指表单元素的值由 React 状态控制，非受控组件则是由 DOM 自身维护状态，通过 ref 获取值。

### 原理讲解

- **受控组件**：表单元素的 value 受 React state 控制，所有数据流都在 React 内部，便于统一管理和校验。
- **非受控组件**：表单元素的值存储在 DOM 节点中，通常通过 ref 获取，适合简单场景或与第三方库集成。

::: details 示例代码

**受控组件：**

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <input value={value} onChange={e => setValue(e.target.value)} />
  );
}
```

**非受控组件：**

```jsx
function UncontrolledInput() {
  const inputRef = React.useRef();
  const handleClick = () => {
    alert(inputRef.current.value);
  };
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>获取值</button>
    </>
  );
}
```

:::

## React 中如何实现父子组件通信？兄弟组件通信呢？

**核心答案**

React 中父子组件通信主要通过 props 实现，父组件通过 props 向子组件传递数据或回调函数。兄弟组件通信通常通过“状态提升”到它们的共同父组件，再由父组件通过 props 分发，或者借助 Context、Redux 等全局状态管理工具实现。

**原理讲解**

- **父传子**：父组件将数据或函数作为 props 传递给子组件，子组件通过 props 接收和使用，实现数据下传或事件回调。
- **子传父**：父组件将回调函数作为 props 传递给子组件，子组件在需要时调用该函数并传递数据，实现向父组件“上报”信息。
- **兄弟通信**：
  - **状态提升**：将需要共享的数据提升到最近的共同父组件，由父组件统一管理状态，并通过 props 分发给各个子组件。这样兄弟组件间可以间接通信。
  - **全局状态管理**：对于更复杂的通信需求，可以使用 Context、Redux 等全局状态管理工具，实现跨层级、跨兄弟组件的数据共享和通信。

::: details 示例代码

```jsx
// 父传子、子传父通信
import React, { useState } from 'react';

// 子组件，接收父组件传递的回调
function Child({ onSend }) {
  return (
    <button onClick={() => onSend('来自子组件的数据')}>
      点我向父组件传递数据
    </button>
  );
}

// 父组件
function Parent() {
  const handleChildSend = (data) => {
    alert('父组件收到：' + data);
  };
  return (
    <div>
      <Child onSend={handleChildSend} />
    </div>
  );
}
```

```jsx
// 兄弟组件通信（状态提升）
import React, { useState } from 'react';

function SiblingA({ onChange }) {
  return (
    <button onClick={() => onChange('A的数据')}>
      A 发送数据
    </button>
  );
}

function SiblingB({ data }) {
  return <div>B 接收到：{data}</div>;
}

function Parent() {
  const [data, setData] = useState('');
  return (
    <div>
      <SiblingA onChange={setData} />
      <SiblingB data={data} />
    </div>
  );
}
```

```jsx
// 兄弟组件通信（Context 示例）
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

function SiblingA() {
  const { setData } = useContext(DataContext);
  return (
    <button onClick={() => setData('A通过Context发送的数据')}>
      A 通过Context发送
    </button>
  );
}

function SiblingB() {
  const { data } = useContext(DataContext);
  return <div>B 通过Context接收到：{data}</div>;
}

function Parent() {
  const [data, setData] = useState('');
  return (
    <DataContext.Provider value={{ data, setData }}>
      <SiblingA />
      <SiblingB />
    </DataContext.Provider>
  );
}
```

:::

## setState 是同步还是异步的？为什么？

### 核心答案

在 React 的合成事件和生命周期中，`setState` 是"异步"的（批量更新），在原生事件和 setTimeout 中是同步的。异步是为了性能优化，减少不必要的重复渲染。

### 原理讲解

React 会将多次 `setState` 操作合并为一次批量更新，提升性能。在 React 的合成事件和生命周期方法中，`setState` 不会立即更新 state，而是将更新放入队列，等事件循环结束后统一执行。但在原生事件或定时器中，`setState` 会同步执行。

::: details 示例代码

```jsx
function Demo() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // 这里拿到的是旧值
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

:::

点击按钮时，`console.log` 输出的还是旧值，说明 `setState` 是异步的。

## 你如何优化 React 应用的性能？

### 核心答案

优化 React 应用性能的常见方法包括：使用 React.memo、useMemo、useCallback 避免不必要的渲染，合理拆分组件，使用虚拟列表（如 react-window）、代码分割与懒加载（React.lazy/Suspense），避免匿名函数和不必要的 state，合理设置 key，减少重渲染范围，利用 PureComponent/shouldComponentUpdate，按需加载资源等。

### 原理讲解

1. **组件缓存与避免重复渲染**  
   - 使用 `React.memo` 对函数组件进行 props 浅比较，只有 props 变化时才重新渲染。
   - `useMemo` 缓存计算结果，`useCallback` 缓存函数引用，防止因父组件渲染导致子组件重复渲染。
   - 类组件可用 `PureComponent` 或重写 `shouldComponentUpdate`。

2. **代码分割与懒加载**  
   - 利用 `React.lazy` 和 `Suspense` 实现组件级按需加载，减少首屏体积。
   - 路由级代码分割可结合 Webpack 动态 import。

3. **虚拟列表**  
   - 对长列表只渲染可视区域（如 `react-window`、`react-virtualized`），大幅减少 DOM 数量。

4. **避免匿名函数和不必要的 state**  
   - 每次渲染生成新函数会导致子组件重新渲染，建议用 useCallback 或将函数定义在组件外部。
   - 只将真正需要响应 UI 的数据放入 state，避免无关数据引发渲染。

5. **合理设置 key**  
   - key 唯一且稳定，避免因 key 变化导致的无效渲染。

6. **合并/批量更新**  
   - 利用 React 的批量更新机制，减少渲染次数。

7. **按需加载资源**  
   - 图片、第三方库等资源按需加载，减少初始加载压力。

### 示例代码

::: details 组件缓存与避免重复渲染

```jsx
import React, { useMemo, useCallback } from 'react';

// 子组件用 React.memo 包裹，避免无关渲染
const List = React.memo(({ items, onItemClick }) => {
  return items.map(item => (
    <div key={item.id} onClick={() => onItemClick(item.id)}>
      {item.value}
    </div>
  ));
});

function App({ data }) {
  // useMemo 缓存过滤结果
  const filtered = useMemo(() => data.filter(item => item.active), [data]);
  // useCallback 缓存函数引用
  const handleItemClick = useCallback((id) => {
    console.log('点击了', id);
  }, []);

  return <List items={filtered} onItemClick={handleItemClick} />;
}
```

:::

::: details 代码分割与懒加载

```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

:::

::: details 虚拟列表（react-window 示例）

```jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

function VirtualizedList() {
  return (
    <List
      height={400}
      itemCount={10000}
      itemSize={35}
      width={300}
    >
      {Row}
    </List>
  );
}
```

:::

::: details 合理设置 key

```jsx
const items = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' }
];

function Demo() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

:::

::: details PureComponent/shouldComponentUpdate 优化

```jsx
import React, { PureComponent } from 'react';

class Demo extends PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}

// 或者自定义 shouldComponentUpdate
class Custom extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }
  render() {
    return <div>{this.props.value}</div>;
  }
}
```

:::

## React 中的 key 有什么作用？为什么要用 key？

### 核心答案

key 用于唯一标识列表中的每一个元素，帮助 React 更高效地识别哪些元素发生了变化、添加或删除，从而实现最小化的 DOM 操作。

### 原理讲解

在渲染列表时，React 通过 key 判断哪些元素需要复用、哪些需要新建或删除。如果没有 key 或 key 不唯一，React 会采用默认的索引，可能导致不必要的 DOM 更新，影响性能和组件状态。

::: details 示例代码

```jsx
const list = [{id: 1, name: 'A'}, {id: 2, name: 'B'}];

function Demo() {
  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

:::

## 什么是高阶组件（HOC）？它的应用场景有哪些？

### 核心答案

高阶组件（HOC, Higher-Order Component）是一个函数，接收一个组件并返回一个新的组件，用于复用组件逻辑、增强组件功能。

### 原理讲解

高阶组件本质上是一个函数，参数是一个组件，返回值是一个增强后的新组件。HOC 通过 props 代理、反向继承等方式，实现逻辑复用、权限控制、数据注入、跨组件通信等功能。常见场景有：权限校验、日志埋点、主题切换、表单处理等。

::: details 示例代码

```jsx
function withLogger(WrappedComponent) {
  return function(props) {
    console.log('props:', props);
    return <WrappedComponent {...props} />;
  };
}

function Hello(props) {
  return <div>Hello, {props.name}</div>;
}

const HelloWithLogger = withLogger(Hello);

// 使用 <HelloWithLogger name="React" />
```

:::

## 什么是 hooks？常用的 hooks 有哪些？

### 核心答案

Hooks 是 React 16.8 引入的函数，允许在函数组件中使用 state、生命周期等特性。常用的 hooks 有 useState、useEffect、useContext、useMemo、useCallback、useRef 等。

### 原理讲解

Hooks 解决了函数组件无法拥有自身状态和副作用的问题。通过 useState 管理状态，useEffect 处理副作用，useContext 访问上下文，useMemo/useCallback 优化性能，useRef 获取 DOM 或保存变量。自定义 hooks 还能复用逻辑。

::: details 示例代码

```jsx
import React, { useState, useEffect } from 'react';

function Demo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `计数：${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

:::

## useEffect 和 useLayoutEffect 有什么区别？

### 核心答案

useEffect 在浏览器完成布局与绘制后异步执行，useLayoutEffect 在 DOM 更新后、浏览器绘制前同步执行。useLayoutEffect 适合需要同步读取布局或强制同步更新 DOM 的场景。

### 原理讲解

- useEffect：不会阻塞浏览器渲染，适合处理副作用（如数据请求、事件监听等）。
- useLayoutEffect：会阻塞浏览器绘制，适合需要读取 DOM 布局并同步修改的场景（如测量、动画等）。
- 一般优先用 useEffect，只有确实需要同步操作 DOM 时才用 useLayoutEffect。

::: details 示例代码

```jsx
import React, { useEffect, useLayoutEffect, useRef } from 'react';

function Demo() {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.style.color = 'red';
  }, []);

  useEffect(() => {
    console.log('useEffect 执行');
  }, []);

  return <div ref={ref}>Hello</div>;
}
```

```jsx
import React, { useEffect } from 'react';

function Demo() {
  useEffect(() => {
    console.log('组件挂载完成');
  }, []);

  return <div>只执行一次的副作用</div>;
}
```

:::

## Redux 的工作原理是什么？有哪些核心概念？

### 核心答案

Redux 通过单一状态树（Store）集中管理应用状态，所有状态变更都通过派发 action，并由 reducer 纯函数处理，最终返回新的状态，实现可预测的数据流和状态管理。核心概念包括 Store、Action、Reducer、Dispatch。

### 原理讲解

- **Store**：唯一的状态存储对象，保存整个应用的状态。
- **Action**：描述状态变化的普通对象，必须有 type 字段。
- **Reducer**：纯函数，接收旧状态和 action，返回新状态。
- **Dispatch**：派发 action，触发 reducer 执行。
- Redux 遵循"单向数据流"，所有状态变更可追溯、可预测，便于调试和维护。

::: details 示例代码

```jsx
// 定义 action
const increment = () => ({ type: 'INCREMENT' });

// 定义 reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

// 创建 store
import { createStore } from 'redux';
const store = createStore(counter);

// 派发 action
store.dispatch(increment());
console.log(store.getState()); // 输出 1
```

:::

## Redux 和 Context 有什么区别？

### 核心答案

Redux 是专门的全局状态管理库，适合复杂应用，拥有中间件、时间旅行等强大功能；Context 是 React 内置的轻量级跨组件数据传递方案，适合简单场景，不具备 Redux 的完整功能。

### 原理讲解

- **Redux**：集中式管理，支持中间件、异步、插件，适合大型项目和复杂状态逻辑。
- **Context**：用于跨层级传递数据，避免 props 层层传递，适合主题、语言等简单全局数据。
- Context 更新会导致所有消费组件重新渲染，Redux 通过 connect 精细控制渲染。

::: details 示例代码

**Context 用法：**

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemeButton />;
}

function ThemeButton() {
  const theme = React.useContext(ThemeContext);
  return <button>{theme}</button>;
}
```

:::

## 什么是合成事件？它和原生事件有什么区别？

### 核心答案

合成事件是 React 封装的跨浏览器事件对象，统一了不同浏览器的事件行为，提升了兼容性和性能。与原生事件不同，合成事件采用事件委托和池化机制。

### 原理讲解

- 合成事件由 React 实现，所有事件都绑定在根节点，通过事件委托机制分发，提高性能。
- 合成事件对象会被复用（池化），事件回调后属性会被清空，需异步访问时调用 event.persist()。
- 原生事件直接绑定在 DOM 元素上，兼容性和性能不如合成事件。

::: details 示例代码

```jsx
// 完整事件流程演示
// document捕获 → React捕获(父→子) → 原生捕获(父→子) → 原生冒泡(子→父) → React冒泡(子→父) → document冒泡

function EventDemo() {
  return (
    <div onClick={() => console.log('父元素React冒泡')}
         onClickCapture={() => console.log('父元素React捕获')}>
      <button onClick={() => console.log('子元素React冒泡')}
              onClickCapture={() => console.log('子元素React捕获')}>
        点击我
      </button>
    </div>
  );
}
```

:::

## React 中如何实现懒加载和代码分割？

### 核心答案

React 通过 React.lazy 和 Suspense 实现组件的懒加载和代码分割，按需加载资源，提升首屏性能。

### 原理讲解

- **React.lazy**：动态导入组件，只有在需要渲染时才加载对应代码。
- **Suspense**：用于包裹懒加载组件，提供加载中的 fallback UI。
- 结合 Webpack 等工具实现路由级、组件级代码分割。

::: details 示例代码

```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

:::

## 你如何防止组件重复渲染？

### 核心答案

可以通过 React.memo、useMemo、useCallback、shouldComponentUpdate、PureComponent 等手段，避免组件因无关数据变化或父组件渲染而重复渲染。

### 原理讲解

- **React.memo**：对函数组件进行浅层 props 对比，只有 props 变化时才重新渲染。
- **useMemo/useCallback**：缓存计算结果或函数，防止因父组件渲染导致子组件 props 变化。
- **shouldComponentUpdate/PureComponent**：类组件中通过浅比较 props 和 state，决定是否需要更新。
- 合理拆分组件、提升状态、减少匿名函数和对象的创建，也能减少无效渲染。

::: details 示例代码

```jsx
const Child = React.memo(function Child({ value }) {
  console.log('Child 渲染');
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <Child value={1} />
    </>
  );
}
```

:::

## 什么是 Fiber 架构？

### 核心答案

Fiber 架构是 React 16 引入的新协调引擎，实现了可中断、可恢复的异步渲染，使 React 能够更好地响应高优先级任务，提高页面流畅度。

### 原理讲解

- Fiber 将渲染任务拆分为更小的单元（fiber），每次只做一部分工作，空闲时再继续，避免长时间阻塞主线程。
- 支持优先级调度、任务中断与恢复、并发渲染等特性。
- 使 React 能够实现如时间分片、Suspense、并发模式等高级功能。

Fiber 是底层实现，开发者无需直接操作。可以通过 React 18 的并发特性体验 Fiber 带来的好处：

::: details 示例代码

```jsx
import { startTransition, useState } from 'react';

function Demo() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    startTransition(() => {
      setList(Array(10000).fill(v));
    });
  };

  return (
    <>
      <input value={value} onChange={handleChange} />
      <ul>
        {list.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </>
  );
}
```

:::

## React 中如何实现表单校验？

### 核心答案

可以通过受控组件结合自定义校验逻辑实现表单校验，也可以借助第三方库如 Formik、react-hook-form 实现更复杂的校验需求。

### 原理讲解

- 受控组件：表单值受 state 控制，onChange 时进行校验，设置错误提示。
- 第三方库：如 Formik、react-hook-form 提供更完善的表单管理和校验机制，支持异步校验、校验规则复用等。

::: details 示例代码

```jsx
// 简单自定义校验

function Demo() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    setError(v.length < 3 ? '长度不能小于3' : '');
  };

  return (
    <>
      <input value={value} onChange={handleChange} />
      {error && <span style={{color: 'red'}}>{error}</span>}
    </>
  );
}
```

:::

## 你如何理解 React 的单向数据流？

### 核心答案

React 的单向数据流指的是数据只能由父组件通过 props 向下传递到子组件，子组件不能直接修改父组件的数据，只能通过回调通知父组件更新。

### 原理讲解

- 数据流动方向始终是自上而下，便于追踪和维护状态变化。
- 子组件如需影响父组件数据，需通过 props 传递回调函数，由父组件处理数据更新。
- 单向数据流有助于应用结构清晰、状态可控，减少数据混乱。

::: details 示例代码

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount(count + 1)} />;
}

function Child({ count, onIncrement }) {
  return (
    <>
      <div>{count}</div>
      <button onClick={onIncrement}>增加</button>
    </>
  );
}
```

:::

## React 中如何实现服务端渲染（SSR）？

### 核心答案

React SSR 通过在服务器端将组件渲染为 HTML 字符串，发送到客户端后再"水合"成可交互的 React 应用，常用工具有 Next.js、react-dom/server。

### 原理讲解

- 服务器端用 `renderToString` 或 `renderToPipeableStream` 将 React 组件渲染为 HTML。
- 客户端接收到 HTML 后，React 通过 hydrate方法接管页面，实现无缝切换为 SPA。
- SSR 提升首屏渲染速度和 SEO，但实现和部署更复杂。

::: details 示例代码

```js
// 服务端
import { renderToString } from 'react-dom/server';
import App from './App';

const html = renderToString(<App />);
```

```js
// 客户端
import { hydrateRoot } from 'react-dom/client';
import App from './App';

hydrateRoot(document.getElementById('root'), <App />);
```

:::

## 什么是 React Portals？应用场景有哪些？

### 核心答案

React Portals 允许将子节点渲染到父组件以外的 DOM 节点中，常用于模态框、弹窗、全局提示等需要"脱离"当前组件层级的场景。

### 原理讲解

- 通过 `ReactDOM.createPortal(child, container)`，可以将组件渲染到指定的 DOM 节点（如 body）下。
- 解决了 z-index、样式隔离、事件冒泡等问题，便于实现全局层级的 UI 组件。

::: details 示例代码

```jsx
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body
  );
}

// 使用
<Modal>这是一个弹窗</Modal>
```

:::

## 你如何处理 React 项目中的错误边界？

### 核心答案

通过类组件实现错误边界，重写 `componentDidCatch` 和 `getDerivedStateFromError` 方法，捕获子组件渲染、生命周期、构造函数中的错误，优雅地展示降级 UI。

### 原理讲解

- 错误边界只能用类组件实现，不能捕获事件处理、异步、服务端渲染等错误。
- 当子组件抛出错误时，错误边界会渲染备用 UI，防止整个应用崩溃。
- 常用于全局错误提示、局部降级等场景。

::: details 示例代码

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 可以上报错误信息
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>出错了！</h2>;
    }
    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

:::

## React 中如何实现动画效果？

### 核心答案

React 实现动画可以通过 CSS 动画、原生 JS 动画，或使用第三方库如 react-transition-group、framer-motion 等，结合组件的生命周期或状态变化控制动画。

### 原理讲解

- **CSS 动画**：通过 className 切换触发 CSS3 动画或过渡。
- **JS 动画**：用 requestAnimationFrame 或第三方库控制样式变化。
- **react-transition-group**：提供 Transition、CSSTransition 等组件，配合状态切换实现进出场动画。
- **framer-motion**：更强大的动画库，支持物理动画、手势等。

::: details 示例代码

```jsx
// react-transition-group 示例：

import { CSSTransition } from 'react-transition-group';
import './fade.css';

function Demo({ show }) {
  return (
    <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
      <div className="box">动画内容</div>
    </CSSTransition>
  );
}
```

```css
/** fade.css */
.fade-enter { opacity: 0; }
.fade-enter-active { opacity: 1; transition: opacity 300ms; }
.fade-exit { opacity: 1; }
.fade-exit-active { opacity: 0; transition: opacity 300ms; }
```

:::

## 你如何理解 React 的 Context API？

### 核心答案

Context API 用于在组件树中跨层级传递数据，避免 props 层层传递，适合全局主题、用户信息等场景。

### 原理讲解

- 通过 `React.createContext` 创建上下文对象，`Provider` 提供数据，`Consumer` 或 `useContext` 消费数据。
- Context 更新会导致所有消费组件重新渲染，适合全局性、稳定性高的数据。

::: details 示例代码

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemeButton />;
}

function ThemeButton() {
  const theme = React.useContext(ThemeContext);
  return <button>{theme}</button>;
}
```

:::

## React 18 有哪些新特性？

### 核心答案

React 18 引入了并发特性（Concurrent Features）、自动批处理（Automatic Batching）、`startTransition`、`useId`、`useSyncExternalStore`、`useInsertionEffect`、改进的 SSR（如 streaming SSR）等新特性，提升了性能和开发体验。

### 原理讲解

- **并发特性**：支持并发渲染，提升响应速度和流畅度。
- **自动批处理**：自动将多次状态更新合并，减少渲染次数。
- **startTransition**：区分紧急和非紧急更新，提升交互流畅性。
- **useId**：为服务端渲染和客户端生成一致的唯一 ID。
- **useSyncExternalStore**：为外部状态管理库提供一致的订阅机制。
- **useInsertionEffect**：在 DOM 变更前插入样式，适合 CSS-in-JS。
- **改进 SSR**：支持流式渲染，提升首屏速度。

::: details 示例代码

```jsx
import { useState, startTransition } from 'react';

function Demo() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
    startTransition(() => {
      setList(Array(10000).fill(e.target.value));
    });
  };

  return (
    <>
      <input value={value} onChange={handleChange} />
      <ul>
        {list.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </>
  );
}
```

:::

## 什么是 PureComponent？和 Component 有什么区别？

### 核心答案

PureComponent 是 React 提供的优化型类组件，自动实现了浅层 props 和 state 对比，只有数据变化时才会重新渲染，减少无效渲染。Component 没有此优化。

### 原理讲解

- **Component**：每次父组件渲染，子组件默认也会渲染。
- **PureComponent**：重写了 shouldComponentUpdate，自动进行浅比较，只有 props 或 state 发生实际变化时才渲染。
- 适合 props 和 state 结构简单、无深层嵌套的场景。

::: details 示例代码

```jsx
import React, { PureComponent } from 'react';

class Demo extends PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}

// 使用
<Demo value={1} /> 
```

:::

## 什么是 Context.Provider 和 Context.Consumer？

### 核心答案

Context.Provider 用于在组件树中提供上下文数据，Context.Consumer 用于消费这些数据，实现跨层级数据传递。

### 原理讲解

- **Provider**：通过 value 属性向下传递数据，所有后代组件都能访问。
- **Consumer**：通过函数作为子组件的方式获取上下文数据。
- 也可以用 useContext 钩子在函数组件中消费数据。

::: details 示例代码

```jsx
const MyContext = React.createContext('default');

function App() {
  return (
    <MyContext.Provider value="hello">
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  return (
    <MyContext.Consumer>
      {value => <div>{value}</div>}
    </MyContext.Consumer>
  );
}
```

:::

## 你如何理解 React 的批量更新机制？

### 核心答案

React 会将多次 setState 合并为一次批量更新，减少渲染次数，提升性能。批量更新主要发生在合成事件、生命周期等 React 管理的环境中。

### 原理讲解

- 在 React 的事件处理、生命周期等环境下，setState 不会立即更新，而是放入队列，事件循环结束后统一执行。
- 在 setTimeout、原生事件等环境下，setState 是同步的。
- React 18 开始，自动批处理范围更广，包括异步回调等。

::: details 示例代码

```jsx
function Demo() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 2);
    // 实际只会渲染一次，最终 count 只加 2
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

:::

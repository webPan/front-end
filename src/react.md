
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

**挂载阶段**

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

**更新阶段**

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

**卸载和错误处理**

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

## state 和 props 有什么区别？

### state和props的主要区别

- **props**
  - 从父组件接收的数据
  - 不可在组件内部直接修改
  - 用于组件间通信
  - 可以包含任何类型的数据，包括函数

- **state**
  - 组件内部管理的数据
  - 可以使用setState（类组件）或useState（函数组件）修改
  - 状态变化会触发组件重新渲染
  - 应该尽可能保持简洁，只存储UI渲染必需的数据

### 原理与区别解析

**props的特点**

props是"属性"的缩写，它是React组件的输入，是从父组件传递给子组件的数据。props具有只读性，子组件不能直接修改接收到的props：

```jsx
// 父组件
function ParentComponent() {
  return <ChildComponent name="React" version={18} />;
}

// 子组件
function ChildComponent(props) {
  // 正确：读取props
  return <p>Hello, {props.name} {props.version}</p>;
  
  // 错误：不能直接修改props
  // props.name = "Angular"; // 这会导致错误
}
```

**state的特点**

state表示组件的内部状态，由组件自己管理和更新：

```jsx
// 类组件中的state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // 初始化state
  }
  
  increment = () => {
    // 使用setState更新state
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>增加</button>
      </div>
    );
  }
}

// 函数组件中的state (使用Hooks)
function CounterHooks() {
  const [count, setCount] = useState(0); // 初始化state
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

**主要区别的实际应用**

1. **数据流向不同**：
   - props是从上到下的单向数据流
   - state是组件内部的数据源

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]); // 父组件的state
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };
  
  return (
    <div>
      <TodoForm onAddTodo={addTodo} /> {/* 传递函数作为props */}
      <TodoList items={todos} /> {/* 传递数据作为props */}
    </div>
  );
}
```

2. **修改方式不同**：
   - props由父组件决定并传入，子组件不能直接修改
   - state可以通过setState或useState的更新函数直接修改

3. **触发渲染的时机**：
   - 当父组件重新渲染时，子组件的props可能会更新，触发子组件重新渲染
   - 当组件自身的state变化时，该组件会重新渲染

## React Hooks有哪些常用的，它们各自的用途是什么？

### 常用的React Hooks及其用途

- **useState**: 在函数组件中添加状态管理
- **useEffect**: 处理副作用，如数据获取、订阅、DOM操作等
- **useContext**: 获取上下文数据，实现跨组件通信
- **useReducer**: 处理复杂的状态逻辑，类似Redux的状态管理
- **useCallback**: 缓存回调函数，避免不必要的重新渲染
- **useMemo**: 缓存计算结果，优化性能
- **useRef**: 创建可变的引用，访问DOM元素或保存变量

### 原理与使用示例

**useState**: 添加本地状态到函数组件

```jsx
import React, { useState } from 'react';

function Counter() {
  // 声明一个状态变量count，初始值为0，以及更新函数setCount
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击增加
      </button>
      <button onClick={() => setCount(0)}>
        重置
      </button>
    </div>
  );
}
```

**useEffect**: 处理组件中的副作用操作

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 当userId变化时执行获取数据
    setLoading(true);
    
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
      
    // 清理函数（可选）- 组件卸载或依赖变化前执行
    return () => {
      // 取消请求、清除订阅等
      console.log('清理前一个useEffect');
    };
  }, [userId]); // 依赖数组 - 仅当userId变化时执行
  
  if (loading) return <div>加载中...</div>;
  if (!user) return <div>未找到用户</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

**useContext**: 获取上下文数据，跨组件共享状态

```jsx
import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const ThemeContext = createContext();

// 提供上下文的组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 消费上下文的组件
function ThemedButton() {
  // 使用useContext获取上下文数据
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        border: '1px solid #ccc',
        padding: '8px 16px'
      }}
    >
      当前主题: {theme}，点击切换
    </button>
  );
}

// 应用组件
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: 20 }}>
        <h1>主题演示</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}
```

**useReducer**: 处理复杂状态逻辑

```jsx
import React, { useReducer } from 'react';

// 定义初始状态
const initialState = { count: 0 };

// 定义reducer函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('未知的action类型');
  }
}

function Counter() {
  // 使用useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  );
}
```

**useCallback和useMemo**: 性能优化

```jsx
import React, { useState, useCallback, useMemo } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // 使用useCallback缓存函数
  const handleSearch = useCallback((searchQuery) => {
    console.log('搜索:', searchQuery);
    // 实际应用中这里可能是API调用
    setResults([`结果1-${searchQuery}`, `结果2-${searchQuery}`]);
  }, []); // 空依赖数组，函数不会重新创建
  
  // 使用useMemo缓存计算结果
  const processedResults = useMemo(() => {
    console.log('处理结果');
    return results.map(item => item.toUpperCase());
  }, [results]); // 仅当results变化时重新计算
  
  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="输入搜索词"
      />
      <button onClick={() => handleSearch(query)}>搜索</button>
      <ul>
        {processedResults.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

**useRef**: 访问DOM或保存变量

```jsx
import React, { useRef, useEffect, useState } from 'react';

function TextInputWithFocus() {
  // 创建ref
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);
  
  // 使用ref存储值（不触发重新渲染）
  useEffect(() => {
    countRef.current += 1;
  });
  
  // 触发重新渲染的计数器
  const incrementRender = () => {
    setRenderCount(renderCount + 1);
  };
  
  // 使用ref操作DOM
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} placeholder="点击下方按钮聚焦" />
      <button onClick={focusInput}>聚焦输入框</button>
      
      <div>
        <p>组件渲染次数 (useState): {renderCount}</p>
        <p>组件渲染次数 (useRef): {countRef.current}</p>
        <button onClick={incrementRender}>
          增加渲染计数（触发重新渲染）
        </button>
      </div>
    </div>
  );
}
```

## 什么是虚拟DOM？它如何提升性能？

### 虚拟DOM的核心概念

虚拟DOM（Virtual DOM）是React中的一种编程概念，它是对真实DOM的一种轻量级JavaScript对象表示，存在于内存中。React通过虚拟DOM实现了高效的UI更新，它的工作原理如下：

- 维护一个虚拟DOM树，表示UI的当前状态
- 当状态变化时，创建一个新的虚拟DOM树
- 通过Diffing算法比较新旧虚拟DOM树的差异
- 只将必要的变更应用到真实DOM，而不是重新渲染整个页面

### 虚拟DOM如何提升性能

**批量更新减少DOM操作**

直接操作DOM是昂贵的，每次DOM更改都可能触发浏览器的重排（reflow）和重绘（repaint）。React的虚拟DOM机制通过以下方式优化性能：

```jsx
// 假设我们需要更新列表中的多个项目
function DirectDOMUpdate() {
  // 直接DOM操作方式（昂贵）
  const updateList = () => {
    const list = document.getElementById('list');
    // 每次操作都会触发DOM更新
    list.children[0].textContent = 'Updated Item 1';
    list.children[1].textContent = 'Updated Item 2';
    list.children[2].textContent = 'Updated Item 3';
    // 多次触发重排和重绘
  };
  
  return <button onClick={updateList}>直接更新DOM</button>;
}

// React的虚拟DOM方式
function ReactVirtualDOM() {
  const [items, setItems] = useState([
    'Item 1', 'Item 2', 'Item 3'
  ]);
  
  const updateList = () => {
    // 一次性更新状态
    setItems([
      'Updated Item 1',
      'Updated Item 2', 
      'Updated Item 3'
    ]);
    // React会批量处理更新，只进行一次真实DOM更新
  };
  
  return (
    <>
      <ul id="list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={updateList}>React更新</button>
    </>
  );
}
```

**高效的Diff算法**

React使用一种高效的Diff算法，该算法具有以下特点：

1. **层级比较**：React只会比较同一层级的节点，不会跨层级比较，将算法复杂度从O(n³)降至O(n)
2. **类型比较**：不同类型的元素会产生不同的树结构
3. **Key属性标识**：通过key属性帮助React识别哪些元素被添加、删除或移动

```jsx
// 使用key属性帮助React高效更新列表
function EfficientList({ users }) {
  return (
    <ul>
      {users.map(user => (
        // 使用唯一的key帮助React识别每个项目
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// 错误示例：不提供key或使用索引作为key（在项目顺序改变时会有性能问题）
function IneffificientList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}> {/* 不推荐在可能重排序的列表中使用索引作为key */}
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

**虚拟DOM的工作流程**

```
状态变化 → 创建新的虚拟DOM树 → Diff算法比较差异 → 计算最小更新操作 → 批量更新真实DOM
```

React的虚拟DOM机制通过将复杂的DOM操作转换为高效的JavaScript运算，显著提高了Web应用的性能和用户体验，特别是在处理大量数据和频繁更新的场景中。

## useEffect和useLayoutEffect的区别是什么？

### 核心区别

- **执行时机不同**：
  - `useEffect` 在浏览器完成渲染后异步执行
  - `useLayoutEffect` 在DOM更新后同步执行，但在浏览器绘制前执行

- **使用场景不同**：
  - `useEffect` 适用于大多数副作用，如数据获取、事件订阅等
  - `useLayoutEffect` 适用于需要在用户看到更新前进行DOM测量或操作的场景

### 两者工作原理对比

**执行顺序**

React组件更新流程中，两个Hook的执行顺序如下：

1. React更新DOM
2. `useLayoutEffect`回调执行（同步）
3. 浏览器绘制屏幕
4. `useEffect`回调执行（异步）

```jsx
import React, { useState, useEffect, useLayoutEffect } from 'react';

function EffectComparison() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('useEffect执行');
    // 在浏览器绘制后异步执行
  }, [count]);
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect执行');
    // 在DOM更新后、浏览器绘制前同步执行
  }, [count]);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

**实际应用示例：避免视觉闪烁**

使用`useLayoutEffect`可以避免因DOM更改导致的视觉闪烁：

```jsx
function FlickeringComponent() {
  const [width, setWidth] = useState(0);
  
  // 使用useEffect - 可能导致闪烁
  // useEffect(() => {
  //   // DOM已经绘制，用户可能会看到width从0到随机值的变化
  //   setWidth(Math.random() * 200);
  // }, []);
  
  // 使用useLayoutEffect - 避免闪烁
  useLayoutEffect(() => {
    // 在浏览器绘制前执行，用户不会看到中间状态
    setWidth(Math.random() * 200);
  }, []);
  
  return (
    <div>
      <div
        style={{
          width: width + 'px',
          height: '20px',
          backgroundColor: 'red',
          transition: 'none'
        }}
      />
      <button onClick={() => setWidth(Math.random() * 200)}>
        改变宽度
      </button>
    </div>
  );
}
```

**性能考虑**

`useLayoutEffect`是同步执行的，会阻塞浏览器绘制，如果执行耗时操作可能会导致性能问题：

```jsx
function PerformanceExample() {
  // 不推荐：在useLayoutEffect中执行耗时操作
  useLayoutEffect(() => {
    // 这会阻塞浏览器绘制
    for (let i = 0; i < 100000; i++) {
      // 耗时计算...
    }
  }, []);
  
  // 推荐：将耗时操作放在useEffect中
  useEffect(() => {
    // 浏览器已完成绘制，用户可以看到内容
    // 现在可以执行耗时操作
    for (let i = 0; i < 100000; i++) {
      // 耗时计算...
    }
  }, []);
  
  return <div>内容</div>;
}
```

**总结**

- 大多数情况下，应优先使用`useEffect`，它不会阻塞浏览器绘制
- 只有在需要在用户看到更新前进行DOM测量或防止视觉闪烁时，才考虑使用`useLayoutEffect`
- `useLayoutEffect`的行为类似于类组件中的`componentDidMount`和`componentDidUpdate`

## React中为什么要使用key属性？不使用会有什么问题？

### key属性的作用与必要性

key属性是React用于标识列表中元素的特殊属性，它帮助React识别哪些元素发生了变化、被添加或被删除。为列表项提供稳定、唯一的key值对React的渲染优化至关重要，具体作用有：

- 提高DOM更新效率，避免不必要的重新渲染
- 在列表项顺序变化时保持元素状态
- 帮助React精确识别元素变化，使Diff算法更高效

### 不使用key属性的问题

**渲染效率降低**

当没有提供key或使用索引作为key时，如果列表顺序发生变化：

```jsx
// 问题示例：使用索引作为key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" checked={todo.completed} />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// 如果todos数组重新排序、添加或删除元素，React会对所有元素进行重新渲染
// 因为React无法准确知道哪些元素变化了
```

**状态混乱**

当元素顺序变化而使用索引作为key时，可能会导致状态错乱：

```jsx
function ProblematicInputList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input type="text" defaultValue={item} />
        </li>
      ))}
    </ul>
  );
}

// 如果items数组前端添加了新元素：["apple", "banana"] => ["orange", "apple", "banana"]
// 输入框的值不会随着顺序变化而更新，导致UI与数据不一致
```

### 正确使用key属性的实践

**1. 使用唯一ID作为key**

```jsx
function GoodTodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

**2. 使用稳定且唯一的特征作为key**

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.email /* 假设email是唯一的 */}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

**3. 仅在必要时使用索引作为key**

仅当列表是静态的（不会重新排序、添加或删除元素）时，才能考虑使用索引作为key：

```jsx
function StaticList() {
  const items = ["第一项", "第二项", "第三项"]; // 静态列表，不会变化
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

正确使用key属性可以帮助React实现高效的DOM更新，提升应用性能，并确保组件状态与预期一致。

## useState Hook的工作原理是什么？

### useState的基本工作原理

useState是React Hooks中最基础的一个，它允许函数组件拥有自己的状态。useState的工作原理涉及到以下几个关键机制：

- **闭包**：利用JavaScript闭包保存组件的状态
- **调度更新**：状态更新会触发组件重新渲染
- **批处理**：多个状态更新可能会被批处理以提高性能

### 原理详解与内部实现

**1. 状态初始化与保存**

React在组件首次渲染时创建一个"记忆单元"来存储状态值：

```jsx
function Counter() {
  // 当组件首次渲染时，React会创建一个记忆单元存储状态
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

// 内部简化实现可以理解为：
let _state; // 模拟React内部存储状态的变量

function useState(initialValue) {
  // 首次渲染时初始化状态
  if (_state === undefined) {
    _state = initialValue;
  }
  
  // 创建更新函数
  const setState = newValue => {
    _state = newValue;
    // 触发组件重新渲染
    rerender();
  };
  
  return [_state, setState];
}
```

**2. 函数式更新**

useState提供了函数式更新的能力，可以基于先前的状态计算新状态：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // 函数式更新保证使用最新的state值
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    
    // 如果连续调用，下面的方式可能不会正确累加
    // setCount(count + 1);
    // setCount(count + 1); // 这里的count还是原来的值
  };
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={handleIncrement}>增加</button>
    </div>
  );
}
```

**3. 惰性初始化**

当初始状态需要复杂计算时，可以传递函数给useState以惰性初始化状态：

```jsx
function ExpensiveInitComponent() {
  // 这个函数只会在首次渲染时执行一次
  const [state, setState] = useState(() => {
    console.log('执行昂贵的计算...');
    // 假设这是一个复杂的计算
    return performExpensiveCalculation();
  });
  
  return <div>{state}</div>;
}

function performExpensiveCalculation() {
  // 模拟复杂计算
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}
```

**4. 批处理更新**

React会批量处理状态更新以提高性能：

```jsx
function BatchUpdateExample() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  const handleClick = () => {
    // 在React 18中，这两个更新会被批处理，只触发一次重新渲染
    setCount(c => c + 1);
    setFlag(f => !f);
    
    // 在React 17及之前，批处理仅在React事件处理函数中有效
    // 在异步回调中则不会自动批处理
    // setTimeout(() => {
    //   setCount(c => c + 1); // 触发一次重新渲染
    //   setFlag(f => !f);    // 触发另一次重新渲染
    // }, 0);
  };
  
  console.log('组件渲染');
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Flag: {flag.toString()}</p>
      <button onClick={handleClick}>更新状态</button>
    </div>
  );
}
```

**5. 组件实例与状态关联**

React通过"Fiber"节点跟踪每个组件实例的状态：

```jsx
// 每个组件实例都有自己的状态
function ParentComponent() {
  return (
    <div>
      <Counter initialCount={0} /> {/* 独立的状态实例 */}
      <Counter initialCount={10} /> {/* 独立的状态实例 */}
    </div>
  );
}

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

通过理解useState的工作原理，可以更好地利用这个Hook管理组件状态，避免常见的问题，并编写出高效、可靠的React应用程序。

## React中的Fragment是什么？有什么用途？

### Fragment的基本概念

React Fragment是一种特殊的组件类型，允许你在不添加额外DOM节点的情况下对一组元素进行分组。使用Fragment包裹多个元素时，这些元素不会在DOM中生成额外的父元素，避免了无意义的嵌套。

Fragment有两种写法：

- 完整写法：`<React.Fragment>...</React.Fragment>`
- 简写语法：`<>...</>`（不支持key属性）

### Fragment的实际应用

**1. 返回多个元素而不增加额外DOM节点**

```jsx
function Component() {
  return (
    <>
      <h1>标题</h1>
      <p>段落1</p>
      <p>段落2</p>
    </>
  );
}

// 渲染结果在DOM中不会有额外的包装元素：
// <h1>标题</h1>
// <p>段落1</p>
// <p>段落2</p>
```

**2. 在列表渲染中使用Fragment**

当需要在循环中渲染多个元素但不想额外嵌套层级时：

```jsx
function List({ items }) {
  return (
    <dl>
      {items.map(item => (
        // 这里需要使用完整写法以便提供key
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

**3. 在表格中保持正确的DOM结构**

```jsx
function TableRows({ items }) {
  return (
    <>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price}</td>
        </tr>
      ))}
    </>
  );
}

// 使用方式
function Table({ items }) {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        <TableRows items={items} />
      </tbody>
    </table>
  );
}
```

### Fragment的优势

- **减少不必要的DOM节点**：避免了额外的div或span容器，减少DOM树的深度和复杂性
- **提高渲染性能**：更少的DOM节点意味着更快的渲染和更低的内存占用
- **避免CSS样式问题**：防止因额外的容器元素而导致的CSS样式问题，特别是在使用Flexbox或Grid布局时
- **符合语义化**：在特定元素内部（如table、select等）保持正确的DOM结构

使用Fragment是React应用中的最佳实践之一，尤其在构建复杂组件或列表时，可以有效减少不必要的DOM嵌套和提高性能。

## 如何在React中进行性能优化？

### 常用的React性能优化策略

React应用性能优化主要集中在减少不必要的渲染和提高渲染效率两个方面。以下是常用的优化策略：

- **避免不必要的重新渲染**：使用React.memo、PureComponent和shouldComponentUpdate
- **代码分割**：使用React.lazy和Suspense实现按需加载
- **虚拟列表**：处理大量数据时只渲染可见部分
- **使用不可变数据结构**：帮助React更容易检测变化
- **合理使用useMemo和useCallback**：避免不必要的计算和渲染

### 具体优化方法与示例

**1. 使用React.memo避免不必要的重新渲染**

```jsx
// 优化前
function ExpensiveComponent({ value, unchangedProp }) {
  console.log('渲染ExpensiveComponent');
  // 复杂计算...
  return <div>{value}</div>;
}

// 优化后
const MemoizedComponent = React.memo(function ExpensiveComponent({ value, unchangedProp }) {
  console.log('渲染ExpensiveComponent');
  // 复杂计算...
  return <div>{value}</div>;
});

// 自定义比较函数，更精细地控制是否重新渲染
const MemoizedWithCustomCompare = React.memo(
  ExpensiveComponent,
  (prevProps, nextProps) => {
    // 只有当value属性改变时才重新渲染
    return prevProps.value === nextProps.value;
  }
);
```

**2. 列表渲染优化**

对于大量数据的列表，使用虚拟滚动技术：

```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

**3. 代码分割与懒加载**

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 懒加载路由组件
const Home = lazy(() => import('./routes/Home'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const Settings = lazy(() => import('./routes/Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

**4. 使用useMemo缓存计算结果**

```jsx
function DataProcessor({ data, filter }) {
  // 不优化：每次渲染都会重新计算
  // const processedData = expensiveCalculation(data, filter);
  
  // 优化：仅当data或filter变化时重新计算
  const processedData = useMemo(() => {
    console.log('执行耗时计算');
    return expensiveCalculation(data, filter);
  }, [data, filter]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

function expensiveCalculation(data, filter) {
  console.log('执行昂贵计算...');
  // 模拟耗时操作
  return data.filter(item => item.name.includes(filter))
             .sort((a, b) => a.name.localeCompare(b.name));
}
```

**5. 使用useCallback避免函数重建**

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 不优化：每次渲染都创建新函数引用
  // const handleClick = () => {
  //   console.log('按钮被点击');
  // };
  
  // 优化：保持函数引用稳定
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []); // 空依赖数组，函数引用永远不变
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <ExpensiveChild onButtonClick={handleClick} />
    </div>
  );
}

// 使用React.memo避免因父组件状态变化导致的不必要重新渲染
const ExpensiveChild = React.memo(function ExpensiveChild({ onButtonClick }) {
  console.log('子组件渲染');
  return <button onClick={onButtonClick}>点击我</button>;
});
```

**6. 使用不可变数据结构**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  // 不优化：直接修改数组
  // const addTodo = (text) => {
  //   todos.push({ id: Date.now(), text });
  //   setTodos(todos); // 引用没变，React可能无法检测到变化
  // };
  
  // 优化：创建新数组
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };
  
  return (
    <>
      <button onClick={() => addTodo('新任务')}>添加任务</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```

### 性能监测与分析工具

优化前应先测量性能问题：

- **React DevTools Profiler**：识别重新渲染的组件和渲染时间
- **Lighthouse**：分析整体应用性能
- **Web Vitals**：监测核心网页性能指标

使用这些工具可以帮助你找到性能瓶颈，然后有针对性地应用上述优化策略，而不是过早优化。

## React中的Context API如何使用？

### Context API的基本概念

Context API是React提供的一种在组件树中共享数据的方式，无需通过props层层传递。它适用于需要在多个组件间共享的"全局"数据，如用户认证状态、主题设置或语言偏好。

Context API由三个主要部分组成：

- `React.createContext`：创建一个Context对象
- `Context.Provider`：提供值给组件树
- `Context.Consumer`或`useContext` Hook：消费Context值

### Context API的使用方法

**1. 创建Context**

```jsx
// ThemeContext.js
import React from 'react';

// 创建Context，可提供默认值
const ThemeContext = React.createContext('light');

export default ThemeContext;
```

**2. 提供Context值**

```jsx
// App.js
import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import ThemedButton from './ThemedButton';

function App() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    // Provider组件提供值给其所有子组件
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <h1>主题示例</h1>
        <ThemedButton />
      </div>
    </ThemeContext.Provider>
  );
}
```

**3. 消费Context值**

方法一：使用`useContext` Hook（推荐，适用于函数组件）

```jsx
// ThemedButton.js
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

function ThemedButton() {
  // 使用useContext获取Context值
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px 15px',
        border: '1px solid #ccc'
      }}
    >
      当前主题: {theme}，点击切换
    </button>
  );
}
```

方法二：使用Consumer组件（可用于类组件和函数组件）

```jsx
// ThemedButton.js (类组件版本)
import React from 'react';
import ThemeContext from './ThemeContext';

class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <button
            onClick={toggleTheme}
            style={{
              background: theme === 'light' ? '#fff' : '#333',
              color: theme === 'light' ? '#333' : '#fff'
            }}
          >
            当前主题: {theme}，点击切换
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}
```

**4. 使用多个Context**

```jsx
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import UserContext from './UserContext';

function ProfilePage() {
  const { theme } = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <div style={{ background: theme === 'light' ? '#f8f9fa' : '#343a40', padding: 20 }}>
      <h2 style={{ color: theme === 'light' ? '#333' : '#fff' }}>
        {user.name}的个人资料
      </h2>
      <p style={{ color: theme === 'light' ? '#555' : '#ddd' }}>
        邮箱: {user.email}
      </p>
    </div>
  );
}
```

### Context的使用场景和注意事项

**适合使用Context的场景：**

- 主题设置：全局主题样式的切换
- 用户认证：在整个应用中共享用户信息和登录状态
- 语言设置：实现应用的国际化和本地化
- 路由状态：共享路由信息
- 状态管理：小到中型应用的简单状态管理（替代Redux）

**注意事项：**

1. **性能考虑**：
   - Context变化会导致所有消费该Context的组件重新渲染
   - 可以拆分为多个细粒度的Context，避免不必要的渲染

```jsx
// 优化前：一个大Context
const AppContext = createContext();

// 优化后：拆分为多个专用Context
const ThemeContext = createContext();
const UserContext = createContext();
const LanguageContext = createContext();
```

2. **避免过度使用**：
   - 对于组件局部或仅在几个组件间共享的状态，使用组件组合或props可能更合适
   - Context主要用于真正的全局或需要在多个组件间共享的数据

Context API是React中强大的工具，但需要在适当的场景下使用，并考虑潜在的性能影响。对于复杂的状态管理需求，可能需要考虑使用Redux或MobX等专门的状态管理库。

## 什么是React中的受控组件和非受控组件？

### 受控组件和非受控组件的概念

在React中，表单元素（如input、textarea、select）通常有两种处理方式：受控组件和非受控组件。

**受控组件**是指表单元素的值由React状态控制的组件。当用户输入数据时，会触发状态更新，而组件则基于最新状态重新渲染，实现双向绑定。

**非受控组件**是指表单元素的值由DOM本身管理的组件。React不会控制组件的实时值，而是使用ref在需要时获取值。

### 受控组件的实现与特点

**实现方式：**

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  // 使用React状态存储表单值
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // 表单提交处理
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交的值:', { name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          姓名:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          邮箱:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">提交</button>
    </form>
  );
}
```

**受控组件的特点：**

1. **实时数据访问**：组件状态始终反映当前表单值，可随时访问
2. **即时验证**：可以在用户输入时立即进行表单验证
3. **条件禁用**：可以根据条件禁用表单元素或调整UI
4. **格式化输入**：可以强制输入特定格式，如电话号码添加连字符

```jsx
// 实时验证示例
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // 实时验证
    if (!value) {
      setError('邮箱不能为空');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError('邮箱格式不正确');
    } else {
      setError('');
    }
  };
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        style={{ borderColor: error ? 'red' : '#ccc' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### 非受控组件的实现与特点

**实现方式：**

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  // 使用ref获取DOM元素
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  
  // 表单提交时读取值
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value
    };
    console.log('提交的值:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          姓名:
          <input
            type="text"
            ref={nameRef}
            defaultValue="" // 可选的默认值
          />
        </label>
      </div>
      <div>
        <label>
          邮箱:
          <input
            type="email"
            ref={emailRef}
            defaultValue=""
          />
        </label>
      </div>
      <button type="submit">提交</button>
    </form>
  );
}
```

**非受控组件的特点：**

1. **更简单的实现**：无需为每个表单元素设置状态和处理函数
2. **性能较好**：输入不会触发重新渲染
3. **集成第三方DOM库更容易**：特别是与jQuery或非React库一起使用时
4. **适合简单表单**：如仅需要提交时获取值的场景

```jsx
// 文件上传示例（通常使用非受控组件）
function FileUploadForm() {
  const fileRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // 发送请求...
      console.log('文件已选择:', file.name);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} />
      <button type="submit">上传</button>
    </form>
  );
}
```

### 如何选择使用哪种方式？

**选择受控组件的情况：**

- 需要实时验证用户输入
- 需要根据输入条件禁用提交按钮
- 需要强制输入格式化
- 实现一个字数统计的文本框
- 需要在表单外部操作表单值

**选择非受控组件的情况：**

- 简单的表单，不需要即时验证
- 文件上传表单
- 只需要在提交时获取表单值
- 与第三方DOM库集成
- 性能是关键考虑因素

大多数情况下，React官方推荐使用受控组件，因为它更符合React的数据流模式，并且提供了更多的灵活性和可控性。但对于特定场景，非受控组件可能是更简单的选择。

## React中的Fiber架构是什么？

### Fiber架构的基本概念

Fiber是React 16引入的一种新的内部架构，主要目标是提高React应用在动画、布局和手势等交互操作上的响应能力。它的核心思想是将渲染工作分解成可中断的小单元，允许浏览器在渲染过程中处理高优先级任务（如用户输入），提高应用的流畅度。

Fiber架构解决了React传统reconciliation（协调）过程中无法中断渲染的问题，传统的渲染过程一旦开始就必须完成所有组件的更新，这在复杂应用中可能导致卡顿和响应延迟。

### Fiber架构的工作原理

**核心机制：**

1. **工作单元切片**：将渲染工作分解为小片段，每个片段称为"fiber"
2. **可中断渲染**：React可以暂停、中止或恢复渲染工作
3. **优先级调度**：根据任务优先级确定处理顺序
4. **双缓冲渲染**：维护两棵fiber树（current和workInProgress）实现高效更新

**Fiber架构中的渲染过程分为两个阶段：**

1. **Render/Reconciliation阶段**（可中断）：
   - 构建新的fiber树
   - 进行diff比较
   - 收集需要进行的DOM操作

2. **Commit阶段**（不可中断）：
   - 将上一阶段收集的变更一次性应用到DOM
   - 调用生命周期方法和Hooks

```jsx
// 伪代码展示Fiber如何分片处理任务
function workLoop(deadline) {
  let shouldYield = false;
  
  while (nextUnitOfWork && !shouldYield) {
    // 执行一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    
    // 检查是否需要让出控制权给浏览器
    shouldYield = deadline.timeRemaining() < 1;
  }
  
  // 如果还有工作未完成，安排在下一帧继续
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  } else if (pendingCommit) {
    // 所有工作单元处理完毕，执行提交阶段
    commitRoot(pendingCommit);
  }
}

// 请求在浏览器空闲时执行工作循环
requestIdleCallback(workLoop);
```

### Fiber架构带来的变化和优势

**1. 提高应用响应性**

通过将渲染工作分解为可中断的单元，Fiber架构允许浏览器在执行长时间运行的渲染任务期间响应用户输入，提高用户体验。

**2. 更灵活的渲染控制**

Fiber架构引入了任务优先级的概念，允许React根据任务重要性决定执行顺序：

- 高优先级：用户交互（如点击、输入）
- 中优先级：完成网络请求的渲染
- 低优先级：大型列表的预渲染等

**3. 更平滑的动画和过渡**

由于可以分片执行渲染工作，应用在执行动画或过渡时能保持更高的帧率，减少卡顿和丢帧现象。

**4. 对生命周期的影响**

Fiber架构的引入导致了React生命周期方法的重大调整：

- 一些生命周期方法被标记为不安全（如`componentWillMount`、`componentWillReceiveProps`），因为它们可能在Render阶段被多次调用
- 引入了新的静态生命周期方法（如`getDerivedStateFromProps`和`getSnapshotBeforeUpdate`）
- 强化了`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的作用

```jsx
class ModernComponent extends React.Component {
  // 新的、安全的生命周期方法
  static getDerivedStateFromProps(props, state) {
    // 在render之前调用，用于从props更新state
    return null; // 返回更新后的state或null
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在更新前捕获DOM信息
    return null; // 返回的值将作为第三个参数传给componentDidUpdate
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // 使用从getSnapshotBeforeUpdate返回的值
  }
}
```

### Fiber架构如何影响Hooks

Fiber架构为Hooks的实现提供了基础，使得函数组件能够拥有状态和副作用：

- 每个函数组件对应一个fiber节点
- Hooks的状态保存在fiber节点上，而不是函数组件内（函数每次渲染都会重新创建）
- Hooks调用顺序的稳定性对React正确关联状态至关重要

```jsx
function Counter() {
  // 这些Hooks的状态实际存储在关联的fiber节点上
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  useEffect(() => {
    document.title = `${name}: ${count}`;
  }, [count, name]);
  
  return (
    <div>
      <p>{name} count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

Fiber架构是React现代特性（如Concurrent Mode、Suspense和Hooks）的基础，它彻底改变了React的内部实现，使React应用能够更加流畅地响应用户交互，提供更好的用户体验。

## React中的错误边界(Error Boundaries)是什么？

### 错误边界的基本概念

错误边界(Error Boundaries)是React提供的一种机制，用于捕获子组件树中JavaScript错误，记录错误并展示备用UI，防止整个应用因为一个组件的错误而崩溃。

错误边界是一种特殊的React组件，它能够捕获子组件在渲染过程中、生命周期方法中以及构造函数中发生的错误。错误边界无法捕获以下错误：

- 事件处理器中的错误
- 异步代码（如setTimeout、Promise等）中的错误
- 服务端渲染中的错误
- 错误边界组件自身抛出的错误

### 如何实现错误边界组件

错误边界组件通过实现以下一个或两个生命周期方法来创建：

1. `static getDerivedStateFromError(error)` - 用于渲染备用UI
2. `componentDidCatch(error, info)` - 用于记录错误信息

```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新状态，下一次渲染时显示备用UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 可以将错误发送到错误报告服务
    // logErrorToService(error, errorInfo);
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 渲染备用UI
      return (
        <div className="error-container">
          <h2>出错了</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          {this.props.fallback || <button onClick={() => window.location.reload()}>刷新页面</button>}
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 错误边界的使用方法

错误边界的使用非常简单，只需将可能出错的组件包裹在错误边界组件内：

```jsx
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import UserProfile from './UserProfile';
import ProductList from './ProductList';

function App() {
  return (
    <div className="app">
      <h1>我的应用</h1>
      
      {/* 为每个主要功能区域使用单独的错误边界 */}
      <ErrorBoundary fallback={<div>用户信息加载失败</div>}>
        <UserProfile userId="123" />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<div>产品列表加载失败</div>}>
        <ProductList category="electronics" />
      </ErrorBoundary>
      
      {/* 嵌套的错误边界 */}
      <ErrorBoundary>
        <div>
          <h2>评论区</h2>
          <ErrorBoundary fallback={<p>评论加载失败</p>}>
            <CommentList postId="456" />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  );
}
```

### 错误边界的最佳实践

**1. 粒度合理的错误隔离**

将错误边界放置在应用的合适位置非常重要。太过粗粒度（如仅在应用根部）可能导致整个大块UI因小错误而消失；太过细粒度则可能使代码变得复杂。

```jsx
// 推荐的粒度：主要功能模块级别
function Dashboard() {
  return (
    <div>
      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
      
      <div className="main-content">
        <ErrorBoundary>
          <UserStats />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <RecentActivities />
        </ErrorBoundary>
      </div>
    </div>
  );
}
```

**2. 提供有意义的备用UI**

尽可能提供对用户有帮助的备用界面，而不仅仅是错误信息：

```jsx
function ProductSection() {
  return (
    <ErrorBoundary
      fallback={
        <div className="error-container">
          <h3>产品加载失败</h3>
          <p>请尝试以下操作：</p>
          <ul>
            <li>刷新页面</li>
            <li>检查网络连接</li>
            <li>稍后再试</li>
          </ul>
          <button onClick={() => window.location.reload()}>
            刷新页面
          </button>
        </div>
      }
    >
      <ProductList />
    </ErrorBoundary>
  );
}
```

**3. 结合错误边界与异步错误处理**

错误边界不能捕获异步错误，可以通过以下方式处理异步错误：

```jsx
function AsyncComponent() {
  const [error, setError] = useState(null);
  
  // 处理异步错误
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.fetchData();
        // 处理结果...
      } catch (error) {
        setError(error);
      }
    };
    
    fetchData();
  }, []);
  
  // 如果有错误，显示错误UI
  if (error) {
    return <div>加载数据时出错: {error.message}</div>;
  }
  
  // 正常渲染
  return <div>{/* 组件内容 */}</div>;
}

// 结合错误边界
function Container() {
  return (
    <ErrorBoundary>
      <AsyncComponent />
    </ErrorBoundary>
  );
}
```

**4. 错误日志收集**

错误边界是收集前端错误信息的理想位置，可以将错误发送到监控服务：

```jsx
componentDidCatch(error, errorInfo) {
  // 发送错误到监控服务
  logErrorToService({
    error,
    errorInfo,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    userId: this.props.currentUser?.id
  });
}
```

错误边界是React应用健壮性的重要组成部分，合理使用错误边界可以提高应用的稳定性和用户体验，防止局部错误导致整个应用崩溃。

## React中的高阶组件(HOC)是什么？

### 高阶组件的基本概念

高阶组件(Higher-Order Component，简称HOC)是React中用于复用组件逻辑的高级技术。具体来说，高阶组件是一个函数，它接收一个组件作为参数并返回一个新的增强组件。HOC不是React API的一部分，而是一种基于React组合特性的设计模式。

高阶组件本质上是一种函数式编程的思想，通过组合来实现功能的扩展，而不是通过继承。它解决了代码复用的问题，特别是在React的类组件时代尤为有用。

### 高阶组件的工作原理和实现方式

**基本实现模式：**

```jsx
// 高阶组件的基本结构
function withExample(WrappedComponent) {
  // 返回一个新组件
  return function EnhancedComponent(props) {
    // 增强逻辑
    const enhancedProps = { ...props, extraProp: 'value' };
    
    // 渲染被包装的组件，传入增强的props
    return <WrappedComponent {...enhancedProps} />;
  };
}

// 使用高阶组件
const EnhancedComponent = withExample(OriginalComponent);
```

**属性代理模式：**

这是最常见的HOC模式，通过对传递给被包装组件的props进行操作来增强组件。

```jsx
// 添加额外的props
function withExtraProps(WrappedComponent) {
  return function(props) {
    const extraProps = { color: 'red', fontSize: '16px' };
    return <WrappedComponent {...props} {...extraProps} />;
  };
}

// 条件渲染
function withAuth(WrappedComponent) {
  return function(props) {
    if (!props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return <WrappedComponent {...props} />;
  };
}

// 包装组件
const AuthenticatedDashboard = withAuth(Dashboard);
```

**反向继承模式：**

这种模式通过继承被包装组件来实现，可以控制其渲染过程、操作state和拦截生命周期方法。

```jsx
function withLogging(WrappedComponent) {
  return class extends WrappedComponent {
    componentDidMount() {
      console.log('Component is mounted');
      // 调用原始的生命周期方法
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }
    
    render() {
      // 修改render方法的行为
      const originalElement = super.render();
      return <div className="logged">{originalElement}</div>;
    }
  };
}
```

### 高阶组件的实际应用场景

**1. 添加共享功能**

```jsx
// 为组件添加加载状态管理
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <WrappedComponent {...props} />;
  };
}

// 使用方式
const UserListWithLoading = withLoading(UserList);

// 渲染时
<UserListWithLoading isLoading={isLoading} users={users} />
```

**2. 访问控制/权限管理**

```jsx
function withAuthorization(allowedRoles) {
  return function(WrappedComponent) {
    return function({ userRole, ...props }) {
      if (!allowedRoles.includes(userRole)) {
        return <AccessDenied />;
      }
      return <WrappedComponent {...props} />;
    };
  };
}

// 使用方式
const AdminPanel = withAuthorization(['admin', 'superuser'])(PanelComponent);

// 渲染时
<AdminPanel userRole={currentUser.role} />
```

**3. 数据获取和状态管理**

```jsx
function withData(dataSource) {
  return function(WrappedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { data: null, loading: true, error: null };
      }
      
      componentDidMount() {
        this.fetchData();
      }
      
      fetchData() {
        this.setState({ loading: true });
        dataSource()
          .then(data => this.setState({ data, loading: false }))
          .catch(error => this.setState({ error, loading: false }));
      }
      
      render() {
        const { data, loading, error } = this.state;
        return (
          <WrappedComponent
            data={data}
            loading={loading}
            error={error}
            refetch={this.fetchData.bind(this)}
            {...this.props}
          />
        );
      }
    };
  };
}

// 使用方式
const UserListWithData = withData(() => fetch('/api/users').then(r => r.json()))(UserList);
```

**4. 样式注入**

```jsx
function withTheme(WrappedComponent) {
  return function(props) {
    // 获取当前主题
    const { theme } = useContext(ThemeContext);
    // 注入主题相关样式
    const themeStyles = {
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    };
    
    return <WrappedComponent {...props} themeStyles={themeStyles} />;
  };
}
```

### 高阶组件的最佳实践和注意事项

**1. 不要在渲染方法中使用HOC**

```jsx
// 错误示例：每次渲染都创建新的组件
render() {
  // 每次调用withExample都会创建一个新组件
  const EnhancedComponent = withExample(MyComponent);
  return <EnhancedComponent />;
}

// 正确示例：在组件外部定义
const EnhancedComponent = withExample(MyComponent);
function MyParentComponent() {
  return <EnhancedComponent />;
}
```

**2. 复制静态方法**

HOC创建的新组件不会自动复制原始组件的静态方法，需要手动复制。

```jsx
function withExample(WrappedComponent) {
  class WithExample extends React.Component {
    // ...实现
  }
  
  // 复制静态方法
  hoistNonReactStatic(WithExample, WrappedComponent);
  
  return WithExample;
}
```

**3. 传递不相关的props**

确保高阶组件不会过滤掉不相关的props，应该将它们传递给被包装的组件。

```jsx
function withExample(WrappedComponent) {
  return function({ specificProp, ...restProps }) {
    // 处理specificProp
    
    // 将其他所有props传递下去
    return <WrappedComponent {...restProps} />;
  };
}
```

**4. 包装显示名称以便调试**

```jsx
function withExample(WrappedComponent) {
  function WithExample(props) {
    return <WrappedComponent {...props} />;
  }
  
  // 更好的调试体验
  const wrappedComponentName = WrappedComponent.displayName 
    || WrappedComponent.name 
    || 'Component';
  WithExample.displayName = `WithExample(${wrappedComponentName})`;
  
  return WithExample;
}
```

**5. 组合多个HOC**

当需要应用多个HOC时，可以使用组合的方式：

```jsx
// 组合多个HOC
const EnhancedComponent = withAuth(withLogging(withTheme(MyComponent)));

// 使用compose函数让代码更清晰
const enhance = compose(
  withAuth,
  withLogging,
  withTheme
);
const EnhancedComponent = enhance(MyComponent);
```

尽管Hooks在许多场景下可以替代HOC，但高阶组件仍然是React中强大的组件复用模式，特别是在处理横切关注点（如权限控制、数据获取等）时非常有用。

## React Router的主要功能与工作原理是什么？

### React Router的基本概念

React Router是React应用中最常用的路由库，它允许你在应用中实现动态路由，使用户可以在不同"页面"间导航，同时保持应用状态和UI的一致性。与传统的多页面应用不同，React Router实现的是单页面应用(SPA)中的客户端路由。

React Router主要提供了以下功能：

- 声明式路由定义
- 动态路由匹配
- 嵌套路由支持
- 路由参数提取
- 编程式导航
- 路由鉴权控制

### React Router的核心组件和API

**React Router v6的核心组件：**

1. **`<BrowserRouter>`**: 使用HTML5 History API实现的路由容器
2. **`<Routes>`和`<Route>`**: 定义路由规则和对应的组件
3. **`<Link>`和`<NavLink>`**: 声明式导航链接
4. **`<Outlet>`**: 渲染嵌套路由的子组件
5. **`<Navigate>`**: 执行重定向

**基本用法示例：**

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/users">用户列表</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />}>
            <Route path=":userId" element={<UserDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

**嵌套路由示例：**

```jsx
function Users() {
  return (
    <div>
      <h2>用户列表</h2>
      <ul>
        <li><Link to="/users/1">用户1</Link></li>
        <li><Link to="/users/2">用户2</Link></li>
      </ul>
      
      {/* 此处渲染子路由 */}
      <Outlet />
    </div>
  );
}

function UserDetail() {
  // 获取路由参数
  const { userId } = useParams();
  return <h3>用户ID: {userId}</h3>;
}
```

### React Router的工作原理

React Router主要通过以下机制工作：

**1. 路由上下文与历史管理**

`BrowserRouter`创建一个路由上下文，并通过浏览器的History API监听URL变化：

```jsx
// 简化的BrowserRouter实现原理
function BrowserRouter({ children }) {
  const historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }
  const history = historyRef.current;
  
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  
  useLayoutEffect(() => {
    // 监听历史记录变化
    const unlisten = history.listen(setState);
    return unlisten;
  }, [history]);
  
  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
```

**2. 路由匹配**

当URL变化时，`Routes`组件会遍历所有`Route`子组件，找到匹配当前URL的路由并渲染相应组件：

```jsx
// 简化的Routes和Route工作原理
function Routes({ children }) {
  const location = useLocation();
  const routes = React.Children.toArray(children)
    .filter(child => child.type === Route)
    .map(route => ({
      path: route.props.path,
      element: route.props.element
    }));
  
  // 寻找匹配的路由
  const match = routes.find(route => matchPath(route.path, location.pathname));
  
  return match ? match.element : null;
}
```

**3. 路由参数提取**

React Router通过路径模式匹配从URL中提取参数：

```jsx
// 路径：/users/:userId
// URL：/users/123
// 提取参数：{ userId: '123' }

function UserDetail() {
  const { userId } = useParams();
  // userId 的值是 '123'
}
```

### 实际应用场景与示例

**1. 基于角色的路由访问控制**

```jsx
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    // 未登录，重定向到登录页
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // 无权限访问
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

// 使用方式
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['user', 'admin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
```

**2. 惰性加载路由组件**

结合React.lazy实现路由组件的按需加载：

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 惰性加载路由组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**3. 布局路由**

使用嵌套路由实现共享布局：

```jsx
function App() {
  return (
    <Routes>
      {/* 公共布局 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
      
      {/* 管理后台布局 */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function MainLayout() {
  return (
    <div className="main-layout">
      <header>
        <nav>{/* 导航菜单 */}</nav>
      </header>
      
      <main>
        <Outlet /> {/* 子路由在此渲染 */}
      </main>
      
      <footer>{/* 页脚 */}</footer>
    </div>
  );
}
```

**4. 根据URL参数动态获取数据**

```jsx
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    // 当productId变化时获取新数据
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('获取产品数据失败:', err);
        setLoading(false);
      });
  }, [productId]); // 依赖于路由参数
  
  if (loading) return <div>加载中...</div>;
  if (!product) return <div>产品不存在</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>价格: ¥{product.price}</p>
    </div>
  );
}
```

### React Router的高级功能和注意事项

**1. 编程式导航**

使用`useNavigate` Hook进行编程式导航：

```jsx
function OrderConfirmation() {
  const navigate = useNavigate();
  
  const handleSubmit = async (order) => {
    try {
      const result = await submitOrder(order);
      // 导航到成功页面，并传递数据
      navigate(`/order-success/${result.orderId}`, { 
        state: { orderDetails: result }
      });
    } catch (error) {
      // 错误处理
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
    </form>
  );
}
```

**2. 路由守卫与转场动画**

```jsx
// 使用React Transition Group实现页面转场
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* 其他路由 */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
```

**3. 查询参数处理**

使用`useSearchParams` Hook处理查询字符串参数：

```jsx
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  const handleCategoryChange = (newCategory) => {
    // 更新URL查询参数
    setSearchParams({ category: newCategory, page: 1 });
  };
  
  const handlePageChange = (newPage) => {
    setSearchParams({ category, page: newPage });
  };
  
  return (
    <div>
      <h1>产品列表</h1>
      <CategoryFilter value={category} onChange={handleCategoryChange} />
      <ProductGrid category={category} page={page} />
      <Pagination currentPage={page} onChange={handlePageChange} />
    </div>
  );
}
```

React Router是现代React应用中不可或缺的部分，通过了解其工作原理和使用方式，可以构建出更加灵活和用户友好的单页面应用。

## React事件合成

### React合成事件的核心机制

React实现了自己的事件系统，称为"合成事件"(SyntheticEvent)，它在原生DOM事件系统的基础上构建了一个跨浏览器的封装层。React事件系统的主要特点：

- 事件委托到React根容器，而非直接绑定到DOM元素
- 统一的事件规范，抹平浏览器差异
- 自动进行事件池管理，提高性能
- 遵循原生DOM事件的捕获和冒泡机制

### React事件执行流程与顺序

React 17对事件系统进行了重构，不再将事件绑定到document上，而是绑定到React渲染树的根DOM容器。事件执行顺序如下：

- 原生事件捕获阶段：document → 父元素 → 子元素
- React捕获阶段事件：父组件 → 子组件（在root容器的捕获阶段处理）
- 原生事件冒泡阶段：子元素 → 父元素
- React冒泡阶段事件：子组件 → 父组件（在root容器的冒泡阶段处理）
- document冒泡阶段

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

[react合成事件与原生事件执行顺序](https://github.com/lizuncong/mini-react/blob/master/docs/%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6/react%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6%E4%B8%8E%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F.md)

## React中setState更新变量之后，用定时器为啥获取不到最新的值

让我用更直观的例子来解释这个关键区别：

### 为什么 ref 能捕获最新值而 state 不能

想象一个邮箱系统：

### useState 的工作方式

- 每次渲染就像创建一个新的邮箱，里面有当时的信件（状态值）
- 闭包（比如定时器回调）会记住它被创建时看到的那个特定邮箱
- 当状态更新时，React 创建一个全新的邮箱放新信件，但闭包仍然看着旧邮箱
- 闭包无法"自动切换"去看新邮箱

```jsx
function Component() {
  const [message, setMessage] = useState("原始消息");
  
  function handleClick() {
    setMessage("新消息");  // 创建新邮箱
    setTimeout(() => {
      console.log(message);  // 仍然查看旧邮箱："原始消息"
    }, 3000);
  }
  // ...
}
```

### useRef 的工作方式

- ref 就像一个固定地址的电子告示板
- 闭包记住的是告示板的位置，而不是上面的内容
- 当你更新 ref.current 时，你只是在同一块告示板上写新内容
- 无论何时查看告示板，你总能看到最新写上去的内容

```jsx
function Component() {
  const messageRef = useRef("原始消息");
  
  function handleClick() {
    messageRef.current = "新消息";  // 在同一告示板上写新内容
    setTimeout(() => {
      console.log(messageRef.current);  // 查看告示板：看到"新消息"
    }, 3000);
  }
  // ...
}
```

### 关键区别

React 的渲染模型是：

- useState: 每次状态更新导致的重新渲染会创建一个全新的变量。这些变量虽然名字相同，但实际上是不同渲染中的完全独立的变量。闭包捕获的是创建它时那次渲染中的变量。
- useRef: 无论组件重新渲染多少次，ref 对象始终是同一个对象。React 确保了 useRef 返回的是同一个可变对象的引用，这个对象在组件的整个生命周期中保持不变。
所以问题的核心不在于"引用类型"，而在于：
- state 更新会创建全新的状态值（即使是引用类型的值），并在新的渲染中使用
- ref 是在所有渲染中共享的同一个可变对象
这就是为什么 ref 可以在异步回调中反映最新值，而 state 不行。

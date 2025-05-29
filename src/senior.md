# 高级

##  微任务和宏任务的区别及应用

**核心答案：**  
微任务（Microtask）优先于宏任务（Macrotask）执行，微任务主要包括 Promise.then、MutationObserver 等，宏任务包括 setTimeout、setInterval、setImmediate、I/O 等。事件循环每次从宏任务队列取出一个任务执行，执行完后会清空所有微任务队列。

**原理讲解：**  
JavaScript 是单线程的，采用事件循环（Event Loop）机制。每次事件循环会先执行一个宏任务，然后清空所有微任务队列。这样可以保证微任务在当前宏任务执行后立即执行，而不会被下一个宏任务打断。合理使用微任务和宏任务可以优化异步流程和性能。

**示例代码：**

::: details 示例代码

```js
console.log('start');
setTimeout(() => {
  console.log('macro task');
}, 0);
Promise.resolve().then(() => {
  console.log('micro task');
});
console.log('end');
// 输出顺序：start -> end -> micro task -> macro task
```

:::

##  如何实现 LRU 缓存？

**核心答案：**  
LRU（最近最少使用）缓存可以用哈希表和双向链表实现，哈希表用于 O(1) 查找，双向链表用于 O(1) 插入和删除，保证最近访问的数据在链表头部，超出容量时移除尾部数据。

**原理讲解：**  
每次访问或插入数据时，将该数据移动到链表头部。哈希表存储 key 到链表节点的映射，便于快速定位。超出容量时，移除链表尾部节点，并从哈希表删除对应 key。

**示例代码：**

::: details 示例代码

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
```

:::

##  你如何理解函数柯里化？并实现一个柯里化函数

**核心答案：**  
函数柯里化是将一个多参数函数转化为一系列单参数函数的技术，每次调用只传递一个参数，直到所有参数传递完毕再执行。

**原理讲解：**  
柯里化通过闭包保存参数，每次调用返回一个新函数，收集参数，直到参数数量满足原函数要求时执行原函数。这样可以实现参数复用和延迟执行。

**示例代码：**

::: details 示例代码

```js
function curry(fn, ...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (...rest) => curry(fn, ...args, ...rest);
}
// 用法
function add(a, b, c) { return a + b + c; }
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
```

:::

##  ES6 Symbol 类型及其应用

**核心答案：**  
Symbol 是 ES6 引入的一种原始数据类型，表示独一无二的值，常用于对象属性的唯一标识，避免属性名冲突。

**原理讲解：**  
Symbol 通过 `Symbol()` 创建，每个 Symbol 都是唯一的。可用作对象属性名，属性不会被常规遍历（如 for...in、Object.keys）枚举到，适合用作私有属性或元数据。

**示例代码：**

::: details 示例代码

```js
const sym = Symbol('desc');
const obj = {
  [sym]: 'symbol value',
  normal: 'normal value'
};
console.log(obj[sym]); // symbol value
console.log(Object.keys(obj)); // ['normal']
```

:::

##  模块化方案（ESM、CommonJS、UMD、AMD）区别

**核心答案：**  
ESM（ES Modules）是ES6标准的模块化方案，支持静态分析和按需加载；CommonJS主要用于Node.js，模块同步加载；AMD用于浏览器异步加载模块；UMD兼容CommonJS和AMD，适用于多种环境。

**原理讲解：**  

- **ESM**：使用`import`/`export`，静态依赖分析，支持Tree Shaking，浏览器和Node.js均支持。
- **CommonJS**：使用`require`/`module.exports`，同步加载，适合服务器端。
- **AMD**：使用`define`/`require`，异步加载，适合浏览器端。
- **UMD**：兼容CommonJS和AMD，能在多种环境下运行。

**示例代码：**

::: details 示例代码

```js
// ESM
// a.js
export const a = 1;
// b.js
import { a } from './a.js';

// CommonJS
// a.js
module.exports = { a: 1 };
// b.js
const { a } = require('./a.js');

// AMD
define(['dep'], function(dep) {
  return function() {};
});

// UMD
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.myModule = factory();
  }
}(this, function() {
  return {};
}));
```

:::

##  你如何理解 Tree Shaking？

**核心答案：**  
Tree Shaking 是一种移除 JavaScript 代码中未被引用（"死代码"）的技术，常用于打包工具中优化最终产物体积。

**原理讲解：**  
Tree Shaking 依赖于 ES Module 的静态结构，打包工具（如Webpack、Rollup）在编译时分析哪些模块和导出被实际使用，未被使用的代码会被移除，减少最终包体积。

**示例代码：**

::: details 示例代码

```js
// utils.js
export function used() {}
export function unused() {}

// main.js
import { used } from './utils.js';
used();
// 打包后 unused 函数会被移除
```

:::

##  nextTick、setImmediate、MessageChannel 区别

**核心答案：**  
`process.nextTick`（Node.js）在当前事件循环结束前执行，优先级最高；`setImmediate`在下一个事件循环开始时执行；`MessageChannel`基于微任务，常用于浏览器端实现微任务队列。

**原理讲解：**  

- `process.nextTick`：属于微任务队列，事件循环每个阶段结束后立即执行。
- `setImmediate`：属于宏任务队列，在I/O事件后、下一个事件循环开始时执行。
- `MessageChannel`：浏览器端微任务实现，优先级高于宏任务，低于Promise。

**示例代码：**

::: details 示例代码

```js
// Node.js
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));

// 浏览器
const channel = new MessageChannel();
channel.port1.onmessage = () => console.log('MessageChannel');
channel.portpostMessage(null);
```

:::

## 虚拟 DOM 的优缺点

**核心答案：**  
优点：提升性能、跨平台、便于实现高效的 UI 更新。缺点：增加内存消耗、对极端场景性能不如手写 DOM 操作。

**原理讲解：**  
虚拟 DOM 是用 JS 对象描述真实 DOM 结构，更新时先生成新虚拟 DOM，再与旧虚拟 DOM diff，最后只更新变化的部分到真实 DOM，减少不必要的 DOM 操作。适合大部分场景，但在极端高频、复杂动画等场景下不如手写优化。

**示例代码：**

::: details 示例代码

```js
// 简单虚拟DOM结构
const vnode = {
  tag: 'div',
  props: { id: 'app' },
  children: [
    { tag: 'span', props: {}, children: ['hello'] }
  ]
};
// diff和patch过程省略
```

:::

##  Service Worker 的作用和应用

**核心答案：**  
Service Worker 主要用于离线缓存、拦截网络请求、推送通知和后台同步等，提升 Web 应用的性能和用户体验。

**原理讲解：**  
Service Worker 是运行在浏览器背后的独立线程，拦截和处理网络请求，可缓存资源，实现离线访问。它还能处理推送通知和后台数据同步。由于其独立于主线程，能有效提升性能和可靠性。

**示例代码：**

::: details 示例代码

```js
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker 注册成功');
  });
}

// sw.js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

:::

##  垃圾回收机制及常见算法

**核心答案：**  
JavaScript 常用的垃圾回收机制有标记-清除（Mark-and-Sweep）、引用计数（Reference Counting）和分代回收（Generational GC）等。

**原理讲解：**  

- **标记-清除**：遍历对象，标记可达对象，未标记的对象被回收。
- **引用计数**：每个对象有引用计数，计数为0时回收，易产生循环引用问题。
- **分代回收**：将内存分为新生代和老生代，新生代对象频繁回收，老生代对象不常回收，提高效率。

**示例代码：**

::: details 示例代码

```js
// JavaScript 垃圾回收由引擎自动管理，无法直接操作
let obj = { a: 1 };
obj = null; // 原对象会被垃圾回收
```

:::

##  Web Worker 的作用和场景

**核心答案：**  
Web Worker 用于在浏览器中开启多线程，处理大量计算或耗时任务，避免阻塞主线程，提高页面流畅度。

**原理讲解：**  
Web Worker 运行在独立线程，与主线程通过消息传递通信。适合处理大数据计算、文件处理等场景，但不能操作 DOM。

**示例代码：**

::: details 示例代码

```js
// main.js
const worker = new Worker('worker.js');
worker.postMessage('hello');
worker.onmessage = e => {
  console.log('来自worker的数据:', e.data);
};

// worker.js
onmessage = function(e) {
  postMessage('收到: ' + e.data);
};
```

:::

##  requestAnimationFrame 和 setTimeout 区别

**核心答案：**  
requestAnimationFrame 专为动画设计，回调在浏览器下一帧渲染前执行，节能且流畅；setTimeout 定时执行，可能与屏幕刷新不同步，动画不流畅。

**原理讲解：**  
requestAnimationFrame 会根据屏幕刷新率自动调整回调执行时机，页面隐藏时自动暂停，节省资源。setTimeout 固定时间后执行，可能导致掉帧或资源浪费。

**示例代码：**

::: details 示例代码

```js
function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}
animate();

// setTimeout动画
function animate2() {
  // 动画逻辑
  setTimeout(animate2, 16);
}
animate2();
```

:::

##  import() 动态导入原理和应用

**核心答案：**  
import() 是 ES 提供的动态导入语法，返回 Promise，可实现按需加载、懒加载和代码分割。

**原理讲解：**  
import() 在运行时动态加载模块，只有在需要时才发起请求，适合路由懒加载、组件异步加载等场景。打包工具会自动将其分割为独立 chunk。

**示例代码：**

::: details 示例代码

```js
// 动态导入
import('./module.js').then(module => {
  module.default();
});

// 异步组件
const AsyncComponent = () => import('./AsyncComponent.vue');
```

:::

##  JavaScript 的内存管理机制

**核心答案：**  
JavaScript 采用自动内存管理机制，开发者只需分配内存，释放由垃圾回收器自动完成，常用算法有标记-清除和分代回收。

**原理讲解：**  
JavaScript 引擎会自动分配内存给新创建的变量和对象，并定期通过垃圾回收算法（如标记-清除、分代回收）检测不再被引用的对象并释放其内存，避免内存泄漏。

**示例代码：**

::: details 示例代码

```js
let obj = { a: 1 };
obj = null; // 原对象会被垃圾回收
// 内存管理由引擎自动完成
```

:::

##  你如何理解惰性函数及其应用？

**核心答案：**  
惰性函数是指函数首次执行时会进行初始化操作，并重写自身为更高效的实现，后续调用直接执行新函数，提升性能。

**原理讲解：**  
惰性函数通过在第一次调用时替换自身，避免重复的初始化判断。常用于事件绑定、特性检测等场景，减少不必要的分支判断。

**示例代码：**

::: details 示例代码

```js
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    addEvent = function(element, type, handler) {
      element.addEventListener(type, handler, false);
    };
  } else {
    addEvent = function(element, type, handler) {
      element.attachEvent('on' + type, handler);
    };
  }
  addEvent(element, type, handler);
}
```

:::

##  浏览器渲染流程

**核心答案：**  
浏览器渲染流程包括：解析HTML生成DOM树，解析CSS生成CSSOM树，合成渲染树，布局（回流），绘制（重绘），合成图层并显示到屏幕。

**原理讲解：**  

1. 解析HTML生成DOM树  
2. 解析CSS生成CSSOM树  
3. 合成渲染树（Render Tree）  
4. 布局（计算元素位置和大小）  
5. 绘制（将元素绘制到屏幕）  
6. 合成（多层合成，最终显示）

**示例代码：**

::: details 示例代码

```js
// 渲染流程为浏览器内部机制，无法直接用代码实现
// 可通过如下方式触发重排重绘
document.body.style.width = '100px'; // 触发布局和绘制
```

:::

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
  off(event, fn) {
    this.events[event] = (this.events[event] || []).filter(f => f !== fn);
  }
}
// 用法
const bus = new EventEmitter();
bus.on('test', data => console.log(data));
bus.emit('test', 'hello');
```

:::

##  JavaScript 内存模型和垃圾回收

**核心答案：**  
JavaScript 内存模型分为栈内存（存储基本类型和执行上下文）和堆内存（存储对象），垃圾回收器自动回收不再被引用的内存。

**原理讲解：**  

- 栈内存：存储基本类型数据和函数调用上下文，生命周期短。
- 堆内存：存储对象和复杂数据结构，生命周期长，由垃圾回收器管理。
- 垃圾回收：常用标记-清除、分代回收等算法，自动释放无用内存。

**示例代码：**

::: details 示例代码

```js
let a = 1; // 栈内存
let obj = { b: 2 }; // 堆内存
obj = null; // 垃圾回收器会自动回收
```

:::

##  你如何理解 Function.prototype.toString()？

**核心答案：**  
Function.prototype.toString() 返回函数的源码字符串表示，可以用于查看函数的实现内容，ES6 后保留了原始书写格式。

**原理讲解：**  
调用函数的 toString 方法会返回该函数的源码文本，包括注释和空格。ES6 之前部分实现会返回 [native code]，ES6 之后规范要求返回精确源码。常用于代码序列化、函数克隆、代码分析等场景。

**示例代码：**

::: details 示例代码

```js
function foo(a, b) {
  // 注释
  return a + b;
}
console.log(foo.toString());
// 输出：function foo(a, b) {  // 注释  return a + b; }
```

:::

##  JavaScript 的隐式和显示类型转换

**核心答案：**  
隐式类型转换由 JS 引擎自动完成，如 +、== 运算时自动转换；显示类型转换由开发者主动调用，如 Number()、String()、Boolean()。

**原理讲解：**  

- 隐式转换：运算符或比较时自动发生，如 '1' + 2 变成 '12'，'1' - 0 变成 1。
- 显式转换：使用构造函数或 API 主动转换类型，如 Number('123')、String(123)、Boolean(0)。

**示例代码：**

::: details 示例代码

```js
// 隐式转换
console.log('1' + 2); // '12'
console.log('1' - 0); // 1
console.log(!!'abc'); // true

// 显式转换
console.log(Number('123')); // 123
console.log(String(456)); // '456'
console.log(Boolean(0)); // false
```

:::

##  你如何理解 WebAssembly 及其前端应用？

**核心答案：**  
WebAssembly（wasm）是一种可在浏览器高效运行的二进制代码格式，适合高性能计算、游戏、音视频处理等前端场景。

**原理讲解：**  
WebAssembly 由 C/C++/Rust 等语言编译生成，能与 JS 互操作，运行速度接近原生。适合性能瓶颈场景，如大型游戏、图像处理、加密算法等，提升前端性能。

**示例代码：**

::: details 示例代码

```js
// 加载 wasm 模块
fetch('module.wasm')
  .then(res => res.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(result => {
    console.log(result.instance.exports);
  });
```

:::

##  惰性求值的理解和应用

**核心答案：**  
惰性求值指表达式在需要时才计算结果，常用于提升性能、节省资源，如生成器、按需加载等。

**原理讲解：**  
惰性求值通过延迟计算，只有在真正用到结果时才执行计算，避免不必要的资源消耗。常见于生成器（Generator）、惰性函数、虚拟列表等场景。

**示例代码：**

::: details 示例代码

```js
function* lazyRange(n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}
const gen = lazyRange(3);
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
```

:::

##  浏览器缓存机制（强缓存、协商缓存）

**核心答案：**  
浏览器缓存分为强缓存（如 Expires、Cache-Control）和协商缓存（如 Last-Modified、ETag），强缓存命中直接用本地资源，协商缓存需与服务器确认资源是否更新。

**原理讲解：**  

- 强缓存：通过响应头 Expires 或 Cache-Control 控制，未过期直接用缓存。
- 协商缓存：强缓存失效后，通过 If-Modified-Since/Last-Modified 或 If-None-Match/ETag 与服务器协商，未变更返回 304，变更则返回新资源。

**示例代码：**

::: details 示例代码

```js
// 设置强缓存
// Cache-Control: max-age=3600

// 设置协商缓存
// Last-Modified: Mon, 01 Jan 2024 00:00:00 GMT
// ETag: "abc123"
```

:::

##  Service Worker 离线缓存原理和实现

**核心答案：**  
Service Worker 通过拦截网络请求，将资源缓存到本地，实现离线访问和资源更新，提升 Web 应用的可用性和性能。

**原理讲解：**  
Service Worker 在安装阶段缓存静态资源，拦截 fetch 请求时优先返回缓存内容。可根据策略选择缓存优先、网络优先等模式。资源更新时通过激活新 Service Worker 替换旧缓存。

**示例代码：**

::: details 示例代码

```js
// sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => cache.addAll([
      '/index.html', '/main.js', '/style.css'
    ]))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
```

:::

##  WebSocket 原理及与 HTTP 区别

**核心答案：**  
WebSocket 是一种全双工通信协议，支持客户端和服务器实时双向通信，区别于 HTTP 的单向请求-响应模式。

**原理讲解：**  
WebSocket 通过 HTTP 协议发起握手，建立连接后切换为 WebSocket 协议，保持长连接，支持实时数据推送。HTTP 每次通信需重新建立连接，WebSocket 只需一次握手，后续数据低延迟、无额外开销。

**示例代码：**

::: details 示例代码

```js
// 客户端
const ws = new WebSocket('ws://localhost:8080');
ws.onopen = () => ws.send('hello');
ws.onmessage = e => console.log(e.data);

// 服务端（Node.js ws库）
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
server.on('connection', socket => {
  socket.on('message', msg => socket.send('收到：' + msg));
});
```

:::

##  JavaScript 装饰器及应用场景

**核心答案：**  
装饰器是一种用于修改类、属性、方法行为的语法糖，常用于日志、权限校验、依赖注入等场景。

**原理讲解：**  
装饰器本质是函数，接收被装饰对象作为参数，可扩展或修改其行为。常用于类库、框架中增强功能。当前为实验性语法，需 Babel 等工具支持。

**示例代码：**

::: details 示例代码

```js
function log(target, name, descriptor) {
  const oldValue = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`调用${name}，参数：`, args);
    return oldValue.apply(this, args);
  };
  return descriptor;
}

class Example {
  @log
  sum(a, b) {
    return a + b;
  }
}
const e = new Example();
e.sum(1, 2); // 控制台输出调用信息
```

:::

##  Proxy 实现响应式的原理

**核心答案：**  
Proxy 通过拦截对象的 get/set 操作，实现依赖收集和变更通知，从而实现响应式数据绑定。

**原理讲解：**  
Proxy 可以拦截对象属性的读取和修改，读取时收集依赖，修改时通知依赖更新。Vue3 就是基于 Proxy 实现深度响应式，解决了 Object.defineProperty 的局限。

**示例代码：**

::: details 示例代码

```js
let activeEffect = null;
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (activeEffect) {
        // 依赖收集
      }
      const res = Reflect.get(target, key, receiver);
      if (typeof res === 'object' && res !== null) {
        return reactive(res);
      }
      return res;
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      // 触发依赖
      return result;
    }
  });
}
```

:::

##  浏览器渲染优化策略

**核心答案：**  
常见优化策略包括减少重排重绘、合并 DOM 操作、使用虚拟列表、懒加载、开启硬件加速、合理使用 CSS3 动画等。

**原理讲解：**  

- 批量操作 DOM，减少回流和重绘次数  
- 虚拟列表只渲染可视区域内容  
- 图片懒加载减少首屏压力  
- 使用 transform、opacity 等属性开启 GPU 加速  
- 合理拆分代码，按需加载资源

**示例代码：**

::: details 示例代码

```js
// 批量插入 DOM
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  frag.appendChild(div);
}
document.body.appendChild(frag);

// 图片懒加载
<img src="placeholder.jpg" data-src="real.jpg" loading="lazy" />
```

:::

##  JavaScript 尾递归优化及局限

**核心答案：**  
尾递归优化是指在函数最后一步调用自身时，复用当前栈帧，避免栈溢出。但目前大多数 JavaScript 引擎（如 V8）并未实现尾递归优化。

**原理讲解：**  
尾递归是指函数的最后一步是返回自身的递归调用。理论上，编译器可将递归转为循环，节省栈空间。但由于兼容性和实现难度，主流 JS 引擎未支持，递归层数过多仍会栈溢出。

**示例代码：**

::: details 示例代码

```js
// 理想的尾递归
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}
console.log(factorial(5)); // 120
// 实际上大多数 JS 环境仍会栈溢出
```

:::

##  前端安全（XSS、CSRF）及防护

**核心答案：**  
XSS（跨站脚本）通过注入恶意脚本攻击用户，防护措施有输入校验、输出转义、CSP等；CSRF（跨站请求伪造）通过伪造用户请求攻击服务器，防护措施有验证码、Referer 校验、Token 验证等。

**原理讲解：**  

- XSS：攻击者注入脚本，窃取用户信息或操作页面。防护需对用户输入严格校验和转义，配置 CSP 限制脚本来源。
- CSRF：攻击者诱导用户在已登录状态下发起恶意请求。防护需校验请求来源、设置 CSRF Token、使用 SameSite Cookie。

**示例代码：**

::: details 示例代码

```js
// XSS 防护
const safe = input => input.replace(/[<>"']/g, c => ({
  '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c]));

// CSRF Token 示例
// 服务端生成并下发 token，前端请求时带上 token，服务端校验
```

:::

##  数组与链表的区别

**核心答案：**  
数组支持随机访问，插入删除慢；链表插入删除快，随机访问慢。数组适合查找多、变动少场景，链表适合频繁插入删除。

**原理讲解：**  

- 数组内存连续，支持 O(1) 随机访问，但插入删除需移动元素，效率低。
- 链表内存不连续，每个节点存指针，插入删除只需修改指针，效率高，但查找需遍历，效率低。

**示例代码：**

::: details 示例代码

```js
// 数组
const arr = [1, 2, 3];
arr.splice(1, 0, 4); // 插入

// 单向链表
class Node {
  constructor(val) { this.val = val; this.next = null; }
}
const head = new Node(1);
head.next = new Node(2);
```

:::

##  常见浏览器内核

**核心答案：**  
常见浏览器内核有 Blink（Chrome、Edge）、WebKit（Safari）、Gecko（Firefox）、Trident（IE）。

**原理讲解：**  
浏览器内核负责解析 HTML、CSS、JS 并渲染页面。不同内核实现细节和标准支持略有差异，影响页面兼容性和性能。

**示例代码：**

::: details 示例代码

```js
// 检测浏览器内核（简单示例）
const ua = navigator.userAgent;
if (ua.includes('Chrome')) console.log('Blink');
else if (ua.includes('Safari')) console.log('WebKit');
else if (ua.includes('Firefox')) console.log('Gecko');
else if (ua.includes('Trident')) console.log('Trident');
```

:::


##  浏览器内核的理解

**核心答案：**  
浏览器内核是负责网页解析、渲染和脚本执行的核心组件，决定了浏览器的兼容性、性能和特性支持。

**原理讲解：**  
内核主要分为渲染引擎（如 Blink、WebKit、Gecko）和 JS 引擎（如 V8、SpiderMonkey）。渲染引擎负责页面结构和样式解析，JS 引擎负责脚本执行。内核的不同实现影响网页表现和兼容性。

**示例代码：**

::: details 示例代码

```js
// 获取当前 JS 引擎信息（部分浏览器支持）
console.log(window.navigator.userAgent);
// 具体内核信息需结合 UA 分析
```

:::

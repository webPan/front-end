# 中级

## var、let、const 区别

**核心答案：**  
`var` 声明变量会提升且无块级作用域，`let` 和 `const` 有块级作用域且不会变量提升，`const` 声明的变量不可重新赋值。

**原理讲解：**  

- `var` 声明的变量会被提升到函数或全局作用域顶部，且可以重复声明，没有块级作用域（只受函数作用域影响）。
- `let` 和 `const` 声明的变量只在块级作用域内有效，不会被提升，不能重复声明。
- `const` 声明的变量必须初始化，且不能被重新赋值（但对象属性可变）。

**示例代码：**

```js
{
  var a = 1;
  let b = 2;
  const c = 3;
}
console.log(a); // 1
console.log(b); // ReferenceError: b is not defined
console.log(c); // ReferenceError: c is not defined

var x = 10;
var x = 20; // 合法
let y = 10;
// let y = 20; // 报错，不能重复声明

const z = 30;
// z = 40; // 报错，不能重新赋值
```

---

## == 与 === 区别

**核心答案：**  
`==` 会进行类型转换后再比较，`===` 不会进行类型转换，要求值和类型都相等。

**原理讲解：**  

- `==`（宽松等于）在比较时会先进行类型转换（如字符串转数字、null 和 undefined 相等等），再比较值。
- `===`（严格等于）要求类型和值都相同，不会进行类型转换。

**示例代码：**

```js
console.log(1 == '1');    // true，类型转换后比较
console.log(1 === '1');   // false，类型不同
console.log(null == undefined); // true，特殊规则
console.log(null === undefined); // false
console.log(0 == false);  // true
console.log(0 === false); // false
```

---

## 判断空对象的方法

**核心答案：**  
可以通过 `Object.keys(obj).length === 0` 判断对象是否为空。

**原理讲解：**  

- `Object.keys(obj)` 返回对象自身可枚举属性的数组，空对象返回空数组。
- 也可以用 `for...in` 遍历对象属性，若没有属性则为空对象。
- 还可以用 `JSON.stringify(obj) === '{}'` 判断。

**示例代码：**

```js
const obj = {};
console.log(Object.keys(obj).length === 0); // true

let isEmpty = true;
for (let key in obj) {
  isEmpty = false;
  break;
}
console.log(isEmpty); // true

console.log(JSON.stringify(obj) === '{}'); // true
```

## 闭包作用与场景

**核心答案：**  
闭包可以让函数访问并操作其外部函数作用域的变量，常用于数据私有化和工厂函数等场景。

**原理讲解：**  

- 闭包是指有权访问另一个函数作用域中变量的函数。
- 闭包会“记住”其创建时的作用域，即使外部函数已经返回。
- 常见用途：实现私有变量、工厂函数、回调函数等。

**示例代码：**

```js
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

## 跨域原因

**核心答案：**  
跨域是由于浏览器的同源策略限制，不允许不同源的脚本访问彼此的资源。

**原理讲解：**  

- 同源策略（Same-Origin Policy）是浏览器的安全策略，协议、域名、端口三者有任一不同即为不同源。
- 防止恶意网站窃取数据或攻击。
- 常见跨域场景：接口请求、iframe、资源引用等。

**示例代码：**

```js
// 假设前端页面在 http://a.com，接口在 http://b.com
fetch('http://b.com/api/data')
  .then(res => res.json())
  .then(data => console.log(data));
// 由于不同源，浏览器会阻止请求，除非后端设置了 CORS 允许跨域
```

---

## 防抖与节流

**核心答案：**  
防抖是指在事件触发后延迟执行，若期间再次触发则重新计时；节流是指规定时间内只执行一次。

**原理讲解：**  

- 防抖（debounce）：适用于输入框实时搜索、窗口resize等高频事件，减少无效调用。
- 节流（throttle）：适用于滚动、拖拽等场景，保证一段时间只执行一次，提高性能。

**示例代码：**

```js
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}

// 节流
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  }
}
```

---

## 深拷贝与浅拷贝

**核心答案：**  
浅拷贝只复制对象的第一层，深拷贝会递归复制所有层级，互不影响。

**原理讲解：**  

- 浅拷贝：新对象与原对象的嵌套对象仍然指向同一引用。
- 深拷贝：所有层级的对象和数组都会被递归复制，互不影响。
- 常用方法：浅拷贝用 `Object.assign`、展开运算符，深拷贝可用 `JSON.parse(JSON.stringify(obj))` 或递归。

**示例代码：**

```js
// 浅拷贝
const obj1 = { a: 1, b: { c: 2 } };
const shallow = { ...obj1 };
shallow.b.c = 3;
console.log(obj1.b.c); // 3

// 深拷贝
const obj2 = { a: 1, b: { c: 2 } };
const deep = JSON.parse(JSON.stringify(obj2));
deep.b.c = 4;
console.log(obj2.b.c); // 2
```

---

## 事件模型与委托

**核心答案：**  
事件模型包括捕获、目标、冒泡三个阶段，事件委托是利用事件冒泡将事件绑定到父元素上，由父元素统一处理子元素的事件。

**原理讲解：**  

- 事件模型：事件从根节点捕获到目标元素（捕获阶段），在目标元素上触发（目标阶段），再从目标元素冒泡到根节点（冒泡阶段）。
- 事件委托：通过事件冒泡机制，将多个子元素的事件监听器委托给父元素，减少事件绑定数量，提高性能。

**示例代码：**

```js
// 事件委托示例
document.getElementById('parent').addEventListener('click', function(e) {
  if (e.target.className === 'child') {
    console.log('子元素被点击');
  }
});
```

---

## 减少回流重绘方法

**核心答案：**  
减少回流重绘的方法有：合并 DOM 操作、使用文档碎片、避免逐条修改样式、使用 class 操作样式、脱离文档流操作等。

**原理讲解：**  

- 回流（Reflow）：布局变化导致的页面重新渲染，代价较高。
- 重绘（Repaint）：样式变化但不影响布局时的重新渲染，代价较低。
- 优化方法：批量操作 DOM、缓存布局信息、减少逐条样式修改、用 `display: none` 脱离文档流后再操作等。

**示例代码：**

```js
// 合并 DOM 操作
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);

// 批量修改样式
const el = document.getElementById('box');
el.style.cssText = 'width:100px;height:100px;background:red;';
```

---

## fetch 与 ajax 区别

**核心答案：**  
`fetch` 是基于 Promise 的新一代请求 API，语法更简洁，支持更丰富的功能；`ajax` 主要指基于 XMLHttpRequest 的异步请求。

**原理讲解：**  

- `fetch`：原生支持 Promise，语法简洁，支持流、跨域、请求取消等新特性。
- `ajax`（XMLHttpRequest）：回调地狱，API 复杂，不支持 Promise。
- `fetch` 不会自动发送和接收 cookies，需手动设置。

**示例代码：**

```js
// fetch
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data));

// ajax
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
```

---

## new 原理

**核心答案：**  
`new` 运算符会创建一个新对象，将构造函数的 this 指向新对象，并返回该对象。

**原理讲解：**  

- 创建一个空对象。
- 将该对象的 `__proto__` 指向构造函数的 prototype。
- 执行构造函数，将 this 绑定到新对象。
- 如果构造函数返回对象，则返回该对象，否则返回新对象。

**示例代码：**

```js
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
}

// 使用
function Person(name) {
  this.name = name;
}
const p = myNew(Person, 'Tom');
console.log(p.name); // Tom
```

---

## typeof 与 instanceof 区别

**核心答案：**  
`typeof` 用于判断基本数据类型，`instanceof` 用于判断对象是否属于某个构造函数的实例。

**原理讲解：**  

- `typeof` 返回一个字符串，能正确判断基本类型（除了 null），对于对象类型（如数组、对象、null）返回 "object"。
- `instanceof` 判断对象的原型链上是否能找到指定构造函数的 prototype，适用于引用类型。

**示例代码：**

```js
console.log(typeof 1); // "number"
console.log(typeof 'a'); // "string"
console.log(typeof null); // "object"
console.log(typeof []); // "object"

console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(null instanceof Object); // false
```

---

## 事件循环机制

**核心答案：**  
事件循环机制是指 JavaScript 单线程通过任务队列和事件循环，实现异步非阻塞执行。

**原理讲解：**  

- JavaScript 执行分为同步任务（主线程执行）和异步任务（如定时器、Promise）。
- 异步任务进入任务队列，主线程执行完同步任务后，事件循环机制会检查任务队列，将任务推入主线程执行。
- 微任务（如 Promise.then）优先于宏任务（如 setTimeout）。

**示例代码：**

```js
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
// 输出顺序：start -> end -> promise -> timeout
```

---

## 常见内存泄漏

**核心答案：**  
常见内存泄漏有：意外的全局变量、未清理的定时器/事件监听、闭包引用、DOM 引用未释放等。

**原理讲解：**  

- 全局变量：未用 var/let/const 声明变量会挂载到 window，无法被回收。
- 定时器/事件监听：未清理会导致引用一直存在。
- 闭包：不当使用闭包会导致外部变量无法释放。
- DOM 引用：JS 持有 DOM 元素引用，DOM 被移除但内存未释放。

**示例代码：**

```js
// 未清理定时器
let timer = setInterval(() => {}, 1000);
// clearInterval(timer); // 应及时清理

// 闭包导致的内存泄漏
function foo() {
  let arr = [];
  return function() {
    arr.push(1);
  }
}
const leak = foo();
```

---

## Promise 用法与方法

**核心答案：**  
Promise 用于处理异步操作，常用方法有 then、catch、finally、Promise.all、Promise.race、Promise.resolve、Promise.reject。

**原理讲解：**  

- Promise 是异步编程的一种解决方案，避免回调地狱。
- then 用于链式调用，catch 捕获异常，finally 无论成功失败都会执行。
- Promise.all 并发执行多个 Promise，全部成功才 resolve。
- Promise.race 只要有一个 Promise 完成就返回。

**示例代码：**

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('ok'), 1000);
});
p.then(res => console.log(res))
 .catch(err => console.error(err))
 .finally(() => console.log('done'));

Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(res => console.log(res));
Promise.race([Promise.resolve(1), Promise.resolve(2)]).then(res => console.log(res));
```

---

## async/await 原理与注意

**核心答案：**  
`async/await` 是基于 Promise 的语法糖，使异步代码写法更接近同步，`await` 后面必须是 Promise，`async` 函数返回 Promise。

**原理讲解：**  

- `async` 声明的函数会返回一个 Promise。
- `await` 用于等待 Promise 结果，暂停后续代码执行，直到 Promise 完成。
- `await` 只能在 `async` 函数内使用。
- 注意：多个 `await` 会导致代码串行执行，需并发时可用 `Promise.all`。

**示例代码：**

```js
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
fetchData().then(data => console.log(data));
```

---

## Map 与 Object 区别

**核心答案：**  
`Map` 允许任意类型作为键，键值有序，属性数量可直接获取；`Object` 只能用字符串或 symbol 作为键，键值无序。

**原理讲解：**  

- `Map` 的键可以是任意类型，且有内置的 size 属性。
- `Object` 的键只能是字符串或 symbol，属性无序，获取属性数量需遍历。
- `Map` 适合频繁增删查操作，性能更优。

**示例代码：**

```js
const map = new Map();
map.set(1, 'a');
map.set('b', 2);
console.log(map.get(1)); // 'a'
console.log(map.size); // 2

const obj = { a: 1, b: 2 };
console.log(obj['a']); // 1
console.log(Object.keys(obj).length); // 2
```

---

## Set 与 Array 区别

**核心答案：**  
`Set` 只存储唯一值，无重复元素，常用于数组去重；`Array` 可存储任意值，允许重复。

**原理讲解：**  

- `Set` 自动去重，元素无序，常用方法有 add、has、delete。
- `Array` 有序，可通过下标访问，允许重复元素。
- `Set` 适合去重、判断元素是否存在。

**示例代码：**

```js
const arr = [1, 2, 2, 3];
const set = new Set(arr);
console.log([...set]); // [1, 2, 3]

set.add(4);
console.log(set.has(2)); // true
set.delete(1);
console.log(set); // Set(3) {2, 3, 4}
```

---

## WeakMap 与 WeakSet 场景

**核心答案：**  
`WeakMap` 和 `WeakSet` 只接受对象作为键或值，且对对象是弱引用，适合存储临时数据或缓存，防止内存泄漏。

**原理讲解：**  

- `WeakMap` 的键只能是对象，且不会阻止垃圾回收。
- `WeakSet` 的值只能是对象，弱引用特性使其适合存储临时对象集合。
- 适合缓存、私有数据存储等场景。

**示例代码：**

```js
let obj = {};
const wm = new WeakMap();
wm.set(obj, 'data');
console.log(wm.get(obj)); // 'data'
obj = null; // obj 被回收，WeakMap 自动释放引用

let obj2 = {};
const ws = new WeakSet();
ws.add(obj2);
console.log(ws.has(obj2)); // true
obj2 = null; // obj2 被回收
```

---

## JSONP 原理与优缺点

**核心答案：**  
JSONP 通过动态创建 `<script>` 标签实现跨域请求，只支持 GET 请求，优点是兼容性好，缺点是存在安全隐患且仅限 GET。

**原理讲解：**  

- JSONP（JSON with Padding）利用 `<script>` 标签不受同源策略限制的特性，将请求地址设置为目标接口，接口返回一段调用回调函数的 JS 代码。
- 前端定义回调函数名，后端返回数据时包裹在该函数中，前端即可获取数据。
- 只能用于 GET 请求，存在 XSS 风险。

**示例代码：**

```js
// 前端
function handleData(data) {
  console.log(data);
}
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleData';
document.body.appendChild(script);

// 后端返回
// handleData({name: 'Tom', age: 18});
```

---

## async 与 defer 区别

**核心答案：**  
`async` 和 `defer` 都用于异步加载外部脚本，`async` 加载完立即执行，`defer` 等待文档解析完再按顺序执行。

**原理讲解：**  

- `async`：脚本加载完成后立即执行，执行顺序不确定，适合无依赖的脚本。
- `defer`：脚本异步加载，文档解析完毕后按顺序执行，适合依赖 DOM 的脚本。
- 都只适用于外部脚本。

**示例代码：**

```html
<script src="a.js" async></script>
<script src="b.js" defer></script>
```

---

## 原型与原型链

**核心答案：**  
原型是对象的模板，每个对象都有 `__proto__` 指向其原型，原型链是对象通过 `__proto__` 连接形成的链式结构，实现属性和方法的继承。

**原理讲解：**  

- 每个函数都有 `prototype` 属性，每个对象都有 `__proto__` 属性。
- 对象查找属性时，先在自身查找，找不到就沿着原型链向上查找，直到 `Object.prototype`。
- 原型链实现了 JS 的继承机制。

**示例代码：**

```js
function Person() {}
Person.prototype.sayHi = function() { console.log('hi'); };
const p = new Person();
p.sayHi(); // hi
console.log(p.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
```

---

## 手写 call/apply/bind

**核心答案：**  
`call`、`apply`、`bind` 都能改变函数的 this 指向，`call` 和 `apply` 立即执行，`bind` 返回新函数。

**原理讲解：**  

- `call`：第一个参数为 this，后面为参数列表，立即执行。
- `apply`：第一个参数为 this，第二个参数为参数数组，立即执行。
- `bind`：返回一个 this 被绑定的新函数，可延迟执行。

**示例代码：**

```js
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function(context, args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...(args || []));
  delete context.fn;
  return result;
};

Function.prototype.myBind = function(context, ...args) {
  const self = this;
  return function(...newArgs) {
    return self.apply(context, args.concat(newArgs));
  };
};
```

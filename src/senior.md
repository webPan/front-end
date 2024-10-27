## 双向绑定proxy和defineProperty
defineProperty 数据劫持比较好理解,通常我们利用Object.defineProperty劫持对象的访问器,在属性值发生变化时我们可以获取变化
```javascript
var data = {
        k:''
    }
    Object.defineProperty(data,'k',{
        enumerable:true,
        configurable:true,
        get:function(){//获取data.k值时会被打印
            console.log('data.k的值被获取了')
        },
        set:function(){//改变data.k值时会被打印
            console.log('data.k的值被改变了')
        }
    })

    data.k = 1;
    data.k;
```
缺陷：无法监听数组变化

```javascript
var data = {
        k:''
    }
    let newData = new Proxy(data,{
        get:function(){//获取data.k值时会被打印
            console.log('data.k的值被获取了')
        },
        set:function(){//改变data.k值时会被打印
            console.log('data.k的值被改变了')
        }
    })
    newData.k = 1;
    newData.k;
```
Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。  
[参考](https://www.jianshu.com/p/2df6dcddb0d7)

## 页面监控
* 数据采集 --> 数据上报 --> 服务端处理 --> 数据库存储 --> 数据监控可视化平台
* `Performance` 接口可以获取到当前页面中与性能相关的信息，它是 `High Resolution Time API` 的一部分，同时也融合了 `Performance` `Timeline API`、`Navigation Timing API`、 `User Timing API` 和 `Resource Timing API`。

## JavaScript 事件循环（简单版）

1. **执行顺序**：JavaScript 是单线程的，执行顺序分成**同步任务**和**异步任务**。
2. **调用栈**：同步任务会直接按顺序进入调用栈执行。
3. **任务队列**：异步任务会进入任务队列，分为**微任务队列**和**宏任务队列**。
    - 微任务：优先级高，如 `Promise.then`、`queueMicrotask`。
    - 宏任务：优先级低，如 `setTimeout`、`setInterval`。
4. **事件循环**：每次调用栈清空后，事件循环会**先执行所有微任务**，再执行一个宏任务，循环往复。

---

### 示例代码

```javascript
console.log("同步 1");

setTimeout(() => console.log("宏任务 1"), 0);

Promise.resolve().then(() => console.log("微任务 1"));

console.log("同步 2");
```

## 深拷贝和浅拷贝
浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存  
深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。  
```javascript
//深拷贝
function deepClone(obj, map = new WeakMap()) {
    // 基本类型直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // 处理循环引用
    if (map.has(obj)) {
        return map.get(obj);
    }
    // 处理日期和正则
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    // 创建对象副本
    const clone = Array.isArray(obj) ? [] : {};
    map.set(obj, clone); // 存储引用以处理循环引用
    // 递归复制属性
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], map);
        }
    }
    return clone;
}
```
## 原型和原型链

在 JavaScript 中，**原型**和**原型链**是对象继承的重要概念。理解这两个概念可以帮助我们更好地理解 JavaScript 的继承机制。

### 1. 原型（Prototype）

每个 JavaScript 对象都有一个特殊的属性 `__proto__`，它指向该对象的**原型**，即另一个对象。这个**原型对象**包含了该对象可以继承的属性和方法。

通常，通过构造函数创建的对象，其原型就是该构造函数的 `prototype` 属性指向的对象。例如：

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log("Hello, " + this.name);
};

const person1 = new Person("Alice");
person1.sayHello();  // 输出: "Hello, Alice"
```
在上面的代码中，`person1` 通过 `__proto__` 继承了 `Person.prototype` 上的 `sayHello` 方法。

### 2. 原型链（Prototype Chain）
`JavaScript` 的对象是通过原型链来实现继承的。当访问一个对象的属性或方法时，`JavaScript` 会首先在对象自身查找，如果找不到，就会沿着对象的 `__proto__` 链向上查找，直到找到该属性或方法，或者到达 `null` 结束。这条链接所有原型对象的链条就称为原型链。
```javascript
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```
在这个例子中，`person1` 的原型链是：`person1 -> Person.prototype -> Object.prototype -> null`。
### 总结
**原型**：对象继承属性和方法的来源。  
**原型链**：一条链接多个原型对象的链，用于属性和方法的逐层查找，直到找到为止。

## 前端性能优化
* 减少请求数量 图片合并 雪碧图 `Base64` 使用字体图标来代替图片
* 减少重定向 使用缓存 不使用`CSS @import` 避免使用空的`src`和`href`
* 减小资源大小 `js/css/html/img`
* 优化网络连接 使用CDN 使用DNS预解析
* 优化资源加载 资源加载位置 资源加载时机
* 减少重绘回流 防抖和节流 及时清理环境
* 性能更好的API 用对选择器 使用`requestAnimationFrame`来替代`setTimeout`和`setInterval` 使用`IntersectionObserver`来实现图片可视区域的懒加载 使用`web worker`
* `webpack`优化 动态导入和按需加载 剔除无用代码 长缓存优化

## SPA首屏加载速度慢怎么解决

1. ### 减小入口文件体积  
常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加

2. ### UI框架按需加载
在日常使用UI框架，例如element-UI、或者antd，我们经常性直接饮用整个UI库
```javascript
import ElementUI from 'element-ui'
Vue.use(ElementUI)
```
但实际上我用到的组件只有按钮，分页，表格，输入与警告 所以我们要按需引用
```javascript
import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui';
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)
```
### 3. 组件重复打包
假设A.js文件是一个常用的库，现在有多个路由使用了A.js文件，这就造成了重复下载
解决方案：在webpack的config文件中，修改CommonsChunkPlugin的配置
```javascript
minChunks: 3
```
`minChunks`为3表示会把使用3次及以上的包抽离出来，放进公共依赖文件，避免了重复加载组件

### 4. 图片资源的压缩
图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素
对于所有的图片资源，我们可以进行适当的压缩
对页面上使用到的`icon`，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻`http`请求压力。

### 5. 开启GZip压缩
拆完包之后，我们再用`gzip`做一下压缩 安装`compression-webpack-plugin`
```bash
cnmp i compression-webpack-plugin -D
```
在`vue.congig.js`中引入并修改`webpack`配置
```javascript
const CompressionPlugin = require('compression-webpack-plugin')

configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
        config.mode = 'production'
        return {
            plugins: [new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, //匹配文件名
                threshold: 10240, //对超过10k的数据进行压缩
                deleteOriginalAssets: false //是否删除原文件
            })]
        }
    }
}
```
在服务器我们也要做相应的配置 如果发送请求的浏览器支持gzip，就发送给它gzip格式的文件 我的服务器是用express框架搭建的 只要安装一下compression就能使用
```javascript
const compression = require('compression')
app.use(compression())  // 在其他中间件使用之前调用
```
### 6. 使用SSR
SSR（Server side ），也就是服务端渲染，组件或页面通过服务器生成html字符串，再发送到浏览器

从头搭建一个服务端渲染是很复杂的，vue应用建议使用`Nuxt.js`实现服务端渲染


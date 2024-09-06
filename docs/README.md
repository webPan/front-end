# 基础类

### CSS3 选择器有哪些

* :first-child选择某个元素的第一个子元素；
* :last-child选择某个元素的最后一个子元素；
* :first-of-type选择一个上级元素下的第一个同类子元素；
* :last-of-type选择一个上级元素的最后一个同类子元素；

* :nth-child(n)选择某个元素的一个或多个特定的子元素；
* :nth-last-child(n) 选择器匹配属于其元素的第 N 个子元素的每个元素，不论元素的类型，从最后一个子元素开始计数。
* :nth-of-type(n) 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素
* :nth-last-of-type(n)选择指定的元素，从元素的最后一个开始计算；

* :only-child选择的元素是它的父元素的唯一一个了元素；
* :only-of-type选择一个元素是它的上级元素的唯一一个相同类型的子元素；
* :empty选择的元素里面没有任何内容。
* :not(selector) 选择器匹配非指定元素/选择器的每个元素。


### HTML5新标签
header footer main nav aside article figcaption figure progress dialog bdi details  mark menuitem meter  rp rt ruby section summary time wbr

### CSS 布局
超链接: [跳转](https://www.cnblogs.com/xuepei/p/9990553.html)

#### 两栏布局(左侧宽度固定，右侧自适应)
* float + margin
* float + overflow
* float + position
* flex

#### 三栏布局(两边固定中间自适应)
* float + margin
* position + margin
* flex


### CSS 盒模型
* W3C margin + border + padding + content  
  ![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/w3c.jpg)
* IE margin + content (content里面包含了padding border)  
  ![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/ie.jpg)

### CSS JS 兼容性问题
* 行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，IE6间距bug
* 图片默认有间距
* 透明度的兼容CSS设置

### cookie、localstorage、sessionstorage 的区别
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/CSL.png)


### array方法有哪些，哪些会改变原数组，分成两类的话怎么分
#### 不会改变原来数组的有：
* `concat` 连接两个或更多的数组，并返回结果。
* `every` 检测数组元素的每个元素是否都符合条件。
* `some` 检测数组元素中是否有元素符合指定条件。
* `filter` 检测数组元素，并返回符合条件所有元素的数组。
* `indexOf` 搜索数组中的元素，并返回它所在的位置。
* `join` 把数组的所有元素放入一个字符串。
* `toString` 把数组转换为字符串，并返回结果。
* `lastIndexOf` 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
* `map` 通过指定函数处理数组的每个元素，并返回处理后的数组。
* `slice` 选取数组的的一部分，并返回一个新数组。
* `valueOf` 返回数组对象的原始值。
#### 会改变原来数组的有：
* `pop` 删除数组的最后一个元素并返回删除的元素。
* `push` 向数组的末尾添加一个或更多元素，并返回新的长度。
* `shift` 删除并返回数组的第一个元素。
* `unshift` 向数组的开头添加一个或更多元素，并返回新的长度。
* `reverse` 反转数组的元素顺序。
* `sort` 对数组的元素进行排序。
* `splice` 用于插入、删除或替换数组的元素。

`slice不会改变原数组，但是splice会直接改变原数组。`

### get 和 post 的区别
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/GET_POST.png)

### javascript内置对象有哪些
* `Arguments` 函数参数集合
* `Array` 数组
* `Boolean` 布尔对象
* `Date` 日期时间
* `Error` 异常对象
* `Function` 函数构造器
* `Math` 数学对象
* `Number` 数值对象
* `Object` 基础对象
* `RegExp` 正则表达式对象
* `String` 字符串对象

### BFC(块级格式化上下文)的理解和基本使用
* BFC 是一个独立的容器，容器内子元素不会影响容器外的元素。反之亦如此。
* BFC盒子之间垂直的间距是由 margin 决定的。
* 在同一个 BFC 中，两个相邻的块级盒子的垂直外边距会发生重叠。
* BFC 区域不会和 float box 发生重叠。
* BFC 能够识别并包含浮动元素，当计算其区域的高度时，浮动元素也可以参与计算了

### `getElementsByClassName` 和 `querySelectorAll` 的区别
> `querySelectorAll()`方法是HTML5新增的方法，通过传入一个css选择符，返回所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个NodeList的实例

> `document.getElementsByClassName`是动态查询的过程，会随着dom结构的变化，得到的结点列表也会发生变化，而`querySelector`得到的是一个静态列表，它不会对dom结构进行动态查询。

# ES6

### var const 和 let 区别
* var声明的变量会挂载在window上，而let和const声明的变量不会
* let 是块作用域，即其在整个大括号 {} 之内可见
* const 变量一旦被赋值，就不能再改变了

### 数组扁平化，去重，排序
```JavaScript
    var arr= [1, 2, [3, 4]].flat();
    arr = Array.form(new Set(arr));
    arr.sort()
```

### 箭头函数，箭头函数的特点
1. 箭头函数this为父作用域的this，不是调用时的this
2. 箭头函数不能作为构造函数，不能使用new
3. 箭头函数没有arguments，caller
4. 箭头函数通过call和apply调用，不会改变this指向，只会传入参数
5. 箭头函数没有原型属性
6. 箭头函数不能作为Generator函数，不能使用yield关键字
7. 箭头函数返回对象时，要加一个小括号
8. 箭头函数在ES6 class中声明的方法为实例方法，不是原型方法
9. 多重箭头函数就是一个高阶函数，相当于内嵌函数

### ES6 新增的 set() weakset() 和 map() 有什么区别
* set类似于数组，但是成员的值都是唯一的，没有重复的值。
* WeakSet的成员只能是对象，而不能是其他类型的值。WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。
* map 结构提供了[值:值]的对应，是一种更完善的Hash结构实现。如果你需要"键值对"的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键,map可通过set赋值，get取值。

### every 和 some 的区别
* every:一假即假,必须所有都返回true才会返回true，哪怕有一个false，就会返回false；
* some:一真即真, 只要其中一个为true 就会返回true

### promise 函数
* Promise是异步编程的一种解决方案
* resolve 把正确的值返回出去
* reject 把错误的值返回出去
* then 接收resolve的回调
* catch 接收reject的回调

### async 和 await
* async 异步函数,返回的是一个promise 对象，如果要获取到promise 返回值，我们应该用then 方法
* await 写异步代码就像写同步代码一样了，再也没有回调地域

# 移动端

### 移动端适配讲了一下
rem布局  
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`  
width=750布局  
`<meta name="viewport" content="target-densitydpi=device-dpi,width=750,user-scalable=no">`

### 移动端有哪些单位
> px  
> rem  
> em  
> vw 相对于视口的宽度，视口被均分为100单位的vw  
> vh

# 中级类

### 对闭包的理解，以及哪些地方用过闭包，以及闭包的缺点，闭包为什么会导致内存泄漏
闭包：有时候需要获取到函数内部的局部变量称之为闭包
#### 使用场景
* 采用函数引用方式的setTimeout调用。
* 将函数关联到对象的实例方法。
* 封装相关的功能集。
#### 闭包缺点
由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
解决方法是，在退出函数之前，将不使用的局部变量全部删除。
```JavaScript
    var cnt=(function(){
        var i=0;
        return function(){
            console.log(i);
            i++;
        }
    })();
    cnt();//0
    cnt();//1
    cnt();//2
    cnt();//3
```    

### 对跨域了解吗，jsonp 的限制
#### 为什么会产生跨域
跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域
#### 原理
动态创建script标签,利用script标签的src属性可以获取任何域下的js脚本,通过这个特性(也可以说漏洞),服务器端不在返回json格式,而是返回一段调用，某个函数的js代码，在src中进行了调用，这样实现了跨域.
#### 限制
jsonp只支持get请求而不支持post请求

### 用 meta 怎么实现不从缓存中获取资源
`<meta http-equiv="Pragma" content="no-cache" />`

### this的指向问题
1. 如果是全局调用 则this指向window
2. 如果是构造函数，则this指向当前被new出来的实例对象
3. 如果函数被调用时是被对象调用，则this指向调用它的对象
4. 如果是用call和apply调用，则this指向你手动设置的函数

### 函数防抖和函数节流 简单实现
`函数节流` 频繁触发，只在特定的时间内执行一次代码。  
应用场景  
onrize,onscroll等频繁触发的函数，比如你想获取滚动条的位置，然后执行下一步动作
```javascript
function throttle(fn,delay){
    let timer = null;
    return function(){
        let args = arguments;
        if(timer) return;
        timer = setTimeout(()=>{
            fn.apply(this,args)
            timer = null;//// 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
        },delay)
    }
}
```
`函数防抖`频繁触发，但只在特定的时间内没有再次触发执行函数，函数才会真的去执行。  
应用场景  
输入框自动补全时间，频繁操作点赞取消点赞等。
```javascript
function debounce(fn, delay) {
    let timer; // 维护一个 timer
    return function () {
        let args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(()=> {
            fn.apply(this, args); // 用apply指向调用debounce的对象，相当于this.fn(args);
        }, delay);
    };
}
```

### 除了 cookie 还有那些东西辨别用户身份的
Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。

### AMD 和 commonjs 怎么使用，怎么配置，有哪些好处
* CommonJS是适用于服务器端的,Node执行环境就是采用的CommonJS模式。
* AMD是适用于浏览器端的一种模块异步加载方式

### 函数柯里化
>函数柯里化是指将多变量函数拆解为单变量的多个函数的依次调用， 可以从高元函数动态地生成批量的低元的函数。可以看成一个强大的函数工厂，结合函数式编程，可以叠加出很BT的能力。

### 匿名函数的使用场景
>防止变量的全局污染 jQuery插件封装引用了匿名函数

### 缓存expire 和 cache-control 区别
* 概念Cache-control 用于控制HTTP缓存（在HTTP/1.0中可能部分没实现，仅仅实现了 Pragma: no-cache）
* Expires 表示存在时间，允许客户端在这个时间之前不去检查（发请求），等同max-age的效果。但是如果同时存在，则被Cache-Control的max-age覆盖。

### 事件模型和事件委托
#### 事件模型
>一个事件发生后，会在子元素和父元素之间传播。
"DOM2级事件"规定事件流的三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会；然后是实际的目标接收到事件；最后一个阶段是冒泡阶段，可以在这个阶段对事件作出响应,即:事件捕获->事件处理->事件冒泡
#### 事件委托
>利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件

### 对象和类的区别，举个现实中的例子
1. 类是一个抽象的概念，它不存在于现实中的时间/空间里，类只是为所有的对象定义了抽象的属性与行为。就好像“Person（人）”这个类，它虽然可以包含很多个体，但它本身不存在于现实世界上。
2. 对象是类的一个具体。它是一个实实在在存在的东西。
3. 类是一个静态的概念，类本身不携带任何数据。当没有为类创建任何对象时，类本身不存在于内存空间中。
4. 对象是一个动态的概念。每一个对象都存在着有别于其它对象的属于自己的独特的属性和行为。对象的属性可以随着它自己的行为而发生改变。

### 栅格实现 (响应式布局)
使用float或者flex实现

### 怎么减少回流和重绘 什么时候会发生回流呢
* 回流：回流是布局或者几何属性需要改变
* 重绘：由于节点的几何属性发生改变或者由于样式发生改变但不会影响布局

1、CSS优化法

* 使用 transform 替代 top

* 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局

* 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。

* 尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

* 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。

* 将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。

* 避免使用CSS表达式，可能会引发回流。

* 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。

* CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。


2、JavaScript优化法

* 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。

* 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。

* 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来

# 函数作用域问题
```JavaScript
    console.log(1+2+'3'); //33
    console.log('3'+2+1); //321
    function F1(){
        this.name = 'f1'
    }
    function F2(){
        this.name = 'f2'
        return {}
    }
    console.log(new F1()) //返回的是实例对象
    console.log(new F2()) //返回的是空对象
    console.log(new F1().name) //f1
    console.log(F1().name) // 报错
    console.log(new F2().name) //undefined
    console.log(F2().name) //undefined

    var a = 10;
    (function a(){
        console.log(a);//undefined
        var a = b = 100;
        console.log(a) //100
    })()
    console.log(a+b) //110
```

# 高级类

### 页面监控，错误处理和性能信息，onerror用法
* 数据采集 --> 数据上报 --> 服务端处理 --> 数据库存储 --> 数据监控可视化平台
* Performance 接口可以获取到当前页面中与性能相关的信息，它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。

### 前端路由的实现 前端路由和服务端路由
#### Pjax（PushState + Ajax）
原理
>利用ajax请求替代了a标签的默认跳转，然后利用html5中的API修改了url。
两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。（Ajax可以实现页面的无刷新操作，于是，返回的时候，通过URL或其他传参，我们就可以还原到Ajax之前的模样）
#### Hjax（Hash + Ajax）
原理
>url 中常会出现 #，一可以表示锚点（如回到顶部按钮的原理），二是路由里的锚点（hash）。Web 服务并不会解析 hash，也就是说 # 后的内容 Web 服务都会自动忽略，但是 JavaScript 是可以通过 window.location.hash 读取到的，读取到路径加以解析之后就可以响应不同路径的逻辑处理。
hashchange 事件(监听 hash 变化触发的事件)，当用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。

### 双向绑定，proxy和defineProperty对比
`defineProperty 数据劫持比较好理解,通常我们利用Object.defineProperty劫持对象的访问器,在属性值发生变化时我们可以获取变化`
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
超链接: [跳转](https://www.jianshu.com/p/2df6dcddb0d7)

### eventloop事件循环，微任务宏任务
宏任务
>浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->...）
鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTMl。还有下面这个例子，setTimeout的作用是等待给定的时间后为它的回调产生一个新的宏任务。这就是为什么打印‘setTimeout’在‘script end’之后。因为打印‘script end’是第一个宏任务里面的事情，而‘setTimeout’是另一个独立的任务里面打印的。

微任务
>微任务通常来说就是需要在当前 task 执行结束后立即执行的任务，比如对一系列动作做出反馈，或或者是需要异步的执行任务而又不需要分配一个新的 task，这样便可以减小一点性能的开销。只要执行栈中没有其他的js代码正在执行且每个宏任务执行完，微任务队列会立即执行。如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行。微任务包括了mutation observe的回调还有接下来的例子promise的回调。
一旦一个pormise有了结果，或者早已有了结果（有了结果是指这个promise到了fulfilled或rejected状态），他就会为它的回调产生一个微任务，这就保证了回调异步的执行即使这个promise早已有了结果。所以对一个已经有了结果的promise调用.then(yey, nay)会立即产生一个微任务。这就是为什么‘promise1’,'promise2'会打印在‘script end’之后，因为所有微任务执行的时候，当前执行栈的代码必须已经执行完毕。‘promise1’,'promise2'会打印在‘setTimeout’之前是因为所有微任务总会在下一个宏任务之前全部执行完毕。

### 深拷贝和浅拷贝，深拷贝的实现以及应用场景
>首先，浅拷贝和深拷贝都只针对于像Object， Array这样的复杂对象。

区别：浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制
#### 应用场景
1. 从服务器fetch到数据之后我将其存放在store中，通过props传递给界面，然后我需要对这堆数据进行修改，那涉及到修改就一定有保存和取消，所以我们需要将这堆数据拷贝到其他地方（网友的经历）
2. 当你想使用某个对象的值，在修改时不想修改原对象，那么可以用深拷贝来弄一个新的内存对象。像es6的新增方法都是深拷贝，所以推荐使用es6语法。
3. es5数组新增的map，filter等方法都是深拷贝，日常开发很常用，比如重组格式会使用map，map在react中是非常常用的，filter则是过滤返回一个新的数组。

### 继承，原型链继承怎么实现
`首先，在JavaScript中，万物皆对象。
但是，对象分两种：一种是普通对象(Object)，另一种是函数对象(Function)；
凡是通过new Function()创建的对象都是函数对象，其他的都是普通对象；
Object和Function 都是通过new Function（）创造的。`  
超链接: [跳转](https://www.cnblogs.com/miacara94/p/7683677.html)
### proto 和 prototype 的区别
1. 对象有属性__proto__,指向该对象的构造函数的原型对象。
2. 方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。

### 前端性能优化
* 减少请求数量 图片合并 雪碧图 Base64 使用字体图标来代替图片
* 减少重定向 使用缓存 不使用CSS @import 避免使用空的src和href
* 减小资源大小 js/css/html/img
* 优化网络连接 使用CDN 使用DNS预解析
* 优化资源加载 资源加载位置 资源加载时机
* 减少重绘回流 防抖和节流 及时清理环境
* 性能更好的API 用对选择器 使用requestAnimationFrame来替代setTimeout和setInterval 使用IntersectionObserver来实现图片可视区域的懒加载 使用web worker
* webpack优化 动态导入和按需加载 剔除无用代码 长缓存优化

# 原理类

### settimeout 的机制
javascript是一门单线程语言,当javascript运行时遇到`setTimeout`后其实会另开一条线程

### TCP 和 UDP 的区别
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/TCP_UDP.png)

### 了解MVVM MVC的区别
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/MVVM.png)   ![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/MVC.png)  
`MVC`在开发中，除了简单的 Model、View 以外的所有部分都被放在了 Controller 中。Controller 负责显示界面、响应用户的操作、网络请求以及与 Model 的交互，这就导致了 Controller
逻辑复杂，难以维护和 View 紧耦合，无法测试  
`MVVM`View 和 Model 之间没有联系，通 ViewModel 进行交互(ViewModel负责把Model的数据同步到View显示出来)，而且 Model 和 ViewModel 之间的交互是双向的，因此视图的数据改变会同时修改数据源，而数据源的数据变化也会立即反映到 View 上。

### 网络七层协议
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/XY.png)

### http 和 https 的区别
* HTTP 的 URL 以 http:// 开头，而 HTTPS 的 URL 以 https:// 开头
* HTTP 是不安全的，而 HTTPS 是安全的
* HTTP 标准端口是 80 ，而 HTTPS 的标准端口是 443
* 在 OSI 网络模型中，HTTP 工作于应用层，而 HTTPS 工作在传输层
* HTTP 无需加密，而 HTTPS 对传输的数据进行加密
* HTTP 无需证书，而 HTTPS 需要认证证书

### 输入 url 到显示的过程
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/link.png)
1. 输入网址： http://www.baidu.com
2. 通过DNS解析获得网址的对应IP地址
3. 浏览器与远程web服务器 通过TCP三次握手建立TCP/IP连接
4. 浏览器向web服务器发送一个HTTP请求
5. 服务器处理请求并返回HTTP报文
6. 浏览器解析渲染页面
7. 断开链接

### dns 解析过程
1. 现在我有一台计算机，通过ISP接入了互联网，那么ISP就会给我分配一个DNS服务器，这个DNS服务器不是权威服务器，而是相当于一个代理的dns解析服务器，他会帮你迭代权威服务器返回的应答，然后把最终查到IP返回给你。
2. 现在的我计算机要向这台ISPDNS发起请求查询www.baidu.com这个域名了，(经网友提醒：这里其实准确来说不是ISPDNS，而应该是用户自己电脑网络设置里的DNS，并不一定是ISPDNS。比如也有可能你手工设置了8.8.8.8)
3. ISPDNS拿到请求后，先检查一下自己的缓存中有没有这个地址，有的话就直接返回。这个时候拿到的ip地址，会被标记为非权威服务器的应答。
4. 如果缓存中没有的话，ISPDNS会从配置文件里面读取13个根域名服务器的地址（这些地址是不变的，直接在BIND的配置文件中），
5. 然后像其中一台发起请求。
6. 根服务器拿到这个请求后，知道他是com.这个顶级域名下的，所以就会返回com域中的NS记录，一般来说是13台主机名和IP。
7. 然后ISPDNS向其中一台再次发起请求，com域的服务器发现你这请求是baidu.com这个域的，我一查发现了这个域的NS，那我就返回给你，你再去查。
   （目前百度有4台baidu.com的顶级域名服务器）。
8. ISPDNS不厌其烦的再次向baidu.com这个域的权威服务器发起请求，baidu.com收到之后，查了下有www的这台主机，就把这个IP返回给你了，
9. 然后ISPDNS拿到了之后，将其返回给了客户端，并且把这个保存在高速缓存中

### https 具体的传输过程
1. 客户端通过TCP三次握手发起链接
2. 服务器将CA证书返回给客户端
3. 客户端验证服务器证书的合法性
4. 客户端生成随机对称秘钥
5. 将客户端生成的对称秘钥通过证书的公钥进行非对称加密发给服务器
6. 双方通过客户端生成的随机秘钥进行HTTP通信。


### 讲下git工作原理
[跳转](https://www.sohu.com/a/115137833_494937)  
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/git.jpg)


### 讲下图片缓存和图片预加载
* 缓存：浏览器在需要进行图片操作之前，会先查看本地是否有缓存，如果有，会先读取缓存；如果没有，才会去发起网络请求
* 预加载：提升体验效果

### 讲下浏览器的渲染流程
1. 解析html建立dom树
2. 解析css构建render树（将CSS代码解析成树形的数据结构，然后结合DOM合并成render树）
3. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
4. 绘制render树（paint），绘制页面像素信息
5. 浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上。

### 进程，线程的概念，线程之间如何通讯

### 讲一下栈和队列，项目或实际应用有哪些
栈：栈是一种先进后出的远测的有序集合。新添加或删除的元素都是从栈的末尾里操作的，栈的末尾称为栈顶，另一端称为栈底
```javascript
//创建一个类表示栈
function Stack(){
}
//定义一个数组来存储栈的元素
var arr=[];
add()//表示往栈顶里添加元素
del()//表示往栈顶里删除一个元素
topElement()//返回一个栈顶元素
isEmpty()//判断栈里是否为空，如果为空则返回true
clear()//清空栈里的元素
size()//返回栈里的元素个数

function Stack(arr){
	this.add=function(el){
		arr.push(el)
	}
	this.del=function(){
		arr.pop()
	}
	this.topElement(){
		return arr[arr.length-1]
	}
	this.isEmpty=function(){
		return arr.length==0
	}
	this.clear=function{
		arr=[]
	}
	this.size=function{
		return arr.length
	}
	
}
//实例化栈对象
var Stack=new Stack(arr);
```
队列：队列是先进先出原则，添加元素是从队尾添加，删除元素是从队首删除，最新的元素是在队尾
```javascript
//创建一个类表示队列
function Queue(){
}
//定义一个数组存储队列元素
var arr=[]
add()//表示向队尾添加一个元素
del()//表示向队首删除一个元素
front()//返回队首的元素
isEmpty()//判断队列是否空
clear()//清空队列里的元素
size()//返回队列里的元素个数
function Queue(arr){
	this.add=function(el){
		arr.push()
	}
	this.del=function(){
		arr.shift()
	}
	this.front=function(){
		return arr[0]
	}
	this.isEmpty=function(){
		return arr.length==0
	}
	this.clear=function(){
		arr=[]
	}
	this.size=function(){
		return arr.length
	}
}
//实例化一个队列对象
var Queue=new Queue(arr);
```
# 框架类 (Vue)

### 你觉得 vue 有哪些特点
> 遵循MVVM模式
> 编码简洁，体积小，运行效率高，适合移动端/PC端
> 它本身只关注UI，可以轻松引入Vue插件或其他第三方库开发项目

### SPA了解吗
> 更好的用户体验，让用户在web app感受native app的速度和流畅
> 经典MVC开发模式，前后端各负其责
> 重前端，业务逻辑全部在本地操作，数据都需要通过AJAX同步、提交
> 在URL中采用#号来作为当前视图的地址,改变#号后的参数，页面并不会重载

### vue 父子组件通信
> 父向子通讯用props
> 子向父通讯用 点击事件通过$.emit('xxx')向父组件xxx事件，然后父组件定义xx事件，xx事件调用相应的函数，函数内可接收子组件传过来的参数

### vue 生命周期
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/vue-life.png)
* beforeCreate --- 创建前
* created --- 创建完成
* beforeMount --- 挂载前
* mounted --- 挂载完成
* beforeUpdate --- 更新前
* updated --- 更新完成
* beforeDestroy --- 销毁前
* destroyed --- 销毁完成

超链接: [跳转](https://juejin.cn/post/6844903811094413320)

### vue的diff 算法
#### 1、虚拟dom
虚拟DOM其实就是一个JavaScript对象。通过这个JavaScript对象来描述真实DOM。真实DOM的操作，一般都会对某块元素的整体重新渲染,采用虚拟DOM的话，当数据变化的时候，只需要局部刷新变化的位置就好了。
#### 2、当数据变化时，vue更新节点——diff算法
我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。
### 3、diff的过程
当数据发生改变时，被订阅者会调用notify()方法通知所有订阅者watcher，订阅者就会调用patch给真实的DOM打补丁，更新视图  
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/diff.png)   
`patch (oldVnode, vnode)` 1、判断两个节点是否是同一个节点。如果是，那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode。
`patchVnode (oldVnode, vnode)` 找到对应的真实dom，称为el。如果oldVnode有子节点而Vnode没有，则删除el的子节点，如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el，如果两者都有子节点，则执行updateChildren函数比较子节点。

### 简述Vue的响应式原理?
当一个Vue实例创建时，vue会遍历data选项的属性，用 Object.defineProperty 将它们转为 getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。 每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
### 说说你对vuex的理解
* state：用一个对象就包含了全部的应用层级状态
* getters：用来从store中的state中派生出一些状态，例如对列表进行过滤并计数,可以认为是store的计算属性
* mutations:更改Vuex的store中的状态的唯一方法是提交mutation。Vuex中的mutations非常类似于事件：每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数
* actions：actions类似于mutation，不同在于：actions提交的是mutation，而不是直接变更状态。actions可以包含任意异步操作。
* Modules：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store对象就有可能变得相当臃肿。
  为了解决以上问题，Vuex允许我们将store分割成模块（module）。每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。  
  超链接: [跳转](https://juejin.cn/post/6924486801667162119)

# 框架类(React)
### 为什么state值不能修改，而用this.setState去修改？
setState是异步的。setState本质是通过一个队列实现state更新的，执行setState时，会将要更新的state合并后放入状态队列，而不会立即更新。如果没有通过this.setState,而是直接this.state修改，会导致这个修改没有放入队列中，下次执行this.setState合并队列时，就会忽略这次的修改，从而导致数据没有更新。  
简单点说，就是setState就是放入队列，而this.state会跳过队列，从而导致有可能这次的修改值会被忽略掉
### react的钩子函数有哪些？请求放在那个函数中？为什么？渲染页面钩子函数的执行顺序什么？
钩子函数：componentWillMount、render、componentDidMount、shouldComponentUpdate、componentWillUpdate、componentDidUpdate  
请求放在componentDidMount，因为这个在组件加载的时候只会执行一次  
执行顺序:componentWillMount、render、componentDidMount、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate
componentWillReceiveProps是在props发生改变的时候执行
### state与props有什么区别？
props是外部组件传入的数据，一般是父组件传到子组件的数据。  
props里面的数据不能修改，只能通过绑定父组件的方法来修改props里面的值，然后再传到子组件。而state是组件的私有变量。主要用于组件的保存，控制以及修改自己的状态，不能通过外部的访问以及修改，只能通过内部的this.setState方法来修改state里面的内容。
### react如何去操作dom的？
通过refs可以实现对dom的操作。通过给组件添加ref=‘XXXXX’,然后在方法立马通过调用this.refs.XXXXX，从而进行对dom的操作
### react在setState之后执行了哪些操作？
render、componentDidUpdate。在执行render的时候 this.state才会被更新。之前两个钩子函数都不会更新
### react性能优化是哪个周期函数？
shouldComponentUpdate这个函数用来判断是否需要调用render方法重新描绘dom，因为dom的描绘非常的消耗性能，如果可以在shouldComponentUpdate中写出更优化的dom diff算法可以极大的提高性能
### diff算法
1. 把树形结构按照层级划分，之比较同级元素
2. 给列表结构的每个单元添加唯一的key属性，方便比较
3. react只会匹配相同的calss的component
4. 合并操作，调用component的setState方法的时候，react将其标记为dirty，到每一个事件循环结束，react会检查所有标记dirty的component重新绘制
5. 选择性子树渲染，可以重写shouldComponentUpdate，提高diff算法的性能
### react性能优化的方案
* 重写shouldComponentUpdate来避免不必要的dom操作
* 使用key来帮助react来识别列表中所有子组件的最小变化
* 使用production版本的react.js
### 函数式组件和类组件有啥不同？
* 类组件不仅允许你使用更多的功能，如组件自身的状态和生命周期钩子函数，也能直接访问store并维持状态
* 函数式组件仅是接收props，并将组件自身渲染到页面时该组件就是一个无状态组件，可以使用一个纯函数来创建这样的组件
### 什么是redux？
> redux的基本思想是整个应用的state保持在一个单一的store中。store就是一个简单的JavaScript对象，而改变应用的state的唯一方式就是在应用用触发action，然后为这些action编写reducers来修改state。整个state的转化都是在reducers中完成的，并且不会有任何副作用
1. store通过reducer创建了初始状态；
2. view通过store.getState()将store中保存的state挂载在了自己的状态上；
3. 用户产生了操作，调用了actions 的方法；
4. actions的方法被调用，创建了带有标示性信息的action；
5. actions将action通过调用store.dispatch方法发送到了reducer中；
6. reducer接收到action并根据标识信息判断之后返回了新的state；
7. store的state被reducer更改为新state的时候，store.subscribe方法里的回调函数会执行，此时就可以通知view去重新获取state；
### 在redux中，什么是store？
> store是一个JavaScript对象，它保存了整个应用的state，于此同时，store也承担了以下的职责：
1. 允许通过getState（）访问state
2. 通过dispatch（action）改变state
3. 通过subscribe（listener）注册listeners
4. 通过subscribe（listener）返回函数处理listener的注册
### 在redux中，什么是action？
> action是一个纯JavaScript对象，他们必须有一个type属性表明正在执行action的类型。实质上action是将数据从应用程序发送到store的有效载荷
### 在redux中，什么是reducer？
> 一个reducer是一个纯函数，该函数以先前的state和一个action作为参数，并返回下一个state
### 什么是纯函数？
> 个不依懒于且不改变其作用域之外的变量状态的函数，这也意味着一个纯函数对于同样的参数总是返回同样的结果
### vue与react的区别？
1. react是严格上针对mvc的view层，vue则是mvvm模式
2. 操作dom的方式不同，vue是通过指令操作dom，而react通过js进行操作
3. 数据绑定不同，vue实现的是双向绑定，而react是单向数据流
4. react的state内容不可以直接修改，需要通过setState去修改，vue的state不是必须的，数据主要有data属性在vue对象中管理的
5. React是通过JSX渲染模板。而Vue是通过一种拓展的HTML语法进行渲染；
   Vue本质是MVVM框架，由MVC发展而来；React是前端组件化框架，由后端组件化发展而来；
# 算法类 [跳转](https://www.cnblogs.com/onepixel/articles/7674659.html)

### a^n 怎么用小于 O(n) 的算法实现

### 快排的原理
快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。  
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/QuickSort.gif.png)

### 数组去重
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
### 写一个函数判断是否存在循环引用

### 排序算法，时间复杂度
![cmd-markdown-logo](https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/sort-time.png)

### 平衡二叉树



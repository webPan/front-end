# 中级类

## 闭包
对闭包的理解，以及哪些地方用过闭包，以及闭包的缺点，闭包为什么会导致内存泄漏  
闭包：有时候需要获取到函数内部的局部变量称之为闭包
#### 使用场景
* 采用函数引用方式的setTimeout调用。
* 将函数关联到对象的实例方法。
* 封装相关的功能集。
#### 闭包缺点
由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
解决方法是，在退出函数之前，将不使用的局部变量全部删除。
```tsx
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

## 跨域
#### 为什么会产生跨域
跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域
#### 原理
动态创建`script`标签,利用`script`标签的`src`属性可以获取任何域下的js脚本,通过这个特性,服务器端不在返回`json`格式,而是返回一段调用某个函数的js代码，在`src`中进行了调用，这样实现了跨域.
#### 限制
`jsonp`只支持`get`请求而不支持`post`请求

```javascript
//简单实现方法
function jsonp(req){
    var script = document.createElement('script');
    var url = req.url + '?callback=' + req.callback.name;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script); 
}
//使用方法
function hello(res){
    alert('hello ' + res.data);
}
jsonp({
    url : '',
    callback : hello
});
```

## 用 meta 不从缓存中获取资源
```html
<meta http-equiv="Pragma" content="no-cache" />
```

## this的指向问题
1. 如果是全局调用 则this指向window
2. 如果是构造函数，则this指向当前被new出来的实例对象
3. 如果函数被调用时是被对象调用，则this指向调用它的对象
4. 如果是用call和apply调用，则this指向你手动设置的函数

## 函数防抖和函数节流 简单实现
* 函数节流  
频繁触发，只在特定的时间内执行一次代码。  
应用场景  
`onrize` `onscroll`等频繁触发的函数，比如你想获取滚动条的位置，然后执行下一步动作
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
* 函数防抖  
  频繁触发，但只在特定的时间内没有再次触发执行函数，函数才会真的去执行。  
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


## AMD 和 commonjs对比
* `CommonJS`是适用于服务器端的,`Node`执行环境就是采用的`CommonJS`模式。
* `AMD`是适用于浏览器端的一种模块异步加载方式

## 匿名函数的使用场景
防止变量的全局污染 jQuery插件封装引用了匿名函数

## 事件模型和事件委托
#### 事件模型
一个事件发生后，会在子元素和父元素之间传播。  
"DOM2级事件"规定事件流的三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会；然后是实际的目标接收到事件；最后一个阶段是冒泡阶段，可以在这个阶段对事件作出响应,即:事件捕获->事件处理->事件冒泡
#### 事件委托
利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件

## 怎么减少回流和重绘
* 回流：回流是布局或者几何属性需要改变
* 重绘：由于节点的几何属性发生改变或者由于样式发生改变但不会影响布局

#### CSS优化法

* 使用 transform 替代 top
* 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局
* 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。
* 尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。
* 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。
* 将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。
* 避免使用CSS表达式，可能会引发回流。
* 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。
* CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。


#### JavaScript优化法

* 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。

* 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。

* 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来

## 函数作用域问题
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
## 什么是ajax? ajax的步骤？ 
`ajax`能够刷新局部网页数据而不是重新加载整个网页。
#### 如何使用ajax?
1. 创建`xmlhttprequest`对象，`var xmlhttp =new XMLHttpRequest（);
   XMLHttpRequest`对象用来和服务器交换数据。
```javascript
var xhttp;
if (window.XMLHttpRequest) {
//现代主流浏览器
xhttp = new XMLHttpRequest();
} else {
// 针对浏览器，比如IE5或IE6
xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
```
2. 使用`xmlhttprequest`对象的`open()`和`send()`方法发送资源请求给服务器。
3. 使用`xmlhttprequest`对象的`responseText`或`responseXML`属性获得服务器的响应。

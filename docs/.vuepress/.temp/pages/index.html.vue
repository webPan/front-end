<template><div><h1 id="基础类" tabindex="-1"><a class="header-anchor" href="#基础类"><span>基础类</span></a></h1>
<h3 id="css3-选择器有哪些" tabindex="-1"><a class="header-anchor" href="#css3-选择器有哪些"><span>CSS3 选择器有哪些</span></a></h3>
<ul>
<li>
<p>:first-child选择某个元素的第一个子元素；</p>
</li>
<li>
<p>:last-child选择某个元素的最后一个子元素；</p>
</li>
<li>
<p>:first-of-type选择一个上级元素下的第一个同类子元素；</p>
</li>
<li>
<p>:last-of-type选择一个上级元素的最后一个同类子元素；</p>
</li>
<li>
<p>:nth-child(n)选择某个元素的一个或多个特定的子元素；</p>
</li>
<li>
<p>:nth-last-child(n) 选择器匹配属于其元素的第 N 个子元素的每个元素，不论元素的类型，从最后一个子元素开始计数。</p>
</li>
<li>
<p>:nth-of-type(n) 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素</p>
</li>
<li>
<p>:nth-last-of-type(n)选择指定的元素，从元素的最后一个开始计算；</p>
</li>
<li>
<p>:only-child选择的元素是它的父元素的唯一一个了元素；</p>
</li>
<li>
<p>:only-of-type选择一个元素是它的上级元素的唯一一个相同类型的子元素；</p>
</li>
<li>
<p>:empty选择的元素里面没有任何内容。</p>
</li>
<li>
<p>:not(selector) 选择器匹配非指定元素/选择器的每个元素。</p>
</li>
</ul>
<h3 id="html5新标签" tabindex="-1"><a class="header-anchor" href="#html5新标签"><span>HTML5新标签</span></a></h3>
<p>header footer main nav aside article figcaption figure progress dialog bdi details  mark menuitem meter  rp rt ruby section summary time wbr</p>
<h3 id="css-布局" tabindex="-1"><a class="header-anchor" href="#css-布局"><span>CSS 布局</span></a></h3>
<p>超链接: <a href="https://www.cnblogs.com/xuepei/p/9990553.html" target="_blank" rel="noopener noreferrer">跳转</a></p>
<h4 id="两栏布局-左侧宽度固定-右侧自适应" tabindex="-1"><a class="header-anchor" href="#两栏布局-左侧宽度固定-右侧自适应"><span>两栏布局(左侧宽度固定，右侧自适应)</span></a></h4>
<ul>
<li>float + margin</li>
<li>float + overflow</li>
<li>float + position</li>
<li>flex</li>
</ul>
<h4 id="三栏布局-两边固定中间自适应" tabindex="-1"><a class="header-anchor" href="#三栏布局-两边固定中间自适应"><span>三栏布局(两边固定中间自适应)</span></a></h4>
<ul>
<li>float + margin</li>
<li>position + margin</li>
<li>flex</li>
</ul>
<h3 id="css-盒模型" tabindex="-1"><a class="header-anchor" href="#css-盒模型"><span>CSS 盒模型</span></a></h3>
<ul>
<li>W3C margin + border + padding + content<br>
<img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/w3c.jpg" alt="cmd-markdown-logo"></li>
<li>IE margin + content (content里面包含了padding border)<br>
<img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/ie.jpg" alt="cmd-markdown-logo"></li>
</ul>
<h3 id="css-js-兼容性问题" tabindex="-1"><a class="header-anchor" href="#css-js-兼容性问题"><span>CSS JS 兼容性问题</span></a></h3>
<ul>
<li>行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，IE6间距bug</li>
<li>图片默认有间距</li>
<li>透明度的兼容CSS设置</li>
</ul>
<h3 id="cookie、localstorage、sessionstorage-的区别" tabindex="-1"><a class="header-anchor" href="#cookie、localstorage、sessionstorage-的区别"><span>cookie、localstorage、sessionstorage 的区别</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/CSL.png" alt="cmd-markdown-logo"></p>
<h3 id="array方法有哪些-哪些会改变原数组-分成两类的话怎么分" tabindex="-1"><a class="header-anchor" href="#array方法有哪些-哪些会改变原数组-分成两类的话怎么分"><span>array方法有哪些，哪些会改变原数组，分成两类的话怎么分</span></a></h3>
<h4 id="不会改变原来数组的有" tabindex="-1"><a class="header-anchor" href="#不会改变原来数组的有"><span>不会改变原来数组的有：</span></a></h4>
<ul>
<li><code v-pre>concat</code> 连接两个或更多的数组，并返回结果。</li>
<li><code v-pre>every</code> 检测数组元素的每个元素是否都符合条件。</li>
<li><code v-pre>some</code> 检测数组元素中是否有元素符合指定条件。</li>
<li><code v-pre>filter</code> 检测数组元素，并返回符合条件所有元素的数组。</li>
<li><code v-pre>indexOf</code> 搜索数组中的元素，并返回它所在的位置。</li>
<li><code v-pre>join</code> 把数组的所有元素放入一个字符串。</li>
<li><code v-pre>toString</code> 把数组转换为字符串，并返回结果。</li>
<li><code v-pre>lastIndexOf</code> 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。</li>
<li><code v-pre>map</code> 通过指定函数处理数组的每个元素，并返回处理后的数组。</li>
<li><code v-pre>slice</code> 选取数组的的一部分，并返回一个新数组。</li>
<li><code v-pre>valueOf</code> 返回数组对象的原始值。</li>
</ul>
<h4 id="会改变原来数组的有" tabindex="-1"><a class="header-anchor" href="#会改变原来数组的有"><span>会改变原来数组的有：</span></a></h4>
<ul>
<li><code v-pre>pop</code> 删除数组的最后一个元素并返回删除的元素。</li>
<li><code v-pre>push</code> 向数组的末尾添加一个或更多元素，并返回新的长度。</li>
<li><code v-pre>shift</code> 删除并返回数组的第一个元素。</li>
<li><code v-pre>unshift</code> 向数组的开头添加一个或更多元素，并返回新的长度。</li>
<li><code v-pre>reverse</code> 反转数组的元素顺序。</li>
<li><code v-pre>sort</code> 对数组的元素进行排序。</li>
<li><code v-pre>splice</code> 用于插入、删除或替换数组的元素。</li>
</ul>
<p><code v-pre>slice不会改变原数组，但是splice会直接改变原数组。</code></p>
<h3 id="get-和-post-的区别" tabindex="-1"><a class="header-anchor" href="#get-和-post-的区别"><span>get 和 post 的区别</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/GET_POST.png" alt="cmd-markdown-logo"></p>
<h3 id="javascript内置对象有哪些" tabindex="-1"><a class="header-anchor" href="#javascript内置对象有哪些"><span>javascript内置对象有哪些</span></a></h3>
<ul>
<li><code v-pre>Arguments</code> 函数参数集合</li>
<li><code v-pre>Array</code> 数组</li>
<li><code v-pre>Boolean</code> 布尔对象</li>
<li><code v-pre>Date</code> 日期时间</li>
<li><code v-pre>Error</code> 异常对象</li>
<li><code v-pre>Function</code> 函数构造器</li>
<li><code v-pre>Math</code> 数学对象</li>
<li><code v-pre>Number</code> 数值对象</li>
<li><code v-pre>Object</code> 基础对象</li>
<li><code v-pre>RegExp</code> 正则表达式对象</li>
<li><code v-pre>String</code> 字符串对象</li>
</ul>
<h3 id="bfc-块级格式化上下文-的理解和基本使用" tabindex="-1"><a class="header-anchor" href="#bfc-块级格式化上下文-的理解和基本使用"><span>BFC(块级格式化上下文)的理解和基本使用</span></a></h3>
<ul>
<li>BFC 是一个独立的容器，容器内子元素不会影响容器外的元素。反之亦如此。</li>
<li>BFC盒子之间垂直的间距是由 margin 决定的。</li>
<li>在同一个 BFC 中，两个相邻的块级盒子的垂直外边距会发生重叠。</li>
<li>BFC 区域不会和 float box 发生重叠。</li>
<li>BFC 能够识别并包含浮动元素，当计算其区域的高度时，浮动元素也可以参与计算了</li>
</ul>
<h3 id="getelementsbyclassname-和-queryselectorall-的区别" tabindex="-1"><a class="header-anchor" href="#getelementsbyclassname-和-queryselectorall-的区别"><span><code v-pre>getElementsByClassName</code> 和 <code v-pre>querySelectorAll</code> 的区别</span></a></h3>
<blockquote>
<p><code v-pre>querySelectorAll()</code>方法是HTML5新增的方法，通过传入一个css选择符，返回所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个NodeList的实例</p>
</blockquote>
<blockquote>
<p><code v-pre>document.getElementsByClassName</code>是动态查询的过程，会随着dom结构的变化，得到的结点列表也会发生变化，而<code v-pre>querySelector</code>得到的是一个静态列表，它不会对dom结构进行动态查询。</p>
</blockquote>
<h1 id="es6" tabindex="-1"><a class="header-anchor" href="#es6"><span>ES6</span></a></h1>
<h3 id="var-const-和-let-区别" tabindex="-1"><a class="header-anchor" href="#var-const-和-let-区别"><span>var const 和 let 区别</span></a></h3>
<ul>
<li>var声明的变量会挂载在window上，而let和const声明的变量不会</li>
<li>let 是块作用域，即其在整个大括号 {} 之内可见</li>
<li>const 变量一旦被赋值，就不能再改变了</li>
</ul>
<h3 id="数组扁平化-去重-排序" tabindex="-1"><a class="header-anchor" href="#数组扁平化-去重-排序"><span>数组扁平化，去重，排序</span></a></h3>
<div class="language-JavaScript line-numbers-mode" data-highlighter="prismjs" data-ext="JavaScript" data-title="JavaScript"><pre v-pre><code><span class="line">    var arr= [1, 2, [3, 4]].flat();</span>
<span class="line">    arr = Array.form(new Set(arr));</span>
<span class="line">    arr.sort()</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="箭头函数-箭头函数的特点" tabindex="-1"><a class="header-anchor" href="#箭头函数-箭头函数的特点"><span>箭头函数，箭头函数的特点</span></a></h3>
<ol>
<li>箭头函数this为父作用域的this，不是调用时的this</li>
<li>箭头函数不能作为构造函数，不能使用new</li>
<li>箭头函数没有arguments，caller</li>
<li>箭头函数通过call和apply调用，不会改变this指向，只会传入参数</li>
<li>箭头函数没有原型属性</li>
<li>箭头函数不能作为Generator函数，不能使用yield关键字</li>
<li>箭头函数返回对象时，要加一个小括号</li>
<li>箭头函数在ES6 class中声明的方法为实例方法，不是原型方法</li>
<li>多重箭头函数就是一个高阶函数，相当于内嵌函数</li>
</ol>
<h3 id="es6-新增的-set-weakset-和-map-有什么区别" tabindex="-1"><a class="header-anchor" href="#es6-新增的-set-weakset-和-map-有什么区别"><span>ES6 新增的 set() weakset() 和 map() 有什么区别</span></a></h3>
<ul>
<li>set类似于数组，但是成员的值都是唯一的，没有重复的值。</li>
<li>WeakSet的成员只能是对象，而不能是其他类型的值。WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。</li>
<li>map 结构提供了[值:值]的对应，是一种更完善的Hash结构实现。如果你需要&quot;键值对&quot;的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键,map可通过set赋值，get取值。</li>
</ul>
<h3 id="every-和-some-的区别" tabindex="-1"><a class="header-anchor" href="#every-和-some-的区别"><span>every 和 some 的区别</span></a></h3>
<ul>
<li>every:一假即假,必须所有都返回true才会返回true，哪怕有一个false，就会返回false；</li>
<li>some:一真即真, 只要其中一个为true 就会返回true</li>
</ul>
<h3 id="promise-函数" tabindex="-1"><a class="header-anchor" href="#promise-函数"><span>promise 函数</span></a></h3>
<ul>
<li>Promise是异步编程的一种解决方案</li>
<li>resolve 把正确的值返回出去</li>
<li>reject 把错误的值返回出去</li>
<li>then 接收resolve的回调</li>
<li>catch 接收reject的回调</li>
</ul>
<h3 id="async-和-await" tabindex="-1"><a class="header-anchor" href="#async-和-await"><span>async 和 await</span></a></h3>
<ul>
<li>async 异步函数,返回的是一个promise 对象，如果要获取到promise 返回值，我们应该用then 方法</li>
<li>await 写异步代码就像写同步代码一样了，再也没有回调地域</li>
</ul>
<h1 id="移动端" tabindex="-1"><a class="header-anchor" href="#移动端"><span>移动端</span></a></h1>
<h3 id="移动端适配讲了一下" tabindex="-1"><a class="header-anchor" href="#移动端适配讲了一下"><span>移动端适配讲了一下</span></a></h3>
<p>rem布局<br>
<code v-pre>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</code><br>
width=750布局<br>
<code v-pre>&lt;meta name=&quot;viewport&quot; content=&quot;target-densitydpi=device-dpi,width=750,user-scalable=no&quot;&gt;</code></p>
<h3 id="移动端有哪些单位" tabindex="-1"><a class="header-anchor" href="#移动端有哪些单位"><span>移动端有哪些单位</span></a></h3>
<blockquote>
<p>px<br>
rem<br>
em<br>
vw 相对于视口的宽度，视口被均分为100单位的vw<br>
vh</p>
</blockquote>
<h1 id="中级类" tabindex="-1"><a class="header-anchor" href="#中级类"><span>中级类</span></a></h1>
<h3 id="对闭包的理解-以及哪些地方用过闭包-以及闭包的缺点-闭包为什么会导致内存泄漏" tabindex="-1"><a class="header-anchor" href="#对闭包的理解-以及哪些地方用过闭包-以及闭包的缺点-闭包为什么会导致内存泄漏"><span>对闭包的理解，以及哪些地方用过闭包，以及闭包的缺点，闭包为什么会导致内存泄漏</span></a></h3>
<p>闭包：有时候需要获取到函数内部的局部变量称之为闭包</p>
<h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h4>
<ul>
<li>采用函数引用方式的setTimeout调用。</li>
<li>将函数关联到对象的实例方法。</li>
<li>封装相关的功能集。</li>
</ul>
<h4 id="闭包缺点" tabindex="-1"><a class="header-anchor" href="#闭包缺点"><span>闭包缺点</span></a></h4>
<p>由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
解决方法是，在退出函数之前，将不使用的局部变量全部删除。</p>
<div class="language-JavaScript line-numbers-mode" data-highlighter="prismjs" data-ext="JavaScript" data-title="JavaScript"><pre v-pre><code><span class="line">    var cnt=(function(){</span>
<span class="line">        var i=0;</span>
<span class="line">        return function(){</span>
<span class="line">            console.log(i);</span>
<span class="line">            i++;</span>
<span class="line">        }</span>
<span class="line">    })();</span>
<span class="line">    cnt();//0</span>
<span class="line">    cnt();//1</span>
<span class="line">    cnt();//2</span>
<span class="line">    cnt();//3</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对跨域了解吗-jsonp-的限制" tabindex="-1"><a class="header-anchor" href="#对跨域了解吗-jsonp-的限制"><span>对跨域了解吗，jsonp 的限制</span></a></h3>
<h4 id="为什么会产生跨域" tabindex="-1"><a class="header-anchor" href="#为什么会产生跨域"><span>为什么会产生跨域</span></a></h4>
<p>跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域</p>
<h4 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h4>
<p>动态创建script标签,利用script标签的src属性可以获取任何域下的js脚本,通过这个特性(也可以说漏洞),服务器端不在返回json格式,而是返回一段调用，某个函数的js代码，在src中进行了调用，这样实现了跨域.</p>
<h4 id="限制" tabindex="-1"><a class="header-anchor" href="#限制"><span>限制</span></a></h4>
<p>jsonp只支持get请求而不支持post请求</p>
<h3 id="用-meta-怎么实现不从缓存中获取资源" tabindex="-1"><a class="header-anchor" href="#用-meta-怎么实现不从缓存中获取资源"><span>用 meta 怎么实现不从缓存中获取资源</span></a></h3>
<p><code v-pre>&lt;meta http-equiv=&quot;Pragma&quot; content=&quot;no-cache&quot; /&gt;</code></p>
<h3 id="this的指向问题" tabindex="-1"><a class="header-anchor" href="#this的指向问题"><span>this的指向问题</span></a></h3>
<ol>
<li>如果是全局调用 则this指向window</li>
<li>如果是构造函数，则this指向当前被new出来的实例对象</li>
<li>如果函数被调用时是被对象调用，则this指向调用它的对象</li>
<li>如果是用call和apply调用，则this指向你手动设置的函数</li>
</ol>
<h3 id="函数防抖和函数节流-简单实现" tabindex="-1"><a class="header-anchor" href="#函数防抖和函数节流-简单实现"><span>函数防抖和函数节流 简单实现</span></a></h3>
<p><code v-pre>函数节流</code> 频繁触发，只在特定的时间内执行一次代码。<br>
应用场景<br>
onrize,onscroll等频繁触发的函数，比如你想获取滚动条的位置，然后执行下一步动作</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">if</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span></span>
<span class="line">            timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">//// 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span>delay<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>函数防抖</code>频繁触发，但只在特定的时间内没有再次触发执行函数，函数才会真的去执行。<br>
应用场景<br>
输入框自动补全时间，频繁操作点赞取消点赞等。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> timer<span class="token punctuation">;</span> <span class="token comment">// 维护一个 timer</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用apply指向调用debounce的对象，相当于this.fn(args);</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="除了-cookie-还有那些东西辨别用户身份的" tabindex="-1"><a class="header-anchor" href="#除了-cookie-还有那些东西辨别用户身份的"><span>除了 cookie 还有那些东西辨别用户身份的</span></a></h3>
<p>Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。</p>
<h3 id="amd-和-commonjs-怎么使用-怎么配置-有哪些好处" tabindex="-1"><a class="header-anchor" href="#amd-和-commonjs-怎么使用-怎么配置-有哪些好处"><span>AMD 和 commonjs 怎么使用，怎么配置，有哪些好处</span></a></h3>
<ul>
<li>CommonJS是适用于服务器端的,Node执行环境就是采用的CommonJS模式。</li>
<li>AMD是适用于浏览器端的一种模块异步加载方式</li>
</ul>
<h3 id="函数柯里化" tabindex="-1"><a class="header-anchor" href="#函数柯里化"><span>函数柯里化</span></a></h3>
<blockquote>
<p>函数柯里化是指将多变量函数拆解为单变量的多个函数的依次调用， 可以从高元函数动态地生成批量的低元的函数。可以看成一个强大的函数工厂，结合函数式编程，可以叠加出很BT的能力。</p>
</blockquote>
<h3 id="匿名函数的使用场景" tabindex="-1"><a class="header-anchor" href="#匿名函数的使用场景"><span>匿名函数的使用场景</span></a></h3>
<blockquote>
<p>防止变量的全局污染 jQuery插件封装引用了匿名函数</p>
</blockquote>
<h3 id="缓存expire-和-cache-control-区别" tabindex="-1"><a class="header-anchor" href="#缓存expire-和-cache-control-区别"><span>缓存expire 和 cache-control 区别</span></a></h3>
<ul>
<li>概念Cache-control 用于控制HTTP缓存（在HTTP/1.0中可能部分没实现，仅仅实现了 Pragma: no-cache）</li>
<li>Expires 表示存在时间，允许客户端在这个时间之前不去检查（发请求），等同max-age的效果。但是如果同时存在，则被Cache-Control的max-age覆盖。</li>
</ul>
<h3 id="事件模型和事件委托" tabindex="-1"><a class="header-anchor" href="#事件模型和事件委托"><span>事件模型和事件委托</span></a></h3>
<h4 id="事件模型" tabindex="-1"><a class="header-anchor" href="#事件模型"><span>事件模型</span></a></h4>
<blockquote>
<p>一个事件发生后，会在子元素和父元素之间传播。
&quot;DOM2级事件&quot;规定事件流的三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会；然后是实际的目标接收到事件；最后一个阶段是冒泡阶段，可以在这个阶段对事件作出响应,即:事件捕获-&gt;事件处理-&gt;事件冒泡</p>
</blockquote>
<h4 id="事件委托" tabindex="-1"><a class="header-anchor" href="#事件委托"><span>事件委托</span></a></h4>
<blockquote>
<p>利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件</p>
</blockquote>
<h3 id="对象和类的区别-举个现实中的例子" tabindex="-1"><a class="header-anchor" href="#对象和类的区别-举个现实中的例子"><span>对象和类的区别，举个现实中的例子</span></a></h3>
<ol>
<li>类是一个抽象的概念，它不存在于现实中的时间/空间里，类只是为所有的对象定义了抽象的属性与行为。就好像“Person（人）”这个类，它虽然可以包含很多个体，但它本身不存在于现实世界上。</li>
<li>对象是类的一个具体。它是一个实实在在存在的东西。</li>
<li>类是一个静态的概念，类本身不携带任何数据。当没有为类创建任何对象时，类本身不存在于内存空间中。</li>
<li>对象是一个动态的概念。每一个对象都存在着有别于其它对象的属于自己的独特的属性和行为。对象的属性可以随着它自己的行为而发生改变。</li>
</ol>
<h3 id="栅格实现-响应式布局" tabindex="-1"><a class="header-anchor" href="#栅格实现-响应式布局"><span>栅格实现 (响应式布局)</span></a></h3>
<p>使用float或者flex实现</p>
<h3 id="怎么减少回流和重绘-什么时候会发生回流呢" tabindex="-1"><a class="header-anchor" href="#怎么减少回流和重绘-什么时候会发生回流呢"><span>怎么减少回流和重绘 什么时候会发生回流呢</span></a></h3>
<ul>
<li>回流：回流是布局或者几何属性需要改变</li>
<li>重绘：由于节点的几何属性发生改变或者由于样式发生改变但不会影响布局</li>
</ul>
<p>1、CSS优化法</p>
<ul>
<li>
<p>使用 transform 替代 top</p>
</li>
<li>
<p>使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局</p>
</li>
<li>
<p>避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。</p>
</li>
<li>
<p>尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。</p>
</li>
<li>
<p>避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。</p>
</li>
<li>
<p>将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。</p>
</li>
<li>
<p>避免使用CSS表达式，可能会引发回流。</p>
</li>
<li>
<p>将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。</p>
</li>
<li>
<p>CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。</p>
</li>
</ul>
<p>2、JavaScript优化法</p>
<ul>
<li>
<p>避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。</p>
</li>
<li>
<p>避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。</p>
</li>
<li>
<p>避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来</p>
</li>
</ul>
<h1 id="函数作用域问题" tabindex="-1"><a class="header-anchor" href="#函数作用域问题"><span>函数作用域问题</span></a></h1>
<div class="language-JavaScript line-numbers-mode" data-highlighter="prismjs" data-ext="JavaScript" data-title="JavaScript"><pre v-pre><code><span class="line">    console.log(1+2+'3'); //33</span>
<span class="line">    console.log('3'+2+1); //321</span>
<span class="line">    function F1(){</span>
<span class="line">        this.name = 'f1'</span>
<span class="line">    }</span>
<span class="line">    function F2(){</span>
<span class="line">        this.name = 'f2'</span>
<span class="line">        return {}</span>
<span class="line">    }</span>
<span class="line">    console.log(new F1()) //返回的是实例对象</span>
<span class="line">    console.log(new F2()) //返回的是空对象</span>
<span class="line">    console.log(new F1().name) //f1</span>
<span class="line">    console.log(F1().name) // 报错</span>
<span class="line">    console.log(new F2().name) //undefined</span>
<span class="line">    console.log(F2().name) //undefined</span>
<span class="line"></span>
<span class="line">    var a = 10;</span>
<span class="line">    (function a(){</span>
<span class="line">        console.log(a);//undefined</span>
<span class="line">        var a = b = 100;</span>
<span class="line">        console.log(a) //100</span>
<span class="line">    })()</span>
<span class="line">    console.log(a+b) //110</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="高级类" tabindex="-1"><a class="header-anchor" href="#高级类"><span>高级类</span></a></h1>
<h3 id="页面监控-错误处理和性能信息-onerror用法" tabindex="-1"><a class="header-anchor" href="#页面监控-错误处理和性能信息-onerror用法"><span>页面监控，错误处理和性能信息，onerror用法</span></a></h3>
<ul>
<li>数据采集 --&gt; 数据上报 --&gt; 服务端处理 --&gt; 数据库存储 --&gt; 数据监控可视化平台</li>
<li>Performance 接口可以获取到当前页面中与性能相关的信息，它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。</li>
</ul>
<h3 id="前端路由的实现-前端路由和服务端路由" tabindex="-1"><a class="header-anchor" href="#前端路由的实现-前端路由和服务端路由"><span>前端路由的实现 前端路由和服务端路由</span></a></h3>
<h4 id="pjax-pushstate-ajax" tabindex="-1"><a class="header-anchor" href="#pjax-pushstate-ajax"><span>Pjax（PushState + Ajax）</span></a></h4>
<p>原理</p>
<blockquote>
<p>利用ajax请求替代了a标签的默认跳转，然后利用html5中的API修改了url。
两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。（Ajax可以实现页面的无刷新操作，于是，返回的时候，通过URL或其他传参，我们就可以还原到Ajax之前的模样）</p>
</blockquote>
<h4 id="hjax-hash-ajax" tabindex="-1"><a class="header-anchor" href="#hjax-hash-ajax"><span>Hjax（Hash + Ajax）</span></a></h4>
<p>原理</p>
<blockquote>
<p>url 中常会出现 #，一可以表示锚点（如回到顶部按钮的原理），二是路由里的锚点（hash）。Web 服务并不会解析 hash，也就是说 # 后的内容 Web 服务都会自动忽略，但是 JavaScript 是可以通过 window.location.hash 读取到的，读取到路径加以解析之后就可以响应不同路径的逻辑处理。
hashchange 事件(监听 hash 变化触发的事件)，当用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。</p>
</blockquote>
<h3 id="双向绑定-proxy和defineproperty对比" tabindex="-1"><a class="header-anchor" href="#双向绑定-proxy和defineproperty对比"><span>双向绑定，proxy和defineProperty对比</span></a></h3>
<p><code v-pre>defineProperty 数据劫持比较好理解,通常我们利用Object.defineProperty劫持对象的访问器,在属性值发生变化时我们可以获取变化</code></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">k</span><span class="token operator">:</span><span class="token string">''</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token string">'k'</span><span class="token punctuation">,</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">enumerable</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">configurable</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token function-variable function">get</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//获取data.k值时会被打印</span></span>
<span class="line">            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'data.k的值被获取了'</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token function-variable function">set</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//改变data.k值时会被打印</span></span>
<span class="line">            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'data.k的值被改变了'</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    data<span class="token punctuation">.</span>k <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    data<span class="token punctuation">.</span>k<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缺陷：无法监听数组变化</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">k</span><span class="token operator">:</span><span class="token string">''</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">let</span> newData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token function-variable function">get</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//获取data.k值时会被打印</span></span>
<span class="line">            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'data.k的值被获取了'</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token function-variable function">set</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//改变data.k值时会被打印</span></span>
<span class="line">            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'data.k的值被改变了'</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">    newData<span class="token punctuation">.</span>k <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    newData<span class="token punctuation">.</span>k<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。<br>
超链接: <a href="https://www.jianshu.com/p/2df6dcddb0d7" target="_blank" rel="noopener noreferrer">跳转</a></p>
<h3 id="eventloop事件循环-微任务宏任务" tabindex="-1"><a class="header-anchor" href="#eventloop事件循环-微任务宏任务"><span>eventloop事件循环，微任务宏任务</span></a></h3>
<p>宏任务</p>
<blockquote>
<p>浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task-&gt;渲染-&gt;task-&gt;...）
鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTMl。还有下面这个例子，setTimeout的作用是等待给定的时间后为它的回调产生一个新的宏任务。这就是为什么打印‘setTimeout’在‘script end’之后。因为打印‘script end’是第一个宏任务里面的事情，而‘setTimeout’是另一个独立的任务里面打印的。</p>
</blockquote>
<p>微任务</p>
<blockquote>
<p>微任务通常来说就是需要在当前 task 执行结束后立即执行的任务，比如对一系列动作做出反馈，或或者是需要异步的执行任务而又不需要分配一个新的 task，这样便可以减小一点性能的开销。只要执行栈中没有其他的js代码正在执行且每个宏任务执行完，微任务队列会立即执行。如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行。微任务包括了mutation observe的回调还有接下来的例子promise的回调。
一旦一个pormise有了结果，或者早已有了结果（有了结果是指这个promise到了fulfilled或rejected状态），他就会为它的回调产生一个微任务，这就保证了回调异步的执行即使这个promise早已有了结果。所以对一个已经有了结果的promise调用.then(yey, nay)会立即产生一个微任务。这就是为什么‘promise1’,'promise2'会打印在‘script end’之后，因为所有微任务执行的时候，当前执行栈的代码必须已经执行完毕。‘promise1’,'promise2'会打印在‘setTimeout’之前是因为所有微任务总会在下一个宏任务之前全部执行完毕。</p>
</blockquote>
<h3 id="深拷贝和浅拷贝-深拷贝的实现以及应用场景" tabindex="-1"><a class="header-anchor" href="#深拷贝和浅拷贝-深拷贝的实现以及应用场景"><span>深拷贝和浅拷贝，深拷贝的实现以及应用场景</span></a></h3>
<blockquote>
<p>首先，浅拷贝和深拷贝都只针对于像Object， Array这样的复杂对象。</p>
</blockquote>
<p>区别：浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制</p>
<h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h4>
<ol>
<li>从服务器fetch到数据之后我将其存放在store中，通过props传递给界面，然后我需要对这堆数据进行修改，那涉及到修改就一定有保存和取消，所以我们需要将这堆数据拷贝到其他地方（网友的经历）</li>
<li>当你想使用某个对象的值，在修改时不想修改原对象，那么可以用深拷贝来弄一个新的内存对象。像es6的新增方法都是深拷贝，所以推荐使用es6语法。</li>
<li>es5数组新增的map，filter等方法都是深拷贝，日常开发很常用，比如重组格式会使用map，map在react中是非常常用的，filter则是过滤返回一个新的数组。</li>
</ol>
<h3 id="继承-原型链继承怎么实现" tabindex="-1"><a class="header-anchor" href="#继承-原型链继承怎么实现"><span>继承，原型链继承怎么实现</span></a></h3>
<p><code v-pre>首先，在JavaScript中，万物皆对象。 但是，对象分两种：一种是普通对象(Object)，另一种是函数对象(Function)； 凡是通过new Function()创建的对象都是函数对象，其他的都是普通对象； Object和Function 都是通过new Function（）创造的。</code><br>
超链接: <a href="https://www.cnblogs.com/miacara94/p/7683677.html" target="_blank" rel="noopener noreferrer">跳转</a></p>
<h3 id="proto-和-prototype-的区别" tabindex="-1"><a class="header-anchor" href="#proto-和-prototype-的区别"><span>proto 和 prototype 的区别</span></a></h3>
<ol>
<li>对象有属性__proto__,指向该对象的构造函数的原型对象。</li>
<li>方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。</li>
</ol>
<h3 id="前端性能优化" tabindex="-1"><a class="header-anchor" href="#前端性能优化"><span>前端性能优化</span></a></h3>
<ul>
<li>减少请求数量 图片合并 雪碧图 Base64 使用字体图标来代替图片</li>
<li>减少重定向 使用缓存 不使用CSS @import 避免使用空的src和href</li>
<li>减小资源大小 js/css/html/img</li>
<li>优化网络连接 使用CDN 使用DNS预解析</li>
<li>优化资源加载 资源加载位置 资源加载时机</li>
<li>减少重绘回流 防抖和节流 及时清理环境</li>
<li>性能更好的API 用对选择器 使用requestAnimationFrame来替代setTimeout和setInterval 使用IntersectionObserver来实现图片可视区域的懒加载 使用web worker</li>
<li>webpack优化 动态导入和按需加载 剔除无用代码 长缓存优化</li>
</ul>
<h1 id="原理类" tabindex="-1"><a class="header-anchor" href="#原理类"><span>原理类</span></a></h1>
<h3 id="settimeout-的机制" tabindex="-1"><a class="header-anchor" href="#settimeout-的机制"><span>settimeout 的机制</span></a></h3>
<p>javascript是一门单线程语言,当javascript运行时遇到<code v-pre>setTimeout</code>后其实会另开一条线程</p>
<h3 id="tcp-和-udp-的区别" tabindex="-1"><a class="header-anchor" href="#tcp-和-udp-的区别"><span>TCP 和 UDP 的区别</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/TCP_UDP.png" alt="cmd-markdown-logo"></p>
<h3 id="了解mvvm-mvc的区别" tabindex="-1"><a class="header-anchor" href="#了解mvvm-mvc的区别"><span>了解MVVM MVC的区别</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/MVVM.png" alt="cmd-markdown-logo">   <img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/MVC.png" alt="cmd-markdown-logo"><br>
<code v-pre>MVC</code>在开发中，除了简单的 Model、View 以外的所有部分都被放在了 Controller 中。Controller 负责显示界面、响应用户的操作、网络请求以及与 Model 的交互，这就导致了 Controller
逻辑复杂，难以维护和 View 紧耦合，无法测试<br>
<code v-pre>MVVM</code>View 和 Model 之间没有联系，通 ViewModel 进行交互(ViewModel负责把Model的数据同步到View显示出来)，而且 Model 和 ViewModel 之间的交互是双向的，因此视图的数据改变会同时修改数据源，而数据源的数据变化也会立即反映到 View 上。</p>
<h3 id="网络七层协议" tabindex="-1"><a class="header-anchor" href="#网络七层协议"><span>网络七层协议</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/XY.png" alt="cmd-markdown-logo"></p>
<h3 id="http-和-https-的区别" tabindex="-1"><a class="header-anchor" href="#http-和-https-的区别"><span>http 和 https 的区别</span></a></h3>
<ul>
<li>HTTP 的 URL 以 http:// 开头，而 HTTPS 的 URL 以 https:// 开头</li>
<li>HTTP 是不安全的，而 HTTPS 是安全的</li>
<li>HTTP 标准端口是 80 ，而 HTTPS 的标准端口是 443</li>
<li>在 OSI 网络模型中，HTTP 工作于应用层，而 HTTPS 工作在传输层</li>
<li>HTTP 无需加密，而 HTTPS 对传输的数据进行加密</li>
<li>HTTP 无需证书，而 HTTPS 需要认证证书</li>
</ul>
<h3 id="输入-url-到显示的过程" tabindex="-1"><a class="header-anchor" href="#输入-url-到显示的过程"><span>输入 url 到显示的过程</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/link.png" alt="cmd-markdown-logo"></p>
<ol>
<li>输入网址： http://www.baidu.com</li>
<li>通过DNS解析获得网址的对应IP地址</li>
<li>浏览器与远程web服务器 通过TCP三次握手建立TCP/IP连接</li>
<li>浏览器向web服务器发送一个HTTP请求</li>
<li>服务器处理请求并返回HTTP报文</li>
<li>浏览器解析渲染页面</li>
<li>断开链接</li>
</ol>
<h3 id="dns-解析过程" tabindex="-1"><a class="header-anchor" href="#dns-解析过程"><span>dns 解析过程</span></a></h3>
<ol>
<li>现在我有一台计算机，通过ISP接入了互联网，那么ISP就会给我分配一个DNS服务器，这个DNS服务器不是权威服务器，而是相当于一个代理的dns解析服务器，他会帮你迭代权威服务器返回的应答，然后把最终查到IP返回给你。</li>
<li>现在的我计算机要向这台ISPDNS发起请求查询www.baidu.com这个域名了，(经网友提醒：这里其实准确来说不是ISPDNS，而应该是用户自己电脑网络设置里的DNS，并不一定是ISPDNS。比如也有可能你手工设置了8.8.8.8)</li>
<li>ISPDNS拿到请求后，先检查一下自己的缓存中有没有这个地址，有的话就直接返回。这个时候拿到的ip地址，会被标记为非权威服务器的应答。</li>
<li>如果缓存中没有的话，ISPDNS会从配置文件里面读取13个根域名服务器的地址（这些地址是不变的，直接在BIND的配置文件中），</li>
<li>然后像其中一台发起请求。</li>
<li>根服务器拿到这个请求后，知道他是com.这个顶级域名下的，所以就会返回com域中的NS记录，一般来说是13台主机名和IP。</li>
<li>然后ISPDNS向其中一台再次发起请求，com域的服务器发现你这请求是baidu.com这个域的，我一查发现了这个域的NS，那我就返回给你，你再去查。
（目前百度有4台baidu.com的顶级域名服务器）。</li>
<li>ISPDNS不厌其烦的再次向baidu.com这个域的权威服务器发起请求，baidu.com收到之后，查了下有www的这台主机，就把这个IP返回给你了，</li>
<li>然后ISPDNS拿到了之后，将其返回给了客户端，并且把这个保存在高速缓存中</li>
</ol>
<h3 id="https-具体的传输过程" tabindex="-1"><a class="header-anchor" href="#https-具体的传输过程"><span>https 具体的传输过程</span></a></h3>
<ol>
<li>客户端通过TCP三次握手发起链接</li>
<li>服务器将CA证书返回给客户端</li>
<li>客户端验证服务器证书的合法性</li>
<li>客户端生成随机对称秘钥</li>
<li>将客户端生成的对称秘钥通过证书的公钥进行非对称加密发给服务器</li>
<li>双方通过客户端生成的随机秘钥进行HTTP通信。</li>
</ol>
<h3 id="讲下git工作原理" tabindex="-1"><a class="header-anchor" href="#讲下git工作原理"><span>讲下git工作原理</span></a></h3>
<p><a href="https://www.sohu.com/a/115137833_494937" target="_blank" rel="noopener noreferrer">跳转</a><br>
<img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/git.jpg" alt="cmd-markdown-logo"></p>
<h3 id="讲下图片缓存和图片预加载" tabindex="-1"><a class="header-anchor" href="#讲下图片缓存和图片预加载"><span>讲下图片缓存和图片预加载</span></a></h3>
<ul>
<li>缓存：浏览器在需要进行图片操作之前，会先查看本地是否有缓存，如果有，会先读取缓存；如果没有，才会去发起网络请求</li>
<li>预加载：提升体验效果</li>
</ul>
<h3 id="讲下浏览器的渲染流程" tabindex="-1"><a class="header-anchor" href="#讲下浏览器的渲染流程"><span>讲下浏览器的渲染流程</span></a></h3>
<ol>
<li>解析html建立dom树</li>
<li>解析css构建render树（将CSS代码解析成树形的数据结构，然后结合DOM合并成render树）</li>
<li>布局render树（Layout/reflow），负责各元素尺寸、位置的计算</li>
<li>绘制render树（paint），绘制页面像素信息</li>
<li>浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上。</li>
</ol>
<h3 id="进程-线程的概念-线程之间如何通讯" tabindex="-1"><a class="header-anchor" href="#进程-线程的概念-线程之间如何通讯"><span>进程，线程的概念，线程之间如何通讯</span></a></h3>
<h3 id="讲一下栈和队列-项目或实际应用有哪些" tabindex="-1"><a class="header-anchor" href="#讲一下栈和队列-项目或实际应用有哪些"><span>讲一下栈和队列，项目或实际应用有哪些</span></a></h3>
<p>栈：栈是一种先进后出的远测的有序集合。新添加或删除的元素都是从栈的末尾里操作的，栈的末尾称为栈顶，另一端称为栈底</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">//创建一个类表示栈</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">//定义一个数组来存储栈的元素</span></span>
<span class="line"><span class="token keyword">var</span> arr<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//表示往栈顶里添加元素</span></span>
<span class="line"><span class="token function">del</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//表示往栈顶里删除一个元素</span></span>
<span class="line"><span class="token function">topElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//返回一个栈顶元素</span></span>
<span class="line"><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//判断栈里是否为空，如果为空则返回true</span></span>
<span class="line"><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//清空栈里的元素</span></span>
<span class="line"><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//返回栈里的元素个数</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Stack</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">add</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">del</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		arr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">topElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> arr<span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">isEmpty</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> arr<span class="token punctuation">.</span>length<span class="token operator">==</span><span class="token number">0</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">clear</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">{</span></span>
<span class="line">		arr<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">size</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> arr<span class="token punctuation">.</span>length</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">//实例化栈对象</span></span>
<span class="line"><span class="token keyword">var</span> Stack<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>队列：队列是先进先出原则，添加元素是从队尾添加，删除元素是从队首删除，最新的元素是在队尾</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">//创建一个类表示队列</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Queue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">//定义一个数组存储队列元素</span></span>
<span class="line"><span class="token keyword">var</span> arr<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//表示向队尾添加一个元素</span></span>
<span class="line"><span class="token function">del</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//表示向队首删除一个元素</span></span>
<span class="line"><span class="token function">front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//返回队首的元素</span></span>
<span class="line"><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//判断队列是否空</span></span>
<span class="line"><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//清空队列里的元素</span></span>
<span class="line"><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//返回队列里的元素个数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Queue</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">add</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">del</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">front</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">isEmpty</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> arr<span class="token punctuation">.</span>length<span class="token operator">==</span><span class="token number">0</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">clear</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		arr<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">size</span><span class="token operator">=</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">return</span> arr<span class="token punctuation">.</span>length</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">//实例化一个队列对象</span></span>
<span class="line"><span class="token keyword">var</span> Queue<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="框架类-vue" tabindex="-1"><a class="header-anchor" href="#框架类-vue"><span>框架类 (Vue)</span></a></h1>
<h3 id="你觉得-vue-有哪些特点" tabindex="-1"><a class="header-anchor" href="#你觉得-vue-有哪些特点"><span>你觉得 vue 有哪些特点</span></a></h3>
<blockquote>
<p>遵循MVVM模式
编码简洁，体积小，运行效率高，适合移动端/PC端
它本身只关注UI，可以轻松引入Vue插件或其他第三方库开发项目</p>
</blockquote>
<h3 id="spa了解吗" tabindex="-1"><a class="header-anchor" href="#spa了解吗"><span>SPA了解吗</span></a></h3>
<blockquote>
<p>更好的用户体验，让用户在web app感受native app的速度和流畅
经典MVC开发模式，前后端各负其责
重前端，业务逻辑全部在本地操作，数据都需要通过AJAX同步、提交
在URL中采用#号来作为当前视图的地址,改变#号后的参数，页面并不会重载</p>
</blockquote>
<h3 id="vue-父子组件通信" tabindex="-1"><a class="header-anchor" href="#vue-父子组件通信"><span>vue 父子组件通信</span></a></h3>
<blockquote>
<p>父向子通讯用props
子向父通讯用 点击事件通过$.emit('xxx')向父组件xxx事件，然后父组件定义xx事件，xx事件调用相应的函数，函数内可接收子组件传过来的参数</p>
</blockquote>
<h3 id="vue-生命周期" tabindex="-1"><a class="header-anchor" href="#vue-生命周期"><span>vue 生命周期</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/vue-life.png" alt="cmd-markdown-logo"></p>
<ul>
<li>beforeCreate --- 创建前</li>
<li>created --- 创建完成</li>
<li>beforeMount --- 挂载前</li>
<li>mounted --- 挂载完成</li>
<li>beforeUpdate --- 更新前</li>
<li>updated --- 更新完成</li>
<li>beforeDestroy --- 销毁前</li>
<li>destroyed --- 销毁完成</li>
</ul>
<p>超链接: <a href="https://juejin.cn/post/6844903811094413320" target="_blank" rel="noopener noreferrer">跳转</a></p>
<h3 id="vue的diff-算法" tabindex="-1"><a class="header-anchor" href="#vue的diff-算法"><span>vue的diff 算法</span></a></h3>
<h4 id="_1、虚拟dom" tabindex="-1"><a class="header-anchor" href="#_1、虚拟dom"><span>1、虚拟dom</span></a></h4>
<p>虚拟DOM其实就是一个JavaScript对象。通过这个JavaScript对象来描述真实DOM。真实DOM的操作，一般都会对某块元素的整体重新渲染,采用虚拟DOM的话，当数据变化的时候，只需要局部刷新变化的位置就好了。</p>
<h4 id="_2、当数据变化时-vue更新节点——diff算法" tabindex="-1"><a class="header-anchor" href="#_2、当数据变化时-vue更新节点——diff算法"><span>2、当数据变化时，vue更新节点——diff算法</span></a></h4>
<p>我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。</p>
<h3 id="_3、diff的过程" tabindex="-1"><a class="header-anchor" href="#_3、diff的过程"><span>3、diff的过程</span></a></h3>
<p>当数据发生改变时，被订阅者会调用notify()方法通知所有订阅者watcher，订阅者就会调用patch给真实的DOM打补丁，更新视图<br>
<img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/diff.png" alt="cmd-markdown-logo"><br>
<code v-pre>patch (oldVnode, vnode)</code> 1、判断两个节点是否是同一个节点。如果是，那么就深入检查他们的子节点。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode。
<code v-pre>patchVnode (oldVnode, vnode)</code> 找到对应的真实dom，称为el。如果oldVnode有子节点而Vnode没有，则删除el的子节点，如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el，如果两者都有子节点，则执行updateChildren函数比较子节点。</p>
<h3 id="简述vue的响应式原理" tabindex="-1"><a class="header-anchor" href="#简述vue的响应式原理"><span>简述Vue的响应式原理?</span></a></h3>
<p>当一个Vue实例创建时，vue会遍历data选项的属性，用 Object.defineProperty 将它们转为 getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。 每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。</p>
<h3 id="说说你对vuex的理解" tabindex="-1"><a class="header-anchor" href="#说说你对vuex的理解"><span>说说你对vuex的理解</span></a></h3>
<ul>
<li>state：用一个对象就包含了全部的应用层级状态</li>
<li>getters：用来从store中的state中派生出一些状态，例如对列表进行过滤并计数,可以认为是store的计算属性</li>
<li>mutations:更改Vuex的store中的状态的唯一方法是提交mutation。Vuex中的mutations非常类似于事件：每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数</li>
<li>actions：actions类似于mutation，不同在于：actions提交的是mutation，而不是直接变更状态。actions可以包含任意异步操作。</li>
<li>Modules：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store对象就有可能变得相当臃肿。
为了解决以上问题，Vuex允许我们将store分割成模块（module）。每个模块拥有自己的state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。<br>
超链接: <a href="https://juejin.cn/post/6924486801667162119" target="_blank" rel="noopener noreferrer">跳转</a></li>
</ul>
<h1 id="框架类-react" tabindex="-1"><a class="header-anchor" href="#框架类-react"><span>框架类(React)</span></a></h1>
<h3 id="为什么state值不能修改-而用this-setstate去修改" tabindex="-1"><a class="header-anchor" href="#为什么state值不能修改-而用this-setstate去修改"><span>为什么state值不能修改，而用this.setState去修改？</span></a></h3>
<p>setState是异步的。setState本质是通过一个队列实现state更新的，执行setState时，会将要更新的state合并后放入状态队列，而不会立即更新。如果没有通过this.setState,而是直接this.state修改，会导致这个修改没有放入队列中，下次执行this.setState合并队列时，就会忽略这次的修改，从而导致数据没有更新。<br>
简单点说，就是setState就是放入队列，而this.state会跳过队列，从而导致有可能这次的修改值会被忽略掉</p>
<h3 id="react的钩子函数有哪些-请求放在那个函数中-为什么-渲染页面钩子函数的执行顺序什么" tabindex="-1"><a class="header-anchor" href="#react的钩子函数有哪些-请求放在那个函数中-为什么-渲染页面钩子函数的执行顺序什么"><span>react的钩子函数有哪些？请求放在那个函数中？为什么？渲染页面钩子函数的执行顺序什么？</span></a></h3>
<p>钩子函数：componentWillMount、render、componentDidMount、shouldComponentUpdate、componentWillUpdate、componentDidUpdate<br>
请求放在componentDidMount，因为这个在组件加载的时候只会执行一次<br>
执行顺序:componentWillMount、render、componentDidMount、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate
componentWillReceiveProps是在props发生改变的时候执行</p>
<h3 id="state与props有什么区别" tabindex="-1"><a class="header-anchor" href="#state与props有什么区别"><span>state与props有什么区别？</span></a></h3>
<p>props是外部组件传入的数据，一般是父组件传到子组件的数据。<br>
props里面的数据不能修改，只能通过绑定父组件的方法来修改props里面的值，然后再传到子组件。而state是组件的私有变量。主要用于组件的保存，控制以及修改自己的状态，不能通过外部的访问以及修改，只能通过内部的this.setState方法来修改state里面的内容。</p>
<h3 id="react如何去操作dom的" tabindex="-1"><a class="header-anchor" href="#react如何去操作dom的"><span>react如何去操作dom的？</span></a></h3>
<p>通过refs可以实现对dom的操作。通过给组件添加ref=‘XXXXX’,然后在方法立马通过调用this.refs.XXXXX，从而进行对dom的操作</p>
<h3 id="react在setstate之后执行了哪些操作" tabindex="-1"><a class="header-anchor" href="#react在setstate之后执行了哪些操作"><span>react在setState之后执行了哪些操作？</span></a></h3>
<p>render、componentDidUpdate。在执行render的时候 this.state才会被更新。之前两个钩子函数都不会更新</p>
<h3 id="react性能优化是哪个周期函数" tabindex="-1"><a class="header-anchor" href="#react性能优化是哪个周期函数"><span>react性能优化是哪个周期函数？</span></a></h3>
<p>shouldComponentUpdate这个函数用来判断是否需要调用render方法重新描绘dom，因为dom的描绘非常的消耗性能，如果可以在shouldComponentUpdate中写出更优化的dom diff算法可以极大的提高性能</p>
<h3 id="diff算法" tabindex="-1"><a class="header-anchor" href="#diff算法"><span>diff算法</span></a></h3>
<ol>
<li>把树形结构按照层级划分，之比较同级元素</li>
<li>给列表结构的每个单元添加唯一的key属性，方便比较</li>
<li>react只会匹配相同的calss的component</li>
<li>合并操作，调用component的setState方法的时候，react将其标记为dirty，到每一个事件循环结束，react会检查所有标记dirty的component重新绘制</li>
<li>选择性子树渲染，可以重写shouldComponentUpdate，提高diff算法的性能</li>
</ol>
<h3 id="react性能优化的方案" tabindex="-1"><a class="header-anchor" href="#react性能优化的方案"><span>react性能优化的方案</span></a></h3>
<ul>
<li>重写shouldComponentUpdate来避免不必要的dom操作</li>
<li>使用key来帮助react来识别列表中所有子组件的最小变化</li>
<li>使用production版本的react.js</li>
</ul>
<h3 id="函数式组件和类组件有啥不同" tabindex="-1"><a class="header-anchor" href="#函数式组件和类组件有啥不同"><span>函数式组件和类组件有啥不同？</span></a></h3>
<ul>
<li>类组件不仅允许你使用更多的功能，如组件自身的状态和生命周期钩子函数，也能直接访问store并维持状态</li>
<li>函数式组件仅是接收props，并将组件自身渲染到页面时该组件就是一个无状态组件，可以使用一个纯函数来创建这样的组件</li>
</ul>
<h3 id="什么是redux" tabindex="-1"><a class="header-anchor" href="#什么是redux"><span>什么是redux？</span></a></h3>
<blockquote>
<p>redux的基本思想是整个应用的state保持在一个单一的store中。store就是一个简单的JavaScript对象，而改变应用的state的唯一方式就是在应用用触发action，然后为这些action编写reducers来修改state。整个state的转化都是在reducers中完成的，并且不会有任何副作用</p>
</blockquote>
<ol>
<li>store通过reducer创建了初始状态；</li>
<li>view通过store.getState()将store中保存的state挂载在了自己的状态上；</li>
<li>用户产生了操作，调用了actions 的方法；</li>
<li>actions的方法被调用，创建了带有标示性信息的action；</li>
<li>actions将action通过调用store.dispatch方法发送到了reducer中；</li>
<li>reducer接收到action并根据标识信息判断之后返回了新的state；</li>
<li>store的state被reducer更改为新state的时候，store.subscribe方法里的回调函数会执行，此时就可以通知view去重新获取state；</li>
</ol>
<h3 id="在redux中-什么是store" tabindex="-1"><a class="header-anchor" href="#在redux中-什么是store"><span>在redux中，什么是store？</span></a></h3>
<blockquote>
<p>store是一个JavaScript对象，它保存了整个应用的state，于此同时，store也承担了以下的职责：</p>
</blockquote>
<ol>
<li>允许通过getState（）访问state</li>
<li>通过dispatch（action）改变state</li>
<li>通过subscribe（listener）注册listeners</li>
<li>通过subscribe（listener）返回函数处理listener的注册</li>
</ol>
<h3 id="在redux中-什么是action" tabindex="-1"><a class="header-anchor" href="#在redux中-什么是action"><span>在redux中，什么是action？</span></a></h3>
<blockquote>
<p>action是一个纯JavaScript对象，他们必须有一个type属性表明正在执行action的类型。实质上action是将数据从应用程序发送到store的有效载荷</p>
</blockquote>
<h3 id="在redux中-什么是reducer" tabindex="-1"><a class="header-anchor" href="#在redux中-什么是reducer"><span>在redux中，什么是reducer？</span></a></h3>
<blockquote>
<p>一个reducer是一个纯函数，该函数以先前的state和一个action作为参数，并返回下一个state</p>
</blockquote>
<h3 id="什么是纯函数" tabindex="-1"><a class="header-anchor" href="#什么是纯函数"><span>什么是纯函数？</span></a></h3>
<blockquote>
<p>个不依懒于且不改变其作用域之外的变量状态的函数，这也意味着一个纯函数对于同样的参数总是返回同样的结果</p>
</blockquote>
<h3 id="vue与react的区别" tabindex="-1"><a class="header-anchor" href="#vue与react的区别"><span>vue与react的区别？</span></a></h3>
<ol>
<li>react是严格上针对mvc的view层，vue则是mvvm模式</li>
<li>操作dom的方式不同，vue是通过指令操作dom，而react通过js进行操作</li>
<li>数据绑定不同，vue实现的是双向绑定，而react是单向数据流</li>
<li>react的state内容不可以直接修改，需要通过setState去修改，vue的state不是必须的，数据主要有data属性在vue对象中管理的</li>
<li>React是通过JSX渲染模板。而Vue是通过一种拓展的HTML语法进行渲染；
Vue本质是MVVM框架，由MVC发展而来；React是前端组件化框架，由后端组件化发展而来；</li>
</ol>
<h1 id="算法类-跳转" tabindex="-1"><a class="header-anchor" href="#算法类-跳转"><span>算法类 <a href="https://www.cnblogs.com/onepixel/articles/7674659.html" target="_blank" rel="noopener noreferrer">跳转</a></span></a></h1>
<h3 id="a-n-怎么用小于-o-n-的算法实现" tabindex="-1"><a class="header-anchor" href="#a-n-怎么用小于-o-n-的算法实现"><span>a^n 怎么用小于 O(n) 的算法实现</span></a></h3>
<h3 id="快排的原理" tabindex="-1"><a class="header-anchor" href="#快排的原理"><span>快排的原理</span></a></h3>
<p>快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。<br>
<img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/QuickSort.gif.png" alt="cmd-markdown-logo"></p>
<h3 id="数组去重" tabindex="-1"><a class="header-anchor" href="#数组去重"><span>数组去重</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">unique</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>array <span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            array <span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> array<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="写一个函数判断是否存在循环引用" tabindex="-1"><a class="header-anchor" href="#写一个函数判断是否存在循环引用"><span>写一个函数判断是否存在循环引用</span></a></h3>
<h3 id="排序算法-时间复杂度" tabindex="-1"><a class="header-anchor" href="#排序算法-时间复杂度"><span>排序算法，时间复杂度</span></a></h3>
<p><img src="https://gitee.com/qing_321/summary_front-end_interviews/raw/master/images/sort-time.png" alt="cmd-markdown-logo"></p>
<h3 id="平衡二叉树" tabindex="-1"><a class="header-anchor" href="#平衡二叉树"><span>平衡二叉树</span></a></h3>
</div></template>



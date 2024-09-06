<template><div><h1 id="中级类" tabindex="-1"><a class="header-anchor" href="#中级类"><span>中级类</span></a></h1>
<h2 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包"><span>闭包</span></a></h2>
<p>对闭包的理解，以及哪些地方用过闭包，以及闭包的缺点，闭包为什么会导致内存泄漏<br>
闭包：有时候需要获取到函数内部的局部变量称之为闭包</p>
<h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h4>
<ul>
<li>采用函数引用方式的setTimeout调用。</li>
<li>将函数关联到对象的实例方法。</li>
<li>封装相关的功能集。</li>
</ul>
<h4 id="闭包缺点" tabindex="-1"><a class="header-anchor" href="#闭包缺点"><span>闭包缺点</span></a></h4>
<p>由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
解决方法是，在退出函数之前，将不使用的局部变量全部删除。</p>
<div class="language-tsx line-numbers-mode" data-highlighter="prismjs" data-ext="tsx" data-title="tsx"><pre v-pre><code><span class="line">    <span class="token keyword">var</span> cnt<span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            i<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">cnt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//0</span></span>
<span class="line">    <span class="token function">cnt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//1</span></span>
<span class="line">    <span class="token function">cnt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//2</span></span>
<span class="line">    <span class="token function">cnt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//3</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域"><span>跨域</span></a></h2>
<h4 id="为什么会产生跨域" tabindex="-1"><a class="header-anchor" href="#为什么会产生跨域"><span>为什么会产生跨域</span></a></h4>
<p>跨域的严格一点的定义是：只要 协议，域名，端口有任何一个的不同，就被当作是跨域</p>
<h4 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h4>
<p>动态创建<code v-pre>script</code>标签,利用<code v-pre>script</code>标签的<code v-pre>src</code>属性可以获取任何域下的js脚本,通过这个特性,服务器端不在返回<code v-pre>json</code>格式,而是返回一段调用某个函数的js代码，在<code v-pre>src</code>中进行了调用，这样实现了跨域.</p>
<h4 id="限制" tabindex="-1"><a class="header-anchor" href="#限制"><span>限制</span></a></h4>
<p><code v-pre>jsonp</code>只支持<code v-pre>get</code>请求而不支持<code v-pre>post</code>请求</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">//简单实现方法</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token parameter">req</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">var</span> url <span class="token operator">=</span> req<span class="token punctuation">.</span>url <span class="token operator">+</span> <span class="token string">'?callback='</span> <span class="token operator">+</span> req<span class="token punctuation">.</span>callback<span class="token punctuation">.</span>name<span class="token punctuation">;</span></span>
<span class="line">    script<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span></span>
<span class="line">    document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">'head'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">//使用方法</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'hello '</span> <span class="token operator">+</span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">url</span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">callback</span> <span class="token operator">:</span> hello</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用-meta-不从缓存中获取资源" tabindex="-1"><a class="header-anchor" href="#用-meta-不从缓存中获取资源"><span>用 meta 不从缓存中获取资源</span></a></h2>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Pragma<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>no-cache<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="this的指向问题" tabindex="-1"><a class="header-anchor" href="#this的指向问题"><span>this的指向问题</span></a></h2>
<ol>
<li>如果是全局调用 则this指向window</li>
<li>如果是构造函数，则this指向当前被new出来的实例对象</li>
<li>如果函数被调用时是被对象调用，则this指向调用它的对象</li>
<li>如果是用call和apply调用，则this指向你手动设置的函数</li>
</ol>
<h2 id="函数防抖和函数节流-简单实现" tabindex="-1"><a class="header-anchor" href="#函数防抖和函数节流-简单实现"><span>函数防抖和函数节流 简单实现</span></a></h2>
<ul>
<li>函数节流<br>
频繁触发，只在特定的时间内执行一次代码。<br>
应用场景<br>
<code v-pre>onrize</code> <code v-pre>onscroll</code>等频繁触发的函数，比如你想获取滚动条的位置，然后执行下一步动作</li>
</ul>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数防抖<br>
频繁触发，但只在特定的时间内没有再次触发执行函数，函数才会真的去执行。<br>
应用场景<br>
输入框自动补全时间，频繁操作点赞取消点赞等。</li>
</ul>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="amd-和-commonjs对比" tabindex="-1"><a class="header-anchor" href="#amd-和-commonjs对比"><span>AMD 和 commonjs对比</span></a></h2>
<ul>
<li><code v-pre>CommonJS</code>是适用于服务器端的,<code v-pre>Node</code>执行环境就是采用的<code v-pre>CommonJS</code>模式。</li>
<li><code v-pre>AMD</code>是适用于浏览器端的一种模块异步加载方式</li>
</ul>
<h2 id="匿名函数的使用场景" tabindex="-1"><a class="header-anchor" href="#匿名函数的使用场景"><span>匿名函数的使用场景</span></a></h2>
<p>防止变量的全局污染 jQuery插件封装引用了匿名函数</p>
<h2 id="事件模型和事件委托" tabindex="-1"><a class="header-anchor" href="#事件模型和事件委托"><span>事件模型和事件委托</span></a></h2>
<h4 id="事件模型" tabindex="-1"><a class="header-anchor" href="#事件模型"><span>事件模型</span></a></h4>
<p>一个事件发生后，会在子元素和父元素之间传播。<br>
&quot;DOM2级事件&quot;规定事件流的三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会；然后是实际的目标接收到事件；最后一个阶段是冒泡阶段，可以在这个阶段对事件作出响应,即:事件捕获-&gt;事件处理-&gt;事件冒泡</p>
<h4 id="事件委托" tabindex="-1"><a class="header-anchor" href="#事件委托"><span>事件委托</span></a></h4>
<p>利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件</p>
<h2 id="怎么减少回流和重绘" tabindex="-1"><a class="header-anchor" href="#怎么减少回流和重绘"><span>怎么减少回流和重绘</span></a></h2>
<ul>
<li>回流：回流是布局或者几何属性需要改变</li>
<li>重绘：由于节点的几何属性发生改变或者由于样式发生改变但不会影响布局</li>
</ul>
<h4 id="css优化法" tabindex="-1"><a class="header-anchor" href="#css优化法"><span>CSS优化法</span></a></h4>
<ul>
<li>使用 transform 替代 top</li>
<li>使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局</li>
<li>避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。</li>
<li>尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。</li>
<li>避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。</li>
<li>将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。</li>
<li>避免使用CSS表达式，可能会引发回流。</li>
<li>将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。</li>
<li>CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。</li>
</ul>
<h4 id="javascript优化法" tabindex="-1"><a class="header-anchor" href="#javascript优化法"><span>JavaScript优化法</span></a></h4>
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
<h2 id="函数作用域问题" tabindex="-1"><a class="header-anchor" href="#函数作用域问题"><span>函数作用域问题</span></a></h2>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="什么是ajax-ajax的步骤" tabindex="-1"><a class="header-anchor" href="#什么是ajax-ajax的步骤"><span>什么是ajax? ajax的步骤？</span></a></h2>
<p><code v-pre>ajax</code>能够刷新局部网页数据而不是重新加载整个网页。</p>
<h4 id="如何使用ajax" tabindex="-1"><a class="header-anchor" href="#如何使用ajax"><span>如何使用ajax?</span></a></h4>
<ol>
<li>创建<code v-pre>xmlhttprequest</code>对象，<code v-pre>var xmlhttp =new XMLHttpRequest（); XMLHttpRequest</code>对象用来和服务器交换数据。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">var</span> xhttp<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>XMLHttpRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token comment">//现代主流浏览器</span></span>
<span class="line">xhttp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token comment">// 针对浏览器，比如IE5或IE6</span></span>
<span class="line">xhttp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ActiveXObject</span><span class="token punctuation">(</span><span class="token string">"Microsoft.XMLHTTP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>使用<code v-pre>xmlhttprequest</code>对象的<code v-pre>open()</code>和<code v-pre>send()</code>方法发送资源请求给服务器。</li>
<li>使用<code v-pre>xmlhttprequest</code>对象的<code v-pre>responseText</code>或<code v-pre>responseXML</code>属性获得服务器的响应。</li>
</ol>
</div></template>



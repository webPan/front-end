import{_ as s,c as a,a as e,o as t}from"./app-CjaSKhBf.js";const p="/front-ent/blog/assets/vue-life-C0UV4P5V.png",c="/front-ent/blog/assets/diff-Dp7hObkH.jpg",l={};function o(i,n){return t(),a("div",null,n[0]||(n[0]=[e('<h2 id="vue-生命周期" tabindex="-1"><a class="header-anchor" href="#vue-生命周期"><span>vue 生命周期</span></a></h2><p><img src="'+p+`" alt="cmd-markdown-logo"></p><ul><li><code>beforeCreate</code> --- 创建前</li><li><code>created</code> --- 创建完成</li><li><code>beforeMount</code> --- 挂载前</li><li><code>mounted</code> --- 挂载完成</li><li><code>beforeUpdate</code> --- 更新前</li><li><code>updated</code> --- 更新完成</li><li><code>beforeDestroy</code> --- 销毁前</li><li><code>destroyed</code> --- 销毁完成</li></ul><p>超链接: <a href="https://juejin.cn/post/6844903811094413320" target="_blank" rel="noopener noreferrer">跳转</a></p><h2 id="你觉得-vue-有哪些特点" tabindex="-1"><a class="header-anchor" href="#你觉得-vue-有哪些特点"><span>你觉得 vue 有哪些特点</span></a></h2><ul><li>遵循<code>MVVM</code>模式</li><li>编码简洁，体积小，运行效率高，适合移动端/PC端</li><li>它本身只关注<code>UI</code>，可以轻松引入<code>Vue</code>插件或其他第三方库开发项目</li></ul><h2 id="spa了解吗" tabindex="-1"><a class="header-anchor" href="#spa了解吗"><span>SPA了解吗</span></a></h2><ul><li>更好的用户体验，让用户在<code>web app</code>感受<code>native app</code>的速度和流畅</li><li>经典<code>MVC</code>开发模式，前后端各负其责</li><li>重前端，业务逻辑全部在本地操作，数据都需要通过<code>AJAX</code>同步、提交</li><li>在URL中采用#号来作为当前视图的地址,改变#号后的参数，页面并不会重载</li></ul><h2 id="vue-父子组件通信" tabindex="-1"><a class="header-anchor" href="#vue-父子组件通信"><span>vue 父子组件通信</span></a></h2><ul><li>父向子通讯用<code>props</code></li><li>子向父通讯用 点击事件通过<code>$.emit(&#39;xx&#39;)</code>向父组件<code>自定义</code>事件，然后父组件定义xx事件，xx事件调用相应的函数，函数内可接收子组件传过来的参数</li></ul><h2 id="computed-和-methods-的区别" tabindex="-1"><a class="header-anchor" href="#computed-和-methods-的区别"><span>Computed 和 Methods 的区别</span></a></h2><p>可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的</p><h4 id="不同点" tabindex="-1"><a class="header-anchor" href="#不同点"><span>不同点：</span></a></h4><p>computed: 计算属性是基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值；</p><p>method 调用总会执行该函数。</p><h2 id="过滤器的作用-如何实现一个过滤器" tabindex="-1"><a class="header-anchor" href="#过滤器的作用-如何实现一个过滤器"><span>过滤器的作用，如何实现一个过滤器</span></a></h2><h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景：</span></a></h4><p>需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出 / 显示。</p><p>比如后端返回一个 年月日的日期字符串，前端需要展示为 多少天前 的数据格式，此时就可以用fliters过滤器来处理数据。</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>商品价格：{{item.price | filterPrice}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"> <span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">filterPrice</span> <span class="token punctuation">(</span><span class="token parameter">price</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> price <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token string">&#39;￥&#39;</span> <span class="token operator">+</span> price<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&#39;--&#39;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue的diff-算法" tabindex="-1"><a class="header-anchor" href="#vue的diff-算法"><span>vue的diff 算法</span></a></h2><p>实际上，diff 算法探讨的就是虚拟 DOM 树发生变化后，生成 DOM 树更新补丁的方式。它通过对比新旧两株虚拟 DOM 树的变更差异，将更新补丁作用于真实 DOM，以最小成本完成视图更新。</p><p><img src="`+c+`" alt="diff"></p><h4 id="具体的流程如下" tabindex="-1"><a class="header-anchor" href="#具体的流程如下"><span>具体的流程如下：</span></a></h4><ul><li>真实的 DOM 首先会映射为虚拟 DOM；</li><li>当虚拟 DOM 发生变化后，就会根据差距计算生成 patch，这个 patch 是一个结构化的数据，内容包含了增加、更新、移除等；</li><li>根据 patch 去更新真实的 DOM，反馈到用户的界面上</li></ul><h2 id="为什么vue中的v-if和v-for不建议一起用" tabindex="-1"><a class="header-anchor" href="#为什么vue中的v-if和v-for不建议一起用"><span>为什么Vue中的v-if和v-for不建议一起用</span></a></h2><p>v-for的优先级高与v-if，每次渲染都会先循环再进行条件判断，带来性能方面的浪费</p><h2 id="简述vue的响应式原理" tabindex="-1"><a class="header-anchor" href="#简述vue的响应式原理"><span>简述Vue的响应式原理?</span></a></h2><p>双向绑定采用数据劫持结合发布者-订阅者模式的方式，通过<code>Object.defineProperty()</code>来劫持各个属性的<code>setter</code>，<code>getter</code>，在数据变动时发布消息给订阅者，触发相应的监听回调。</p><h2 id="computed-和-watch-的区别" tabindex="-1"><a class="header-anchor" href="#computed-和-watch-的区别"><span>Computed 和 Watch 的区别</span></a></h2><p>computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。</p><p>watch 侦听器 : 更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。</p><h2 id="说说你对vuex的理解" tabindex="-1"><a class="header-anchor" href="#说说你对vuex的理解"><span>说说你对vuex的理解</span></a></h2><ul><li><code>state</code>：用一个对象就包含了全部的应用层级状态</li><li><code>getters</code>：用来从<code>store</code>中的<code>state</code>中派生出一些状态，例如对列表进行过滤并计数,可以认为是<code>store</code>的计算属性</li><li><code>mutations</code>:更改<code>Vuex</code>的<code>store</code>中的状态的唯一方法是提交<code>mutation</code>。<code>Vuex</code>中的<code>mutations</code>非常类似于事件：每个<code>mutation</code>都有一个字符串的事件类型(<code>type</code>)和一个回调函数(<code>handler</code>)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数</li><li><code>actions</code>：<code>actions</code>类似于<code>mutation</code>，不同在于：<code>actions</code>提交的是<code>mutation</code>，而不是直接变更状态。<code>actions</code>可以包含任意异步操作。</li><li><code>Modules</code>：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，<code>store</code>对象就有可能变得相当臃肿。 为了解决以上问题，<code>Vuex</code>允许我们将<code>store</code>分割成模块（<code>module</code>）。每个模块拥有自己的<code>state</code>、<code>mutation</code>、<code>action</code>、<code>getter</code>、甚至是嵌套子模块——从上至下进行同样方式的分割。<br> 超链接: <a href="https://juejin.cn/post/6924486801667162119" target="_blank" rel="noopener noreferrer">跳转</a></li></ul><h2 id="给data数据的重新初始化" tabindex="-1"><a class="header-anchor" href="#给data数据的重新初始化"><span>给data数据的重新初始化</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">//初始化 data 中的 obj 数据</span></span>
<span class="line">Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$data<span class="token punctuation">.</span>obj<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//初始化全部的 data数据</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$data<span class="token punctuation">)</span> <span class="token comment">//获取data当前的值</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//获取data最初的值</span></span>
<span class="line">Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$data<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\`Object.assign\`数据合并会改变this.$data的值</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mixins" tabindex="-1"><a class="header-anchor" href="#mixins"><span>mixins</span></a></h2><p><code>Mixins</code>：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。</p><h4 id="mixins特点" tabindex="-1"><a class="header-anchor" href="#mixins特点"><span>mixins特点</span></a></h4><ol><li><p>方法和参数在各组件中不共享 如混入对象中有一个 cont:1的变量,在组件A中改变cont值为5，这时候在组件B中获取这个值，拿到的还是1，还是混入对象里的初始值，数据不共享</p></li><li><p>值为对象的选项 如methods,components等，选项会被合并，键冲突的组件会覆盖混入对象的，比如混入对象里有个方法A，组件里也有方法A，这时候在组件里调用的话，执行的是组件里的A方法</p></li><li><p>值为函数的选项 如created,mounted等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用，同一个钩子函数里，会先执行混入对象的东西，再执行本组件的</p></li></ol><h2 id="封装一个完整的v-model" tabindex="-1"><a class="header-anchor" href="#封装一个完整的v-model"><span>封装一个完整的v-model</span></a></h2><h4 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h4><p><code>v-model</code> 实际上就是 <code>$emit(&#39;input&#39;)</code> 以及 <code>props:value</code> 的组合语法糖，只要组件中满足这两个条件，就可以在组件中使用 <code>v-model</code>。 虽然在有些交互组件中有些许不同，例如：</p><p><code>checkbox</code> 和 <code>radio</code> 使用 <code>props:checked</code> 属性和 $emit(&#39;change&#39;) 事件。</p><p><code>select</code> 使用 <code>props:value</code> 属性和 <code>$emit(&#39;change&#39;)</code> 事件。</p><p>但是，除了上面列举的这些，别的都是 <code>$emit(&#39;input&#39;)</code> 以及 <code>props:value</code> 。</p><h4 id="完整组件代码" tabindex="-1"><a class="header-anchor" href="#完整组件代码"><span>完整组件代码</span></a></h4><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>increase(-1)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>-1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>number<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentValue<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>changeValue<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>increase(1)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>+1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;NumberInput&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span></span>
<span class="line">        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">require</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">currentValue</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value</span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">value</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>currentValue <span class="token operator">=</span> newVal<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">changeValue</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>currentValue <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentValue<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">increase</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>currentValue<span class="token operator">+=</span> value<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentValue<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h4><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>NumberInput</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>number<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>NumberInput</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> NumberInput <span class="token keyword">from</span> <span class="token string">&quot;./NumberInput&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">components</span><span class="token operator">:</span><span class="token punctuation">{</span>NumberInput<span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token number">10</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,51)]))}const d=s(l,[["render",o],["__file","vue.html.vue"]]),r=JSON.parse('{"path":"/vue.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"vue 生命周期","slug":"vue-生命周期","link":"#vue-生命周期","children":[]},{"level":2,"title":"你觉得 vue 有哪些特点","slug":"你觉得-vue-有哪些特点","link":"#你觉得-vue-有哪些特点","children":[]},{"level":2,"title":"SPA了解吗","slug":"spa了解吗","link":"#spa了解吗","children":[]},{"level":2,"title":"vue 父子组件通信","slug":"vue-父子组件通信","link":"#vue-父子组件通信","children":[]},{"level":2,"title":"Computed 和 Methods 的区别","slug":"computed-和-methods-的区别","link":"#computed-和-methods-的区别","children":[]},{"level":2,"title":"过滤器的作用，如何实现一个过滤器","slug":"过滤器的作用-如何实现一个过滤器","link":"#过滤器的作用-如何实现一个过滤器","children":[]},{"level":2,"title":"vue的diff 算法","slug":"vue的diff-算法","link":"#vue的diff-算法","children":[]},{"level":2,"title":"为什么Vue中的v-if和v-for不建议一起用","slug":"为什么vue中的v-if和v-for不建议一起用","link":"#为什么vue中的v-if和v-for不建议一起用","children":[]},{"level":2,"title":"简述Vue的响应式原理?","slug":"简述vue的响应式原理","link":"#简述vue的响应式原理","children":[]},{"level":2,"title":"Computed 和 Watch 的区别","slug":"computed-和-watch-的区别","link":"#computed-和-watch-的区别","children":[]},{"level":2,"title":"说说你对vuex的理解","slug":"说说你对vuex的理解","link":"#说说你对vuex的理解","children":[]},{"level":2,"title":"给data数据的重新初始化","slug":"给data数据的重新初始化","link":"#给data数据的重新初始化","children":[]},{"level":2,"title":"mixins","slug":"mixins","link":"#mixins","children":[]},{"level":2,"title":"封装一个完整的v-model","slug":"封装一个完整的v-model","link":"#封装一个完整的v-model","children":[]}],"git":{"updatedTime":null,"contributors":[]},"filePathRelative":"vue.md"}');export{d as comp,r as data};
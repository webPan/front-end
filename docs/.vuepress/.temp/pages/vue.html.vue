<template><div><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h2>
<blockquote>
<p>Vue的生命周期钩子函数有哪些？简述每个钩子的作用。</p>
</blockquote>
<p>Vue实例在其生命周期中会触发多个钩子函数，可以让开发者在不同的阶段执行特定的代码。以下是Vue的主要生命周期钩子函数及其作用：</p>
<ol>
<li><strong>beforeCreate</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：在实例初始化之后，数据观测和事件配置之前调用。</li>
<li><strong>作用</strong>：在此阶段无法访问 <code v-pre>data</code>、<code v-pre>computed</code>、<code v-pre>methods</code> 等，因为它们还未被初始化。</li>
</ul>
<ol start="2">
<li><strong>created</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：实例创建完成后调用，实例已完成数据观测、属性和方法的初始化，但尚未挂载DOM。</li>
<li><strong>作用</strong>：可以访问 <code v-pre>data</code>、<code v-pre>computed</code>、<code v-pre>methods</code> 等，常用于数据的初始获取或进行某些副作用操作。</li>
</ul>
<ol start="3">
<li><strong>beforeMount</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：在挂载开始之前调用，相关的 <code v-pre>render</code> 函数首次被调用。</li>
<li><strong>作用</strong>：在模板编译、生成的虚拟DOM首次渲染之前执行，适合在此进行一些初始化操作，但尚未涉及DOM。</li>
</ul>
<ol start="4">
<li><strong>mounted</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：实例被挂载到DOM上后调用。</li>
<li><strong>作用</strong>：此时DOM已存在，可以进行DOM操作或启动依赖于DOM的功能（如第三方库的初始化）。</li>
</ul>
<ol start="5">
<li><strong>beforeUpdate</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：在数据变化导致的虚拟DOM重新渲染和打补丁之前调用。</li>
<li><strong>作用</strong>：适合在数据更新之前做一些准备工作或查看旧数据的状态，但不要进行状态改变，否则可能导致无限循环。</li>
</ul>
<ol start="6">
<li><strong>updated</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：由于数据更改导致虚拟DOM重新渲染和打补丁后调用。</li>
<li><strong>作用</strong>：此时DOM已更新，可以执行与更新相关的操作，注意避免在此操作数据，否则可能导致无限循环。</li>
</ul>
<ol start="7">
<li><strong>beforeDestroy</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：实例销毁之前调用。在这一步，实例仍然完全可用。</li>
<li><strong>作用</strong>：适合在组件销毁前执行清理操作，比如清除定时器、取消事件监听等。</li>
</ul>
<ol start="8">
<li><strong>destroyed</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：实例销毁后调用，此时实例的所有指令解绑，所有事件监听器移除，子实例也被销毁。</li>
<li><strong>作用</strong>：在组件销毁后执行一些清理操作，组件不再可用。</li>
</ul>
<ol start="9">
<li><strong>activated</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：在使用 <code v-pre>keep-alive</code> 组件时，当组件被激活时调用。</li>
<li><strong>作用</strong>：当缓存的组件再次激活时，可以在此钩子中执行一些重新初始化的操作。</li>
</ul>
<ol start="10">
<li><strong>deactivated</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：在使用 <code v-pre>keep-alive</code> 组件时，当组件被停用时调用。</li>
<li><strong>作用</strong>：可以在此钩子中执行一些组件停用时的操作，如停止定时器。</li>
</ul>
<ol start="11">
<li><strong>errorCaptured</strong></li>
</ol>
<ul>
<li><strong>描述</strong>：当子组件抛出错误时被调用。这个钩子会捕获从子组件中冒泡上来的错误。</li>
<li><strong>作用</strong>：可以用来报告错误或防止错误使应用崩溃，还可以返回 <code v-pre>false</code> 以阻止错误继续向上传递。</li>
</ul>
<h2 id="组件通信" tabindex="-1"><a class="header-anchor" href="#组件通信"><span>组件通信</span></a></h2>
<blockquote>
<p>Vue中如何实现父子组件通信？有哪些方式？</p>
</blockquote>
<ol>
<li>
<p><strong>通过<code v-pre>props</code>传递数据</strong></p>
<ul>
<li><strong>父组件传递数据给子组件</strong>：
<ul>
<li>父组件可以通过<code v-pre>props</code>将数据传递给子组件。子组件通过在<code v-pre>props</code>选项中声明接收的数据属性，从而获取父组件传递的数据。</li>
<li><strong>示例</strong>：<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 父组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-component</span> <span class="token attr-name">:message</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parentMessage<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child-component</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">parentMessage</span><span class="token operator">:</span> <span class="token string">'Hello from parent!'</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 子组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ message }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'message'</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>通过事件传递数据</strong></p>
<ul>
<li><strong>子组件向父组件传递数据</strong>：
<ul>
<li>子组件可以通过<code v-pre>$emit</code>方法触发事件，传递数据给父组件。父组件通过在子组件标签上监听自定义事件来获取数据。</li>
<li><strong>示例</strong>：<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 父组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-component</span> <span class="token attr-name">@send-data</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>receiveData<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child-component</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">receiveData</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Received data from child:'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 子组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sendData<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Send Data to Parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">sendData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'send-data'</span><span class="token punctuation">,</span> <span class="token string">'Hello from child!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>通过<code v-pre>$parent</code>和<code v-pre>$children</code>访问实例</strong></p>
<ul>
<li><strong>访问父组件或子组件实例</strong>：
<ul>
<li>子组件可以通过<code v-pre>this.$parent</code>访问父组件实例，父组件可以通过<code v-pre>this.$children</code>访问子组件实例，但不推荐频繁使用这种方式，因为会导致组件之间耦合度增加。</li>
<li><strong>示例</strong>：<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 子组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">.</span><span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 父组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token string">'Data from parent method'</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>通过<code v-pre>provide</code>和<code v-pre>inject</code></strong></p>
<ul>
<li><strong>跨层级传递数据</strong>：
<ul>
<li>父组件通过<code v-pre>provide</code>向下提供数据，任意后代组件可以通过<code v-pre>inject</code>来注入这些数据。适合用于跨多级的父子组件通信。</li>
<li><strong>示例</strong>：<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 父组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">provide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">sharedData</span><span class="token operator">:</span> <span class="token string">'Shared data from parent'</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 子组件（或后代组件） --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'sharedData'</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sharedData<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>通过事件总线（EventBus）</strong></p>
<ul>
<li><strong>在没有父子关系的组件之间传递数据</strong>：
<ul>
<li>可以创建一个事件总线（Vue实例），通过它在非父子关系的组件之间传递事件和数据。这种方式在Vue 3中较少使用，因为有了更好的状态管理方式（如Vuex或Composition API）。</li>
<li><strong>示例</strong>：<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// EventBus.js</span></span>
<span class="line"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> EventBus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 组件A（发送数据）</span></span>
<span class="line">EventBus<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'event-name'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 组件B（接收数据）</span></span>
<span class="line">EventBus<span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span><span class="token string">'event-name'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>使用<code v-pre>$refs</code></strong></p>
<ul>
<li><strong>直接访问子组件或DOM元素</strong>：
<ul>
<li>父组件可以通过<code v-pre>$refs</code>直接访问子组件的实例或DOM元素，然后调用其方法或访问其属性。</li>
<li><strong>示例</strong>：<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 父组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-component</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child-component</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>callChildMethod<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Call Child Method<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">callChildMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>child<span class="token punctuation">.</span><span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">&lt;!-- 子组件 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Child method called!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Vuex（状态管理）</strong></p>
<ul>
<li><strong>全局状态管理</strong>：
<ul>
<li>在大型应用中，通过Vuex可以实现跨组件的状态共享，所有组件都可以访问和修改全局状态。适用于复杂的应用程序。</li>
<li><strong>示例</strong>：<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// store.js</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      state<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 组件A</span></span>
<span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 组件B</span></span>
<span class="line"><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
</ol>
<h2 id="v-if和v-show的区别" tabindex="-1"><a class="header-anchor" href="#v-if和v-show的区别"><span>v-if和v-show的区别</span></a></h2>
<p><code v-pre>v-if</code> 和 <code v-pre>v-show</code> 是 Vue 中用于条件渲染的两个指令，但它们在工作原理和使用场景上有显著的区别：</p>
<ol>
<li>
<p><strong>工作原理</strong>：</p>
<ul>
<li>
<p><strong><code v-pre>v-if</code></strong>：</p>
<ul>
<li><code v-pre>v-if</code> 是“真正的”条件渲染。只有当条件为真时，DOM 元素才会被渲染和插入到页面中。</li>
<li>当条件为假时，DOM 元素将被完全移除。</li>
<li><strong>性能影响</strong>：由于涉及到 DOM 元素的创建和销毁，因此在切换频繁时，<code v-pre>v-if</code> 的性能开销会较大。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>v-show</code></strong>：</p>
<ul>
<li><code v-pre>v-show</code> 只是简单地切换元素的 CSS <code v-pre>display</code> 属性。</li>
<li>当条件为真时，<code v-pre>v-show</code> 会将元素显示出来（<code v-pre>display: block</code>），当条件为假时，元素仍然保留在 DOM 中，但被隐藏（<code v-pre>display: none</code>）。</li>
<li><strong>性能影响</strong>：<code v-pre>v-show</code> 不涉及元素的创建和销毁，因此在频繁切换的情况下，<code v-pre>v-show</code> 的性能开销较小。</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>使用场景</strong>：</p>
<ul>
<li>
<p><strong><code v-pre>v-if</code></strong>：</p>
<ul>
<li>适用于在运行时需要动态地切换内容的场景，并且切换的频率不高。</li>
<li>由于<code v-pre>v-if</code>会在条件不满足时移除元素，因此可以节省初次渲染的性能开销。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>v-show</code></strong>：</p>
<ul>
<li>适用于需要频繁切换显示状态的场景。因为<code v-pre>v-show</code>只会简单地切换<code v-pre>display</code>属性，而不会真正地移除或重新渲染元素。</li>
<li>不适合初次渲染时就会隐藏的场景，因为即使是隐藏的元素，<code v-pre>v-show</code> 仍会渲染在 DOM 中。</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>模板示例</strong>：</p>
<ul>
<li>
<p><strong><code v-pre>v-if</code> 示例</strong>：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isVisible<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>This element is conditionally rendered.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">isVisible</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>v-show</code> 示例</strong>：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isVisible<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>This element is conditionally shown.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">isVisible</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>总结</strong>：</p>
<ul>
<li>使用 <code v-pre>v-if</code> 时，只有在条件为真时才会渲染元素，因此适合对性能有要求且不需要频繁切换的场景。</li>
<li>使用 <code v-pre>v-show</code> 时，元素始终存在于 DOM 中，只是根据条件显示或隐藏，适合频繁切换的场景。</li>
</ul>
</li>
</ol>
<h2 id="双向数据绑定原理" tabindex="-1"><a class="header-anchor" href="#双向数据绑定原理"><span>双向数据绑定原理</span></a></h2>
<blockquote>
<p>Vue中的双向数据绑定原理是什么？如何实现的？</p>
</blockquote>
<p>Vue.js 中的双向数据绑定是通过数据劫持（Data Hijacking）结合发布-订阅模式（Publish-Subscribe Pattern）来实现的。其核心原理是利用 <code v-pre>Object.defineProperty()</code> 对数据对象的属性进行劫持，并通过 getter 和 setter 方法来追踪数据的变化。</p>
<h4 id="实现步骤" tabindex="-1"><a class="header-anchor" href="#实现步骤"><span>实现步骤</span></a></h4>
<ol>
<li>
<p><strong>数据劫持</strong>：</p>
<ul>
<li>Vue 会遍历 <code v-pre>data</code> 对象的每一个属性，并使用 <code v-pre>Object.defineProperty()</code> 将这些属性转换为 getter 和 setter。</li>
<li>每当属性被访问时，getter 会被触发，它会将依赖这个属性的 &quot;订阅者&quot;（即依赖收集的逻辑）添加到该属性的订阅列表中。</li>
<li>每当属性被修改时，setter 会被触发，通知所有订阅者该属性的值已经发生变化，并触发视图更新。</li>
</ul>
</li>
<li>
<p><strong>依赖收集</strong>：</p>
<ul>
<li>在组件渲染的过程中，每个被访问的数据属性都会添加到一个全局的依赖对象（Dep）中，这样当属性值变化时，可以通知相关的渲染逻辑重新执行，以更新视图。</li>
</ul>
</li>
<li>
<p><strong>发布-订阅模式</strong>：</p>
<ul>
<li>每个数据属性都有一个 &quot;订阅者&quot; 列表，当数据变化时，触发这些订阅者的回调函数，从而更新视图。这种模式确保了视图和数据的同步更新。</li>
</ul>
</li>
</ol>
<h4 id="简单实现示例" tabindex="-1"><a class="header-anchor" href="#简单实现示例"><span>简单实现示例</span></a></h4>
<p>以下是一个简单的双向数据绑定实现示例：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">addSub</span><span class="token punctuation">(</span><span class="token parameter">sub</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">sub</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      sub<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>obj <span class="token operator">=</span> obj<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb<span class="token punctuation">;</span></span>
<span class="line">    Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 触发 getter</span></span>
<span class="line">    Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        dep<span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">return</span> val<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">set</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        val <span class="token operator">=</span> newVal<span class="token punctuation">;</span></span>
<span class="line">        dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 使用示例</span></span>
<span class="line"><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'hello'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">defineReactive</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">'text'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'数据变化了:'</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">data<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">'world'</span><span class="token punctuation">;</span> <span class="token comment">// 触发更新</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h4>
<p>Vue 的双向数据绑定通过数据劫持结合发布-订阅模式，确保了数据和视图的实时同步。现代 Vue 3 使用了 Proxy 对象进行数据劫持，这相比 Object.defineProperty 提供了更强大和灵活的能力。</p>
<h2 id="computed与methods" tabindex="-1"><a class="header-anchor" href="#computed与methods"><span>computed与methods</span></a></h2>
<blockquote>
<p>Vue的计算属性computed与methods有何区别？</p>
</blockquote>
<p>在Vue.js中，<code v-pre>computed</code> 和 <code v-pre>methods</code> 都可以用于对数据进行处理并返回结果，但它们之间有几个关键的区别。</p>
<h4 id="_1-缓存机制" tabindex="-1"><a class="header-anchor" href="#_1-缓存机制"><span>1. <strong>缓存机制</strong></span></a></h4>
<ul>
<li>
<p><strong><code v-pre>computed</code></strong>: 计算属性具有缓存机制。计算属性的值会依赖于其相关的响应式数据，只有当依赖的数据发生变化时，计算属性才会重新计算。否则，它会直接返回缓存的结果。这使得 <code v-pre>computed</code> 在处理复杂的计算时更加高效，尤其是当计算结果在多次访问时不变的情况下。</p>
</li>
<li>
<p><strong><code v-pre>methods</code></strong>: 方法在每次调用时都会重新执行，因此不会缓存结果。每次访问方法时，都会重新执行逻辑并返回一个新的结果。</p>
</li>
</ul>
<h4 id="_2-使用场景" tabindex="-1"><a class="header-anchor" href="#_2-使用场景"><span>2. <strong>使用场景</strong></span></a></h4>
<ul>
<li>
<p><strong><code v-pre>computed</code></strong>: 适合用于依赖其他数据的值且需要缓存的场景。例如，数据的格式化、组合、过滤等操作，当这些操作依赖的数据没有变化时，使用 <code v-pre>computed</code> 可以避免不必要的重复计算。</p>
</li>
<li>
<p><strong><code v-pre>methods</code></strong>: 适合用于不依赖响应式数据或者不需要缓存的场景。例如，事件处理函数，或者每次都需要获取最新结果的计算。</p>
</li>
</ul>
<h4 id="_3-调用方式" tabindex="-1"><a class="header-anchor" href="#_3-调用方式"><span>3. <strong>调用方式</strong></span></a></h4>
<ul>
<li>
<p><strong><code v-pre>computed</code></strong>: 计算属性在模板中使用时，可以直接当作普通属性来使用，无需加括号调用。Vue 会自动检测计算属性的依赖，并在依赖发生变化时自动更新。</p>
</li>
<li>
<p><strong><code v-pre>methods</code></strong>: 方法在模板中使用时，需要加括号调用。例如：<code v-pre>{{ methodName() }}</code>。</p>
</li>
</ul>
<h4 id="示例对比" tabindex="-1"><a class="header-anchor" href="#示例对比"><span>示例对比</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token comment">&lt;!-- 使用计算属性 --></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Computed Result: {{ computedResult }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token comment">&lt;!-- 使用方法 --></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Method Result: {{ methodResult() }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">num1</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">num2</span><span class="token operator">:</span> <span class="token number">20</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 计算属性：依赖 num1 和 num2，只有它们变化时才重新计算</span></span>
<span class="line">    <span class="token function">computedResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>num1 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>num2<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 方法：每次调用时都会重新计算</span></span>
<span class="line">    <span class="token function">methodResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>num1 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>num2<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1"><span>总结</span></a></h4>
<p><code v-pre>computed</code> 更适合需要缓存的、依赖其他响应式数据的计算逻辑。
<code v-pre>methods</code> 则更适合处理不需要缓存或需要频繁重新计算的逻辑。</p>
<h2 id="实现自定义指令" tabindex="-1"><a class="header-anchor" href="#实现自定义指令"><span>实现自定义指令</span></a></h2>
<blockquote>
<p>如何在Vue中使用自定义指令？请简述实现步骤。</p>
</blockquote>
<p>在Vue.js中，自定义指令允许你对DOM元素进行底层操作，它们类似于内置指令（如<code v-pre>v-model</code>、<code v-pre>v-if</code>），但你可以根据需求来实现特定功能。</p>
<h4 id="实现步骤-1" tabindex="-1"><a class="header-anchor" href="#实现步骤-1"><span>实现步骤</span></a></h4>
<h4 id="_1-注册自定义指令" tabindex="-1"><a class="header-anchor" href="#_1-注册自定义指令"><span>1. <strong>注册自定义指令</strong></span></a></h4>
<p>自定义指令可以在两种地方注册：</p>
<ul>
<li><strong>局部注册</strong>：在某个组件内部注册，只能在该组件中使用。</li>
<li><strong>全局注册</strong>：在Vue实例上注册，应用中的所有组件都可以使用。</li>
</ul>
<h5 id="局部注册示例" tabindex="-1"><a class="header-anchor" href="#局部注册示例"><span>局部注册示例：</span></a></h5>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">'focus'</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 当被绑定的元素插入到DOM中时触发</span></span>
<span class="line">      <span class="token function">inserted</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        el<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全局注册示例" tabindex="-1"><a class="header-anchor" href="#全局注册示例"><span>全局注册示例：</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">Vue<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 当被绑定的元素插入到DOM中时触发</span></span>
<span class="line">  <span class="token function">inserted</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    el<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-在模板中使用自定义指令" tabindex="-1"><a class="header-anchor" href="#_2-在模板中使用自定义指令"><span>2. <strong>在模板中使用自定义指令</strong></span></a></h4>
<p>一旦指令注册成功，你可以在模板中使用该指令。使用自定义指令的语法与内置指令类似：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>template<span class="token operator">></span></span>
<span class="line">  <span class="token operator">&lt;</span>input v<span class="token operator">-</span>focus <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-自定义指令的钩子函数" tabindex="-1"><a class="header-anchor" href="#_3-自定义指令的钩子函数"><span>3. <strong>自定义指令的钩子函数</strong></span></a></h4>
<p>自定义指令可以包含多个生命周期钩子，这些钩子类似于组件的生命周期钩子。常用的钩子函数有：</p>
<ul>
<li><code v-pre>bind(el, binding, vnode)</code>: 只调用一次，指令第一次绑定到元素时调用。</li>
<li><code v-pre>inserted(el, binding, vnode)</code>: 当绑定元素插入到父节点时调用。</li>
<li><code v-pre>update(el, binding, vnode, oldVnode)</code>: 所在组件的 VNode 更新时调用。</li>
<li><code v-pre>componentUpdated(el, binding, vnode, oldVnode)</code>: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。</li>
<li><code v-pre>unbind(el, binding, vnode)</code>: 只调用一次，指令与元素解绑时调用。</li>
</ul>
<h4 id="_4-传递值和参数" tabindex="-1"><a class="header-anchor" href="#_4-传递值和参数"><span>4. <strong>传递值和参数</strong></span></a></h4>
<p>自定义指令可以接收参数与值，并且可以通过 binding 对象访问这些参数：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">Vue<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">'color'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> binding</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> binding<span class="token punctuation">.</span>value<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模板中使用：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>template<span class="token operator">></span></span>
<span class="line">  <span class="token operator">&lt;</span>p v<span class="token operator">-</span>color<span class="token operator">=</span><span class="token string">"'red'"</span><span class="token operator">></span>This text will be red<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-修饰符" tabindex="-1"><a class="header-anchor" href="#_5-修饰符"><span>5. <strong>修饰符</strong></span></a></h4>
<p>类似于内置指令，自定义指令也可以使用修饰符。修饰符可以通过 <code v-pre>binding.modifiers</code> 访问</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">Vue<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">'bold'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> binding</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>binding<span class="token punctuation">.</span>modifiers<span class="token punctuation">[</span><span class="token string">'big'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontWeight <span class="token operator">=</span> <span class="token string">'bold'</span><span class="token punctuation">;</span></span>
<span class="line">      el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">'20px'</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontWeight <span class="token operator">=</span> <span class="token string">'bold'</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模板中使用：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-bold.big</span><span class="token punctuation">></span></span>This text will be bold and big<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-bold</span><span class="token punctuation">></span></span>This text will only be bold<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结-2" tabindex="-1"><a class="header-anchor" href="#总结-2"><span>总结</span></a></h4>
<p>自定义指令在Vue中可以通过注册、钩子函数、传递参数与值、使用修饰符等方式实现复杂的DOM操作。它们可以用于需要直接操作DOM元素的场景，如表单自动聚焦、样式动态变化等。</p>
<h2 id="路由懒加载" tabindex="-1"><a class="header-anchor" href="#路由懒加载"><span>路由懒加载</span></a></h2>
<blockquote>
<p>Vue中如何实现路由懒加载</p>
</blockquote>
<p>在Vue.js应用中，路由懒加载是一种按需加载的技术，能够有效地减少初始加载的体积，提高应用的加载速度。它允许你在用户访问某个路由时才加载对应的组件。</p>
<h4 id="实现步骤-2" tabindex="-1"><a class="header-anchor" href="#实现步骤-2"><span>实现步骤</span></a></h4>
<h4 id="_1-使用import-语法" tabindex="-1"><a class="header-anchor" href="#_1-使用import-语法"><span>1. <strong>使用<code v-pre>import()</code>语法</strong></span></a></h4>
<p>Vue官方推荐的实现路由懒加载的方法是使用动态的 <code v-pre>import()</code> 语法。每当路由被访问时，才会加载相应的组件。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> VueRouter <span class="token keyword">from</span> <span class="token string">'vue-router'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueRouter<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/home'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Home'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@/views/Home.vue'</span><span class="token punctuation">)</span> <span class="token comment">// 懒加载 Home 组件</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/about'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'About'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@/views/About.vue'</span><span class="token punctuation">)</span> <span class="token comment">// 懒加载 About 组件</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  routes</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> router<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，当用户访问 <code v-pre>/home</code> 路由时，才会加载 <code v-pre>Home.vue</code> 组件。同样，访问 <code v-pre>/about</code> 路由时，才会加载 <code v-pre>About.vue</code> 组件。</p>
<h4 id="_2-使用webpack的-webpackchunkname-group-name-注释" tabindex="-1"><a class="header-anchor" href="#_2-使用webpack的-webpackchunkname-group-name-注释"><span>2. <strong>使用Webpack的<code v-pre>/* webpackChunkName: &quot;group-name&quot; */</code>注释</strong></span></a></h4>
<p>你还可以通过使用Webpack的魔法注释 <code v-pre>(/* webpackChunkName: &quot;group-name&quot; */)</code> 将懒加载的组件分组。这些组件将被打包成同一个chunk，减少请求次数。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/home'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Home'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: "home-group" */</span> <span class="token string">'@/views/Home.vue'</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/about'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'About'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: "home-group" */</span> <span class="token string">'@/views/About.vue'</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码将 <code v-pre>Home.vue</code> 和 <code v-pre>About.vue</code> 组件打包到同一个名为 <code v-pre>home-group.js</code> 的chunk中。</p>
<h4 id="_3-结合-vue-router-和-vue-cli" tabindex="-1"><a class="header-anchor" href="#_3-结合-vue-router-和-vue-cli"><span>3. <strong>结合 <code v-pre>Vue Router</code> 和 <code v-pre>Vue CLI</code></strong></span></a></h4>
<p>如果你使用的是<code v-pre>Vue CLI</code>创建的项目，默认配置已经支持路由懒加载。你只需要按照上面的步骤使用 <code v-pre>import()</code> 语法即可，无需额外配置。</p>
<h4 id="总结-3" tabindex="-1"><a class="header-anchor" href="#总结-3"><span>总结</span></a></h4>
<p>通过使用动态的 import() 语法，Vue.js能够实现路由懒加载，减少初始打包的体积，提高应用的加载性能。此外，利用Webpack的魔法注释还可以实现代码的分组打包，进一步优化加载体验。</p>
<h2 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex"><span>Vuex</span></a></h2>
<blockquote>
<p><strong>Vuex是什么？它有哪些核心概念？</strong></p>
</blockquote>
<h4 id="vuex是什么" tabindex="-1"><a class="header-anchor" href="#vuex是什么"><span>Vuex是什么？</span></a></h4>
<p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理库。它用于集中式管理应用的所有组件的状态，确保状态以一种可预测的方式发生变化。Vuex 通过将应用状态存储在一个全局的 store 中，使得组件间的状态共享变得更加简单和清晰。</p>
<h4 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念"><span>核心概念</span></a></h4>
<ol>
<li>
<p><strong>State（状态）</strong></p>
<ul>
<li>Vuex 的核心是 <code v-pre>state</code>，它是存储应用级别的状态的地方。组件可以通过 <code v-pre>state</code> 获取数据，但不能直接修改 <code v-pre>state</code>。</li>
</ul>
</li>
<li>
<p><strong>Getters（获取器）</strong></p>
<ul>
<li><code v-pre>getters</code> 类似于 Vue 的计算属性，用于从 <code v-pre>state</code> 中派生出一些状态。它们允许你根据 <code v-pre>state</code> 的数据生成派生状态，并且是 <code v-pre>state</code> 的只读属性。</li>
</ul>
</li>
<li>
<p><strong>Mutations（变更）</strong></p>
<ul>
<li><code v-pre>mutations</code> 是唯一可以直接改变 <code v-pre>state</code> 的地方。每个 <code v-pre>mutation</code> 都有一个字符串类型的事件类型和一个回调函数。回调函数接收 <code v-pre>state</code> 作为第一个参数，并且可以修改 <code v-pre>state</code>。</li>
</ul>
</li>
<li>
<p><strong>Actions（动作）</strong></p>
<ul>
<li><code v-pre>actions</code> 用于处理异步操作。<code v-pre>actions</code> 不能直接修改 <code v-pre>state</code>，而是提交 <code v-pre>mutations</code> 来改变 <code v-pre>state</code>。<code v-pre>actions</code> 可以包含任意异步操作，例如从服务器获取数据。</li>
</ul>
</li>
<li>
<p><strong>Modules（模块）</strong></p>
<ul>
<li>当应用的状态管理变得复杂时，可以将 <code v-pre>store</code> 分割成模块。每个模块拥有自己的 <code v-pre>state</code>、<code v-pre>getters</code>、<code v-pre>mutations</code> 和 <code v-pre>actions</code>，模块间可以嵌套并管理自己的状态。模块可以是根模块或嵌套模块。</li>
</ul>
</li>
</ol>
<h4 id="参考示例" tabindex="-1"><a class="header-anchor" href="#参考示例"><span>参考示例</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// store.js</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">'vuex'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      state<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">incrementAsync</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 定义模块</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何在vue组件中使用-refs" tabindex="-1"><a class="header-anchor" href="#如何在vue组件中使用-refs"><span>如何在Vue组件中使用 <code v-pre>$refs</code>？</span></a></h2>
<blockquote>
<p>如何在Vue组件中使用$refs？有哪些应用场景？</p>
</blockquote>
<h4 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h4>
<ol>
<li>定义 <code v-pre>ref</code> 属性**：在模板中给元素或子组件添加 <code v-pre>ref</code> 属性。</li>
</ol>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myInput<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ChildComponent</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>访问 $refs：在组件的方法或生命周期钩子中，通过 this.$refs 访问这些元素或组件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">focusInput</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myInput<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">getChildData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>child<span class="token punctuation">.</span><span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">focusInput</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 页面加载完成后自动聚焦</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h4>
<ol>
<li><strong>操作 DOM 元素</strong>：直接操作 DOM 元素，例如设置焦点、获取输入值或执行其他 DOM 操作。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myInput<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="2">
<li><strong>访问子组件实例</strong>：访问子组件的公开方法或属性，适用于需要与子组件进行交互的场景。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>child<span class="token punctuation">.</span><span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li><strong>动态获取元素大小</strong>：在组件挂载后，获取元素的尺寸或位置。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> width <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myDiv<span class="token punctuation">.</span>clientWidth<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">const</span> height <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myDiv<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Width: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, Height: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li><strong>操作表单元素</strong>：在表单验证或提交时，获取表单元素的值或状态。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">submitForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">const</span> inputValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myInput<span class="token punctuation">.</span>value<span class="token punctuation">;</span></span>
<span class="line">            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>inputValue<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h4>
<p><code v-pre>$refs</code> 只在组件渲染完成后可用，因此最好在 mounted 钩子中使用 $refs。
<code v-pre>$refs</code> 不会在 Vue 的响应式系统中注册，因此不适合用于数据绑定。</p>
<h2 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive"><span>keep-alive</span></a></h2>
<blockquote>
<p>Vue的keep-alive组件有什么作用？如何使用？</p>
</blockquote>
<h4 id="作用" tabindex="-1"><a class="header-anchor" href="#作用"><span>作用：</span></a></h4>
<p><code v-pre>keep-alive</code>是Vue提供的一个内置组件，用于在组件切换时缓存组件的状态，防止重复渲染，从而提高性能。具体来说，使用<code v-pre>keep-alive</code>包裹的组件在切换时会被缓存，而不是被销毁。当用户重新访问该组件时，组件的状态和DOM结构都会被保留。</p>
<h4 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景"><span>适用场景：</span></a></h4>
<ul>
<li><strong>组件频繁切换的场景</strong>：如在一个多标签页应用中，用户切换不同标签页时希望保留各标签页的状态。</li>
<li><strong>表单填写</strong>：用户在切换路由或组件时，表单填写的数据不希望被清空。</li>
</ul>
<h4 id="使用方法-1" tabindex="-1"><a class="header-anchor" href="#使用方法-1"><span>使用方法：</span></a></h4>
<ol>
<li><strong>基本用法</strong>：</li>
</ol>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentComponent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">currentComponent</span><span class="token operator">:</span> <span class="token string">'ComponentA'</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li><strong>结合动态组件</strong>：</li>
</ol>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentComponent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>switchComponent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>切换组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">currentComponent</span><span class="token operator">:</span> <span class="token string">'ComponentA'</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">switchComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>currentComponent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentComponent <span class="token operator">===</span> <span class="token string">'ComponentA'</span> <span class="token operator">?</span> <span class="token string">'ComponentB'</span> <span class="token operator">:</span> <span class="token string">'ComponentA'</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li><strong>使用include和exclude属性</strong>：</li>
</ol>
<ul>
<li><code v-pre>include</code>: 只有匹配到的组件才会被缓存，可以是组件名或正则表达式。</li>
<li><code v-pre>exclude</code>: 匹配到的组件不会被缓存。</li>
</ul>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ComponentA<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentComponent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li><strong>max属性：</strong>：</li>
</ol>
<ul>
<li><code v-pre>max</code> 属性用于指定最多可以缓存多少个组件，超过这个数量时，最早缓存的组件会被销毁。</li>
</ul>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">:max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentComponent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意事项</strong>：
不是所有的组件都适合使用<code v-pre>keep-alive</code>，特别是那些具有副作用的生命周期钩子函数的组件，如<code v-pre>created</code>、<code v-pre>mounted</code>等。
使用<code v-pre>keep-alive</code>时，组件的生命周期钩子函数<code v-pre>activated</code>和<code v-pre>deactivated</code>会被触发，用于组件被激活或停用时的逻辑处理。</p>
<h2 id="composition-api与options-api" tabindex="-1"><a class="header-anchor" href="#composition-api与options-api"><span>Composition API与Options API</span></a></h2>
<blockquote>
<p>Vue 3 中 Composition API 与 Options API 的区别</p>
</blockquote>
<h4 id="_1-定义方式" tabindex="-1"><a class="header-anchor" href="#_1-定义方式"><span>1. <strong>定义方式</strong></span></a></h4>
<ul>
<li>
<p><strong>Options API</strong>:</p>
<ul>
<li>采用对象语法，通过配置项（如<code v-pre>data</code>、<code v-pre>methods</code>、<code v-pre>computed</code>、<code v-pre>watch</code>等）来定义组件的逻辑。</li>
<li>逻辑按功能分散在不同的配置项中。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Composition API</strong>:</p>
<ul>
<li>采用函数语法，通过<code v-pre>setup</code>函数来定义组件的逻辑。</li>
<li>逻辑按功能组织在一个函数内部，容易将相关逻辑组合在一起。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      count<span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_2-逻辑复用" tabindex="-1"><a class="header-anchor" href="#_2-逻辑复用"><span>2. <strong>逻辑复用</strong></span></a></h4>
<ul>
<li>
<p><strong>Options API</strong>:</p>
<ul>
<li>复用逻辑通常通过<code v-pre>mixins</code>来实现，然而<code v-pre>mixins</code>可能会导致命名冲突和难以追踪的代码。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> myMixin <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">mixinData</span><span class="token operator">:</span> <span class="token string">'some data'</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">mixins</span><span class="token operator">:</span> <span class="token punctuation">[</span>myMixin<span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">localData</span><span class="token operator">:</span> <span class="token string">'other data'</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Composition API</strong>:</p>
<ul>
<li>通过<code v-pre>composables</code>（自定义的组合函数）来实现逻辑复用，更加灵活且易于管理。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">useCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    count<span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> increment <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_3-代码组织" tabindex="-1"><a class="header-anchor" href="#_3-代码组织"><span>3. <strong>代码组织</strong></span></a></h4>
<ul>
<li>
<p><strong>Options API</strong>:</p>
<ul>
<li>代码是按功能区块分开，例如<code v-pre>data</code>、<code v-pre>methods</code>等，导致复杂组件的代码难以维护。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token comment">/* 状态 */</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* 计算属性 */</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* 方法 */</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* 监视器 */</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Composition API</strong>:</p>
<ul>
<li>代码按逻辑块组织，更加集中且易于维护，特别适合大型组件。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 状态、计算属性、方法、监视器等逻辑都集中在这里</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token comment">/* 公开给模板的属性和方法 */</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_4-类型支持" tabindex="-1"><a class="header-anchor" href="#_4-类型支持"><span>4. <strong>类型支持</strong></span></a></h4>
<ul>
<li>
<p><strong>Options API</strong>:</p>
<ul>
<li>对于类型推断和类型检查支持较为有限，虽然可以通过 TypeScript 加强，但仍有一定局限性。</li>
</ul>
</li>
<li>
<p><strong>Composition API</strong>:</p>
<ul>
<li>原生支持 TypeScript，函数式的代码结构使得类型推断和类型检查更加强大和灵活。</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> count <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_5-生命周期钩子" tabindex="-1"><a class="header-anchor" href="#_5-生命周期钩子"><span>5. <strong>生命周期钩子</strong></span></a></h4>
<ul>
<li>
<p><strong>Options API</strong>:</p>
<ul>
<li>生命周期钩子通过选项的方式定义，如<code v-pre>mounted</code>、<code v-pre>created</code>等。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'组件已挂载'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Composition API</strong>:</p>
<ul>
<li>通过 <code v-pre>setup</code> 函数内的<code v-pre>onMounted</code>等组合函数来定义生命周期钩子。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'组件已挂载'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_6-学习曲线" tabindex="-1"><a class="header-anchor" href="#_6-学习曲线"><span>6. <strong>学习曲线</strong></span></a></h4>
<ul>
<li>
<p><strong>Options API</strong>:</p>
<ul>
<li>对于初学者来说，上手较为简单，适合小型项目和快速开发。</li>
</ul>
</li>
<li>
<p><strong>Composition API</strong>:</p>
<ul>
<li>需要一定的JavaScript基础，学习曲线较高，但对于复杂项目更为灵活和高效。</li>
</ul>
</li>
</ul>
<h4 id="总结-4" tabindex="-1"><a class="header-anchor" href="#总结-4"><span>总结：</span></a></h4>
<ul>
<li><strong>Options API</strong>：适合简单、快速开发以及小型项目，逻辑分散在不同选项中，代码组织容易理解。</li>
<li><strong>Composition API</strong>：适合复杂的项目和逻辑复用，提供更强的灵活性、类型支持和逻辑组织能力，是Vue 3推荐的开发方式。</li>
</ul>
<h2 id="provide-inject" tabindex="-1"><a class="header-anchor" href="#provide-inject"><span>Provide/Inject</span></a></h2>
<blockquote>
<p>如何在Vue中使用Provide/Inject？它们的应用场景是什么？</p>
</blockquote>
<h4 id="_1-概念介绍" tabindex="-1"><a class="header-anchor" href="#_1-概念介绍"><span>1. <strong>概念介绍</strong></span></a></h4>
<ul>
<li>
<p><strong>Provide/Inject</strong> 是 Vue 提供的两种 API，用于祖先组件向后代组件传递数据或方法，而无需经过中间组件。这种方式有助于在组件树中不同层级的组件之间共享数据或方法。</p>
</li>
<li>
<p><code v-pre>provide</code> 在祖先组件中定义，用来提供数据或方法给后代组件。</p>
</li>
<li>
<p><code v-pre>inject</code> 在后代组件中使用，用来接收祖先组件提供的数据或方法。</p>
</li>
</ul>
<h4 id="_2-基本用法" tabindex="-1"><a class="header-anchor" href="#_2-基本用法"><span>2. <strong>基本用法</strong></span></a></h4>
<ul>
<li>
<p><strong>祖先组件使用 <code v-pre>provide</code> 提供数据或方法</strong>：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ChildComponent</span> <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token string">'dark'</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token function-variable function">toggleTheme</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      theme <span class="token operator">=</span> theme <span class="token operator">===</span> <span class="token string">'dark'</span> <span class="token operator">?</span> <span class="token string">'light'</span> <span class="token operator">:</span> <span class="token string">'dark'</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 使用 provide 提供数据和方法</span></span>
<span class="line">    <span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">,</span> theme<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">'toggleTheme'</span><span class="token punctuation">,</span> toggleTheme<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>后代组件使用 <code v-pre>inject</code> 接收数据或方法</strong>：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    当前主题: {{ theme }}</span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toggleTheme<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>切换主题<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 使用 inject 接收祖先组件提供的数据和方法</span></span>
<span class="line">    <span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> toggleTheme <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">'toggleTheme'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> theme<span class="token punctuation">,</span> toggleTheme <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_3-应用场景" tabindex="-1"><a class="header-anchor" href="#_3-应用场景"><span>3. <strong>应用场景</strong></span></a></h4>
<ul>
<li><strong>跨组件通信</strong>：在多层级组件树中，不通过 props 一层层传递，而是通过 <code v-pre>provide/inject</code> 在父组件和远层子组件之间共享数据。</li>
<li><strong>依赖注入</strong>：为组件提供服务或工具（如国际化、主题、验证服务等），这些服务在整个组件树中是单一实例，并且可以被多个组件访问。</li>
<li><strong>插件开发</strong>：在插件中使用 <code v-pre>provide</code> 将全局的功能或服务注入到组件中，使得它们能够在应用中的任意地方使用。</li>
</ul>
<h4 id="_4-注意事项" tabindex="-1"><a class="header-anchor" href="#_4-注意事项"><span>4. <strong>注意事项</strong></span></a></h4>
<ul>
<li><strong>适用场景限制</strong>：<code v-pre>provide/inject</code> 主要用于关系密切的组件间的数据共享，不适用于任意组件间的通信。对于后者，应使用 Vuex、Pinia 等全局状态管理工具。</li>
<li><strong>响应性</strong>：在 Vue 3 中，如果使用 <code v-pre>ref</code> 或 <code v-pre>reactive</code> 提供响应式数据，子组件通过 <code v-pre>inject</code> 接收到的数据同样具有响应性。</li>
<li><strong>层级限制</strong>：<code v-pre>provide</code> 只能向其后代组件提供数据，无法跨越组件树中的兄弟组件。</li>
</ul>
<h4 id="_5-vue-2-与-vue-3-的差异" tabindex="-1"><a class="header-anchor" href="#_5-vue-2-与-vue-3-的差异"><span>5. <strong>Vue 2 与 Vue 3 的差异</strong></span></a></h4>
<ul>
<li><strong>Vue 2</strong> 中的 <code v-pre>provide/inject</code> 需要在 <code v-pre>options API</code> 中使用：<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">provide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">'dark'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">toggleTheme</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toggleTheme</span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">toggleTheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 切换逻辑</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li><strong>Vue 3</strong> 中的 <code v-pre>provide/inject</code> 更倾向于在 <code v-pre>setup</code> 函数中使用，支持组合式 API，更加灵活。</li>
</ul>
<h4 id="总结-5" tabindex="-1"><a class="header-anchor" href="#总结-5"><span>总结：</span></a></h4>
<p><code v-pre>provide/inject</code> 提供了一种灵活的数据共享方式，适用于父组件与后代组件之间共享数据和方法的场景，尤其在跨越多层级组件时表现出色。它们简化了组件之间的通信，减少了 props 的传递和状态提升的复杂度。</p>
<h2 id="优化性能" tabindex="-1"><a class="header-anchor" href="#优化性能"><span>优化性能</span></a></h2>
<blockquote>
<p>在Vue项目中如何优化性能？有哪些常见的方法？</p>
</blockquote>
<h4 id="_1-按需加载-lazy-loading" tabindex="-1"><a class="header-anchor" href="#_1-按需加载-lazy-loading"><span>1. 按需加载 (Lazy Loading)</span></a></h4>
<p>按需加载通过动态导入组件或路由，避免一次性加载所有资源，从而减少初始加载时间。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 使用动态 import 实现按需加载</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">MyComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@/components/MyComponent.vue'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-使用-v-if-代替-v-show" tabindex="-1"><a class="header-anchor" href="#_2-使用-v-if-代替-v-show"><span>2. 使用 v-if 代替 v-show</span></a></h4>
<p>v-if 仅在条件为真时渲染组件，适用于在显示状态切换不频繁的情况下使用。v-show 会始终渲染组件，只是控制其显示或隐藏，适用于频繁切换显示状态的场景。</p>
<h4 id="_3-使用-v-once-提高静态内容渲染性能" tabindex="-1"><a class="header-anchor" href="#_3-使用-v-once-提高静态内容渲染性能"><span>3. 使用 v-once 提高静态内容渲染性能</span></a></h4>
<p>v-once 指令用于标记不变的静态内容，只渲染一次，避免不必要的重新渲染。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>span v<span class="token operator">-</span>once<span class="token operator">></span>这个内容只渲染一次<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_4-避免不必要的计算属性-computed-properties" tabindex="-1"><a class="header-anchor" href="#_4-避免不必要的计算属性-computed-properties"><span>4. 避免不必要的计算属性 (Computed Properties)</span></a></h4>
<p>计算属性应尽可能简单，避免复杂逻辑或与 DOM 交互，这样可以减少计算的频率和复杂度。</p>
<h4 id="_5-使用事件的懒加载或防抖-debounce-和节流-throttle" tabindex="-1"><a class="header-anchor" href="#_5-使用事件的懒加载或防抖-debounce-和节流-throttle"><span>5. 使用事件的懒加载或防抖 (Debounce) 和节流 (Throttle)</span></a></h4>
<p>对于高频触发的事件，如窗口滚动、输入框输入等，使用防抖或节流技术减少事件处理的次数。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// 防抖函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> timeout<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 节流函数</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> limit</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> lastFunc<span class="token punctuation">,</span> lastRan<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">,</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lastRan<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      lastRan <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>lastFunc<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      lastFunc <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> lastRan<span class="token punctuation">)</span> <span class="token operator">>=</span> limit<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">          lastRan <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span> limit <span class="token operator">-</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> lastRan<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-使用异步组件-async-components" tabindex="-1"><a class="header-anchor" href="#_6-使用异步组件-async-components"><span>6. 使用异步组件 (Async Components)</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'async-component'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./MyComponent.vue'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">loading</span><span class="token operator">:</span> LoadingComponent<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">error</span><span class="token operator">:</span> ErrorComponent<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">3000</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-优化图片加载" tabindex="-1"><a class="header-anchor" href="#_7-优化图片加载"><span>7. 优化图片加载</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>img v<span class="token operator">-</span>lazy<span class="token operator">=</span><span class="token string">"image.src"</span> alt<span class="token operator">=</span><span class="token string">"Lazy loaded image"</span><span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_8-使用生产环境构建" tabindex="-1"><a class="header-anchor" href="#_8-使用生产环境构建"><span>8. 使用生产环境构建</span></a></h4>
<p>在发布应用时，确保使用生产环境的构建，以启用 Vue 的压缩和优化功能。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># 生产环境构建命令</span></span>
<span class="line"><span class="token function">npm</span> run build <span class="token parameter variable">--mode</span> production</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-使用-vuex-的持久化插件-vuex-persisted-state" tabindex="-1"><a class="header-anchor" href="#_9-使用-vuex-的持久化插件-vuex-persisted-state"><span>9. 使用 Vuex 的持久化插件 (Vuex Persisted State)</span></a></h4>
<p>在状态管理中避免频繁请求或数据处理，利用 Vuex 持久化插件来减少资源消耗。</p>
<h5 id="_10-减少-vue-插件的使用" tabindex="-1"><a class="header-anchor" href="#_10-减少-vue-插件的使用"><span>10. 减少 Vue 插件的使用</span></a></h5>
<p>Vue 插件会增加应用的体积和复杂度，尽量避免使用不必要的插件，仅引入确实需要的功能插件。</p>
<h4 id="_11-使用-keep-alive-缓存组件状态" tabindex="-1"><a class="header-anchor" href="#_11-使用-keep-alive-缓存组件状态"><span>11. 使用 keep-alive 缓存组件状态</span></a></h4>
<p>对于频繁切换的组件，使用 keep-alive 以缓存组件状态，避免重复创建和销毁。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_12-优化-dom-结构" tabindex="-1"><a class="header-anchor" href="#_12-优化-dom-结构"><span>12. 优化 DOM 结构</span></a></h4>
<p>通过精简和优化 DOM 结构，减少 Vue 在虚拟 DOM 上的操作复杂度。</p>
<h4 id="_13-监控和分析性能瓶颈" tabindex="-1"><a class="header-anchor" href="#_13-监控和分析性能瓶颈"><span>13. 监控和分析性能瓶颈</span></a></h4>
<p>使用 Chrome DevTools、Vue Devtools 等工具进行性能分析，找到并优化性能瓶颈。</p>
<h2 id="hash模式和history模式" tabindex="-1"><a class="header-anchor" href="#hash模式和history模式"><span>hash模式和history模式</span></a></h2>
<blockquote>
<p>Vue Router中的hash模式和history模式有何区别？</p>
</blockquote>
<p>在 Vue Router 中，<code v-pre>hash</code> 模式和 <code v-pre>history</code> 模式是两种常见的路由模式，它们的主要区别如下：</p>
<h4 id="_1-路由机制" tabindex="-1"><a class="header-anchor" href="#_1-路由机制"><span>1. 路由机制</span></a></h4>
<ul>
<li>
<p><strong>Hash 模式</strong></p>
<ul>
<li>使用 URL 中的哈希 (<code v-pre>#</code>) 符号来管理路由状态。</li>
<li>当 URL 发生变化时，浏览器不会向服务器发送请求，而是通过监听 <code v-pre>hashchange</code> 事件来切换页面视图。</li>
<li>示例 URL: <code v-pre>http://example.com/#/home</code></li>
</ul>
</li>
<li>
<p><strong>History 模式</strong></p>
<ul>
<li>使用 HTML5 的 <code v-pre>History</code> API (<code v-pre>pushState</code> 和 <code v-pre>replaceState</code>) 来管理路由。</li>
<li>URL 中不会包含 <code v-pre>#</code> 符号，路径更直观和干净。</li>
<li>当 URL 变化时，浏览器会发出 HTTP 请求，因此需要服务器支持，将所有请求重定向到入口 HTML 文件。</li>
<li>示例 URL: <code v-pre>http://example.com/home</code></li>
</ul>
</li>
</ul>
<h4 id="_2-seo-友好性" tabindex="-1"><a class="header-anchor" href="#_2-seo-友好性"><span>2. SEO 友好性</span></a></h4>
<ul>
<li>
<p><strong>Hash 模式</strong></p>
<ul>
<li>URL 中的哈希部分不会被发送到服务器，因此对 SEO 不友好，搜索引擎无法索引哈希后的路径。</li>
</ul>
</li>
<li>
<p><strong>History 模式</strong></p>
<ul>
<li>URL 结构与普通网页相同，服务器可以接收到完整的路径，适合 SEO，搜索引擎能够索引页面内容。</li>
</ul>
</li>
</ul>
<h4 id="_3-配置与支持" tabindex="-1"><a class="header-anchor" href="#_3-配置与支持"><span>3. 配置与支持</span></a></h4>
<ul>
<li>
<p><strong>Hash 模式</strong></p>
<ul>
<li>不需要服务器配置，所有页面都可以正常访问，即使直接输入 URL。</li>
<li>兼容性强，支持所有现代浏览器及老版本浏览器。</li>
</ul>
</li>
<li>
<p><strong>History 模式</strong></p>
<ul>
<li>需要服务器端支持。当用户直接访问一个 URL 或刷新页面时，服务器需要配置路由，将所有非静态资源请求重定向到 <code v-pre>index.html</code>。</li>
<li>需要配置 <code v-pre>nginx</code> 或 <code v-pre>Apache</code> 等服务器进行 URL 重写。</li>
</ul>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># Nginx 示例配置</span></span>
<span class="line">location / <span class="token punctuation">{</span></span>
<span class="line"> try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-用户体验" tabindex="-1"><a class="header-anchor" href="#_4-用户体验"><span>4. 用户体验</span></a></h4>
<ul>
<li>
<p>Hash 模式</p>
<ul>
<li>URL 中的 # 符号对用户而言可能显得不够美观或专业。</li>
</ul>
</li>
<li>
<p>History 模式</p>
<ul>
<li>URL 更加美观、简洁，与传统网页路径一致，用户体验更佳。</li>
</ul>
</li>
</ul>
<h4 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h4>
<ul>
<li>Hash 模式 适合不需要考虑 SEO 和不愿意进行额外服务器配置的小型项目或简单应用。</li>
<li>History 模式 适合需要 SEO 友好性、且能在服务器端进行配置的大型应用或需要优质用户体验的项目。</li>
</ul>
<h2 id="动态加载组件" tabindex="-1"><a class="header-anchor" href="#动态加载组件"><span>动态加载组件</span></a></h2>
<blockquote>
<p>Vue中如何动态加载组件？请简述实现方式。</p>
</blockquote>
<p>在 Vue 中，动态加载组件可以通过以下几种方式实现：</p>
<h4 id="_1-异步组件" tabindex="-1"><a class="header-anchor" href="#_1-异步组件"><span>1. 异步组件</span></a></h4>
<p>使用 Vue 的异步组件功能可以在需要时动态加载组件，从而减少初始加载时间。可以使用 <code v-pre>import</code> 语法和 <code v-pre>defineAsyncComponent</code> 函数来实现异步组件。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line">// 使用 import 语法</span>
<span class="line">const AsyncComponent = () => import('./components/AsyncComponent.vue');</span>
<span class="line"></span>
<span class="line">// 在模板中使用</span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>AsyncComponent<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-动态组件" tabindex="-1"><a class="header-anchor" href="#_2-动态组件"><span>2. 动态组件</span></a></h4>
<p>使用 component 标签和 is 属性可以在模板中动态选择并渲染组件。可以将组件的名称或组件对象传递给 is 属性。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentComponent<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> ComponentA <span class="token keyword">from</span> <span class="token string">'./components/ComponentA.vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> ComponentB <span class="token keyword">from</span> <span class="token string">'./components/ComponentB.vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">currentComponent</span><span class="token operator">:</span> ComponentA<span class="token punctuation">,</span> <span class="token comment">// 初始组件</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">switchComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>currentComponent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentComponent <span class="token operator">===</span> ComponentA <span class="token operator">?</span> ComponentB <span class="token operator">:</span> ComponentA<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-使用-defineasynccomponent-函数" tabindex="-1"><a class="header-anchor" href="#_3-使用-defineasynccomponent-函数"><span>3. 使用 <code v-pre>defineAsyncComponent</code> 函数</span></a></h4>
<p>Vue 3 引入了 <code v-pre>defineAsyncComponent</code> 函数，使得异步组件的定义更加简洁。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineAsyncComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> AsyncComponent <span class="token operator">=</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./components/AsyncComponent.vue'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    AsyncComponent<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在模板中可以使用 AsyncComponent</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AsyncComponent</span> <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-v-if-条件渲染" tabindex="-1"><a class="header-anchor" href="#_4-v-if-条件渲染"><span>4. v-if 条件渲染</span></a></h4>
<p>可以结合 v-if 指令实现条件渲染不同的组件，以便在特定条件下动态加载组件</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>showComponentA = !showComponentA<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Toggle Component<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ComponentA</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>showComponentA<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ComponentB</span> <span class="token attr-name">v-else</span> <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> ComponentA <span class="token keyword">from</span> <span class="token string">'./components/ComponentA.vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> ComponentB <span class="token keyword">from</span> <span class="token string">'./components/ComponentB.vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    ComponentA<span class="token punctuation">,</span></span>
<span class="line">    ComponentB<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">showComponentA</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="处理表单验证" tabindex="-1"><a class="header-anchor" href="#处理表单验证"><span>处理表单验证</span></a></h2>
<blockquote>
<p>Vue中如何处理表单验证？有哪些常用的验证方式？</p>
</blockquote>
<h4 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h4>
<p>手动验证是指在提交表单时，手动编写验证逻辑，常用于简单表单场景。</p>
<h4 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码"><span>示例代码</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleSubmit<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Name:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>errors.name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ errors.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Email:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>errors.email<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ errors.email }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">errors</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">validateForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>errors <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>errors<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Name is required'</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>email<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>errors<span class="token punctuation">.</span>email <span class="token operator">=</span> <span class="token string">'Email is required'</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\S+@\S+\.\S+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>email<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>errors<span class="token punctuation">.</span>email <span class="token operator">=</span> <span class="token string">'Email is invalid'</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errors<span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">handleSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">validateForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 表单提交逻辑</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ref-和-reactive-的区别" tabindex="-1"><a class="header-anchor" href="#ref-和-reactive-的区别"><span><code v-pre>ref</code> 和 <code v-pre>reactive</code> 的区别</span></a></h2>
<blockquote>
<p>Vue3中的ref和reactive有什么区别？</p>
</blockquote>
<p>在 Vue 3 中，<code v-pre>ref</code> 和 <code v-pre>reactive</code> 是两种常用的 API，用于创建响应式的数据。但是它们有一些重要的区别和适用场景。</p>
<h4 id="_1-定义与用法" tabindex="-1"><a class="header-anchor" href="#_1-定义与用法"><span>1. 定义与用法</span></a></h4>
<ul>
<li><strong><code v-pre>ref</code></strong>：<code v-pre>ref</code> 用于创建一个响应式的数据包裹对象。它可以包裹任何类型的值（基本类型或引用类型），并使其具有响应性。<code v-pre>ref</code> 返回的对象包含一个 <code v-pre>.value</code> 属性，用于访问或修改其包裹的值。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span></span>
<span class="line">count<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>reactive</code></strong>：reactive 用于将一个对象转换为响应式对象。它只能应用于对象类型（包括数组），并且返回的对象本身是响应式的，没有 .value 属性。你可以直接访问和修改响应式对象的属性。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'Hello'</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span></span>
<span class="line">state<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-使用场景-1" tabindex="-1"><a class="header-anchor" href="#_2-使用场景-1"><span>2. 使用场景</span></a></h4>
<ul>
<li><strong><code v-pre>ref</code> 适用于基本类型</strong>：如果你需要创建一个包含基本类型（如数字、字符串、布尔值等）的响应式数据，ref 是首选。它也可以包裹对象或数组，但这种情况下 .value 的使用可能稍显繁琐。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">'Vue'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>reactive</code> 适用于对象和数组</strong>：当你需要创建一个包含多个属性的响应式对象或数组时，reactive 是更好的选择。它使得对对象或数组的操作更为自然，不需要频繁访问 .value。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alice'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-深度响应性" tabindex="-1"><a class="header-anchor" href="#_3-深度响应性"><span>3. 深度响应性</span></a></h4>
<ul>
<li><code v-pre>ref</code>：对于基本类型的值，ref 不涉及深度响应性的问题。但是，当 ref 包裹对象时，对象内部的属性不会自动变成响应式，需要借助 reactive 或者手动对嵌套的对象使用 ref。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> nested <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">inner</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">nested<span class="token punctuation">.</span>value<span class="token punctuation">.</span>inner<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 响应性未触发</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>reactive</code>：reactive 会递归地将对象内部的所有嵌套对象转换为响应式，因此对嵌套对象的修改同样会触发响应性更新。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> nested <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">inner</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">nested<span class="token punctuation">.</span>inner<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 响应性触发</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-模板中使用" tabindex="-1"><a class="header-anchor" href="#_4-模板中使用"><span>4. 模板中使用</span></a></h4>
<ul>
<li><code v-pre>ref</code>：在模板中使用 ref 的时候，可以直接使用 .value 访问其值，但 Vue 3 中模板会自动解包 ref，因此可以直接使用而无需 .value。</li>
</ul>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> count <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>reactive</code>：reactive 创建的对象可以直接在模板中使用，与普通对象的使用方式一致。</li>
</ul>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ state.count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span> state <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-ref-和-reactive-的结合使用" tabindex="-1"><a class="header-anchor" href="#_5-ref-和-reactive-的结合使用"><span>5.  ref 和 reactive 的结合使用</span></a></h4>
<p>在某些复杂场景中，你可以结合 ref 和 reactive 使用。例如，使用 ref 来管理整个对象的响应性，并使用 reactive 创建其内部的对象：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alice'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结-6" tabindex="-1"><a class="header-anchor" href="#总结-6"><span>总结</span></a></h4>
<ul>
<li><code v-pre>ref</code> 适用于包裹基本类型或单一变量，尤其在需要频繁引用 <code v-pre>.value</code> 的场景中。</li>
<li><code v-pre>reactive</code> 适用于需要处理复杂对象或数组，并且希望所有嵌套对象都具有响应性的场景。</li>
</ul>
<p>选择使用 <code v-pre>ref</code> 还是 <code v-pre>reactive</code> 取决于你的数据结构和使用需求。在实际开发中，这两者可以相互配合使用，以达到最佳的开发体验和性能。</p>
<h2 id="全局的错误处理" tabindex="-1"><a class="header-anchor" href="#全局的错误处理"><span>全局的错误处理</span></a></h2>
<blockquote>
<p>Vue中如何实现全局的错误处理？</p>
</blockquote>
<p>在 Vue 应用中，处理错误是确保应用稳定性的重要部分。Vue 提供了多种机制来捕获和处理全局错误，从而防止未处理的错误导致用户体验不佳。以下是几种实现全局错误处理的方法。</p>
<h4 id="_1-使用-errorhandler-捕获全局错误" tabindex="-1"><a class="header-anchor" href="#_1-使用-errorhandler-捕获全局错误"><span>1. 使用 <code v-pre>errorHandler</code> 捕获全局错误</span></a></h4>
<p>Vue 提供了一个全局的 <code v-pre>errorHandler</code> 选项，可以用于捕获组件渲染过程中的错误。你可以在 Vue 根实例中配置 <code v-pre>errorHandler</code>。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">app<span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function-variable function">errorHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'Vue 捕获到错误:'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'发生错误的组件实例:'</span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'错误信息:'</span><span class="token punctuation">,</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 在这里可以进行错误上报、日志记录等操作</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>err</code>：捕获到的错误对象。</li>
<li><code v-pre>vm</code>：发生错误的 Vue 实例。</li>
<li><code v-pre>info</code>：Vue 特定的错误信息，如生命周期钩子名称。</li>
</ul>
<h4 id="_2-使用-onerrorcaptured-处理组件错误" tabindex="-1"><a class="header-anchor" href="#_2-使用-onerrorcaptured-处理组件错误"><span>2. 使用 <code v-pre>onErrorCaptured</code> 处理组件错误</span></a></h4>
<p>Vue 3 中的 onErrorCaptured 是一个组合式 API，可以在组件中捕获子组件的错误。与 errorHandler 不同，它是在组件层级捕获错误的。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> onErrorCaptured <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">onErrorCaptured</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'捕获到子组件的错误:'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 返回 false 可阻止错误继续向上传播</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>err</code>：捕获到的错误对象。</li>
<li><code v-pre>instance</code>：发生错误的组件实例。</li>
<li><code v-pre>info</code>：Vue 特定的错误信息。</li>
</ul>
<h4 id="_3-使用-try-catch-在异步代码中捕获错误" tabindex="-1"><a class="header-anchor" href="#_3-使用-try-catch-在异步代码中捕获错误"><span>3. 使用 <code v-pre>try-catch</code> 在异步代码中捕获错误</span></a></h4>
<p>对于异步操作中的错误，try-catch 语句是必不可少的。你可以在异步函数中手动捕获错误，并在捕获后执行相应的逻辑。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">async</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token comment">// 处理数据</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'异步操作中捕获到错误:'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token comment">// 可以在这里显示用户友好的错误提示</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-全局监听未捕获的-promise-错误" tabindex="-1"><a class="header-anchor" href="#_4-全局监听未捕获的-promise-错误"><span>4. 全局监听未捕获的 Promise 错误</span></a></h4>
<p>在 JavaScript 中，未捕获的 Promise 错误不会自动冒泡到 Vue 的 errorHandler。你可以使用 <code v-pre>window.addEventListener</code> 来监听这些错误，并进行全局处理。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'unhandledrejection'</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'未捕获的 Promise 错误:'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 你可以在这里执行错误日志记录或显示提示</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-配合第三方库进行错误监控" tabindex="-1"><a class="header-anchor" href="#_5-配合第三方库进行错误监控"><span>5. 配合第三方库进行错误监控</span></a></h4>
<p>你可以将 Vue 的全局错误处理与第三方错误监控服务（如 Sentry）结合使用，以便在应用中自动报告错误。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Sentry <span class="token keyword">from</span> <span class="token string">'@sentry/vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> Integrations <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@sentry/tracing'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">Sentry<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  app<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">dsn</span><span class="token operator">:</span> <span class="token string">'YOUR_SENTRY_DSN'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">integrations</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token keyword">new</span> <span class="token class-name">Integrations<span class="token punctuation">.</span>BrowserTracing</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">tracingOrigins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'localhost'</span><span class="token punctuation">,</span> <span class="token string">'your-domain.com'</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">tracesSampleRate</span><span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-处理错误边界" tabindex="-1"><a class="header-anchor" href="#_6-处理错误边界"><span>6. 处理错误边界</span></a></h4>
<p>在大型应用中，你可能希望为某些特定组件提供错误边界。你可以创建一个通用的错误边界组件来捕获子组件的渲染错误。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ErrorBoundary'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span> slots <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> error <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> <span class="token function-variable function">onErrorCaptured</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      error<span class="token punctuation">.</span>value <span class="token operator">=</span> err<span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">></span>Something went wrong<span class="token operator">:</span> <span class="token punctuation">{</span>error<span class="token punctuation">.</span>value<span class="token punctuation">.</span>message<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">return</span> slots<span class="token punctuation">.</span>default <span class="token operator">?</span> slots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用时，可以将该组件包裹在可能会出错的组件外层：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ErrorBoundary</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ChildComponent</span> <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ErrorBoundary</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> ErrorBoundary <span class="token keyword">from</span> <span class="token string">'./ErrorBoundary.vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> ChildComponent <span class="token keyword">from</span> <span class="token string">'./ChildComponent.vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    ErrorBoundary<span class="token punctuation">,</span></span>
<span class="line">    ChildComponent</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结-7" tabindex="-1"><a class="header-anchor" href="#总结-7"><span>总结</span></a></h4>
<ul>
<li>使用 <code v-pre>errorHandler</code> 处理 <code v-pre>Vue</code> 渲染过程中的全局错误。</li>
<li>在组件中使用 <code v-pre>onErrorCaptured</code> 捕获子组件的错误。</li>
<li>使用 <code v-pre>try-catch</code> 捕获异步操作中的错误。</li>
<li>监听 <code v-pre>unhandledrejection</code> 事件处理未捕获的 <code v-pre>Promise</code> 错误。</li>
<li>结合第三方库如 <code v-pre>Sentry</code> 进行错误监控。</li>
<li>创建错误边界组件处理特定区域的错误。</li>
</ul>
<h2 id="nexttick" tabindex="-1"><a class="header-anchor" href="#nexttick"><span>nextTick</span></a></h2>
<blockquote>
<p>如何在Vue中使用nextTick？它的作用是什么？</p>
</blockquote>
<h4 id="什么是nexttick" tabindex="-1"><a class="header-anchor" href="#什么是nexttick"><span>什么是<code v-pre>nextTick</code>？</span></a></h4>
<p><code v-pre>nextTick</code> 是Vue提供的一个方法，用于在下一个DOM更新循环结束之后执行指定的回调函数。Vue在更新DOM时是异步的，当数据发生变化时，Vue不会立即同步更新DOM，而是开启一个异步队列来批量更新。在某些情况下，你可能希望在数据更新并且DOM已经完成重新渲染后执行某些操作，这时就可以使用 <code v-pre>nextTick</code>。</p>
<h4 id="作用-1" tabindex="-1"><a class="header-anchor" href="#作用-1"><span>作用</span></a></h4>
<p><code v-pre>nextTick</code> 的主要作用是确保在更新数据并触发DOM变化之后，等待Vue完成DOM更新，然后再执行某些逻辑。常见的应用场景包括：</p>
<ul>
<li>获取更新后的DOM元素信息。</li>
<li>在DOM更新后执行某些操作（如动画、计算宽高等）。</li>
<li>确保在Vue组件更新完毕后再执行依赖于最新DOM状态的代码。</li>
</ul>
<h4 id="用法" tabindex="-1"><a class="header-anchor" href="#用法"><span>用法</span></a></h4>
<p><code v-pre>nextTick</code> 可以通过两种方式使用：回调函数形式和Promise形式。</p>
<h4 id="回调函数形式" tabindex="-1"><a class="header-anchor" href="#回调函数形式"><span>回调函数形式</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// DOM更新完成后执行的代码</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DOM has been updated'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="promise形式" tabindex="-1"><a class="header-anchor" href="#promise形式"><span>Promise形式</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// DOM更新完成后执行的代码</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DOM has been updated'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h4>
<p>假设我们有一个计数器，当计数增加时，我们希望获取最新的按钮宽度：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>increment<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Button width:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>btn<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，当 <code v-pre>increment</code> 方法被调用时，<code v-pre>count</code> 会增加，同时 <code v-pre>nextTick</code> 确保在DOM更新完成后，我们能够正确获取按钮的最新宽度。</p>
<h4 id="总结-8" tabindex="-1"><a class="header-anchor" href="#总结-8"><span>总结</span></a></h4>
<p>nextTick 是Vue中一个非常实用的工具，用于确保在DOM更新完成后执行某些操作。它在处理需要与最新DOM状态交互的场景中尤为重要，保证了代码执行顺序的正确性。</p>
<h2 id="teleport组件" tabindex="-1"><a class="header-anchor" href="#teleport组件"><span>Teleport组件</span></a></h2>
<blockquote>
<p>Vue3中的Teleport组件有什么作用？如何使用？</p>
</blockquote>
<h4 id="teleport-组件的作用" tabindex="-1"><a class="header-anchor" href="#teleport-组件的作用"><span>Teleport 组件的作用</span></a></h4>
<p>Teleport 是 Vue 3 引入的一个新组件，允许你将组件的渲染内容移动到指定的 DOM 节点之外。这在处理模态框、对话框、通知等全局 UI 元素时非常有用。通常，这些元素需要被渲染在与组件本身不同的 DOM 层级中，以避免样式或功能问题。</p>
<h4 id="teleport-组件的使用方法" tabindex="-1"><a class="header-anchor" href="#teleport-组件的使用方法"><span>Teleport 组件的使用方法</span></a></h4>
<p>基本用法
你可以使用 Teleport 组件将其包裹的内容传送到指定的 DOM 位置。使用时，需要通过 to 属性指定目标容器的选择器。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>showModal = true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Show Modal<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Teleport</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>showModal<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>modal-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>showModal = false<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>close<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token entity named-entity" title="&times;">&amp;times;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span></span>
<span class="line">          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This is a modal dialog.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Teleport</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">showModal</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="to-属性" tabindex="-1"><a class="header-anchor" href="#to-属性"><span>to 属性</span></a></h4>
<ul>
<li><strong>必填</strong>: to</li>
<li><strong>描述</strong>: to 属性用于指定目标容器的选择器。它可以是一个 CSS 选择器字符串或者一个返回 HTML 元素的函数。</li>
</ul>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Teleport</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#some-element<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token comment">&lt;!-- 将内容传送到 id 为 some-element 的元素中 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Teleport</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他常用场景" tabindex="-1"><a class="header-anchor" href="#其他常用场景"><span>其他常用场景</span></a></h4>
<ul>
<li>全局模态框: 可以将模态框渲染到 body 以避免被父组件样式影响。</li>
<li>全局通知: 将通知组件移至 body 以便在页面的任何地方都能正确显示。</li>
</ul>
<h4 id="总结-9" tabindex="-1"><a class="header-anchor" href="#总结-9"><span>总结</span></a></h4>
<p><code v-pre>Teleport</code> 组件为 Vue 3 提供了一种方便的方式来管理全局 UI 元素的位置，让你能够将内容渲染到 Vue 组件树外部的任意 DOM 节点。这在需要跨越组件层次结构时尤为实用。</p>
<h2 id="scoped-css" tabindex="-1"><a class="header-anchor" href="#scoped-css"><span>Scoped CSS</span></a></h2>
<blockquote>
<p>Vue中如何使用Scoped CSS？它的作用是什么？</p>
</blockquote>
<h4 id="_1-什么是-scoped-css" tabindex="-1"><a class="header-anchor" href="#_1-什么是-scoped-css"><span>1. 什么是 Scoped CSS?</span></a></h4>
<p>Scoped CSS 是 Vue.js 提供的一种样式作用域机制，用于确保组件的样式只影响该组件本身，而不会影响全局或其他组件的样式。这有助于避免样式冲突和意外的样式覆盖。</p>
<h4 id="_2-如何在-vue-中使用-scoped-css" tabindex="-1"><a class="header-anchor" href="#_2-如何在-vue-中使用-scoped-css"><span>2. 如何在 Vue 中使用 Scoped CSS</span></a></h4>
<p>在 Vue 组件中，使用 <code v-pre>scoped</code> 属性可以将 <code v-pre>&lt;style&gt;</code> 标签内的样式限制在当前组件范围内。以下是使用 Scoped CSS 的步骤：</p>
<h4 id="_2-1-基本用法" tabindex="-1"><a class="header-anchor" href="#_2-1-基本用法"><span>2.1 基本用法</span></a></h4>
<p>在 Vue 单文件组件（<code v-pre>.vue</code> 文件）中，添加 <code v-pre>scoped</code> 属性到 <code v-pre>&lt;style&gt;</code> 标签：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    这是一段示例文本。</span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"ExampleComponent"</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css"></span>
<span class="line"><span class="token selector">.example</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，.example 这个类的样式只会应用到 ExampleComponent 组件内部的元素，而不会影响其他组件。</p>
<h4 id="_2-2-多个-style-标签" tabindex="-1"><a class="header-anchor" href="#_2-2-多个-style-标签"><span>2.2 多个 style 标签</span></a></h4>
<p>你可以在同一个组件中使用多个 style 标签，并且其中的一个或多个可以带有 scoped 属性：</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css"></span>
<span class="line"><span class="token comment">/* 仅限当前组件 */</span></span>
<span class="line"><span class="token selector">.example</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css"></span>
<span class="line"><span class="token comment">/* 全局样式 */</span></span>
<span class="line"><span class="token selector">body</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">font-family</span><span class="token punctuation">:</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式可以混合使用全局样式和局部样式。</p>
<h4 id="_3-scoped-css-的实现原理" tabindex="-1"><a class="header-anchor" href="#_3-scoped-css-的实现原理"><span>3. Scoped CSS 的实现原理</span></a></h4>
<p>Vue 通过在组件的根元素和 Scoped CSS 中的每一个选择器上添加一个独特的属性（例如 data-v-xxxxxxx）来实现样式的作用域隔离。这样可以确保样式只会影响当前组件的元素。</p>
<p>例如，上述 .example 类可能会被编译为：</p>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre><code><span class="line"><span class="token selector">.example[data-v-xxxxxxx]</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，组件的根元素会被编译为：</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example<span class="token punctuation">"</span></span> <span class="token attr-name">data-v-xxxxxxx</span><span class="token punctuation">></span></span></span>
<span class="line">  这是一段示例文本。</span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，即使其他组件中也存在 .example 类，由于没有相同的 data-v-xxxxxxx 属性，它们的样式不会互相影响。</p>
<h4 id="_4-注意事项-1" tabindex="-1"><a class="header-anchor" href="#_4-注意事项-1"><span>4. 注意事项</span></a></h4>
<ul>
<li><strong>动态生成的内容</strong>：如果你通过 JavaScript 动态添加或修改了元素，需要确保这些元素也包含正确的 data-v-xxxxxxx 属性。</li>
<li><strong>子组件</strong>：Scoped CSS 只会作用于当前组件的模板内，不会影响子组件的内容。如果希望对子组件应用样式，仍需使用全局样式或通过子组件的 props 传递样式。</li>
</ul>
<h4 id="_5-什么时候使用-scoped-css" tabindex="-1"><a class="header-anchor" href="#_5-什么时候使用-scoped-css"><span>5. 什么时候使用 Scoped CSS?</span></a></h4>
<p>Scoped CSS 非常适合在组件化开发中使用，因为它有助于保持样式的封装性，防止不同组件之间的样式冲突。特别是在大型项目中，使用 Scoped CSS 可以显著提高代码的可维护性。</p>
<h2 id="递归调用" tabindex="-1"><a class="header-anchor" href="#递归调用"><span>递归调用</span></a></h2>
<blockquote>
<p>Vue中如何实现组件的递归调用？需要注意哪些问题？</p>
</blockquote>
<p>递归调用是一种在组件内部再次调用自身的技术，通常用于构建树形结构或嵌套结构。在 Vue 中，实现递归调用需要考虑以下几个步骤和注意事项。</p>
<h4 id="_1-定义递归组件" tabindex="-1"><a class="header-anchor" href="#_1-定义递归组件"><span>1. 定义递归组件</span></a></h4>
<p>首先，你需要定义一个 Vue 组件，它可以在自身的模板中引用自己。为了防止组件在模板中未被识别，你需要使用 name 属性为组件命名，并通过 components 选项将自己注册到自身中。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ node.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>node.children &amp;&amp; node.children.length<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child in node.children<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child.id<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token comment">&lt;!-- 递归调用 --></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RecursiveComponent</span> <span class="token attr-name">:node</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'RecursiveComponent'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function-variable function">RecursiveComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./RecursiveComponent.vue'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，RecursiveComponent 组件会递归调用自身，直到 node.children 为空或未定义为止。</p>
<h4 id="_2-使用递归组件" tabindex="-1"><a class="header-anchor" href="#_2-使用递归组件"><span>2. 使用递归组件</span></a></h4>
<p>你可以在其他组件或主应用中使用这个递归组件，并传入一个具有层级结构的节点对象作为数据源。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RecursiveComponent</span> <span class="token attr-name">:node</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>treeData<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> RecursiveComponent <span class="token keyword">from</span> <span class="token string">'./RecursiveComponent.vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    RecursiveComponent<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">treeData</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Root'</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Child 1'</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">              <span class="token punctuation">{</span></span>
<span class="line">                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Grandchild 1'</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span></span>
<span class="line">              <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Child 2'</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-注意事项" tabindex="-1"><a class="header-anchor" href="#_3-注意事项"><span>3. 注意事项</span></a></h4>
<ul>
<li><strong>避免无限递归</strong>: 需要确保组件递归的终止条件明确，比如判断 node.children 是否为空。当条件不明确或处理不当时，可能导致无限递归，从而引发栈溢出错误。</li>
<li><strong>性能问题</strong>: 递归组件在复杂数据结构上可能导致性能问题，尤其是在节点层级过深时。可以考虑通过懒加载子节点的方式来优化性能。</li>
<li><strong>样式和布局</strong>: 递归结构往往会导致嵌套的 DOM 结构，在设计样式时需要特别注意避免过度嵌套造成的布局问题。</li>
<li><strong>递归组件命名</strong>: 确保递归组件的名称唯一且不与其他组件冲突，这样可以避免组件注册时出现问题。</li>
</ul>
<h2 id="监听路由的变化" tabindex="-1"><a class="header-anchor" href="#监听路由的变化"><span>监听路由的变化</span></a></h2>
<blockquote>
<p>Vue中如何监听路由的变化？有哪些方法？</p>
</blockquote>
<p>在 Vue.js 中，监听路由变化是一项常见的需求，尤其是在构建单页面应用（SPA）时。Vue 提供了多种方式来监听路由变化，以下是几种常用的方法：</p>
<h4 id="_1-使用-watch-监听-route-对象" tabindex="-1"><a class="header-anchor" href="#_1-使用-watch-监听-route-对象"><span>1. 使用 <code v-pre>watch</code> 监听 <code v-pre>$route</code> 对象</span></a></h4>
<p>在 Vue 组件中，可以通过 <code v-pre>watch</code> 监听 <code v-pre>$route</code> 对象的变化，从而在路由发生变化时执行相应的逻辑。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ currentPath }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">currentPath</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>path<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">$route</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 监听路由变化</span></span>
<span class="line">      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'路由从'</span><span class="token punctuation">,</span> from<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span> <span class="token string">'变化到'</span><span class="token punctuation">,</span> to<span class="token punctuation">.</span>fullPath<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>currentPath <span class="token operator">=</span> to<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-使用-beforerouteupdate-导航守卫" tabindex="-1"><a class="header-anchor" href="#_2-使用-beforerouteupdate-导航守卫"><span>2. 使用 beforeRouteUpdate 导航守卫</span></a></h4>
<p>在使用 Vue Router 时，可以在组件中使用 beforeRouteUpdate 守卫来监听当前路由变化。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ currentPath }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">currentPath</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>path<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">beforeRouteUpdate</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 监听路由变化</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'路由从'</span><span class="token punctuation">,</span> from<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span> <span class="token string">'变化到'</span><span class="token punctuation">,</span> to<span class="token punctuation">.</span>fullPath<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>currentPath <span class="token operator">=</span> to<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-使用全局导航守卫-router-beforeeach" tabindex="-1"><a class="header-anchor" href="#_3-使用全局导航守卫-router-beforeeach"><span>3. 使用全局导航守卫 <code v-pre>router.beforeEach</code></span></a></h4>
<p>除了在组件内部监听路由变化外，还可以使用 Vue Router 的全局导航守卫 router.beforeEach 来监听路由变化。这种方法适用于全局的路由监听需求。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">'vue-router'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 路由配置</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'路由从'</span><span class="token punctuation">,</span> from<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span> <span class="token string">'变化到'</span><span class="token punctuation">,</span> to<span class="token punctuation">.</span>fullPath<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> router<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-使用-router-aftereach-全局后置钩子" tabindex="-1"><a class="header-anchor" href="#_4-使用-router-aftereach-全局后置钩子"><span>4. 使用 router.afterEach 全局后置钩子</span></a></h4>
<p>除了 <code v-pre>beforeEach</code> 外，还可以使用 <code v-pre>router.afterEach</code> 来监听路由变化。与 <code v-pre>beforeEach</code> 不同的是，<code v-pre>afterEach</code> 不需要调用 <code v-pre>next</code>，并且是在导航确认之后调用。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line">router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'路由已从'</span><span class="token punctuation">,</span> from<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span> <span class="token string">'变化到'</span><span class="token punctuation">,</span> to<span class="token punctuation">.</span>fullPath<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="setup函数的作用" tabindex="-1"><a class="header-anchor" href="#setup函数的作用"><span>setup函数的作用</span></a></h2>
<blockquote>
<p>Vue3中的setup函数有什么作用？如何使用？</p>
</blockquote>
<h4 id="_1-setup-函数的作用" tabindex="-1"><a class="header-anchor" href="#_1-setup-函数的作用"><span>1. setup 函数的作用</span></a></h4>
<p>setup 是 Vue 3 组合式 API 的入口函数，是组件中用于初始化逻辑的一个函数。它在组件实例被创建之前调用，适用于以下场景：</p>
<ul>
<li><strong>数据定义</strong>：可以使用 ref 或 reactive 创建响应式的数据。</li>
<li><strong>计算属性</strong>：通过 computed 定义计算属性。</li>
<li><strong>侦听器</strong>：通过 watch 或 watchEffect 监听数据的变化。</li>
<li><strong>生命周期钩子</strong>：可以通过 onMounted、onUnmounted 等钩子函数处理组件的生命周期。</li>
<li><strong>引入外部资源</strong>：可以在 setup 函数中使用各种 Vue 的 API，或引入其他工具库。</li>
</ul>
<h4 id="_2-setup-函数的使用方法" tabindex="-1"><a class="header-anchor" href="#_2-setup-函数的使用方法"><span>2. setup 函数的使用方法</span></a></h4>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{ count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>increment<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Increment<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 1. 定义响应式数据</span></span>
<span class="line"><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 2. 定义计算属性</span></span>
<span class="line"><span class="token keyword">const</span> doubleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> count<span class="token punctuation">.</span>value <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 3. 定义方法</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  count<span class="token punctuation">.</span>value<span class="token operator">++</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 4. 生命周期钩子</span></span>
<span class="line"><span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'组件已挂载'</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-注意事项-1" tabindex="-1"><a class="header-anchor" href="#_3-注意事项-1"><span>3. 注意事项</span></a></h4>
<ul>
<li><strong>返回值</strong>：setup 函数不需要显式返回值，所有在 setup 中声明的变量、方法等会自动暴露给模板使用。</li>
<li><strong>this 访问限制</strong>：在 setup 中无法使用 this 访问组件实例，因为组件实例尚未创建。需要通过参数或其他方式获取数据。</li>
<li><strong>性能优势</strong>：setup 函数的运行顺序较早，能够提升组件的初始化性能，并且其作用范围仅限于函数内部，避免了 data、methods 等选项带来的命名冲突。</li>
</ul>
<h4 id="_4-组合式-api-与-options-api-的对比" tabindex="-1"><a class="header-anchor" href="#_4-组合式-api-与-options-api-的对比"><span>4. 组合式 API 与 Options API 的对比</span></a></h4>
<table>
<thead>
<tr>
<th>特性</th>
<th>组合式 API (<code v-pre>setup</code>)</th>
<th>选项式 API (<code v-pre>data</code>, <code v-pre>methods</code> 等)</th>
</tr>
</thead>
<tbody>
<tr>
<td>数据组织</td>
<td>逻辑集中管理，可重用</td>
<td>分散在 <code v-pre>data</code>、<code v-pre>methods</code> 等内</td>
</tr>
<tr>
<td>代码复用</td>
<td>更加灵活，通过函数实现复用</td>
<td>通过 <code v-pre>mixins</code> 或 <code v-pre>extends</code> 实现</td>
</tr>
<tr>
<td>性能优化</td>
<td>初始化时更高效，组件实例化前运行</td>
<td>在组件实例创建后运行</td>
</tr>
<tr>
<td>迁移成本</td>
<td>对 Vue 2 用户可能有学习曲线</td>
<td>更贴近传统的 Vue 2 开发模式</td>
</tr>
</tbody>
</table>
</div></template>



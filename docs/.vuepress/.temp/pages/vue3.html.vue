<template><div><h2 id="vue3新特性" tabindex="-1"><a class="header-anchor" href="#vue3新特性"><span>vue3新特性</span></a></h2>
<ol>
<li>性能
双向响应原理由<code v-pre>Object.defineProperty</code>改为基于ES6的<code v-pre>Proxy</code> [ˈprɒksi]，使其速度更快；
<ul>
<li>重写了 <code v-pre>Vdom</code></li>
<li>进行了模板编译的优化</li>
<li>进行了更加高效的组件初始化</li>
</ul>
</li>
<li><code v-pre>Tree-Shaking</code> 的支持
使 <code v-pre>Vue3</code> 的体积更小。<br>
需要的模块才会打入到包里，优化后的 <code v-pre>Vue3.0</code> 的打包体积只有原来的一半（13kb）。哪怕把所有的功能都引入进来也只有23kb，依然比 <code v-pre>Vue2.x</code> 更小。像 <code v-pre>keep-alive</code> 、 <code v-pre>transition</code> 甚至 <code v-pre>v-for</code> 等功能都可以按需引入。</li>
<li><code v-pre>Composition [ˌkɒmpəˈzɪʃn] API</code>
<code v-pre>composition-api</code> 是一个 Vue3 中新增的功能，它的灵感来自于 <code v-pre>React Hooks</code> ，是比 <code v-pre>mixin</code> 更强大的存在。
<code v-pre>composition-api</code> 可以提高代码逻辑的可复用性，从而实现与模板的无关性；同时使代码的可压缩性更强。另外，把 <code v-pre>Reactivity</code> 模块独立开来，意味着 <code v-pre>Vue3.0</code> 的响应式模块可以与其他框架相组合。
<code v-pre>composition-api</code> 把复杂组件的逻辑抽地更紧凑，而且可以将公共逻辑进行抽取。</li>
<li><code v-pre>Fragments</code>
不再限制 <code v-pre>template</code> 只有一个根节点。
<code v-pre>render</code>函数也可以返回数组了，有点像 <code v-pre>React.Fragments</code></li>
<li><code v-pre>Better TypeScript Support</code>
更好的类型推导，使得 <code v-pre>Vue3</code> 把 <code v-pre>TypeScript</code> 支持得非常好</li>
<li><code v-pre>Custom Renderer API</code>
实现用DOM的方式进行 <code v-pre>WebGL</code> 编程</li>
</ol>
</div></template>



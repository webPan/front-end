<template><div><h1 id="算法类" tabindex="-1"><a class="header-anchor" href="#算法类"><span>算法类</span></a></h1>
<p><a href="https://www.cnblogs.com/onepixel/articles/7674659.html" target="_blank" rel="noopener noreferrer">参考</a></p>
<h2 id="a-n-怎么用小于-o-n-的算法实现" tabindex="-1"><a class="header-anchor" href="#a-n-怎么用小于-o-n-的算法实现"><span>a^n 怎么用小于 O(n) 的算法实现</span></a></h2>
<h2 id="快排的原理" tabindex="-1"><a class="header-anchor" href="#快排的原理"><span>快排的原理</span></a></h2>
<p>快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
<img src="@source/assets/images/quick-sort.gif" alt="快排的原理"></p>
<h2 id="数组去重" tabindex="-1"><a class="header-anchor" href="#数组去重"><span>数组去重</span></a></h2>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="写一个函数判断是否存在循环引用" tabindex="-1"><a class="header-anchor" href="#写一个函数判断是否存在循环引用"><span>写一个函数判断是否存在循环引用</span></a></h2>
<h2 id="排序算法-时间复杂度" tabindex="-1"><a class="header-anchor" href="#排序算法-时间复杂度"><span>排序算法，时间复杂度</span></a></h2>
<p><img src="@source/assets/images/sort-time.png" alt="排序算法，时间复杂度"></p>
<h2 id="平衡二叉树" tabindex="-1"><a class="header-anchor" href="#平衡二叉树"><span>平衡二叉树</span></a></h2>
</div></template>



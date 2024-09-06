<template><div><h1 id="基础类" tabindex="-1"><a class="header-anchor" href="#基础类"><span>基础类</span></a></h1>
<h2 id="css3-选择器有哪些" tabindex="-1"><a class="header-anchor" href="#css3-选择器有哪些"><span>CSS3 选择器有哪些</span></a></h2>
<ul>
<li>
<p><code v-pre>:first-child</code>选择某个元素的第一个子元素；</p>
</li>
<li>
<p><code v-pre>:last-child</code>选择某个元素的最后一个子元素；</p>
</li>
<li>
<p><code v-pre>:first-of-type</code>选择一个上级元素下的第一个同类子元素；</p>
</li>
<li>
<p><code v-pre>:last-of-type</code>选择一个上级元素的最后一个同类子元素；</p>
</li>
<li>
<p><code v-pre>:nth-child(n)</code>选择某个元素的一个或多个特定的子元素；</p>
</li>
<li>
<p><code v-pre>:nth-last-child(n)</code> 选择器匹配属于其元素的第 N 个子元素的每个元素，不论元素的类型，从最后一个子元素开始计数。</p>
</li>
<li>
<p><code v-pre>:nth-of-type(n)</code> 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素</p>
</li>
<li>
<p><code v-pre>:nth-last-of-type(n)</code>选择指定的元素，从元素的最后一个开始计算；</p>
</li>
<li>
<p><code v-pre>:only-child</code>选择的元素是它的父元素的唯一一个了元素；</p>
</li>
<li>
<p><code v-pre>:only-of-type</code>选择一个元素是它的上级元素的唯一一个相同类型的子元素；</p>
</li>
<li>
<p><code v-pre>:empty</code>选择的元素里面没有任何内容。</p>
</li>
<li>
<p><code v-pre>:not(selector)</code> 选择器匹配非指定元素/选择器的每个元素。</p>
</li>
</ul>
<h2 id="html语义化" tabindex="-1"><a class="header-anchor" href="#html语义化"><span>HTML语义化</span></a></h2>
<ul>
<li>用正确的标签做正确的事情。</li>
<li>html语义化让页面的内容结构化，结构更清晰，便于对浏览器，搜索引擎解析；</li>
<li>即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的；</li>
<li>搜索引擎的爬虫也依赖于HTML标记确定上下文和各个关键字的权重，利于SEO;</li>
<li>使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。</li>
</ul>
<h2 id="常见的浏览器内核" tabindex="-1"><a class="header-anchor" href="#常见的浏览器内核"><span>常见的浏览器内核</span></a></h2>
<ul>
<li><code v-pre>Trident</code>内核 [ˈtraɪdnt]：<code v-pre>IE</code>,<code v-pre>360</code>,搜狗浏览器等。</li>
<li><code v-pre>Gecko</code>内核[ˈɡekəʊ]：<code v-pre>Netscape6</code>及以上版本；</li>
<li><code v-pre>Presto</code>内核 [ˈprestəʊ]：<code v-pre>Opera7</code>及以上。</li>
<li><code v-pre>Webkit</code>内核：<code v-pre>Safari,Chrome</code>等。</li>
</ul>
<h2 id="简单介绍对浏览器内核的理解" tabindex="-1"><a class="header-anchor" href="#简单介绍对浏览器内核的理解"><span>简单介绍对浏览器内核的理解</span></a></h2>
<p>主要分成两部分：渲染引擎和JS引擎。</p>
<ul>
<li>渲染引擎：将代码转换成页面。负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等）、以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核。</li>
<li>JS引擎：解析和执行javascript来实现网页的动态效果。</li>
</ul>
<p>最开始渲染引擎和JS引擎并没有区分得很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。</p>
<h2 id="src和href的区别" tabindex="-1"><a class="header-anchor" href="#src和href的区别"><span>src和href的区别</span></a></h2>
<ul>
<li>src是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。</li>
<li>href是指网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。</li>
</ul>
<h2 id="选择器优先级" tabindex="-1"><a class="header-anchor" href="#选择器优先级"><span>选择器优先级</span></a></h2>
<p>!important&gt;行内样式&gt;id选择器&gt;类选择器&gt;标签选择器&gt;通配符&gt;继承</p>
<h2 id="html5新标签" tabindex="-1"><a class="header-anchor" href="#html5新标签"><span>HTML5新标签</span></a></h2>
<p><code v-pre>header</code> <code v-pre>footer</code> <code v-pre>main</code> <code v-pre>nav</code> <code v-pre>aside</code> <code v-pre>article</code> <code v-pre>figcaption</code> <code v-pre>figure</code> <code v-pre>progress</code> <code v-pre>dialog</code> <code v-pre>bdi</code> <code v-pre>details</code>  <code v-pre>mark</code> <code v-pre>menuitem</code> <code v-pre>meter</code>  <code v-pre>rp</code> <code v-pre>rt</code> <code v-pre>ruby</code> <code v-pre>section</code> <code v-pre>summary</code> <code v-pre>time</code> <code v-pre>wbr</code></p>
<h2 id="css-布局" tabindex="-1"><a class="header-anchor" href="#css-布局"><span>CSS 布局</span></a></h2>
<h4 id="两栏布局-左侧宽度固定-右侧自适应" tabindex="-1"><a class="header-anchor" href="#两栏布局-左侧宽度固定-右侧自适应"><span>两栏布局(左侧宽度固定，右侧自适应)</span></a></h4>
<ul>
<li><code v-pre>float + margin</code></li>
<li><code v-pre>float + overflow</code></li>
<li><code v-pre>float + position</code></li>
<li><code v-pre>flex</code></li>
</ul>
<h4 id="三栏布局-两边固定中间自适应" tabindex="-1"><a class="header-anchor" href="#三栏布局-两边固定中间自适应"><span>三栏布局(两边固定中间自适应)</span></a></h4>
<ul>
<li><code v-pre>float + margin</code></li>
<li><code v-pre>position + margin</code></li>
<li><code v-pre>flex</code></li>
</ul>
<p><a href="https://www.cnblogs.com/xuepei/p/9990553.html" target="_blank" rel="noopener noreferrer">布局参考</a></p>
<h2 id="css-盒模型" tabindex="-1"><a class="header-anchor" href="#css-盒模型"><span>CSS 盒模型</span></a></h2>
<h4 id="w3c" tabindex="-1"><a class="header-anchor" href="#w3c"><span>W3C</span></a></h4>
<p><code v-pre>margin + border + padding + content</code>
<img src="@source/assets/images/w3c.jpg" alt="W3C"></p>
<h4 id="ie" tabindex="-1"><a class="header-anchor" href="#ie"><span>IE</span></a></h4>
<p><code v-pre>margin + content</code> (content里面包含了padding border)
<img src="@source/assets/images/ie.jpg" alt="IE"></p>
<h2 id="cookie、localstorage、sessionstorage-的区别" tabindex="-1"><a class="header-anchor" href="#cookie、localstorage、sessionstorage-的区别"><span>cookie、localstorage、sessionstorage 的区别</span></a></h2>
<p><img src="@source/assets/images/csl.png" alt="本地存储"></p>
<h2 id="array方法有哪些" tabindex="-1"><a class="header-anchor" href="#array方法有哪些"><span>array方法有哪些</span></a></h2>
<h4 id="不会改变原来数组的有" tabindex="-1"><a class="header-anchor" href="#不会改变原来数组的有"><span>不会改变原来数组的有：</span></a></h4>
<ul>
<li><code v-pre>concat</code>：连接两个或更多的数组，并返回结果。</li>
<li><code v-pre>every</code>：检测数组元素的每个元素是否都符合条件。</li>
<li><code v-pre>some</code> ：检测数组元素中是否有元素符合指定条件。</li>
<li><code v-pre>filter</code> ：检测数组元素，并返回符合条件所有元素的数组。</li>
<li><code v-pre>indexOf</code> ：搜索数组中的元素，并返回它所在的位置。</li>
<li><code v-pre>join</code> ：把数组的所有元素放入一个字符串。</li>
<li><code v-pre>toString</code> ：把数组转换为字符串，并返回结果。</li>
<li><code v-pre>lastIndexOf</code> ：返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。</li>
<li><code v-pre>map</code> ：通过指定函数处理数组的每个元素，并返回处理后的数组。</li>
<li><code v-pre>slice</code> ：选取数组的的一部分，并返回一个新数组。</li>
<li><code v-pre>valueOf</code> ：返回数组对象的原始值。</li>
</ul>
<h4 id="会改变原来数组的有" tabindex="-1"><a class="header-anchor" href="#会改变原来数组的有"><span>会改变原来数组的有：</span></a></h4>
<ul>
<li><code v-pre>pop</code> ：删除数组的最后一个元素并返回删除的元素。</li>
<li><code v-pre>push</code> ：向数组的末尾添加一个或更多元素，并返回新的长度。</li>
<li><code v-pre>shift</code>： 删除并返回数组的第一个元素。</li>
<li><code v-pre>unshift</code> ：向数组的开头添加一个或更多元素，并返回新的长度。</li>
<li><code v-pre>reverse</code> ：反转数组的元素顺序。</li>
<li><code v-pre>sort</code>： 对数组的元素进行排序。</li>
<li><code v-pre>splice</code> ：用于插入、删除或替换数组的元素。</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>slice不会改变原数组，但是splice会直接改变原数组。</p>
</div>
<h2 id="get-和-post-的区别" tabindex="-1"><a class="header-anchor" href="#get-和-post-的区别"><span>get 和 post 的区别</span></a></h2>
<p><img src="@source/assets/images/get-post.png" alt="get 和 post 的区别"></p>
<h2 id="_8种数据类型" tabindex="-1"><a class="header-anchor" href="#_8种数据类型"><span>8种数据类型</span></a></h2>
<ul>
<li>
<p><code v-pre>Number</code>：typeof instance === &quot;number&quot;</p>
</li>
<li>
<p><code v-pre>String</code>：typeof instance === &quot;string</p>
</li>
<li>
<p><code v-pre>Boolean</code>：typeof instance === &quot;boolean&quot;</p>
</li>
<li>
<p><code v-pre>Object</code>：typeof instance === &quot;object&quot;。</p>
</li>
<li>
<p><code v-pre>undefined</code>：typeof instance === &quot;undefined&quot;</p>
</li>
<li>
<p><code v-pre>null</code>：typeof instance === &quot;object&quot;</p>
</li>
<li>
<p><code v-pre>BigInt</code>：typeof instance === &quot;bigint&quot;</p>
</li>
<li>
<p><code v-pre>Symbol</code> ：typeof instance === &quot;symbol&quot;</p>
</li>
</ul>
<h2 id="javascript内置对象有哪些" tabindex="-1"><a class="header-anchor" href="#javascript内置对象有哪些"><span>javascript内置对象有哪些</span></a></h2>
<ul>
<li><code v-pre>String</code>： 字符串对象</li>
<li><code v-pre>Array</code> ：数组</li>
<li><code v-pre>Boolean</code>： 布尔对象</li>
<li><code v-pre>Number</code> ：数值对象</li>
<li><code v-pre>Object</code> ：基础对象</li>
<li><code v-pre>Function</code> ：函数构造器</li>
<li><code v-pre>Arguments</code>： 函数参数集合</li>
<li><code v-pre>Error</code>： 异常对象</li>
<li><code v-pre>Date</code> ：日期时间</li>
<li><code v-pre>Math</code>： 数学对象</li>
<li><code v-pre>RegExp</code> ：正则表达式对象</li>
</ul>
<h2 id="getelementsbyclassname-和-queryselectorall-的区别" tabindex="-1"><a class="header-anchor" href="#getelementsbyclassname-和-queryselectorall-的区别"><span>getElementsByClassName 和 querySelectorAll 的区别</span></a></h2>
<ul>
<li><code v-pre>querySelectorAll()</code>方法是HTML5新增的方法，通过传入一个css选择符，返回所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个NodeList的实例</li>
<li><code v-pre>document.getElementsByClassName</code>是动态查询的过程，会随着dom结构的变化，得到的结点列表也会发生变化，而<code v-pre>querySelector</code>得到的是一个静态列表，它不会对dom结构进行动态查询。</li>
</ul>
</div></template>



# 移动端

## 移动端适配方案有哪些？各自优缺点是什么？

**核心答案：**  
常见的移动端适配方案有：rem/vw布局、媒体查询、flexible.js、viewport缩放、百分比布局等。各自优缺点如下：  
- rem/vw：适合响应式，兼容性好，维护方便，但需要配合脚本动态设置根字体或viewport。
- 媒体查询：适合多端适配，灵活，但样式冗余、维护成本高。
- flexible.js：自动适配主流设备，开发简单，但依赖第三方库，未来可能被淘汰。
- viewport缩放：简单粗暴，兼容性好，但对复杂布局不友好。
- 百分比布局：适合简单场景，兼容性好，但复杂布局难以控制。

**原理讲解：**  
- rem/vw方案通过设置根元素字体大小（rem）或直接用vw单位，使页面元素随屏幕宽度自适应缩放，适合响应式设计。
- 媒体查询通过CSS的`@media`规则，根据不同屏幕宽度应用不同样式，实现多端适配。
- flexible.js是阿里早期的适配库，通过动态设置`html`的`font-size`，结合rem单位实现自适应。
- viewport缩放通过设置`<meta name="viewport">`标签，控制页面缩放比例，适配不同设备。
- 百分比布局通过设置宽高为百分比，实现相对父元素的自适应。



::: details 示例代码
```html
<!-- 1. rem + flexible.js 方案 -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
  // flexible.js核心思想：动态设置html的font-size
  (function () {
    function setRem() {
      var html = document.documentElement;
      var width = html.clientWidth;
      html.style.fontSize = (width / 10) + 'px'; // 设计稿宽度为750时，1rem=75px
    }
    setRem();
    window.addEventListener('resize', setRem);
  })();
</script>
<style>
  .box {
    width: 3rem; /* 随屏幕宽度自适应 */
    height: 2rem;
    background: #4fc08d;
  }
</style>
<div class="box">rem自适应</div>

<!-- 2. vw 方案 -->
<style>
  .vw-box {
    width: 30vw; /* 视口宽度的30% */
    height: 20vw;
    background: #409eff;
  }
</style>
<div class="vw-box">vw自适应</div>

<!-- 3. 媒体查询 -->
<style>
  .media-box { width: 100px; }
  @media (max-width: 600px) {
    .media-box { width: 50px; }
  }
</style>
<div class="media-box">媒体查询</div>
```
:::


## 1px 问题是什么？如何解决？

**核心答案：**  
1px 问题是指在高分辨率（如 Retina）屏幕下，1px 实际显示会变粗，通常看起来像 2px 或 3px。常见解决方案有：使用物理像素边框（transform 缩放、伪元素、border-image、viewport 单位等）。

**原理讲解：**  
高分屏下，设备像素比（devicePixelRatio）大于 1，1 个 CSS 像素会映射到多个物理像素，导致边框变粗。解决思路是让边框实际只占用 1 个物理像素，比如用缩放、伪元素等方式绘制。



::: details 示例代码
```css
/* 1. 伪元素 + transform 缩放 */
.one-px {
  position: relative;
}
.one-px::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: #333;
  transform: scaleY(0.5); /* 针对2倍屏 */
  transform-origin: 0 0;
}

/* 2. 使用 border-image 或 background-image 绘制1px线 */
.border-img {
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(to right, #333, #333) 1 stretch;
}

/* 3. 使用 viewport 单位 */
.vw-border {
  border-bottom: 0.133vw solid #333; /* 以750设计稿为例，1px≈0.133vw */
}
```
:::



## 移动端常见的触摸事件有哪些？和 PC 端的事件有何不同？

**核心答案：**  
移动端常见触摸事件有：touchstart、touchmove、touchend、touchcancel。与 PC 端的 mouse 事件不同，触摸事件支持多点触控，且没有 hover、右键等交互。

**原理讲解：**  
- touchstart：手指触摸屏幕时触发  
- touchmove：手指在屏幕上滑动时触发  
- touchend：手指离开屏幕时触发  
- touchcancel：系统中断触摸时触发（如来电）  
与 PC 端 mouse 事件（mousedown、mousemove、mouseup）相比，touch 事件可同时处理多点（如双指缩放），且没有鼠标悬停、右键菜单等。



::: details 示例代码
```js
// 监听 touch 事件
const box = document.getElementById('touchBox');
box.addEventListener('touchstart', function(e) {
  // e.touches 是当前屏幕上的所有手指
  // e.targetTouches 是当前元素上的手指
  // e.changedTouches 是本次事件变化的手指
  console.log('触摸开始', e.touches.length);
});
box.addEventListener('touchmove', function(e) {
  console.log('手指移动', e.touches.length);
});
box.addEventListener('touchend', function(e) {
  console.log('触摸结束', e.changedTouches.length);
});
box.addEventListener('touchcancel', function(e) {
  console.log('触摸被中断');
});
```
:::



## 移动端如何实现高性能滚动？

**核心答案：**  
高性能滚动常用方案有：使用原生滚动（overflow: auto/scroll）、硬件加速（transform: translateZ(0)）、避免重排重绘、使用 requestAnimationFrame 优化滚动监听。

**原理讲解：**  
- 原生滚动由浏览器或系统实现，性能最佳。  
- 使用 transform、will-change 等开启 GPU 加速，减少主线程压力。  
- 滚动监听时，节流处理，避免频繁操作 DOM。  
- 尽量避免在滚动时触发重排（reflow）和重绘（repaint）。



::: details 示例代码
```css
/* 1. 原生滚动容器 */
.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* iOS 惯性滚动 */
  height: 300px;
}

/* 2. 硬件加速 */
.scroll-content {
  will-change: transform;
  /* 或 transform: translateZ(0); */
}
```

```js
// 3. 滚动监听优化
let ticking = false;
document.querySelector('.scroll-container').addEventListener('scroll', function(e) {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // 只在下一帧处理一次
      // 这里做滚动相关的 DOM 操作
      ticking = false;
    });
    ticking = true;
  }
});
```
:::



## 移动端 click 事件有 300ms 延迟，如何解决？

**核心答案：**  
移动端 click 事件有 300ms 延迟是为区分双击缩放。解决方法有：使用 touch 事件代替 click、使用 FastClick 库、设置 viewport 禁止缩放。

**原理讲解：**  
早期移动浏览器为支持双击缩放，click 事件会延迟 300ms 判断是否为双击。可通过直接监听 touchend 事件、引入 FastClick（已不推荐）、或设置 viewport 禁止缩放（user-scalable=no）来消除延迟。



::: details 示例代码
```js
// 1. 直接用 touchend 代替 click
element.addEventListener('touchend', function(e) {
  // 这里处理点击逻辑
  e.preventDefault(); // 阻止后续 click 事件
  // ...业务代码
});

// 2. 设置 viewport 禁止缩放
// <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

// 3. FastClick 用法（已不推荐，现代浏览器已修复）
if ('FastClick' in window) {
  FastClick.attach(document.body);
}
```
:::



## 移动端如何实现响应式布局？常用的单位有哪些？

**核心答案：**  
响应式布局常用 rem、vw/vh、百分比、em 等单位。通过媒体查询、弹性布局（flex/grid）等方式实现不同屏幕自适应。

**原理讲解：**  
- rem：相对于根元素字体大小，适合配合 flexible.js 动态适配  
- vw/vh：相对于视口宽高，适合全屏自适应  
- 百分比：相对于父元素，适合简单自适应  
- em：相对于父元素字体大小  
- 媒体查询：根据屏幕宽度切换不同样式  
- flex/grid：弹性布局，适合复杂响应式场景



::: details 示例代码
```css
/* 1. rem 单位 */
html { font-size: 10vw; } /* 视口宽度的10% */
.box { width: 3rem; height: 2rem; }

/* 2. vw/vh 单位 */
.full { width: 100vw; height: 100vh; }

/* 3. 百分比单位 */
.percent-box { width: 80%; }

/* 4. 媒体查询 */
@media (max-width: 600px) {
  .box { width: 100%; }
}
```
:::


## 移动端常见的布局方式有哪些？flex、grid、position 有什么区别？

**核心答案：**  
移动端常见布局方式有：流式布局、弹性盒子（flex）、网格布局（grid）、定位布局（position）、百分比布局等。  
flex 适合一维弹性布局，grid 适合二维网格布局，position 用于绝对/相对定位，适合特殊场景。

**原理讲解：**  
- 流式布局：元素随父容器宽度自适应，常用百分比单位。
- flex：弹性盒子模型，主轴/交叉轴灵活排列，适合横向/纵向一维布局。
- grid：网格布局，支持行列同时控制，适合复杂的二维布局。
- position：通过 absolute、relative、fixed、sticky 实现元素的精确定位，适合悬浮、吸顶等场景。
- 百分比布局：宽高用百分比，适合简单自适应。



::: details 示例代码
```css
/* 1. flex 弹性布局 */
.flex-container {
  display: flex;
  justify-content: space-between; /* 主轴分布 */
  align-items: center;            /* 交叉轴对齐 */
}
.flex-item { flex: 1; }

/* 2. grid 网格布局 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 10px;
}
.grid-item { background: #eee; }

/* 3. position 定位布局 */
.position-box {
  position: relative;
  width: 200px; height: 200px;
}
.position-abs {
  position: absolute;
  right: 0; bottom: 0;
  width: 50px; height: 50px;
  background: #f66;
}
```
:::



## 移动端如何处理高清屏（Retina 屏）下图片模糊问题？

**核心答案：**  
常用方法有：使用多倍图（2x、3x）、SVG 矢量图、iconfont、CSS sprite、WebP 格式等，确保图片物理像素大于等于显示区域所需像素。

**原理讲解：**  
Retina 屏下 devicePixelRatio > 1，1 个 CSS 像素对应多个物理像素，普通图片会被拉伸变模糊。解决方法是提供更高分辨率的图片或使用矢量图，保证在高分屏下依然清晰。



::: details 示例代码
```html
<!-- 1. 多倍图 -->
<img src="logo@2x.png" style="width:100px;height:50px;" alt="logo">

<!-- 2. srcset 响应式图片 -->
<img src="logo.png"
     srcset="logo.png 1x, logo@2x.png 2x, logo@3x.png 3x"
     width="100" height="50" alt="logo">

<!-- 3. SVG 矢量图 -->
<img src="icon.svg" width="40" height="40" alt="icon">

<!-- 4. iconfont 字体图标 -->
<i class="iconfont icon-home"></i>
```
:::



## viewport 的作用是什么？常见的 viewport 设置有哪些？

**核心答案：**  
viewport 用于控制移动端页面的可视区域和缩放行为。常见设置有：width、initial-scale、maximum-scale、user-scalable 等。

**原理讲解：**  
移动端默认 viewport 宽度为 980px，页面会被缩放显示。通过设置 `<meta name="viewport">`，可以指定页面宽度、缩放比例、是否允许用户缩放等，提升移动端体验。



::: details 示例代码
```html
<!-- 1. 常用 viewport 设置，适配设备宽度，禁止缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<!-- 2. 允许用户缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3, user-scalable=yes">

<!-- 3. 只设置宽度和初始缩放 -->
<meta name="viewport" content="width=375, initial-scale=0.5">
```
:::



## 移动端如何实现 rem、vw、vh 等单位的适配？

**核心答案：**  
rem 适配通过动态设置 html 根字体大小，vw/vh 直接基于视口宽高。常用 flexible.js、postcss-px2rem、postcss-px-to-viewport 等工具自动转换。

**原理讲解：**  
- rem：根元素 font-size 随屏幕宽度变化，页面元素用 rem 单位，达到自适应。
- vw/vh：直接用视口宽高的百分比，适合全屏、弹性布局。
- 工具如 postcss-px2rem、postcss-px-to-viewport 可自动将 px 转为 rem/vw，提升开发效率。



::: details 示例代码
```js
// 1. 动态设置 rem
(function() {
  var html = document.documentElement;
  function setRem() {
    html.style.fontSize = html.clientWidth / 10 + 'px'; // 设计稿宽度750，1rem=75px
  }
  setRem();
  window.addEventListener('resize', setRem);
})();

// 2. vw 单位直接使用
.box {
  width: 50vw; /* 视口宽度的50% */
  height: 20vh; /* 视口高度的20% */
}

// 3. postcss-px-to-viewport 配置（postcss.config.js）
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}
```
:::



## 移动端如何防止页面缩放、双击放大等问题？

**核心答案：**  
通过设置 viewport 禁止缩放（user-scalable=no）、最大最小缩放为1，或用 touch-action、禁止双击事件等方式防止页面缩放和双击放大。

**原理讲解：**  
- viewport 的 user-scalable=no、maximum-scale=1、minimum-scale=1 可禁止用户缩放页面。
- touch-action: manipulation 可防止双击缩放。
- 通过 JS 阻止双击事件的默认行为，也可防止页面被放大。



::: details 示例代码
```html
<!-- 1. 禁止缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

<!-- 2. touch-action 禁止双击缩放（部分浏览器支持） -->
<style>
  body {
    touch-action: manipulation;
  }
</style>

<!-- 3. JS 阻止双击放大 -->
<script>
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
</script>
```
:::


## 移动端如何实现手势操作（如滑动、缩放、长按等）？

**核心答案：**  
手势操作可通过监听 touch 事件（touchstart、touchmove、touchend）自行实现，或使用第三方库（如 Hammer.js、AlloyFinger）简化开发，支持滑动、缩放、长按等多种手势。

**原理讲解：**  
- 滑动：记录 touchstart 和 touchend 的坐标差，判断滑动方向和距离。
- 缩放：多指触控，计算两指间距离变化实现缩放。
- 长按：touchstart 后设置定时器，touchend 前未松手则判定为长按。
- 第三方库封装了常见手势，兼容性和易用性更好。



::: details 示例代码
```js
// 1. 原生实现滑动和长按
let startX, startY, startTime, timer;
const el = document.getElementById('gestureBox');

el.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    timer = setTimeout(() => {
      console.log('长按事件');
    }, 600); // 600ms判定为长按
  }
});
el.addEventListener('touchmove', function(e) {
  clearTimeout(timer); // 移动则取消长按
});
el.addEventListener('touchend', function(e) {
  clearTimeout(timer);
  let dx = e.changedTouches[0].clientX - startX;
  let dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) > 30) {
    console.log(dx > 0 ? '右滑' : '左滑');
  } else if (Math.abs(dy) > 30) {
    console.log(dy > 0 ? '下滑' : '上滑');
  }
});

// 2. 使用 Hammer.js 实现多种手势
// <script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js"></script>
const hammer = new Hammer(el);
hammer.on('swipeleft', () => console.log('左滑'));
hammer.on('swiperight', () => console.log('右滑'));
hammer.on('press', () => console.log('长按'));
hammer.on('pinch', () => console.log('双指缩放'));
```
:::



## 移动端如何优化首屏加载速度？

**核心答案：**  
优化首屏加载可通过资源压缩与合并、懒加载、CDN 加速、减少首屏请求、服务端渲染（SSR）、骨架屏等方式提升体验。

**原理讲解：**  
- 资源压缩合并：减少文件体积和请求数。
- 懒加载：首屏外图片/资源延后加载。
- CDN 加速：静态资源分发到离用户更近的节点。
- 减少首屏请求：首屏只加载必要资源，异步加载其他内容。
- SSR/预渲染：服务端输出 HTML，提升首屏可见速度。
- 骨架屏：首屏加载时用占位动画提升感知速度。



::: details 示例代码
```html
<!-- 1. 图片懒加载 -->
<img src="placeholder.png" data-src="real.jpg" class="lazy-img" alt="图片">
<script>
  // 简单懒加载
  document.addEventListener('DOMContentLoaded', function() {
    const imgs = document.querySelectorAll('.lazy-img');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    imgs.forEach(img => observer.observe(img));
  });
</script>

<!-- 2. 骨架屏 -->
<div id="skeleton" style="background:#eee;height:200px;">加载中...</div>
<script>
  // 数据加载完成后替换骨架屏
  setTimeout(() => {
    document.getElementById('skeleton').innerHTML = '<img src="real.jpg" alt="内容">';
  }, 1000);
</script>
```
:::



## 移动端如何处理软键盘弹出导致的页面布局错乱？

**核心答案：**  
常用方法有：监听窗口 resize 事件，动态调整页面高度或滚动到输入框；对输入区域使用 fixed 定位时需特殊处理，或在输入框失焦时恢复布局。

**原理讲解：**  
- 软键盘弹出会改变 viewport 高度，导致 fixed 元素错位或页面被顶起。
- 通过监听 window 的 resize 事件，判断键盘弹出/收起，动态调整页面布局。
- 对于 fixed 元素，弹出键盘时可临时隐藏或取消 fixed，收起后恢复。



::: details 示例代码
```js
// 1. 监听 resize 事件，判断键盘弹出
let originHeight = window.innerHeight;
window.addEventListener('resize', function() {
  if (window.innerHeight < originHeight) {
    // 键盘弹出
    document.querySelector('.footer').style.display = 'none';
  } else {
    // 键盘收起
    document.querySelector('.footer').style.display = '';
  }
});

// 2. 输入框聚焦时滚动到可视区域
const input = document.querySelector('input');
input.addEventListener('focus', function() {
  setTimeout(() => {
    input.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, 300);
});
```
:::



## 移动端如何实现图片懒加载？

**核心答案：**  
常用方法有：监听滚动事件判断图片是否进入视口，或使用 IntersectionObserver API 自动检测并加载图片。

**原理讲解：**  
- 滚动监听：每次滚动判断图片距离视口位置，进入视口时加载真实图片。
- IntersectionObserver：浏览器原生 API，自动检测元素是否进入可视区域，性能更优。



::: details 示例代码
```js
// 1. IntersectionObserver 实现图片懒加载
const imgs = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
imgs.forEach(img => observer.observe(img));

// 2. 兼容性方案：滚动监听
function lazyLoad() {
  const imgs = document.querySelectorAll('img[data-src]');
  const winH = window.innerHeight;
  imgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < winH) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}
window.addEventListener('scroll', lazyLoad);
window.addEventListener('resize', lazyLoad);
```
:::



## 移动端如何实现下拉刷新和上拉加载？

**核心答案：**  
可通过监听 touch 事件计算滑动距离，结合滚动容器的 scrollTop 判断是否到达顶部/底部，或使用第三方库（如 better-scroll、iscroll）实现下拉刷新和上拉加载。

**原理讲解：**  
- 下拉刷新：在容器顶部下拉一定距离触发刷新逻辑，常见于微信、App。
- 上拉加载：滚动到底部时自动加载更多内容。
- 原生 touch 事件需处理滑动距离、阻止默认滚动等，第三方库封装了这些细节，兼容性更好。



::: details 示例代码
```js
// 1. 原生实现上拉加载
const container = document.querySelector('.scroll-container');
container.addEventListener('scroll', function() {
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
    // 到达底部，触发加载
    loadMore();
  }
});

function loadMore() {
  // 加载更多数据
  console.log('加载更多内容');
}

// 2. 使用 better-scroll 实现下拉刷新
// <script src="https://unpkg.com/better-scroll@2.0.0/dist/better-scroll.min.js"></script>
const bs = new BScroll('.scroll-wrapper', {
  pullDownRefresh: true,
  pullUpLoad: true
});
bs.on('pullingDown', () => {
  // 下拉刷新逻辑
  bs.finishPullDown();
});
bs.on('pullingUp', () => {
  // 上拉加载逻辑
  bs.finishPullUp();
});
```
:::

## 移动端如何处理 iOS 和 Android 的兼容性问题？

**核心答案：**  
常用方法有：使用 CSS 前缀、Polyfill 兼容新特性、针对不同系统做条件判断和适配、使用第三方库屏蔽差异、充分测试主流机型和系统。

**原理讲解：**  
- iOS 和 Android 在浏览器内核、事件模型、输入法、样式渲染等方面存在差异。
- 通过添加 `-webkit-`、`-ms-` 等前缀兼容不同内核。
- 对于不支持的新 API，可用 Polyfill 填补。
- 某些 bug 需通过 userAgent 判断系统类型，做特殊处理。
- 第三方库（如 fastclick、better-scroll）可屏蔽部分差异。
- 需在主流设备上充分测试，发现并修复兼容性问题。



::: details 示例代码
```css
/* 1. 添加 CSS 前缀 */
.box {
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
  user-select: none;
}

/* 2. Polyfill 兼容新特性（如 Promise、fetch） */
// <script src="https://cdn.jsdelivr.net/npm/promise-polyfill/dist/polyfill.min.js"></script>

/* 3. 判断系统类型做适配 */
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function isAndroid() {
  return /android/i.test(navigator.userAgent);
}
if (isIOS()) {
  // iOS 特有处理
} else if (isAndroid()) {
  // Android 特有处理
}
```
:::



## 移动端如何实现本地存储？常用的存储方式有哪些？

**核心答案：**  
常用本地存储方式有：localStorage、sessionStorage、cookie、IndexedDB、WebSQL（已废弃）。localStorage 和 sessionStorage 用于简单数据，IndexedDB 适合大数据量和结构化存储。

**原理讲解：**  
- localStorage：持久化存储，容量约5MB，页面关闭后数据不丢失。
- sessionStorage：会话级存储，页面关闭即清空。
- cookie：小容量（4KB），可与服务端通信，常用于登录态。
- IndexedDB：浏览器内建数据库，支持大数据量和复杂结构。
- WebSQL：已废弃，不推荐使用。



::: details 示例代码
```js
// 1. localStorage
localStorage.setItem('token', '123456');
const token = localStorage.getItem('token');
localStorage.removeItem('token');

// 2. sessionStorage
sessionStorage.setItem('temp', 'abc');
const temp = sessionStorage.getItem('temp');

// 3. cookie
document.cookie = "user=Tom; path=/; max-age=3600";

// 4. IndexedDB
const request = indexedDB.open('myDB', 1);
request.onsuccess = function(event) {
  const db = event.target.result;
  const tx = db.transaction('store', 'readwrite');
  const store = tx.objectStore('store');
  store.put({id: 1, name: 'Tom'});
};
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('store', {keyPath: 'id'});
};
```
:::



## 移动端如何实现页面的前进、后退、跳转等路由操作？

**核心答案：**  
可通过原生 history API（pushState、replaceState、back、go）、location.href 跳转，或使用前端路由库（如 vue-router、react-router）实现页面路由操作。

**原理讲解：**  
- history.pushState/replaceState 可无刷新改变 URL，实现单页应用路由跳转。
- history.back()/history.go(-1) 实现返回上一页。
- location.href 可跳转到新页面。
- 前端路由库封装了路由管理、导航守卫、参数传递等功能，适合复杂应用。



::: details 示例代码
```js
// 1. 原生 history API
history.pushState({page: 1}, 'title', '/page1'); // 跳转到 /page1
history.replaceState({page: 2}, 'title', '/page2'); // 替换当前历史记录
history.back(); // 返回上一页
history.go(-1); // 返回上一页

// 2. location 跳转
location.href = '/login'; // 跳转到登录页

// 3. vue-router 路由跳转
// this.$router.push('/home');
// this.$router.replace('/login');
// this.$router.go(-1);
```
:::



## 移动端如何防止 XSS、CSRF 等安全问题？

**核心答案：**  
防止 XSS：对用户输入进行转义、使用 CSP、安全的 DOM API、避免 innerHTML。  
防止 CSRF：使用 Token 验证、SameSite Cookie、Referer 校验等。

**原理讲解：**  
- XSS（跨站脚本攻击）：攻击者注入恶意脚本，需对输入内容进行 HTML 实体转义，或用 textContent 替代 innerHTML。
- CSP（内容安全策略）：限制页面可执行的脚本来源。
- CSRF（跨站请求伪造）：攻击者伪造用户请求，需在请求中加入 Token 并校验，或设置 Cookie 的 SameSite 属性，防止第三方站点携带 Cookie。



::: details 示例代码
```js
// 1. 防止 XSS：对输入内容转义
function escapeHTML(str) {
  return str.replace(/[<>&"]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'
  }[c]));
}
document.getElementById('output').textContent = escapeHTML(userInput);

// 2. CSP 设置
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">

// 3. 防止 CSRF：请求加 Token
fetch('/api/data', {
  method: 'POST',
  headers: { 'X-CSRF-Token': 'token-value' }
});

// 4. SameSite Cookie
document.cookie = "token=abc; SameSite=Strict";
```
:::



## 移动端如何实现微信、支付宝等第三方登录？

**核心答案：**  
通过 OAuth2.0 协议，跳转到第三方授权页，用户授权后回调带 code，后端用 code 换取用户信息，完成登录。

**原理讲解：**  
- 第三方登录一般基于 OAuth2.0，前端跳转到微信/支付宝授权页，用户同意后回调到指定 redirect_uri，并带上 code。
- 后端用 code 请求第三方接口获取 access_token 和用户信息，完成登录绑定。
- 需在第三方平台注册应用，配置回调地址。



::: details 示例代码
```js
// 1. 跳转到微信授权页
const appid = 'wx123456';
const redirect_uri = encodeURIComponent('https://yourdomain.com/callback');
location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;

// 2. 后端用 code 换取 access_token
// POST https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

// 3. 支付宝授权类似，参考官方文档
```
:::

## 移动端如何调用原生能力（如摄像头、定位、加速计等）？

**核心答案：**  
可通过 HTML5 标准 API（如 getUserMedia、Geolocation、DeviceOrientation）、WebView JSBridge、或第三方 SDK 调用原生能力。H5 受限时需借助原生容器提供的接口。

**原理讲解：**  
- HTML5 提供了摄像头（getUserMedia）、定位（Geolocation）、加速计（DeviceOrientation/DeviceMotion）等标准 API，部分能力需 HTTPS 环境和用户授权。
- 在 App WebView 场景下，H5 可通过 JSBridge 与原生通信，调用更多原生能力。
- 微信、支付宝等内置浏览器提供了各自的 JS-SDK，需按官方文档集成。



::: details 示例代码
```js
// 1. 调用摄像头拍照
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.querySelector('video').srcObject = stream;
  })
  .catch(err => {
    console.error('无法访问摄像头', err);
  });

// 2. 获取地理位置
navigator.geolocation.getCurrentPosition(
  pos => {
    console.log('经纬度', pos.coords.latitude, pos.coords.longitude);
  },
  err => {
    console.error('定位失败', err);
  }
);

// 3. 监听加速计
window.addEventListener('devicemotion', function(e) {
  console.log('加速度', e.acceleration);
});

// 4. WebView JSBridge 调用原生
// window.JSBridge && JSBridge.invoke('openCamera', {}, res => { ... });
```
:::



## 移动端如何实现 H5 与原生的通信？

**核心答案：**  
常用方式有：WebView 注入 JSBridge、URL Scheme、postMessage、通过第三方 SDK（如微信 JS-SDK）实现 H5 与原生的双向通信。

**原理讲解：**  
- JSBridge：原生注入全局对象，H5 通过调用其方法与原生交互，原生也可回调 JS。
- URL Scheme：H5 通过跳转自定义协议唤起原生功能。
- postMessage：H5 与原生通过消息机制传递数据，安全性更高。
- 第三方 SDK 封装了通信细节，开发更便捷。



::: details 示例代码
```js
// 1. JSBridge 调用原生
window.JSBridge && JSBridge.invoke('openCamera', { quality: 'high' }, function(res) {
  console.log('原生返回', res);
});

// 2. 原生调用 H5
// 原生通过 webView.evaluateJavascript('window.onNativeMessage("data")')
window.onNativeMessage = function(data) {
  console.log('收到原生消息', data);
};

// 3. postMessage 方式（如 React Native WebView）
window.ReactNativeWebView && window.ReactNativeWebView.postMessage('H5消息');
document.addEventListener('message', function(e) {
  console.log('收到原生消息', e.data);
});
```
:::



## 移动端如何实现离线缓存和断网处理？

**核心答案：**  
可通过 Service Worker 实现离线缓存，或使用 localStorage/IndexedDB 存储数据，断网时检测网络状态并做降级处理。

**原理讲解：**  
- Service Worker 可拦截请求，将静态资源缓存到本地，实现离线访问。
- localStorage/IndexedDB 可缓存接口数据，断网时读取本地数据展示。
- 通过监听 online/offline 事件，判断网络状态，提示用户或切换到离线模式。



::: details 示例代码
```js
// 1. 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log('Service Worker 注册成功');
  });
}

// 2. sw.js 示例
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(cache => cache.addAll([
      '/', '/index.html', '/main.css', '/main.js'
    ]))
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

// 3. 监听网络状态
window.addEventListener('online', () => {
  console.log('网络已连接');
});
window.addEventListener('offline', () => {
  console.log('网络已断开');
});
```
:::



## 移动端如何进行性能监控和异常上报？

**核心答案：**  
可通过 Performance API、Error 事件、try-catch、window.onerror、unhandledrejection 监听性能和异常，结合埋点/上报接口将数据发送到服务端。

**原理讲解：**  
- Performance API 可采集页面加载、资源加载等性能数据。
- window.onerror、window.addEventListener('error') 可捕获运行时 JS 错误。
- window.addEventListener('unhandledrejection') 可捕获 Promise 未处理异常。
- 通过自定义上报接口，将异常和性能数据发送到后端，便于监控和分析。



::: details 示例代码
```js
// 1. 性能数据采集
window.addEventListener('load', function() {
  setTimeout(() => {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    // 上报 loadTime
    fetch('/api/report', {
      method: 'POST',
      body: JSON.stringify({ type: 'performance', loadTime })
    });
  }, 0);
});

// 2. JS 异常捕获
window.onerror = function(msg, url, line, col, error) {
  fetch('/api/report', {
    method: 'POST',
    body: JSON.stringify({ type: 'jsError', msg, url, line, col })
  });
};

// 3. Promise 未处理异常
window.addEventListener('unhandledrejection', function(e) {
  fetch('/api/report', {
    method: 'POST',
    body: JSON.stringify({ type: 'promiseError', reason: e.reason })
  });
});
```
:::




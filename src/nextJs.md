# Next.js

## Next.js 中的静态生成（SSG）、服务端渲染（SSR）、客户端渲染（CSR）有什么区别？

### 核心答案

- SSG（静态生成）：在构建时生成 HTML，适合内容不频繁变动的页面，访问速度快，利于 SEO。
- SSR（服务端渲染）：每次请求时在服务端生成 HTML，适合内容经常变动、需要实时数据的页面，兼顾 SEO 和动态性。
- CSR（客户端渲染）：页面首次只返回空壳 HTML，数据和渲染逻辑都在浏览器端完成，适合交互性强但对 SEO 要求不高的场景。

### 详细原理讲解

#### 1. SSG（Static Site Generation）

- 在项目构建（build）阶段，`Next.js` 会根据页面的数据预先生成静态 HTML 文件。
- 用户访问页面时，直接返回已生成的 HTML，速度极快，服务器压力小。
- 适合博客、文档等内容不常变动的场景。
- 通过 `getStaticProps`、`getStaticPaths` 实现。

#### 2. SSR（Server Side Rendering）

- 每次有用户请求页面时，`Next.js` 都会在服务端执行页面组件，获取数据并生成 HTML 返回给浏览器。
- 页面内容总是最新的，适合需要实时数据的场景。
- 通过 getServerSideProps 实现。

#### 3. CSR（Client Side Rendering）

- 首次请求只返回一个基本的 HTML 框架，页面内容通过 JavaScript 在客户端请求 API 后渲染。
- 适合对 SEO 要求不高、交互性强的应用，如后台管理系统。
- 通过 useEffect、fetch 等在组件内获取数据。

### 示例代码

::: details SSG 示例（静态生成）

```js
// pages/posts/[id].js
import React from 'react';

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// 在构建时生成所有静态页面
export async function getStaticPaths() {
  // 假设有一个 API 返回所有文章 id
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  // 生成所有路径
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));

  return { paths, fallback: false };
}

// 获取每个页面的数据
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return { props: { post } };
}
```

:::

::: details SSR 示例（服务端渲染）

```js
// pages/profile.js
import React from 'react';

export default function Profile({ user }) {
  return (
    <div>
      <h1>欢迎，{user.name}</h1>
      <p>邮箱：{user.email}</p>
    </div>
  );
}

// 每次请求时服务端获取数据
export async function getServerSideProps(context) {
  // 可以获取 cookie、session 等
  const res = await fetch('https://api.example.com/user', {
    headers: {
      cookie: context.req.headers.cookie || ''
    }
  });
  const user = await res.json();

  return { props: { user } };
}
```

:::

::: details CSR 示例（客户端渲染）

```js
// pages/dashboard.js
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 客户端渲染时获取数据
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>加载中...</div>;

  return (
    <div>
      <h1>仪表盘</h1>
      <p>欢迎回来，{data.username}</p>
    </div>
  );
}
```

:::

## Next.js 如何实现服务端渲染（SSR）？其底层原理是什么？

### 核心答案

`Next.js` 通过在 `Node.js` 服务器上运行 React 组件，结合 `getServerSideProps` 等数据获取方法，在每次请求时生成 HTML，实现服务端渲染。底层原理是 React 的 `renderToString` 方法结合 `Next.js` 路由和数据预取机制。

#### 详细原理

- 用户请求页面时，`Next.js` 服务器会根据路由找到对应的 React 组件。
- 如果页面导出了 `getServerSideProps`，`Next.js` 会先执行该方法获取数据。
- 拿到数据后，`Next.js` 用 React 的 renderToString 方法将组件渲染为 HTML 字符串。
- 服务器将 HTML 和数据一同返回给浏览器，浏览器再进行 hydration（再水化）使页面变为可交互的 SPA。
- 这样既保证了首屏渲染速度和 SEO，又能享受 React 的客户端交互体验。

::: details SSR 实现示例

```js
// pages/news.js
import React from 'react';

export default function News({ list }) {
  return (
    <div>
      <h1>最新新闻</h1>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

// 每次请求时服务端获取数据
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/news');
  const list = await res.json();
  return { props: { list } };
}
```

:::

## 如何在 Next.js 中实现 SEO 优化？越详细越好

### 核心答案

Next.js 通过 `SSR/SSG` 生成可被搜索引擎抓取的 HTML，结合 Head 组件设置 meta 标签、结构化数据、`sitemap`、`robots.txt`、图片优化等手段实现 SEO 优化。

#### 详细原理

- **`SSR/SSG`**：保证页面首屏 HTML 完整，利于搜索引擎抓取。
- **Head 组件**：用 `next/head` 设置 `title`、`description`、`keywords`、`OG` 标签等 `meta` 信息。
- **结构化数据**：通过 JSON-LD 提供结构化信息，提升搜索排名。
- **`sitemap/robots.txt`**：自动生成 `sitemap.xml` 和 `robots.txt`，帮助搜索引擎更好索引网站。
- **图片优化**：使用 `next/image` 组件，自动生成多尺寸图片和懒加载。
- **语义化标签**：使用 `header`、`main`、`footer`、`article` 等 HTML5 语义标签。
- **`Canonical` 链接**：避免重复内容，提升权重。

::: details SEO 优化示例

```js
// pages/article.js
import Head from 'next/head';

export default function Article({ article }) {
  return (
    <>
      <Head>
        <title>{article.title} - 我的博客</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://example.com/article/${article.id}`} />
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.summary,
              author: { "@type": "Person", name: article.author }
            })
          }}
        />
      </Head>
      <main>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </main>
    </>
  );
}
```

:::

::: details `sitemap/robots.txt` 自动生成

```js
// 安装 next-sitemap
// npm install next-sitemap

// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
};
```

:::

## SSR 项目中如何实现页面缓存？常见的缓存策略有哪些？

### 核心答案

SSR 项目可通过 HTTP 缓存头、服务端中间件（如 Redis）、CDN 缓存等方式实现页面缓存。常见策略有：全页缓存、分段缓存、增量静态生成（ISR）、私有/公有缓存等。

#### 详细原理

- **HTTP 缓存头**：设置 Cache-Control、ETag、Last-Modified 等头部，控制浏览器和 CDN 缓存。
- **服务端缓存**：用 Redis、内存等缓存热点页面或数据，减少数据库压力。
- **CDN 缓存**：将 SSR 渲染结果缓存到 CDN 边缘节点，提升全球访问速度。
- **增量静态生成（ISR）**：Next.js 支持按需重新生成静态页面，兼顾实时性和性能。
- **分段缓存**：对页面的不同部分采用不同缓存策略（如 Edge SSR + API 缓存）。

::: details HTTP 缓存头设置

```js
// pages/api/cache.js
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  res.json({ time: Date.now() });
}
```

:::

::: details 服务端 Redis 缓存示例

```js
// 伪代码，需结合实际服务端环境
import Redis from 'ioredis';
const redis = new Redis();

export async function getServerSideProps() {
  const cacheKey = 'news:list';
  let list = await redis.get(cacheKey);
  if (!list) {
    const res = await fetch('https://api.example.com/news');
    list = await res.json();
    await redis.set(cacheKey, JSON.stringify(list), 'EX', 60); // 缓存60秒
  } else {
    list = JSON.parse(list);
  }
  return { props: { list } };
}
```

:::

## 服务端渲染的优缺点分别是什么？

### 核心答案

优点：首屏渲染快、利于 SEO、支持动态数据、提升分享体验。  
缺点：服务器压力大、响应速度受限于服务端、实现和部署复杂、部分交互需客户端二次渲染。

#### 详细原理

- **优点**：
  - 首屏 HTML 由服务端生成，用户体验好。
  - 搜索引擎可直接抓取完整内容，SEO 友好。
  - 支持实时数据，适合新闻、社区等场景。
  - 社交分享时能正确显示预览信息。
- **缺点**：
  - 每次请求都需服务端渲染，服务器压力大。
  - 网络延迟、服务端性能影响响应速度。
  - 需要处理服务端和客户端的同构问题，开发复杂度提升。
  - 某些交互仍需客户端 JS 支持，需二次 hydration。

## SSR 如何与 CDN 配合提升性能？

### 核心答案

SSR 可通过设置合适的 HTTP 缓存头，将渲染结果缓存到 CDN 边缘节点，实现全局加速和减轻源站压力。`Next.js` 支持与 Vercel、Cloudflare 等平台无缝集成。

#### 详细原理

- SSR 页面渲染后，设置 `s-maxage`、`stale-while-revalidate` 等缓存头，允许 CDN 缓存页面。
- CDN 首次请求回源，后续请求直接命中边缘节点，极大提升响应速度。
- 可结合 ISR（增量静态生成）实现页面自动更新和缓存失效。
- 需注意动态内容、用户个性化页面不宜全局缓存。

::: details CDN 缓存头设置示例

```js
// pages/api/with-cdn.js
export default function handler(req, res) {
  // s-maxage 只对 CDN 有效，public 允许所有缓存
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
  res.json({ time: Date.now() });
}
```

:::

## SSR 如何处理全局状态管理（如 Redux、MobX）？

### 核心答案

SSR 下需在服务端创建独立的全局状态实例（如 Redux store），将初始状态通过 props 传递到客户端，客户端再用该初始状态进行 hydration，避免状态污染和数据不一致。

#### 详细原理

- 每次 SSR 请求都需新建一份 store，防止多用户间数据串联。
- `getServerSideProps/getInitialProps` 获取数据后，将初始 state 作为 props 传递。
- 客户端用该 state 初始化 store，实现同构。
- 推荐使用 next-redux-wrapper 等库简化流程。

::: details Redux 同构示例

```js
// store.js
import { createStore } from 'redux';
export const initializeStore = (preloadedState) => createStore(reducer, preloadedState);

// pages/_app.js
import { Provider } from 'react-redux';
import { initializeStore } from '../store';

function MyApp({ Component, pageProps }) {
  const store = initializeStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

// pages/index.js
export async function getServerSideProps() {
  const store = initializeStore();
  // 假设 dispatch 异步 action 获取数据
  await store.dispatch(fetchData());
  return {
    props: {
      initialReduxState: store.getState(),
    },
  };
}
```

:::

## getStaticProps、getServerSideProps 和 getInitialProps 有什么区别？

### 核心答案

- getStaticProps：构建时运行，生成静态页面（SSG）。
- getServerSideProps：每次请求时服务端运行，生成动态页面（SSR）。
- getInitialProps：页面首次加载和路由切换时都运行，支持 SSR 和 CSR，已不推荐使用。

#### 详细原理

- **getStaticProps**：仅在 build 阶段运行，适合静态内容，支持 ISR。
- **getServerSideProps**：每次请求都运行，适合实时数据，不能用于静态导出。
- **getInitialProps**：可在服务端和客户端运行，灵活但会影响性能，官方推荐用前两者替代。

::: details 三者用法对比

```js
// getStaticProps
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

// getServerSideProps
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

// getInitialProps（已不推荐）
MyPage.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return { posts };
};
```

:::

## Next.js 的路由机制是怎样的？

### 核心答案

Next.js 基于文件系统的路由机制，pages 目录下的每个文件自动对应一个路由，无需手动配置，支持嵌套路由、动态路由和 API 路由。

#### 详细原理

- pages 目录下的 `.js/.jsx/.ts/.tsx` 文件自动成为路由页面。
- 文件名决定路由路径，如 `pages/about.js` 对应 `/about`。
- 支持嵌套文件夹实现多级路由，如 `pages/blog/list.js` 对应 `/blog/list`。
- 支持动态路由（[param].js）、`catch-all` 路由（[...slug].js）。
- `pages/api` 目录下的文件自动成为 API 路由。

::: details 路由机制示例

```js
// pages/about.js   =>  /about
// pages/blog/list.js   =>  /blog/list
// pages/posts/[id].js  =>  /posts/123
// pages/docs/[...slug].js  =>  /docs/a/b/c
```

:::

## 动态路由和 catch-all 路由如何实现？

### 核心答案

动态路由通过文件名中使用中括号 [param] 实现，catch-all 路由通过 [...param] 实现，可捕获多级路径参数。

#### 详细原理

- `[param].js`：匹配单个参数，如 `/posts/123`。
- `[...param].js`：匹配多个参数，如 `/docs/a/b/c`。
- getStaticPaths 可用于 SSG 下动态生成所有可能的路径。

::: details 动态路由示例

```js
// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return <div>文章ID: {id}</div>;
}
```

:::

::: details catch-all 路由示例

```js
// pages/docs/[...slug].js
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();
  const { slug } = router.query;
  return <div>路径参数: {JSON.stringify(slug)}</div>;
}
```

:::

## 如何在 Next.js 中实现 API 路由？

### 核心答案

在 `pages/api` 目录下创建 `JS/TS` 文件，每个文件自动成为一个 API 路由，支持 RESTful 风格，直接处理 `req/res`。

#### 详细原理

- `pages/api` 下的每个文件导出 handler 函数，接收 req、res 参数。
- 支持 GET、POST、PUT、DELETE 等 HTTP 方法。
- 可用于处理表单、鉴权、代理、数据聚合等后端逻辑。

::: details API 路由示例

```js
// pages/api/hello.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello API!' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
```

:::

## 如何在 Next.js 中做数据预取（Data Fetching）？

### 核心答案

Next.js 支持在页面级别通过 `getStaticProps`、`getServerSideProps`、`getInitialProps` 进行数据预取，也可在客户端用 SWR、React Query 等库进行数据请求和缓存，实现高效的数据获取和页面渲染。

### 详细原理

1. **getStaticProps（静态生成）**  
   - 仅在构建时运行，预先获取数据，生成静态页面（SSG），适合内容不常变动的页面。
   - 支持 ISR（增量静态生成），可定时重新生成页面。

2. **getServerSideProps（服务端渲染）**  
   - 每次请求时在服务端运行，实时获取数据，生成 HTML，适合需要最新数据的页面（SSR）。

3. **getInitialProps（已不推荐）**  
   - 可在服务端和客户端运行，页面首次加载和路由切换时都能获取数据，但会影响性能，官方推荐用前两者替代。

4. **客户端数据请求**  
   - 在组件内通过 `fetch`、`axios`、`SWR`、`React Query` 等库获取和缓存数据，适合交互性强、对 SEO 要求不高的场景。

5. **API 路由**  
   - 可通过 `pages/api` 目录自定义后端接口，前端通过这些接口进行数据预取。

::: details getStaticProps 静态数据预取

```js
// pages/posts.js
export async function getStaticProps() {
  // 构建时请求数据
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

export default function Posts({ posts }) {
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

:::

::: details getServerSideProps 服务端实时数据预取

```js
// pages/news.js
export async function getServerSideProps() {
  // 每次请求时服务端获取数据
  const res = await fetch('https://api.example.com/news');
  const news = await res.json();
  return { props: { news } };
}

export default function News({ news }) {
  return (
    <ul>
      {news.map(item => <li key={item.id}>{item.title}</li>)}
    </ul>
  );
}
```

:::

::: details 客户端数据请求（SWR 示例）

```js
// pages/profile.js
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(res => res.json());
}

export default function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>加载失败</div>;
  if (!data) return <div>加载中...</div>;

  return <div>用户名：{data.name}</div>;
}
```

:::

::: details API 路由结合数据预取

```js
// pages/api/user.js
export default function handler(req, res) {
  res.status(200).json({ name: '张三', age: 18 });
}

// pages/profile.js
import useSWR from 'swr';

export default function Profile() {
  const { data } = useSWR('/api/user', url => fetch(url).then(res => res.json()));
  return <div>用户名：{data?.name}</div>;
}
```

:::

## Next.js 如何实现图片优化（Image Optimization）？

### 核心答案

Next.js 提供内置的 `next/image` 组件，支持自动压缩、懒加载、自适应尺寸和格式转换，提升图片加载速度和 SEO。

#### 详细原理

- `next/image` 自动根据设备分辨率和屏幕尺寸生成多版本图片。
- 支持 WebP、AVIF 等现代图片格式。
- 默认开启懒加载，减少首屏压力。
- 可自定义 loader 支持第三方图片源。

::: details 图片优化示例

```js
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image
      src="/avatar.png"
      alt="用户头像"
      width={100}
      height={100}
      quality={80}
      placeholder="blur"
      blurDataURL="/avatar-blur.png"
    />
  );
}
```

:::

## 如何配置自定义 Document 和 App？

### 核心答案

通过 `pages/_document.js` 自定义 HTML 结构和 meta 标签，通过 `pages/_app.js` 自定义全局样式、布局和状态管理。

#### 详细原理

- _document.js 只在服务端渲染时运行，可自定义 `<html>`、`<body>`、全局 meta、字体等。
- _app.js 包裹所有页面组件，可引入全局 CSS、Provider、布局等。

::: details 自定义 Document 示例

```js
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* 可添加全局 meta、字体等 */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

:::

::: details 自定义 App 示例

```js
// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

:::

## 如何在 Next.js 中使用中间件（Middleware）？

### 核心答案

Next.js 通过 middleware.js 文件实现中间件功能，可在请求到达页面或 API 路由前进行重定向、鉴权、`A/B` 测试等操作。

#### 详细原理

- 在项目根目录或 app 目录下创建 middleware.js。
- 中间件基于 Edge Runtime，运行在 CDN 边缘节点，性能高。
- 可通过 NextResponse 重写、重定向、设置 header 等。

::: details Middleware 示例

```js
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 简单鉴权示例
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// 匹配特定路由
export const config = {
  matcher: ['/dashboard/:path*'],
};
```

:::

## 如何在 Next.js 中实现国际化（i18n）？

### 核心答案

Next.js 内置国际化支持，通过配置 `next.config.js` 的 i18n 字段实现多语言路由和切换，结合第三方库（如 `next-i18next`）实现内容翻译。

#### 详细原理

- 在 `next.config.js` 配置 `i18n.locales` 和 defaultLocale。
- 页面路由自动带上语言前缀（如 /en、`/zh`）。
- 可结合 `next-i18next`、`react-intl` 等库实现内容多语言切换和翻译。

::: details 国际化配置示例

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
};
```

:::

::: details next-i18next 使用示例

```js
// 安装 next-i18next
// npm install next-i18next

// next-i18next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
};

// pages/_app.js
import { appWithTranslation } from 'next-i18next';
export default appWithTranslation(MyApp);

// 页面组件
import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome')}</h1>;
}
```

:::

## 如何在 Next.js 中做代码分割和懒加载？

### 核心答案

Next.js 默认基于路由自动实现代码分割，支持通过 `React.lazy`、`next/dynamic` 实现组件级懒加载，提升首屏加载速度和性能。

#### 详细原理

- 路由级代码分割：每个页面单独打包，访问哪个页面只加载对应 JS。
- 组件级懒加载：用 `next/dynamic` 或 `React.lazy` 按需加载大组件或第三方库。
- 支持 SSR 的动态加载（`next/dynamic`），可配置 loading 占位符、SSR 开关等。

::: details 路由级代码分割

```js
// pages/about.js 只在访问 /about 时加载
export default function About() {
  return <div>关于我们</div>;
}
```

:::

::: details 组件级懒加载（`next/dynamic`）

```js
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../components/Chart'), {
  loading: () => <p>加载中...</p>,
  ssr: false, // 只在客户端加载
});

export default function Dashboard() {
  return (
    <div>
      <h1>仪表盘</h1>
      <Chart />
    </div>
  );
}
```

:::

## Next.js 如何与后端 API 进行交互？

### 核心答案

Next.js 可在服务端（getServerSideProps、API 路由）和客户端（fetch、axios、SWR）与后端 API 交互，支持同构请求和数据预取。

#### 详细原理

- 服务端数据获取：在 getServerSideProps、getStaticProps、API 路由中用 `fetch/axios` 请求后端 API。
- 客户端数据获取：在组件内用 `fetch/axios/SWR/React Query` 请求 API。
- API 路由可作为前后端中转，处理鉴权、聚合等逻辑。

::: details 服务端 API 交互

```js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return { props: { user } };
}
```

:::

::: details 客户端 API 交互

```js
import useSWR from 'swr';

function Profile() {
  const { data } = useSWR('/api/user', url => fetch(url).then(res => res.json()));
  return <div>用户名：{data?.name}</div>;
}
```

:::

## Next.js 的 ISR（增量静态生成）是什么？如何使用？

### 核心答案

ISR（Incremental Static Regeneration）允许 Next.js 在构建后按需、定时重新生成静态页面，兼顾静态性能和动态内容更新。

#### 详细原理

- 通过 getStaticProps 返回 revalidate 字段，指定页面多久自动重新生成一次。
- 用户访问页面时，如果页面过期，Next.js 后台异步重新生成并缓存新页面。
- 适合内容频繁更新但不要求实时的场景，如博客、商品页。

::: details ISR 示例

```js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return {
    props: { posts },
    revalidate: 60, // 每60秒自动重新生成
  };
}
```

:::

## Next.js 的构建流程是怎样的？

### 核心答案

Next.js 构建流程包括：分析 pages 目录、预渲染静态页面（SSG）、生成服务端渲染入口（SSR）、打包 `JS/CSS`、输出 .next 目录。

#### 详细原理

1. 解析 pages 目录，确定所有路由和数据获取方式。
2. 对 `getStaticProps/getStaticPaths` 页面进行静态生成，输出 HTML/JSON。
3. 对 getServerSideProps 页面生成 SSR 入口。
4. 打包所有页面和组件 JS/CSS，自动代码分割。
5. 输出到 .next 目录，供生产环境部署。

::: details 构建流程命令

```bash
# 构建
npm run build

# 生成的 .next 目录结构
.next/
  ├─ static/      # 静态资源
  ├─ server/      # SSR 入口
  ├─ cache/       # 缓存
  └─ ...
```

:::

## SSR 项目部署时需要注意哪些问题？

### 核心答案

SSR 项目需保证 Node.js 服务器稳定运行，注意环境变量、API 跨域、缓存策略、CDN 配置、日志监控和安全性。

#### 详细原理

- 需部署 Node.js 服务器（如 Vercel、PM2、Docker）。
- 配置 process.env 环境变量，避免敏感信息泄露。
- 处理 API 跨域（CORS）、HTTPS、Cookie 等问题。
- 配置 CDN 缓存和反向代理，提升性能。
- 日志监控、自动重启、异常报警，保证高可用。
- 防止 SSR 注入、XSS、CSRF 等安全风险。

## Next.js 是什么？它与 React 有什么关系？Next.js 的核心特性有哪些？

### 核心答案

Next.js 是基于 React 的服务端渲染和静态网站生成框架，提供路由、数据预取、SSR/SSG/ISR、API 路由、图片优化等核心特性，极大提升 React 项目的开发效率和性能。

#### 详细原理

- Next.js 封装了 React，提供零配置的路由、数据获取、构建优化。
- 支持多种渲染模式（`SSR/SSG/CSR/ISR`）。
- 内置 API 路由、图片优化、国际化、代码分割等功能。
- 与 React 生态无缝兼容，支持所有 React 组件和 Hooks。

## Next.js 新特性有哪些？（如 App Router、Server Components 等）

### 核心答案

Next.js 新特性包括 App Router（基于 app 目录的新路由机制）、React Server Components、Layout 组件、并发渲染、Edge Middleware、增强的图片和字体优化等。

#### 详细原理

- **App Router**：基于 app 目录，支持嵌套布局、并发渲染、文件级路由。
- **Server Components**：组件可在服务端渲染，减少客户端 JS 体积。
- **Layout 组件**：支持页面级和嵌套路由的布局复用。
- **Edge Middleware**：在 CDN 边缘节点运行中间件，提升性能。
- **增强图片/字体优化**：更高效的资源加载和自定义。

::: details App Router 示例

```js
// app/page.js  =>  /
export default function HomePage() {
  return <h1>首页</h1>;
}

// app/blog/[id]/page.js  =>  /blog/123
export default function BlogDetail({ params }) {
  return <div>博客ID: {params.id}</div>;
}
```

:::

## Next.js 的核心特性有哪些？

### 核心答案

Next.js 核心特性包括：文件系统路由、`SSR/SSG/ISR`、API 路由、图片优化、代码分割、国际化、TypeScript 支持、App Router、Server Components 等。

#### 详细原理

- 零配置路由和页面自动代码分割。
- 多种渲染模式灵活切换。
- 内置 API 路由和中间件。
- 静态资源和图片优化。
- 支持 TypeScript、CSS/SCSS、Tailwind 等主流技术。
- 新版 App Router 和 Server Components 提升开发体验和性能。

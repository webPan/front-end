# Next.js

## Next.js 是什么？它与 React 有什么关系？

**核心答案：**  
Next.js 是一个基于 React 的服务端渲染（SSR）和静态网站生成（SSG）框架，它为 React 应用提供了更完善的路由、数据获取、SEO 优化等能力，使开发者能够更高效地构建生产级 Web 应用。

**原理讲解：**  
Next.js 在 React 的基础上，增加了服务端渲染、静态生成、API 路由、自动代码分割等特性。它通过约定式的文件结构（如 `pages` 目录）实现自动路由，并支持多种数据获取方式（如 `getStaticProps`、`getServerSideProps`）。Next.js 既可以在服务器端渲染页面，也可以生成静态页面，兼顾了性能和 SEO。React 负责 UI 构建，而 Next.js 则负责应用的整体架构和优化。

::: details 示例代码
```js
// pages/index.js
// 这是一个 Next.js 页面组件，支持服务端渲染
import React from 'react';

export default function Home({ time }) {
  return (
    <div>
      <h1>欢迎来到 Next.js 应用！</h1>
      <p>当前服务器时间：{time}</p>
    </div>
  );
}

// getServerSideProps 是 Next.js 提供的服务端数据获取方法
// 每次请求都会在服务端执行，返回的数据作为 props 传递给页面组件
export async function getServerSideProps() {
  return {
    props: {
      time: new Date().toLocaleString(),
    },
  };
}
```
:::


## Next.js 的核心特性有哪些？

**核心答案：**  
Next.js 的核心特性包括：服务端渲染（SSR）、静态生成（SSG）、自动代码分割、文件系统路由、API 路由、图片优化、内置 CSS/静态资源支持、TypeScript 支持、增量静态生成（ISR）、中间件、SEO 优化等。

**原理讲解：**  
Next.js 通过 `pages` 目录实现自动路由，支持多种数据获取方式（如 SSR、SSG、ISR），自动为每个页面进行代码分割，提升加载速度。内置图片优化组件 `<Image>`，支持 CSS、Sass、CSS-in-JS 等多种样式方案。通过 API 路由可直接在项目中编写后端接口。支持 TypeScript 开箱即用，并通过中间件实现请求拦截和处理。所有这些特性让开发者能高效构建高性能、易维护的 Web 应用。

::: details 示例代码
```js
// pages/about.js
// 静态生成页面
export default function About() {
  return <div>关于我们</div>;
}

// pages/api/hello.js
// API 路由示例
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API Route!' });
}

// 使用图片优化
// pages/index.js
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={120} height={60} />
    </div>
  );
}
```
:::

## Next.js 如何实现服务端渲染（SSR）？

**核心答案：**  
Next.js 通过在页面组件中导出 `getServerSideProps` 方法，实现服务端渲染。每次请求时，Next.js 会在服务器端执行该方法，获取数据后渲染页面并返回 HTML 给客户端。

**原理讲解：**  
SSR 的本质是在服务器端生成 HTML 内容，客户端直接接收到完整页面，提升首屏加载速度和 SEO。Next.js 在请求到达时调用 `getServerSideProps`，将返回的数据作为 props 传递给页面组件，最终由服务器渲染出 HTML 返回给浏览器。

::: details 示例代码
```js
// pages/ssr-demo.js
export default function SSRDemo({ data }) {
  return (
    <div>
      <h2>服务端渲染示例</h2>
      <p>数据：{data}</p>
    </div>
  );
}

// getServerSideProps 每次请求都会在服务端执行
export async function getServerSideProps() {
  // 这里可以请求数据库或第三方 API
  const data = '这是服务端渲染的数据';
  return { props: { data } };
}
```
:::

## Next.js 中的静态生成（SSG）和服务端渲染（SSR）有什么区别？

**核心答案：**  
SSG（静态生成）在构建时生成 HTML 文件，适合内容不频繁变动的页面；SSR（服务端渲染）在每次请求时动态生成 HTML，适合需要实时数据的页面。

**原理讲解：**  
SSG 通过 `getStaticProps`（和可选的 `getStaticPaths`）在构建时预渲染页面，生成静态文件，访问速度快、可被 CDN 缓存。SSR 通过 `getServerSideProps` 在每次请求时服务端渲染，适合需要实时数据的场景。两者都能提升 SEO，但适用场景不同。

::: details 示例代码
```js
// SSG 示例
// pages/static-demo.js
export default function StaticDemo({ time }) {
  return <div>页面生成时间：{time}</div>;
}

export async function getStaticProps() {
  return {
    props: { time: new Date().toLocaleString() },
    // revalidate: 60, // ISR 增量静态生成
  };
}

// SSR 示例见上一题
```
:::
 
## getStaticProps、getServerSideProps 和 getInitialProps 有什么区别？

**核心答案：**  
- `getStaticProps`：用于静态生成（SSG），构建时运行，仅页面组件可用。
- `getServerSideProps`：用于服务端渲染（SSR），每次请求时运行，仅页面组件可用。
- `getInitialProps`：可用于页面和自定义 App，支持 SSR 和客户端渲染，但已不推荐使用。

**原理讲解：**  
`getStaticProps` 只在构建时执行，适合静态内容；`getServerSideProps` 每次请求都执行，适合动态内容；`getInitialProps` 兼容性强，但会影响自动静态优化，官方推荐优先使用前两者。

::: details 示例代码
```js
// getStaticProps 示例
export async function getStaticProps() {
  return { props: { data: '静态数据' } };
}

// getServerSideProps 示例
export async function getServerSideProps() {
  return { props: { data: '服务端数据' } };
}

// getInitialProps 示例（不推荐）
function Page({ data }) {
  return <div>{data}</div>;
}
Page.getInitialProps = async () => {
  return { data: '兼容性数据' };
};
export default Page;
```
:::

## Next.js 的路由机制是怎样的？

**核心答案：**  
Next.js 采用基于文件系统的路由机制，`pages` 目录下的每个文件自动对应一个路由，支持嵌套路由、动态路由和 catch-all 路由。

**原理讲解：**  
在 `pages` 目录下创建的 `.js`、`.jsx`、`.ts`、`.tsx` 文件会自动成为路由页面。例如 `pages/about.js` 对应 `/about` 路由。通过方括号（如 `[id].js`）实现动态路由，通过 `[...slug].js` 实现 catch-all 路由。无需手动配置路由表，开发效率高。

::: details 示例代码
```js
// pages/about.js -> /about
// pages/blog/[id].js -> /blog/123
// pages/docs/[...slug].js -> /docs/a/b/c

// pages/blog/[id].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  return <div>当前博客ID：{id}</div>;
}
```
:::

## 动态路由和 catch-all 路由如何实现？

**核心答案：**  
动态路由通过在 `pages` 目录下使用方括号命名（如 `[id].js`）实现；catch-all 路由通过 `[...param].js` 实现，支持多级路径匹配。

**原理讲解：**  
Next.js 解析 `pages` 目录下的 `[param].js` 文件，将 URL 中对应部分作为参数传递给页面。`[...param].js` 可匹配任意深度的路径片段，常用于文档、分类等多级路由场景。

::: details 示例代码
```js
// pages/user/[id].js
import { useRouter } from 'next/router';

export default function User() {
  const { id } = useRouter().query;
  return <div>用户ID：{id}</div>;
}

// pages/docs/[...slug].js
export default function Docs({ params }) {
  return <div>路径参数：{JSON.stringify(params)}</div>;
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  return { props: { params } };
}
```
:::



## 如何在 Next.js 中实现 API 路由？

**核心答案：**  
在 Next.js 的 `pages/api` 目录下创建 JS/TS 文件即可自动成为 API 路由，每个文件导出一个处理函数，支持 RESTful 风格，适合处理后端逻辑、数据接口等。

**原理讲解：**  
Next.js 会将 `pages/api` 目录下的每个文件映射为一个 API 路由，文件名即为接口路径。导出的函数接收 `req` 和 `res` 两个参数，分别代表请求和响应对象。可以处理 GET、POST、PUT、DELETE 等 HTTP 方法，适合轻量级后端开发或前后端一体化项目。

::: details 示例代码
```js
// pages/api/hello.js
// 访问 /api/hello 时会执行此函数
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello, Next.js API!' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
```
:::

## Next.js 如何进行页面跳转和导航？

**核心答案：**  
Next.js 推荐使用内置的 `<Link>` 组件进行页面跳转，或使用 `useRouter` 钩子的 `push` 方法进行编程式导航。

**原理讲解：**  
`<Link>` 组件实现了客户端路由跳转，避免页面刷新，提升用户体验。`useRouter` 提供了路由对象，可以通过 `router.push`、`router.replace` 等方法在代码中实现跳转。两者都支持传递 query 参数和动态路由。

::: details 示例代码
```js
// 使用 Link 组件跳转
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/about">
        <a>跳转到关于页</a>
      </Link>
    </div>
  );
}

// 编程式跳转
import { useRouter } from 'next/router';

export default function JumpButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/contact')}>
      跳转到联系页
    </button>
  );
}
```
:::

## 如何在 Next.js 中做数据预取（Data Fetching）？

**核心答案：**  
Next.js 支持三种数据预取方式：`getStaticProps`（静态生成）、`getServerSideProps`（服务端渲染）、`getInitialProps`（兼容模式），分别适用于不同的数据获取场景。

**原理讲解：**  
- `getStaticProps`：构建时获取数据，适合静态内容。
- `getServerSideProps`：每次请求时获取数据，适合动态内容。
- `getInitialProps`：页面和自定义 App 可用，兼容 SSR 和客户端渲染，但不推荐新项目使用。

这些方法会在页面渲染前执行，将数据作为 props 传递给页面组件。

::: details 示例代码
```js
// getStaticProps 示例
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

// getServerSideProps 示例
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return { props: { user } };
}
```
:::

## Next.js 如何实现图片优化（Image Optimization）？

**核心答案：**  
Next.js 提供内置的 `<Image>` 组件，支持自动图片压缩、懒加载、自适应尺寸等优化功能，提升页面性能和加载速度。

**原理讲解：**  
`<Image>` 组件会根据设备分辨率和屏幕大小自动选择合适的图片尺寸，并支持懒加载和 WebP 格式。图片会通过 Next.js 的图片优化服务进行压缩和裁剪，减少带宽消耗。开发者只需指定图片源、宽高等参数即可。

::: details 示例代码
```js
import Image from 'next/image';

export default function Avatar() {
  return (
    <div>
      <Image
        src="/avatar.png" // 本地图片或远程图片
        alt="用户头像"
        width={100}
        height={100}
        quality={80} // 图片质量，默认 75
        placeholder="blur" // 支持模糊占位
      />
    </div>
  );
}
```
:::

## 如何配置自定义 Document 和 App？

**核心答案：**  
通过在 `pages` 目录下创建 `_document.js` 和 `_app.js` 文件，分别自定义 HTML 结构和全局应用逻辑，如全局样式、布局、状态管理等。

**原理讲解：**  
- `_document.js` 只在服务端渲染时运行，用于自定义 `<html>`、`<body>` 等标签，常用于引入字体、设置 meta。
- `_app.js` 用于自定义页面初始化，可以包裹全局 Provider、引入全局 CSS、实现页面切换动画等。

::: details 示例代码
```js
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  // 可以在这里包裹全局 Provider
  return <Component {...pageProps} />;
}
```
:::

## 如何在 Next.js 中使用中间件（Middleware）？

**核心答案：**  
Next.js 通过在项目根目录下创建 `middleware.js` 文件实现中间件功能，可在请求到达页面前拦截、重定向、鉴权等。

**原理讲解：**  
中间件运行在 Edge Runtime（边缘运行时），可对请求进行处理，如重定向、设置响应头、鉴权等。中间件支持基于路径的匹配，执行效率高，适合做全局拦截和安全控制。

::: details 示例代码
```js
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 简单的鉴权示例
  const token = request.cookies.get('token');
  if (!token) {
    // 未登录则重定向到登录页
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // 允许请求继续
  return NextResponse.next();
}

// 可通过 matcher 精确控制中间件作用路径
export const config = {
  matcher: ['/dashboard/:path*'],
};
```
:::


## 如何在 Next.js 中实现国际化（i18n）？

**核心答案：**  
Next.js 通过在 `next.config.js` 配置 `i18n` 字段实现内置国际化支持，支持多语言路由、自动语言检测，也可结合第三方库（如 next-i18next）实现内容翻译。

**原理讲解：**  
在 `next.config.js` 中配置 `locales` 和 `defaultLocale`，Next.js 会自动为每种语言生成对应的路由前缀（如 `/en/about`、`/zh/about`）。可通过 `useRouter` 获取当前语言，结合第三方库实现内容多语言切换和翻译。

::: details 示例代码
```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
    localeDetection: true, // 自动检测用户语言
  },
};

// pages/about.js
import { useRouter } from 'next/router';

export default function About() {
  const { locale } = useRouter();
  return (
    <div>
      {locale === 'zh' ? '关于我们' : 'About Us'}
    </div>
  );
}
```
:::

## 如何在 Next.js 中配置环境变量？

**核心答案：**  
在项目根目录下创建 `.env` 文件，定义环境变量，Next.js 会自动加载。以 `NEXT_PUBLIC_` 开头的变量可在客户端访问，其他变量仅服务端可用。

**原理讲解：**  
Next.js 支持 `.env`、`.env.local`、`.env.development`、`.env.production` 等多种环境变量文件。通过 `process.env.变量名` 访问。以 `NEXT_PUBLIC_` 开头的变量会被打包到前端代码中，适合公开信息。

::: details 示例代码
```env
# .env
API_SECRET=server_secret
NEXT_PUBLIC_API_URL=https://api.example.com
```

```js
// pages/env-demo.js
export default function EnvDemo() {
  return (
    <div>
      {/* 只能访问 NEXT_PUBLIC_ 开头的变量 */}
      <p>API 地址：{process.env.NEXT_PUBLIC_API_URL}</p>
    </div>
  );
}

// 服务端代码可以访问所有变量
export async function getServerSideProps() {
  const secret = process.env.API_SECRET; // 仅服务端可用
  return { props: {} };
}
```
:::

## 如何在 Next.js 中做代码分割和懒加载？

**核心答案：**  
Next.js 默认对每个页面自动进行代码分割，并可通过 `next/dynamic` 实现组件级懒加载，提升首屏加载速度。

**原理讲解：**  
每个页面只加载自身依赖的 JS 代码，减少初始包体积。通过 `next/dynamic` 动态导入组件，按需加载，支持 SSR 和客户端渲染两种模式。可结合 loading 占位符优化用户体验。

::: details 示例代码
```js
// 动态导入组件
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>加载中...</p>,
  ssr: false, // 只在客户端渲染
});

export default function Page() {
  return (
    <div>
      <h2>首页</h2>
      <DynamicComponent />
    </div>
  );
}
```
:::

## 如何在 Next.js 中集成 CSS、Sass、Styled-components 等样式方案？

**核心答案：**  
Next.js 支持多种样式方案：全局 CSS、CSS Modules、Sass、CSS-in-JS（如 styled-components、emotion），可根据需求灵活选择和集成。

**原理讲解：**  
- 全局 CSS 需在 `_app.js` 中引入。
- CSS Modules 通过 `xxx.module.css` 文件实现局部样式隔离。
- 安装 `sass` 包后可直接使用 `.scss`/`.sass` 文件。
- styled-components/emotion 等 CSS-in-JS 方案需额外配置 Babel 插件和自定义 Document 以支持 SSR。

::: details 示例代码
```js
// 全局 CSS：在 pages/_app.js 中引入
import '../styles/globals.css';

// CSS Modules：组件内引入
import styles from './Home.module.css';
export default function Home() {
  return <div className={styles.title}>首页</div>;
}

// Sass：安装 sass 后直接引入 .scss 文件
import '../styles/main.scss';

// styled-components 示例
import styled from 'styled-components';
const Button = styled.button`
  color: white;
  background: #0070f3;
`;
export default function StyledBtn() {
  return <Button>按钮</Button>;
}
```
:::

## 如何部署 Next.js 应用？常见的部署平台有哪些？

**核心答案：**  
Next.js 应用可部署到 Vercel、Netlify、阿里云、腾讯云、传统服务器等平台。Vercel 是官方推荐平台，支持一键部署和自动化构建。

**原理讲解：**  
Next.js 支持多种部署模式：静态导出（`next export`）、Node.js 服务器（`next start`）、Serverless/FaaS。Vercel、Netlify 支持自动化部署和预览，云服务器可通过 Docker 或 PM2 部署。根据项目需求选择合适的部署方式。

::: details 示例代码
```bash
# Vercel 部署（推荐）
npm i -g vercel
vercel

# 传统服务器部署
npm run build
npm start

# 静态导出
npm run build
npm run export
# 导出的静态文件在 out 目录，可部署到任意静态托管平台
```
:::


## Next.js 如何与后端 API 进行交互？

**核心答案：**  
Next.js 可以在服务端（如 `getServerSideProps`、`getStaticProps`、API 路由）或客户端（如 `useEffect`）通过 fetch/axios 等方式与后端 API 交互，实现数据获取和提交。

**原理讲解：**  
- 服务端数据获取：在 `getServerSideProps` 或 `getStaticProps` 中直接请求后端 API，数据在页面渲染前获取，适合 SSR/SSG 场景。
- 客户端数据获取：在组件内通过 `useEffect` 等钩子请求 API，适合用户交互后动态获取数据。
- API 路由：可将 Next.js 作为 BFF（后端 for 前端），在 `pages/api` 下编写接口，前端通过 `/api/xxx` 访问。

::: details 示例代码
```js
// 服务端获取数据
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return { props: { user } };
}

// 客户端获取数据
import { useEffect, useState } from 'react';
export default function ClientFetch() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(setData);
  }, []);
  return <div>{data ? data.message : '加载中...'}</div>;
}
```
:::

## 如何在 Next.js 中实现 SEO 优化？

**核心答案：**  
Next.js 支持服务端渲染和静态生成，提升页面可被搜索引擎抓取的能力，并可通过 `next/head` 组件灵活设置页面 title、meta、OG 等 SEO 信息。

**原理讲解：**  
SSR/SSG 让页面 HTML 在服务端生成，搜索引擎可直接抓取内容。`next/head` 允许在每个页面自定义 SEO 标签。还可结合 sitemap、robots.txt、结构化数据等进一步优化 SEO。

::: details 示例代码
```js
import Head from 'next/head';

export default function SEOPage() {
  return (
    <>
      <Head>
        <title>Next.js SEO 优化示例</title>
        <meta name="description" content="这是一个 Next.js SEO 优化页面" />
        <meta property="og:title" content="Next.js SEO" />
      </Head>
      <div>内容区域</div>
    </>
  );
}
```
:::

## Next.js 的 ISR（增量静态生成）是什么？如何使用？

**核心答案：**  
ISR（Incremental Static Regeneration，增量静态生成）允许 Next.js 在构建后按需、定时地重新生成静态页面，实现静态与动态的结合，提升性能和实时性。

**原理讲解：**  
通过在 `getStaticProps` 返回对象中设置 `revalidate` 字段，Next.js 会在页面被访问时，后台异步重新生成页面并缓存，保证数据的时效性和高性能。适合内容频繁变动但不要求实时的场景。

::: details 示例代码
```js
// pages/isr-demo.js
export default function ISRDemo({ time }) {
  return <div>页面生成时间：{time}</div>;
}

export async function getStaticProps() {
  return {
    props: { time: new Date().toLocaleString() },
    revalidate: 10, // 每 10 秒重新生成一次页面
  };
}
```
:::

## 如何在 Next.js 中处理 404 和自定义错误页面？

**核心答案：**  
在 `pages` 目录下创建 `404.js` 和 `500.js` 文件，分别自定义 404（未找到）和 500（服务器错误）页面，Next.js 会自动识别并渲染。

**原理讲解：**  
`404.js` 用于处理未匹配到的路由，`500.js` 用于处理运行时错误。可自定义页面内容、样式和跳转逻辑，提升用户体验。

::: details 示例代码
```js
// pages/404.js
export default function Custom404() {
  return <h1>404 - 页面未找到</h1>;
}

// pages/500.js
export default function Custom500() {
  return <h1>500 - 服务器内部错误</h1>;
}
```
:::

## Next.js 的构建流程是怎样的？

**核心答案：**  
Next.js 构建流程包括：分析 pages 目录、预渲染页面（SSG/SSR）、生成静态资源、打包 JS/CSS、输出构建产物，最终可通过 `next start` 启动生产环境服务。

**原理讲解：**  
- 解析 `pages` 目录，生成路由映射。
- 执行 `getStaticProps`/`getStaticPaths` 生成静态页面，执行 `getServerSideProps` 配置 SSR 页面。
- 自动代码分割，优化资源加载。
- 输出 `.next` 目录，包含所有构建产物。
- 生产环境通过 `next start` 启动，支持 SSR/SSG/ISR。

::: details 示例代码
```bash
# 构建命令
npm run build
# 产物在 .next 目录
# 启动生产环境
npm start
```
:::

## 如何在 Next.js 中使用 TypeScript？

**核心答案：**  
在 Next.js 项目根目录下添加 `tsconfig.json` 或将页面/组件文件扩展名改为 `.ts`/`.tsx`，Next.js 会自动检测并集成 TypeScript，支持类型检查和类型推导。

**原理讲解：**  
首次引入 TypeScript 文件时，Next.js 会自动生成 `tsconfig.json` 并安装依赖。页面、组件、API 路由均可使用 TypeScript，提升开发体验和代码质量。

::: details 示例代码
```tsx
// pages/index.tsx
import type { NextPage } from 'next';

interface Props {
  title: string;
}

const Home: NextPage<Props> = ({ title }) => (
  <h1>{title}</h1>
);

export async function getStaticProps() {
  return { props: { title: 'TypeScript 支持' } };
}

export default Home;
```
:::

## Next.js 新特性有哪些？（如 App Router、Server Components 等）

**核心答案：**  
Next.js 13+ 引入了 App Router（基于 `app` 目录的新路由系统）、React Server Components、Layout 机制、Streaming SSR、内置中间件等新特性，提升开发体验和性能。

**原理讲解：**  
- App Router：基于 `app` 目录，支持嵌套路由、布局、服务端组件等。
- Server Components：允许在服务端渲染组件，减少客户端 JS 体积。
- Layouts：支持页面级布局复用。
- Streaming SSR：支持流式渲染，提升大页面首屏速度。
- 内置中间件和更灵活的数据获取方式。

::: details 示例代码
```tsx
// app/page.tsx (App Router 示例)
export default function Page() {
  return <h1>App Router 首页</h1>;
}

// app/layout.tsx (布局)
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <header>头部</header>
        {children}
        <footer>底部</footer>
      </body>
    </html>
  );
}

// Server Component 示例
// app/server-component.tsx
export default async function ServerComponent() {
  const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
  const data = await res.json();
  return <div>{data.value}</div>;
}
```
:::


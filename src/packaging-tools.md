# 打包工具

## 常见前端构建工具及其特点有哪些？

### 核心答案

常见前端构建工具有 Webpack、Vite、Rollup、Parcel、Gulp、Grunt 等。它们的主要特点包括：模块打包、热更新、代码分割、插件/Loader 扩展、自动化任务处理等。Webpack 适合大型项目，Vite 启动快、热更新快，Rollup 更适合库打包，Gulp/Grunt 适合自动化流程。

### 原理详解

前端构建工具的核心作用是将源代码（如 ES6+、TypeScript、Sass、图片等）转换为浏览器可识别的代码，并进行优化（如压缩、分割、缓存等）。  

- Webpack：以模块为单位，支持 Loader/Plugin 扩展，适合复杂项目，支持 Tree Shaking、代码分割等高级特性。  
- Vite：基于原生 ES Module，开发时按需加载，启动极快，生产环境用 Rollup 打包。  
- Rollup：专注于打包 JavaScript 库，生成体积更小、结构更清晰的包。  
- Parcel：零配置，自动推断依赖，适合中小型项目。  
- Gulp/Grunt：基于任务流，适合自动化构建流程，如压缩、编译、监听等。

::: details Webpack 基本配置示例

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 js 文件
        use: 'babel-loader', // 使用 babel-loader 转译 ES6+
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 匹配 css 文件
        use: ['style-loader', 'css-loader'], // 依次处理
      },
    ],
  },
  plugins: [
    // 可配置插件，如 HtmlWebpackPlugin
  ],
  devServer: {
    hot: true, // 开启热更新
  },
};
```

:::

::: details Vite 基本配置示例

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // 项目根目录
  build: {
    outDir: '../dist', // 输出目录
  },
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
  },
});
```

:::

::: details Rollup 打包库示例

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js', // 入口文件
  output: [
    {
      file: 'dist/bundle.cjs.js', // CommonJS 格式
      format: 'cjs',
    },
    {
      file: 'dist/bundle.esm.js', // ESModule 格式
      format: 'esm',
    },
  ],
  plugins: [
    resolve(), // 解析 node_modules
    commonjs(), // 支持 CommonJS
    babel({ babelHelpers: 'bundled' }), // 转译 ES6+
  ],
  external: ['react'], // 不打包 react
};
```

:::

::: details Parcel 零配置打包示例

```html
// 只需在项目根目录下有如下结构即可，无需配置文件
// src/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Parcel Demo</title>
</head>
<body>
  <script src="./index.js"></script>
</body>
</html>

// src/index.js
import './style.css';
console.log('Hello Parcel!');

// src/style.css
body {
  background: #f0f0f0;
}
```

> 运行命令：`parcel src/index.html`，Parcel 会自动推断并打包所有依赖。
:::

::: details Gulp 自动化任务示例

```js
// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

// 编译 Sass
gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// 监听文件变化
gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', gulp.series('sass'));
});

// 默认任务
gulp.task('default', gulp.series('sass', 'watch'));
```

:::

::: details Grunt 自动化任务示例

```js
// Gruntfile.js
module.exports = function(grunt) {
  // 配置任务
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // 加载插件
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 注册默认任务
  grunt.registerTask('default', ['sass', 'watch']);
};
```

:::

## Webpack 的核心原理与完整打包流程解析

### 核心答案

Webpack 以模块为单位，从入口文件递归解析依赖，利用 Loader 处理各种资源，通过 Plugin 扩展功能，最终输出优化后的静态资源文件。

### 原理详解

1. **入口（Entry）**：指定打包的起点文件。
2. **依赖收集**：递归分析入口文件的依赖关系，形成依赖图。
3. **Loader 处理**：遇到非 JS 文件（如 CSS、图片等），通过 Loader 转换为可被打包的模块。
4. **Plugin 扩展**：在打包生命周期的各个阶段插入自定义逻辑，如压缩、注入环境变量等。
5. **输出（Output）**：将所有模块合并，输出到指定目录和文件。
6. **优化**：如 Tree Shaking、代码分割、缓存优化等。

::: details Webpack 打包流程简化示例

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口
  output: {
    filename: 'main.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 每次构建清理 dist
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 处理 CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/, // 处理图片
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }), // 自动生成 HTML
  ],
  mode: 'production', // 生产模式
};
```

:::

## 如何提升 Webpack 的打包速度？常用优化方案汇总

### 核心答案

提升 Webpack 打包速度的常用优化方案包括：合理配置 Loader、使用多进程/多线程、开启缓存、减少模块体积、利用 DLLPlugin、按需加载、升级依赖、使用持久化缓存、缩小文件搜索范围等。这些措施可以显著缩短构建时间，提升开发效率。

### 原理详解

1. **Loader 优化**  
   - 只对必要目录使用 Loader，避免对 node_modules 等无关目录进行转译。
   - 合理配置 include/exclude，减少不必要的文件处理。

2. **多进程/多线程**  
   - 利用 thread-loader、HappyPack 等工具，将 Loader 任务分发到多个线程并行处理，提升编译速度。

3. **缓存机制**  
   - 启用 babel-loader、terser-webpack-plugin 等 Loader/插件的缓存功能，避免重复编译未变更的模块。
   - Webpack 5 内置持久化缓存（filesystem cache），可大幅提升二次构建速度。

4. **DLLPlugin 动态链接库**  
   - 将第三方库单独打包，主包只需引用 DLL，减少每次构建时的重复打包。

5. **按需加载与代码分割**  
   - 通过动态 import 和 SplitChunksPlugin 实现代码分割，减少单次打包体积。

6. **依赖升级与优化**  
   - 升级 Webpack 及相关依赖到最新版本，利用新特性和性能优化。
   - 移除无用依赖，减少打包体积。

7. **缩小文件搜索范围**  
   - 配置 resolve.modules、alias、extensions，减少模块解析时的查找路径和文件类型。

::: details Loader 优化与缓存

```bash
// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 启用缓存，加快二次构建
          },
        },
      ],
      exclude: /node_modules/, // 排除 node_modules，提升速度
    },
  ],
},
```

:::

::: details 多进程/多线程 Loader

```bash
// webpack.config.js
const ThreadLoader = require('thread-loader');

module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        'thread-loader', // 多线程处理 JS
        'babel-loader',
      ],
    },
  ],
},
```

:::

::: details Webpack 5 持久化缓存

```js
// webpack.config.js
module.exports = {
  // ...其他配置
  cache: {
    type: 'filesystem', // 使用文件系统缓存
  },
};
```

:::

::: details DLLPlugin 配置

```js
// webpack.dll.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'], // 需要单独打包的库
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, 'dll/[name].manifest.json'),
    }),
  ],
};
```

:::

::: details SplitChunksPlugin 代码分割

```bash
// webpack.config.js 
optimization: {
  splitChunks: {
    chunks: 'all', // 自动分割所有模块
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
},
```

:::

::: details 缩小文件搜索范围

```bash
// webpack.config.js
resolve: {
  modules: [path.resolve(__dirname, 'src'), 'node_modules'], // 优先查找 src
  alias: {
    '@': path.resolve(__dirname, 'src'), // 路径别名
  },
  extensions: ['.js', '.jsx', '.json'], // 只解析这些后缀
},
```

:::

## 什么是 Webpack Loader？常见 Loader 类型介绍

### 核心答案

Loader 是 Webpack 用于处理非 JS 文件的转换器，常见类型有：babel-loader、css-loader、style-loader、file-loader、url-loader、sass-loader 等。

### 原理详解

- Loader 本质是一个函数，接收源文件内容，返回转换后的内容。
- 支持链式调用，从右到左依次处理。
- 常用于转译 JS（如 ES6+）、处理样式、图片、字体等资源。

::: details 常见 Loader 配置

```bash
// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      use: 'babel-loader', // 转译 ES6+
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'], // 处理 CSS
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: 'url-loader', // 处理图片
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'], // 处理 Sass
    },
  ],
},
```

:::

## Loader 与 Plugin 有何区别？各自的应用场景是什么？

### 核心答案

Loader 用于资源转换（如 JS、CSS、图片），作用于模块加载阶段；Plugin 用于扩展 Webpack 功能，作用于打包生命周期的各个阶段。

### 原理详解

- **Loader**：本质是函数，处理文件内容，常用于编译、转译、预处理。
- **Plugin**：本质是类，通过钩子机制参与 Webpack 的编译、打包、输出等流程，适合做全局性任务，如压缩、注入变量、生成文件等。

::: details Loader 示例

```bash
// 处理 ES6+ 语法
{
  test: /\.js$/,
  use: 'babel-loader',
}
```

:::

::: details Plugin 示例

```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html', // 自动生成 HTML 并注入资源
  }),
]
```

:::

## Webpack 热更新（HMR）机制原理详解

### 核心答案

HMR（Hot Module Replacement）通过 WebSocket 通信，仅替换变更模块，无需刷新整个页面，实现高效开发体验。

### 原理详解

- 开发服务器（如 webpack-dev-server）与浏览器建立 WebSocket 连接。
- 代码变更后，Webpack 重新编译生成新模块。
- 只将变更模块通过 WebSocket 推送到客户端，客户端用新模块替换旧模块。
- 保持应用状态不丢失，提升开发效率。

::: details 开启 HMR 的配置

```bash
// webpack.config.js
devServer: {
  hot: true, // 开启热更新
  open: true, // 自动打开浏览器
  port: 8080,
},
```

:::

::: details 模块热替换 API

```bash
// src/index.js
if (module.hot) {
  module.hot.accept('./module.js', function() {
    // 监听 module.js 变化并热替换
    console.log('module.js updated!');
  });
}
```

:::

## Webpack 与 Vite 的区别及其打包与热更新机制对比

### 核心答案

Webpack 采用“打包后开发”，启动慢但兼容性强，热更新基于模块替换；Vite 利用原生 ES Module，开发时无需打包，启动极快，热更新基于模块热替换和浏览器原生能力。

### 原理详解

- **Webpack**：开发时将所有模块打包成 bundle，变更后需重新构建，热更新通过 HMR 插件实现，适合大型复杂项目。
- **Vite**：开发时基于原生 ES Module，按需加载，变更只需重新请求受影响模块，启动和热更新速度极快，生产环境用 Rollup 打包。
- **热更新机制**：Webpack 通过 WebSocket 通知客户端替换模块，Vite 直接利用浏览器能力和 HMR 协议，更新更快。

::: details Webpack 热更新配置

```bash
// webpack.config.js
devServer: {
  hot: true,
  open: true,
  port: 3000,
}
```

:::

::: details Vite 热更新配置

```js
// vite.config.js
export default {
  server: {
    port: 3000,
    open: true,
    hmr: true, // 默认开启
  }
}
```

:::

## Vite 与 Webpack 的代码分割优化方案有哪些？

### 核心答案

Webpack 通过动态 import 和 SplitChunksPlugin 实现代码分割；Vite 依赖 Rollup 的动态 import 和 manualChunks 配置实现分割，二者都支持按需加载和懒加载。

### 原理详解

- **Webpack**：使用 `import()` 实现路由级/组件级分割，SplitChunksPlugin 自动提取公共模块。
- **Vite**：开发时自动分割，生产环境通过 Rollup 的 manualChunks 手动分包，支持更灵活的分割策略。

::: details Webpack 动态 import 代码分割

```js
// src/router.js
const Home = () => import('./Home');
const About = () => import('./About');
```

:::

::: details Webpack SplitChunksPlugin 配置

```bash
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all', // 自动分割所有模块
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
}
```

:::

::: details Vite manualChunks 配置

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'react'], // 单独分包
        },
      },
    },
  },
});
```

:::

## 如何通过 CDN 优化 Vite 和 Webpack 的资源加载？

### 核心答案

通过 CDN 加载第三方库，减少主包体积和服务器压力，Webpack 可用 externals 配置，Vite 可用 plugins 或 build.rollupOptions.external 配置。

### 原理详解

- **Webpack**：通过 externals 配置不打包指定库，HTML 模板中用 CDN 引入。
- **Vite**：通过 external 配置排除打包，或用 vite-plugin-cdn-import 插件自动注入 CDN 链接。

::: details Webpack externals 配置

```js
// webpack.config.js
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
// index.html
<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>
```

:::

::: details Vite CDN 插件用法

```js
// vite.config.js
import { defineConfig } from 'vite';
import cdnImport from 'vite-plugin-cdn-import';

export default defineConfig({
  plugins: [
    cdnImport({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js',
        },
      ],
    }),
  ],
});
```

:::

## npm、yarn、pnpm 有哪些区别？如何选择？

### 核心答案

npm、yarn、pnpm 都是包管理工具。npm 原生、生态最大，yarn 安装速度快、支持 workspaces，pnpm 体积最小、速度最快、硬链接机制节省空间。选择时推荐 pnpm/yarn 管理大型项目，npm 兼容性最好。

### 原理详解

- **npm**：Node.js 官方包管理器，支持 lock 文件，社区最大。
- **yarn**：Facebook 推出，速度快，支持离线缓存、workspaces。
- **pnpm**：采用硬链接存储依赖，极大节省磁盘空间，安装速度极快，支持 monorepo。
- **选择建议**：小型项目用 npm，团队协作/monorepo 推荐 pnpm/yarn。

::: details 常用命令对比

```sh
# 安装依赖
npm install
yarn install
pnpm install

# 添加依赖
npm install lodash
yarn add lodash
pnpm add lodash

# 移除依赖
npm uninstall lodash
yarn remove lodash
pnpm remove lodash
```

:::

## npm install 的依赖安装机制详解

### 核心答案

npm install 会解析 package.json，递归下载依赖及其子依赖，生成 node_modules 目录和 lock 文件，确保依赖版本一致。

### 原理详解

- 读取 package.json，确定依赖列表。
- 递归解析每个依赖的 package.json，下载所有依赖及其依赖。
- 生成 node_modules 目录，采用扁平化结构避免重复安装。
- 生成/更新 package-lock.json，锁定依赖树，保证团队一致性。

::: details package.json 示例

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "lodash": "^4.17.21"
  }
}
```

:::

::: details 安装流程伪代码

```js
// 伪代码
function npmInstall() {
  const dependencies = readPackageJson();
  for (const dep of dependencies) {
    download(dep);
    const subDeps = readPackageJson(dep);
    // 递归安装子依赖
    npmInstall(subDeps);
  }
  updateNodeModules();
  updateLockFile();
}
```

:::

## 为什么 Vite 的启动速度快于 Webpack？

### 核心答案

Vite 利用原生 ES Module，开发时无需打包，按需加载模块，省去 Webpack 的预打包和构建过程，启动极快。

### 原理详解

- Vite 直接将源码通过 ES Module 提供给浏览器，只有被访问的模块才会即时编译。
- Webpack 启动时需将所有依赖打包成 bundle，项目越大启动越慢。
- Vite 只在生产环境打包，开发环境极致轻量。

::: details Vite 启动流程伪代码

```js
// 伪代码
if (isDev) {
  // 直接用 ES Module 提供源码
  serveSourceAsESM();
} else {
  // 生产环境用 Rollup 打包
  bundleWithRollup();
}
```

:::

## Vite 的热更新原理及实现方式

### 核心答案

Vite 利用原生 ES Module 和 WebSocket，实现模块级热更新（HMR），只替换变更模块，极大提升开发效率。

### 原理详解

- Vite 启动开发服务器后，浏览器与服务器建立 WebSocket 连接。
- 源码变更时，Vite 只重新编译受影响的模块，并通过 WebSocket 通知客户端。
- 浏览器接收到变更后，仅替换对应模块，无需刷新页面，状态不丢失。
- 利用 ES Module 的动态导入和依赖追踪，精确定位受影响模块。

::: details Vite 热更新伪代码

```js
// 伪代码
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 仅替换当前模块
    render(newModule);
  });
}
```

:::

## Rollup 简介及其与 Webpack 的对比分析

### 核心答案

Rollup 专注于打包 JavaScript 库，输出体积小、Tree Shaking 效果好，适合类库开发；Webpack 功能更全，适合复杂应用项目。

### 原理详解

- **Rollup**：采用 ES Module 静态分析，能更彻底地移除无用代码（Tree Shaking），输出格式多样（ESM、CJS、UMD），配置简单，适合打包 npm 库。
- **Webpack**：支持多种资源类型（JS、CSS、图片等），插件/Loader 生态丰富，适合大型前端应用。
- **对比**：Rollup 打包结果更精简，Webpack 兼容性和扩展性更强。

::: details Rollup 打包库配置

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/bundle.esm.js', format: 'esm' },
    { file: 'dist/bundle.cjs.js', format: 'cjs' },
  ],
  plugins: [resolve(), commonjs()],
  external: ['react'], // 不打包 react
};
```

:::

## package-lock.json 与 yarn.lock 的作用是什么？

### 核心答案

package-lock.json 和 yarn.lock 都用于锁定依赖树，确保团队成员和 CI 环境安装的依赖版本完全一致，避免“同包不同版本”问题。

### 原理详解

- 记录每个依赖及其子依赖的精确版本号、下载地址、完整性校验等信息。
- 安装依赖时优先读取 lock 文件，保证依赖树一致性。
- package-lock.json 由 npm 生成，yarn.lock 由 yarn 生成，pnpm 也有 pnpm-lock.yaml。

::: details package-lock.json 片段

```json
{
  "name": "demo",
  "lockfileVersion": 2,
  "dependencies": {
    "lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-..."
    }
  }
}
```

:::

## 如何解决前端依赖包冗余与体积过大的问题？

### 核心答案

可通过 Tree Shaking、代码分割、按需加载、使用 CDN、优化依赖、移除未用包等方式，减少冗余和体积。

### 原理详解

- **Tree Shaking**：移除未被引用的代码。
- **代码分割**：按需加载，减少首屏体积。
- **按需引入**：如 lodash-es、babel-plugin-import。
- **CDN 加载**：大库用 CDN，不打包进主包。
- **依赖优化**：定期检查、移除无用依赖。
- **图片/资源压缩**：减少静态资源体积。

::: details 按需引入 lodash

```js
// 只引入需要的函数
import debounce from 'lodash/debounce';
```

:::

::: details babel-plugin-import 用法（以 antd 为例）

```js
// babel.config.js
module.exports = {
  plugins: [
    ['import', { libraryName: 'antd', style: 'css' }],
  ],
};
```

:::

## 常见自动化构建工具（如 Gulp、Grunt）及其与 Webpack 的区别

### 核心答案

Gulp/Grunt 基于任务流，适合自动化流程（如编译、压缩、监听）；Webpack 以模块为中心，自动处理依赖和资源，适合现代前端工程化。

### 原理详解

- **Gulp/Grunt**：通过配置任务（task），串联各种插件，实现文件编译、压缩、监听等自动化操作，适合简单项目或定制化流程。
- **Webpack**：自动分析依赖，打包所有资源，支持 Loader/Plugin 扩展，适合复杂项目和 SPA 应用。

::: details Gulp 自动化任务

```js
const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('minify', function () {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
```

:::

::: details Grunt 自动化任务

```js
module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: 'src/*.js',
        dest: 'dist/app.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
```

:::

## 模块化开发（CommonJS、ESM、AMD）及其在构建工具中的应用

### 核心答案

CommonJS 用于 Node.js，ESM 是现代浏览器和构建工具的标准，AMD 主要用于浏览器异步加载。Webpack、Vite、Rollup 等支持多种模块化规范，推荐使用 ESM。

### 原理详解

- **CommonJS**：同步加载，`require`/`module.exports`，Node.js 默认。
- **ESM**：静态分析，`import`/`export`，支持 Tree Shaking，现代前端主流。
- **AMD**：异步加载，`define`/`require`，如 RequireJS。
- 构建工具会将各种模块规范统一打包为浏览器可识别的格式。

::: details CommonJS 示例

```js
// a.js
module.exports = function() { return 'hello'; }
// b.js
const a = require('./a');
console.log(a());
```

:::

::: details ESM 示例

```js
// a.js
export default function() { return 'hello'; }
// b.js
import a from './a.js';
console.log(a());
```

:::

::: details AMD 示例

```js
// main.js
define(['./a'], function(a) {
  console.log(a());
});
```

:::

## Webpack 如何实现代码分割（Code Splitting）？

### 核心答案

Webpack 通过动态 import、SplitChunksPlugin 和多入口配置实现代码分割，提升加载效率和首屏速度。

### 原理详解

- **动态 import**：使用 `import()` 语法实现路由级、组件级懒加载，按需加载模块。
- **SplitChunksPlugin**：自动提取公共依赖，减少重复代码。
- **多入口**：为不同页面配置不同入口，实现多页面应用分割。

::: details 动态 import 代码分割

```js
// src/router.js
const Home = () => import('./Home');
const About = () => import('./About');
// 只有访问到对应路由时才会加载对应模块
```

:::

::: details SplitChunksPlugin 配置

```js
// webpack.config.js
module.exports = {
  // ...其他配置
  optimization: {
    splitChunks: {
      chunks: 'all', // 分割所有类型的代码
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

:::

::: details 多入口配置

```js
// webpack.config.js
module.exports = {
  entry: {
    index: './src/index.js',
    admin: './src/admin.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  },
};
```

:::

## 什么是 Tree Shaking？Webpack 如何实现 Tree Shaking？

### 核心答案

Tree Shaking 是移除未被引用（dead code）的代码优化技术。Webpack 通过 ES Module 静态分析和 Uglify/Terser 压缩实现 Tree Shaking。

### 原理详解

- 仅支持 ES Module（import/export），因为其静态结构便于分析依赖。
- Webpack 标记哪些导出被使用，未被使用的代码不会被打包进最终产物。
- 生产模式下结合 TerserPlugin 进一步移除无用代码。

::: details Tree Shaking 示例

```js
// utils.js
export function used() { return 'used'; }
export function unused() { return 'unused'; }

// main.js
import { used } from './utils';
console.log(used());
// unused 函数不会被打包进最终产物
```

:::

::: details Webpack Tree Shaking 配置

```js
// webpack.config.js
module.exports = {
  mode: 'production', // 必须为 production
  optimization: {
    usedExports: true, // 标记被使用的导出
    minimize: true, // 启用压缩
  },
};
```

:::

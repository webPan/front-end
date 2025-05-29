# 打包工具

## 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面

1. 当修改了一个或多个文件；
2. 文件系统接收更改并通知webpack；
3. webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4. HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5. HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。

## npm 模块安装机制

- 发出npm install命令
- 查询node_modules目录之中是否已经存在指定模块
  - 若存在，不再重新安装
  - 若不存在
- npm 向 registry 查询模块压缩包的网址
- 下载压缩包，存放在根目录下的.npm目录里
- 解压压缩包到当前项目的node_modules目录

## 说说 npm yarn pnpm 的区别

### 1. npm (Node Package Manager)

**特点和优势：**

- Node.js 的默认包管理器，最大的包管理生态系统
- 使用简单，无需额外安装
- 有最广泛的社区支持和文档资源
- 支持 package-lock.json 确保依赖版本一致性

**缺点：**

- 安装速度相对较慢（串行安装）
- 磁盘空间利用率低（重复存储依赖）
- 可能存在依赖树扁平化导致的问题

### 2. Yarn (Yet Another Resource Negotiator)

**特点和优势：**

- 由 Facebook 开发，着重解决 npm 的性能和安全问题
- 并行安装，速度快于 npm
- 离线缓存机制，支持离线安装
- 提供 Workspaces 功能，适合管理 monorepo
- yarn.lock 文件确保依赖版本一致性

**缺点：**

- 需要单独安装
- Yarn v4 可能存在性能问题
- 磁盘空间利用仍不如 pnpm 高效

### 3. pnpm (Performant npm)

**特点和优势：**

- 采用创新的依赖管理方式，使用硬链接和符号链接
- 显著节省磁盘空间（依赖全局存储，项目间共享）
- 安装速度最快（比 npm 和 Yarn 快 2-3 倍）
- 更严格的依赖管理，避免幽灵依赖
- 完善的 monorepo 支持

**缺点：**

- 需要单独安装
- 部分旧工具可能不完全兼容
- 学习曲线相对较陡

## 说说webpack和vite有什么区别？他们打包和热更新机制是怎样的

### 1. 开发服务器启动

**Webpack：**

- 启动慢：需要先打包所有模块
- 构建依赖关系，生成bundle

**Vite：**

- 启动快：无需打包，直接启动
- 基于浏览器原生 ES modules
- 按需加载模块

### 2. 热更新 (HMR)

**Webpack：**

- 重新打包整个模块
- 构建并重新加载整个 bundle

**Vite：**

- 精确定位变化的模块
- 只需要重新请求变化的模块
- 基于 ESM 的热更新，速度更快

### 3. 打包机制

**Webpack：**

- 从入口开始，递归构建依赖图
- 所有模块打包到 bundle
- 适合大型项目生产环境

**Vite：**

- 开发环境：不打包，利用浏览器 ESM
- 生产环境：使用 Rollup 打包
- 冷启动更快，适合开发环境

### 总结

- Webpack：更成熟稳定，生态更丰富
- Vite：开发体验更好，启动和热更新更快
- 选择：新项目推荐 Vite，老项目可继续使用 Webpack

## Webpack 的打包原理是什么？

让我直接给出 Webpack 打包原理的核心步骤：

1. **入口解析**
   - 从 entry 入口文件开始
   - 构建依赖图谱

2. **依赖收集**
   - 通过 AST 语法树分析依赖
   - 递归解析所有 import/require 语句

3. **模块转换**
   - 使用对应的 loader 处理不同类型文件
   - 将所有模块转换为 JavaScript 代码

4. **代码生成**
   - 将模块组合成 chunk
   - 生成最终的 bundle 文件
   - 注入运行时代码（模块加载、依赖关系处理）

**简单来说：** Webpack 通过分析入口文件，收集依赖，转换模块，最后将所有模块打包成一个或多个 bundle，并注入自己的加载机制。

### 什么是loader

- loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
- 处理一个文件可以使用多个loader，loader的执行顺序和配置中的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行
第一个执行的loader接收源文件内容作为参数，其它loader接收前一个执行的loader的返回值作为参数，最后执行的loader会返回此模块的JavaScript源码
- 例子：`babel-loader`、`css-loader`、`file-loader`

### 什么是plugin

在webpack运行的生命周期中会广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的API改变输出结果。

- 例子：`HtmlWebpackPlugin`、`DefinePlugin`、`MiniCssExtractPlugin`

### loader和plugin的区别

- `loader`它是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss转换为A.css，单纯的文件转换过程  
- `plugin`是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

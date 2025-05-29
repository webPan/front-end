# Electron

## Electron 的主进程和渲染进程有什么区别？各自的作用是什么？

**核心答案：**  
主进程负责应用的生命周期管理、原生系统交互和窗口创建，渲染进程负责页面渲染和前端逻辑处理。

**原理讲解：**  

- 主进程（Main Process）运行在 Node.js 环境中，拥有操作系统级别的 API 权限，负责创建和管理所有渲染进程（即窗口）。
- 渲染进程（Renderer Process）运行在 Chromium 环境中，主要负责渲染页面和处理用户交互，每个窗口对应一个渲染进程。

::: details 示例代码

主进程（main.js）：
```js
const { app, BrowserWindow } = require('electron');
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
});
```


渲染进程（index.html + renderer.js）：

```html
<!-- index.html -->
<script src="renderer.js"></script>
```

```js
// renderer.js
console.log('这是渲染进程');
```
:::

## 如何在 Electron 中实现主进程与渲染进程之间的通信？常用的通信方式有哪些？

**核心答案：**  
主进程与渲染进程之间常用的通信方式是 `ipcMain` 和 `ipcRenderer` 模块，通过消息通道进行异步或同步通信。

**原理讲解：**  

- `ipcMain` 用于主进程监听和处理消息。
- `ipcRenderer` 用于渲染进程发送和接收消息。
- 支持单向和双向通信，常见方法有 `send`、`invoke`、`on`、`handle` 等。

::: details  示例代码

主进程（main.js）：

```js
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', (event, arg) => {
  event.reply('asynchronous-reply', '主进程收到消息：' + arg);
});
```


渲染进程（renderer.js）：

```js
const { ipcRenderer } = require('electron');
ipcRenderer.send('asynchronous-message', '你好主进程');
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg);
});
```
:::

## Electron 如何加载本地 HTML 文件？如何安全地加载远程网页？

**核心答案：**  
加载本地 HTML 文件使用 `loadFile` 方法，加载远程网页使用 `loadURL`，为安全加载需禁用 `nodeIntegration` 并启用 `contextIsolation`。

**原理讲解：**  

- `loadFile('index.html')` 加载本地页面，适合桌面应用。
- `loadURL('https://example.com')` 加载远程页面，需防范 XSS、远程代码执行等风险。
- 推荐配置：`nodeIntegration: false`，`contextIsolation: true`，并使用 `preload` 脚本做安全桥接。

::: details 示例代码

```js
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
});
win.loadURL('https://example.com');
```

:::

## Electron 应用如何打包和发布？常用的打包工具有哪些？

**核心答案：**  
Electron 应用常用 `electron-builder`、`electron-packager` 等工具进行打包，打包后可生成适用于 Windows、macOS、Linux 的安装包或可执行文件。

**原理讲解：**  

- `electron-builder` 支持多平台打包、自动更新、代码签名等功能，配置灵活，社区使用广泛。
- `electron-packager` 适合简单打包，不支持自动更新和高级配置。
- 打包流程一般为：编写主/渲染进程代码 → 配置打包工具 → 执行打包命令 → 生成安装包。

::: details 示例代码

`package.json` 配置（以 electron-builder 为例）：

```json
"scripts": {
  "build": "electron-builder"
},
"build": {
  "appId": "com.example.app",
  "win": { "target": "nsis" },
  "mac": { "target": "dmg" },
  "linux": { "target": "AppImage" }
}
```

命令行打包：

```bash
npm run build
```

:::

## 如何在 Electron 中实现自动更新功能？

**核心答案：**  
可通过 `electron-updater` 配合 `electron-builder` 实现自动更新，主进程监听更新事件并通知渲染进程。

**原理讲解：**  

- `electron-updater` 支持检测新版本、下载更新、安装更新等功能。
- 需要配置更新服务器（如 GitHub Releases、私有服务器）。
- 主进程负责检测和下载更新，渲染进程可通过 IPC 通知用户。

::: details 示例代码

主进程（main.js）：

```js
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
```

:::

## Electron 如何访问本地文件系统？有哪些安全隐患？如何防范？

**核心答案：**  
Electron 通过 Node.js 的 `fs` 模块访问本地文件系统，存在被恶意代码利用的风险，需通过关闭 `nodeIntegration`、启用 `contextIsolation`、使用 `preload` 脚本等方式防范。

**原理讲解：**  

- 渲染进程默认可直接使用 Node.js API，若页面被 XSS 攻击，攻击者可读写本地文件。
- 推荐做法：关闭 `nodeIntegration`，仅在 `preload` 脚本中暴露安全的 API 给渲染进程。

::: details 示例代码
`preload.js`：

```js
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  readFile: (path) => ipcRenderer.invoke('read-file', path)
});
```

主进程（main.js）：

```js
const { ipcMain } = require('electron');
const fs = require('fs');
ipcMain.handle('read-file', async (event, path) => {
  return fs.promises.readFile(path, 'utf-8');
});
```

渲染进程（renderer.js）：

```js
window.api.readFile('test.txt').then(content => {
  console.log(content);
});
```

:::

## Electron 的窗口（BrowserWindow）有哪些常用配置项？如何实现无边框窗口、透明窗口？

**核心答案：**  
常用配置项有 `width`、`height`、`frame`、`transparent`、`resizable` 等。设置 `frame: false` 可实现无边框窗口，`transparent: true` 可实现透明窗口。

**原理讲解：**  

- `frame: false` 移除原生窗口边框，适合自定义窗口样式。
- `transparent: true` 使窗口背景透明，常用于美化界面或制作悬浮窗。
- 其他常用配置项：`show`（是否显示）、`alwaysOnTop`（置顶）、`webPreferences`（网页相关配置）等。

::: details 示例代码

```js
const win = new BrowserWindow({
  width: 800,
  height: 600,
  frame: false,         // 无边框
  transparent: true,    // 透明
  resizable: false      // 不可调整大小
});
```

:::



## Electron 如何实现多窗口通信？

**核心答案：**  
多窗口通信通常通过主进程中转，利用 `ipcMain` 和 `ipcRenderer` 实现不同渲染进程之间的信息传递。

**原理讲解：**  

- 各渲染进程不能直接通信，需通过主进程转发消息。
- 渲染进程A发送消息到主进程，主进程再将消息发送到渲染进程B。

::: details 示例代码

渲染进程A：

```js
const { ipcRenderer } = require('electron');
ipcRenderer.send('to-other-window', 'hello from A');
```

主进程：

```js
const { ipcMain, BrowserWindow } = require('electron');
ipcMain.on('to-other-window', (event, msg) => {
  // 假设 winB 是渲染进程B对应的窗口
  winB.webContents.send('from-other-window', msg);
});
```

渲染进程B：

```js
const { ipcRenderer } = require('electron');
ipcRenderer.on('from-other-window', (event, msg) => {
  console.log(msg); // 'hello from A'
});
```

:::

## Electron 如何集成 Node.js 模块？有哪些注意事项？

**核心答案：**  
Electron 主进程和渲染进程（开启 `nodeIntegration` 时）都可直接使用 Node.js 模块。为安全起见，推荐通过 `preload` 脚本暴露必要的 Node.js 能力。

**原理讲解：**  

- 主进程天然支持 Node.js 模块。
- 渲染进程如需用 Node.js，建议关闭 `nodeIntegration`，通过 `preload` 脚本和 `contextBridge` 暴露安全 API，防止 XSS 攻击导致本地权限泄露。

::: details 示例代码

`preload.js`：

```js
const { contextBridge } = require('electron');
const os = require('os');
contextBridge.exposeInMainWorld('myAPI', {
  getPlatform: () => os.platform()
});
```

渲染进程：

```js
console.log(window.myAPI.getPlatform());
```

:::

## Electron 如何处理应用崩溃和异常？如何收集日志和错误信息？

**核心答案：**  
可通过监听 `uncaughtException`、`window.onerror`、`crashed` 等事件捕获异常，并结合日志库（如 `electron-log`）收集和记录错误信息。

**原理讲解：**  

- 主进程可监听 `process.on('uncaughtException')` 捕获未处理异常。
- 渲染进程可监听 `window.onerror`、`window.unhandledrejection`。
- 窗口崩溃可监听 `webContents` 的 `crashed` 事件。
- 日志可用 `electron-log`、`winston` 等库持久化保存。

::: details 示例代码

主进程：

```js
process.on('uncaughtException', (error) => {
  require('electron-log').error('主进程异常:', error);
});
```

渲染进程：

```js
window.onerror = function (msg, url, line, col, error) {
  require('electron-log').error('渲染进程异常:', msg, error);
};
```

:::

## Electron 如何实现系统托盘（Tray）和通知（Notification）功能？

**核心答案：**  
使用 Electron 的 `Tray` 类实现系统托盘，使用 `Notification` 类实现系统通知。

**原理讲解：**  

- `Tray` 可创建托盘图标、菜单，支持点击、右键等事件。
- `Notification` 可在系统层面弹出原生通知，支持标题、正文、图标等配置。

::: details 示例代码

主进程（托盘）：

```js
const { Tray, Menu } = require('electron');
const tray = new Tray('icon.png');
const contextMenu = Menu.buildFromTemplate([
  { label: '退出', click: () => app.quit() }
]);
tray.setToolTip('我的Electron应用');
tray.setContextMenu(contextMenu);
```

主进程或渲染进程（通知）：

```js
new Notification({ title: '提示', body: '操作成功！' }).show();
```

:::


## Electron 如何与操作系统原生功能（如剪贴板、菜单、快捷键等）交互？

**核心答案：**  
Electron 提供了 `clipboard`、`Menu`、`globalShortcut` 等模块，分别用于操作剪贴板、自定义菜单和注册全局快捷键，实现与操作系统原生功能的交互。

**原理讲解：**  

- `clipboard` 可读写系统剪贴板内容，支持文本、图片等格式。
- `Menu` 可自定义应用菜单和右键菜单，支持多级菜单和快捷键。
- `globalShortcut` 可注册全局快捷键，响应用户在任何界面下的快捷操作。

::: details 示例代码

剪贴板：

```js
const { clipboard } = require('electron');
clipboard.writeText('Hello Electron');
console.log(clipboard.readText());
```

自定义菜单：

```js
const { Menu } = require('electron');
const menu = Menu.buildFromTemplate([
  { label: '文件', submenu: [{ label: '退出', role: 'quit' }] }
]);
Menu.setApplicationMenu(menu);
```

全局快捷键：

```js
const { globalShortcut } = require('electron');
app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('全局快捷键被触发');
  });
});
```

:::

## Electron 如何防止 XSS、CSRF 等前端安全问题？

**核心答案：**  
通过关闭 `nodeIntegration`、启用 `contextIsolation`、使用 `preload` 脚本、设置 CSP（内容安全策略）等方式防止 XSS、CSRF 等安全问题。

**原理讲解：**  

- 关闭 `nodeIntegration`，防止渲染进程直接访问 Node.js API。
- 启用 `contextIsolation`，隔离渲染环境与 Node.js 环境。
- 通过 `preload` 脚本暴露安全 API，避免直接暴露敏感能力。
- 设置 CSP，限制页面可加载的资源，防止恶意脚本注入。
- 对 IPC 通信进行白名单校验，防止消息伪造。

::: details 示例代码

窗口安全配置：

```js
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
});
```

设置 CSP（index.html）：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

:::

## Electron 如何实现自定义菜单栏和右键菜单？

**核心答案：**  
通过 `Menu` 和 `MenuItem` 模块自定义应用菜单栏和右键菜单，并可根据业务需求动态生成菜单项。

**原理讲解：**  

- `Menu.setApplicationMenu` 设置全局菜单栏。
- `Menu.popup` 在指定窗口弹出右键菜单。
- 菜单项支持自定义点击事件、快捷键、子菜单等。

::: details 示例代码

自定义菜单栏：

```js
const { Menu } = require('electron');
const menu = Menu.buildFromTemplate([
  { label: '编辑', submenu: [{ label: '撤销', role: 'undo' }] }
]);
Menu.setApplicationMenu(menu);
```

右键菜单（渲染进程）：

```js
const { remote } = require('electron');
const menu = remote.Menu.buildFromTemplate([
  { label: '复制', role: 'copy' },
  { label: '粘贴', role: 'paste' }
]);
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup({ window: remote.getCurrentWindow() });
});
```

:::

## Electron 如何检测和响应网络状态变化？

**核心答案：**  
可在渲染进程中监听 `window.navigator.onLine` 属性和 `online`、`offline` 事件，实时检测网络状态变化。

**原理讲解：**  

- `navigator.onLine` 表示当前网络连接状态。
- 监听 `window` 的 `online` 和 `offline` 事件，可在网络状态变化时执行相应逻辑。
- 也可通过定时请求接口进一步判断网络连通性。

::: details 示例代码

```js
window.addEventListener('online', () => {
  console.log('网络已连接');
});
window.addEventListener('offline', () => {
  console.log('网络已断开');
});
console.log('当前网络状态:', navigator.onLine ? '在线' : '离线');
```

:::


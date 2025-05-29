
# 视频音频

## 1. 简述音视频的采集、编码、传输、解码、播放的基本流程

**核心答案：**  
音视频流程包括采集、编码、传输、解码、播放五个环节，环环相扣，决定了最终的音视频体验。

**原理讲解：**  

- 采集：通过摄像头、麦克风等设备获取原始数据。
- 编码：用编解码器压缩原始数据，减少体积。
- 传输：通过网络协议将数据发送到接收端。
- 解码：还原压缩数据为可播放的音视频帧。
- 播放：将解码后的数据渲染到屏幕和扬声器。

::: details 示例代码

```javascript
// 采集本地音视频流
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// 编码并推送到服务器
const recorder = new MediaRecorder(stream);
recorder.ondataavailable = e => sendToServer(e.data);
recorder.start(100);
// 接收端解码并播放
const video = document.querySelector('video');
video.srcObject = stream;
video.play();
```

:::



## 2. 什么是码率、帧率、分辨率？它们对音视频质量和带宽的影响？

**核心答案：**  
码率决定单位时间内传输的数据量，帧率决定每秒显示的画面数，分辨率决定画面清晰度。三者共同影响视频质量和所需带宽。

**原理讲解：**  

- 码率（bitrate）：单位时间内传输的数据量，码率越高，画质越好，但带宽需求越大。
- 帧率（framerate）：每秒显示的帧数，帧率高画面更流畅，但数据量也更大。
- 分辨率（resolution）：画面像素尺寸，分辨率高画面更清晰，但数据量也更大。

::: details 示例代码

```javascript
// 获取视频流的分辨率和帧率
const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, frameRate: 30 } });
const track = stream.getVideoTracks()[0];
const settings = track.getSettings();
console.log(`分辨率: ${settings.width}x${settings.height}, 帧率: ${settings.frameRate}`);
```

:::



## 3. 常见的视频编码格式有哪些？H.264、H.265、VP8、VP9 有什么区别？

**核心答案：**  
常见编码格式有 H.264、H.265、VP8、VP9。H.265/VP9 压缩率更高，适合高分辨率场景，H.264/VP8 兼容性更好。

**原理讲解：**  

- H.264：主流编码，兼容性好，压缩率高。
- H.265：H.264 升级版，压缩率更高，适合 4K/8K，但专利限制多。
- VP8：Google 推广，开源，适合 WebRTC。
- VP9：VP8 升级版，压缩率接近 H.265，开源，适合 YouTube 等。

::: details 示例代码

```javascript
// 判断浏览器支持哪些编码格式
const video = document.createElement('video');
console.log('H.264:', video.canPlayType('video/mp4; codecs="avc1.42E01E"'));
console.log('H.265:', video.canPlayType('video/mp4; codecs="hev1"'));
console.log('VP8:', video.canPlayType('video/webm; codecs="vp8"'));
console.log('VP9:', video.canPlayType('video/webm; codecs="vp9"'));
```

:::



## 4. 音频常见的编码格式有哪些？AAC、MP3、Opus 有什么特点？

**核心答案：**  
常见音频编码有 AAC、MP3、Opus。AAC 兼容性好，MP3 普及率高，Opus 低延迟高质量，适合实时通信。

**原理讲解：**  

- AAC：主流音频编码，音质好，广泛用于流媒体。
- MP3：历史最悠久，兼容性极佳，音质略逊于 AAC。
- Opus：专为实时语音设计，低延迟，适合 WebRTC。

::: details 示例代码

```javascript
// 判断浏览器支持哪些音频编码
const audio = document.createElement('audio');
console.log('AAC:', audio.canPlayType('audio/mp4; codecs="mp4a.40.2"'));
console.log('MP3:', audio.canPlayType('audio/mpeg'));
console.log('Opus:', audio.canPlayType('audio/webm; codecs="opus"'));
```

:::



## 5. 什么是容器格式？常见的音视频容器格式有哪些？

**核心答案：**  
容器格式用于封装音视频流及其元数据，常见有 MP4、MKV、AVI、MOV、WebM 等。

**原理讲解：**  

- 容器格式（如 MP4、MKV）本身不压缩数据，而是将音频、视频、字幕等不同编码的数据打包在一起，便于同步播放和传输。
- 不同容器支持的编码格式和功能（如章节、字幕）不同。

::: details 示例代码

```javascript
// 判断浏览器支持哪些容器格式
const video = document.createElement('video');
console.log('MP4:', video.canPlayType('video/mp4'));
console.log('WebM:', video.canPlayType('video/webm'));
console.log('OGG:', video.canPlayType('video/ogg'));
```

:::



## 6. 如何使用 HTML5 的 `<video>` 和 `<audio>` 标签实现音视频播放？

**核心答案：**  
通过 `<video>` 和 `<audio>` 标签直接嵌入音视频文件，支持多种格式和控制属性，简单易用。

**原理讲解：**  

- `<video>` 和 `<audio>` 标签支持多种格式，内置播放控件，可通过 JS 控制播放、暂停、音量、进度等。
- 支持多音轨、字幕、画中画等高级功能。

::: details 示例代码

```html
<video id="myVideo" width="640" height="360" controls poster="cover.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  您的浏览器不支持 video 标签。
</video>
<script>
  const video = document.getElementById('myVideo');
  video.addEventListener('play', () => console.log('开始播放'));
</script>
```

:::



## 7. MediaSource Extensions (MSE) 的作用是什么？如何实现自定义流媒体播放？

**核心答案：**  
MSE 允许开发者动态拼接、推送媒体流，实现自定义流媒体播放和自适应码流。

**原理讲解：**  

- MSE 提供 JS API，可将分片媒体数据动态推送到 `<video>` 元素，实现如 HLS、DASH 等自定义协议播放。
- 支持自适应码流、直播、点播等高级场景。

::: details 示例代码

```javascript
const video = document.querySelector('video');
const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8,opus"');
  fetch('video-segment.webm')
    .then(res => res.arrayBuffer())
    .then(data => sourceBuffer.appendBuffer(data));
});
```

:::



## 8. WebRTC 的基本原理是什么？主要应用场景有哪些？

**核心答案：**  
WebRTC 实现浏览器间实时音视频通信，核心是点对点传输、低延迟、无需插件，常用于视频通话、在线会议、互动直播等。

**原理讲解：**  

- WebRTC 通过 getUserMedia 采集流，RTCPeerConnection 建立点对点连接，DataChannel 传输数据。
- 通过 ICE、STUN、TURN 实现 NAT 穿透，信令用于交换连接信息。

::: details 示例代码

```javascript
// 简单的 WebRTC 点对点连接
const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
const pc = new RTCPeerConnection();
localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
// 信令交换 offer/answer 及 candidate 省略
```

:::



## 9. 如何通过 getUserMedia 获取本地音视频流？有哪些常见的权限和兼容性问题？

**核心答案：**  
通过 navigator.mediaDevices.getUserMedia 获取本地音视频流，需用户授权，部分浏览器和 HTTPS 环境下才支持。

**原理讲解：**  

- getUserMedia 返回 Promise，需指定 audio/video 约束。
- 需用户授权，部分浏览器需 HTTPS，移动端兼容性需注意。
- 拒绝授权或设备不可用时需处理异常。

::: details 示例代码

```javascript
try {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.querySelector('video').srcObject = stream;
} catch (err) {
  alert('无法获取摄像头/麦克风权限');
}
```

:::



## 10. 如何使用 Web Audio API 实现音频的处理和可视化？

**核心答案：**  
Web Audio API 提供强大的音频处理和分析能力，可实现音效处理、频谱可视化等功能。

**原理讲解：**  

- 通过 AudioContext 创建音频处理节点，支持滤波、混响、分析等。
- AnalyserNode 可实时获取音频频谱数据，实现可视化。

::: details 示例代码

```javascript
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(document.querySelector('audio'));
source.connect(analyser);
analyser.connect(audioCtx.destination);

function draw() {
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  // 绘制频谱
  requestAnimationFrame(draw);
}
draw();
```

:::

## 11. 简述 RTMP、HLS、DASH、WebRTC 的优缺点及适用场景

**核心答案：**  
RTMP 低延迟、适合直播但兼容性差；HLS 兼容性好、延迟高，适合点播和延时直播；DASH 支持自适应码流，适合多终端；WebRTC 超低延迟，适合实时互动。

**原理讲解：**  

- **RTMP**：基于 TCP，延迟低，适合直播推流，但 Flash 依赖严重，浏览器端支持差。
- **HLS**：基于 HTTP，兼容性好，支持 CDN，延迟高（10-30s），适合点播和大规模直播。
- **DASH**：与 HLS 类似，支持多码率自适应，开放标准，兼容性略逊于 HLS。
- **WebRTC**：点对点实时传输，超低延迟，适合视频通话、互动直播，但实现复杂，穿透难。

::: details 示例代码

```javascript
// HLS 播放器示例（需 hls.js 支持）
if (Hls.isSupported()) {
  const video = document.getElementById('video');
  const hls = new Hls();
  hls.loadSource('https://example.com/stream.m3u8');
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
}
```

:::

## 12. HLS 的分片原理是什么？M3U8 文件的作用？

**核心答案：**  
HLS 将音视频切分为小的 TS 分片，M3U8 文件作为索引，指示播放器如何顺序加载和播放分片。

**原理讲解：**  

- HLS（HTTP Live Streaming）将音视频流切分为若干小的 TS 文件（通常2-10秒），播放器按顺序请求分片，实现边下边播。
- M3U8 是一个文本格式的播放列表，记录了所有分片的 URL、时长等信息，支持多码率自适应。

::: details 示例代码

```plaintext
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXTINF:10,
segment1.ts
#EXTINF:10,
segment2.ts
#EXTINF:10,
segment3.ts
```

:::



## 13. 什么是自适应码流（ABR）？如何实现？

**核心答案：**  
自适应码流（ABR）根据网络状况动态切换不同码率的视频流，保证播放流畅和画质平衡。

**原理讲解：**  

- 服务器端准备多种码率的视频分片，客户端根据带宽、缓冲等实时切换最合适的码率。
- HLS、DASH 等协议原生支持 ABR，播放器通过分析网络状况自动切换。

::: details 示例代码

```javascript
// hls.js 自动自适应码流
const hls = new Hls();
hls.loadSource('https://example.com/playlist.m3u8');
hls.attachMedia(document.getElementById('video'));
// 监听码率切换事件
hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
  console.log('当前码率索引:', data.level);
});
```

:::



## 14. WebRTC 的信令过程包括哪些步骤？

**核心答案：**  
WebRTC 信令过程包括会话协商（Offer/Answer）、ICE 候选交换、媒体参数协商等步骤。

**原理讲解：**  

- 信令用于交换 SDP（会话描述协议）和 ICE（网络候选）信息，帮助两端建立点对点连接。
- 典型流程：A 创建 offer → 发送给 B → B 回复 answer → 双方交换 ICE candidate → 连接建立。

::: details 示例代码

```javascript
// 伪代码：WebRTC 信令流程
const pc = new RTCPeerConnection();
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
// 通过信令服务器发送 offer 给对方
// 对方 setRemoteDescription(offer)，createAnswer，setLocalDescription(answer)
// 交换 ICE candidate
pc.onicecandidate = e => sendToPeer(e.candidate);
```

:::



## 15. 如何实现音视频的录制与回放？

**核心答案：**  
通过 `MediaRecorder API` 录制音视频流，生成文件后可用 `<video></audio>` 标签回放。

**原理讲解：**  

- `MediaRecorder` 可录制 `getUserMedia` 获取的流，生成 Blob 数据。
- 录制完成后可生成 URL，赋值给 `<video>` 或 `<audio>` 标签进行回放。

::: details 示例代码

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
const recorder = new MediaRecorder(stream);
const chunks = [];
recorder.ondataavailable = e => chunks.push(e.data);
recorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  document.querySelector('video').src = URL.createObjectURL(blob);
};
recorder.start();
setTimeout(() => recorder.stop(), 5000); // 录制5秒
```

:::



## 16. 如何优化网页端音视频的首帧加载速度？

**核心答案：**  
优化首帧加载可通过减少首包时延、预加载、合理分片、CDN 加速等手段实现。

**原理讲解：**  

- 减少首包时延：优化服务器响应、减少重定向。
- 预加载首帧：提前加载关键分片或封面。
- 合理分片：分片越小，首帧越快到达。
- CDN 加速：就近分发，降低网络延迟。

::: details 示例代码

```javascript
// video 标签预加载首帧
<video src="video.mp4" preload="auto" poster="cover.jpg" controls></video>
```

:::



## 17. 如何减少音视频播放过程中的卡顿和延迟？

**核心答案：**  
通过自适应码流、合理缓冲、CDN 加速、丢帧补偿等方式减少卡顿和延迟。

**原理讲解：**  

- 自适应码流：根据网络状况切换码率，避免缓冲不足。
- 合理缓冲：设置合适的缓冲区，防止网络波动导致卡顿。
- CDN 加速：减少跨地域传输延迟。
- 丢帧补偿：弱网时可丢弃部分帧，保证流畅。

::: details 示例代码

```javascript
// hls.js 设置缓冲区
const hls = new Hls({ maxBufferLength: 30, maxMaxBufferLength: 60 });
hls.loadSource('https://example.com/playlist.m3u8');
hls.attachMedia(document.getElementById('video'));
```

:::



## 18. 如何实现音视频的预加载和缓存？

**核心答案：**  
通过 preload 属性、分片预取、Service Worker 缓存等方式实现音视频预加载和缓存。

**原理讲解：**  

- preload 属性可提前加载部分或全部音视频数据。
- 分片预取可提前请求后续分片，减少播放中断。
- Service Worker 可缓存音视频资源，实现离线播放。

::: details 示例代码

```javascript
// video 标签预加载
<video src="video.mp4" preload="auto" controls></video>

// Service Worker 缓存音视频
self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.mp4')) {
    event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
  }
});
```

:::



## 19. 如何处理弱网环境下的音视频播放？

**核心答案：**  
弱网下可通过自适应码流、降级分辨率、增加缓冲、断点续播等方式提升体验。

**原理讲解：**  

- 自适应码流自动切换低码率流。
- 降低分辨率和帧率，减少数据量。
- 增加缓冲区，容忍网络抖动。
- 支持断点续播，避免频繁重载。

::: details 示例代码

```javascript
// hls.js 监听网络状况自动降级
hls.on(Hls.Events.ERROR, (event, data) => {
  if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
    hls.nextLevel = Math.max(hls.nextLevel - 1, 0); // 降低码率
  }
});
```

:::



## 20. 如何实现多路音视频流的切换与同步？

**核心答案：**  
多路流切换可通过多 source 管理、流重建，音视频同步需时间戳对齐和缓冲控制。

**原理讲解：**  

- 切换时需平滑过渡，避免黑屏或卡顿。
- 同步通过时间戳（PTS/DTS）对齐，或用 Web Audio API 控制音视频时钟。

::: details 示例代码

```javascript
// 切换视频流
function switchStream(video, newUrl) {
  const currentTime = video.currentTime;
  video.src = newUrl;
  video.currentTime = currentTime;
  video.play();
}
```

:::



如需继续补充剩余题目，请继续告知！
继续为剩余题目补充核心答案、原理讲解和示例代码：



## 21. 如何防止音视频内容被盗链或下载？

**核心答案：**  
可通过防盗链鉴权、分片加密、DRM、混淆分片等方式防止盗链和非法下载。

**原理讲解：**  

- 防盗链鉴权：通过 token、referer 校验等方式，限制资源访问来源。
- 分片加密：对音视频分片加密，只有授权用户能解密播放。
- DRM：数字版权管理，强制加密和授权机制，防止内容被非法下载和分发。
- 混淆分片：动态生成分片路径，增加爬取难度。

::: details 示例代码

```javascript
// 简单的 token 鉴权防盗链
const token = '服务器下发的token';
const video = document.createElement('video');
video.src = `https://example.com/video.mp4?token=${token}`;
document.body.appendChild(video);
```

:::



## 22. 如何处理音视频播放中的跨域问题？

**核心答案：**  
需服务器设置 CORS 响应头，或通过代理转发，确保音视频资源可被网页安全访问。

**原理讲解：**  

- 服务器需返回 Access-Control-Allow-Origin 头，允许指定域名访问资源。
- 对于带凭证的请求，还需设置 Access-Control-Allow-Credentials。
- 也可通过后端代理，将资源转发到同源路径。

::: details 示例代码

```http
// 服务器响应头示例
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Credentials: true
```

```javascript
// fetch 跨域音视频资源
fetch('https://example.com/video.mp4', { mode: 'cors' })
  .then(resp => resp.blob())
  .then(blob => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(blob);
    document.body.appendChild(video);
  });
```

:::



## 23. 如何实现 DRM（数字版权管理）保护音视频内容？

**核心答案：**  
通过 EME（Encrypted Media Extensions）结合 DRM 服务（如 Widevine、FairPlay）实现音视频加密和授权播放。

**原理讲解：**  

- EME 提供浏览器级加密播放接口，结合内容加密和密钥授权服务器，保障内容安全。
- 主流浏览器支持 Widevine（Chrome）、PlayReady（Edge）、FairPlay（Safari）。
- 播放器需集成 EME，获取密钥后解密播放。

::: details 示例代码

```javascript
const video = document.querySelector('video');
video.addEventListener('encrypted', async (event) => {
  const session = video.mediaKeys.createSession();
  session.addEventListener('message', (e) => {
    // 向 DRM 服务器请求密钥
    fetch('https://license-server.com', { method: 'POST', body: e.message })
      .then(resp => resp.arrayBuffer())
      .then(license => session.update(license));
  });
  session.generateRequest(event.initDataType, event.initData);
});
```

:::



## 24. 如何检测和处理音视频播放失败或异常？

**核心答案：**  
通过监听 `error`、`stalled`、`waiting` 等事件，及时提示用户或重试加载，提升播放稳定性。

**原理讲解：**  

- `<video>/<audio>` 标签提供 `error`、`stalled`、`waiting`、`ended` 等事件。
- 可根据错误类型进行重试、降级、切换源等处理。

::: details 示例代码

```javascript
const video = document.querySelector('video');
video.addEventListener('error', () => {
  alert('播放失败，请检查网络或更换资源');
});
video.addEventListener('stalled', () => {
  console.log('缓冲中，尝试重载...');
  video.load();
  video.play();
});
```

:::



## 25. 如何实现音视频的静音、倍速、画中画等功能？

**核心答案：**  
通过 video/audio 标签的 muted、playbackRate 属性和 requestPictureInPicture 方法实现静音、倍速、画中画。

**原理讲解：**  

- muted 控制静音，playbackRate 控制播放速度。
- 画中画（Picture-in-Picture）API 可将视频悬浮显示在页面外。

::: details 示例代码

```javascript
const video = document.querySelector('video');
// 静音
video.muted = true;
// 倍速播放
video.playbackRate = 1.5;
// 画中画
if (document.pictureInPictureEnabled) {
  video.requestPictureInPicture();
}
```

:::



## 26. 设计一个支持直播和点播的网页音视频播放器，简述技术选型和实现思路

**核心答案：**  
采用 HLS/DASH 作为点播协议，WebRTC/RTMP 作为直播协议，前端用 hls.js、dash.js、video.js 等播放器库，后端用流媒体服务器转码分发。

**原理讲解：**  

- 点播：HLS/DASH 兼容性好，支持自适应码流，前端用 hls.js/dash.js 播放。
- 直播：WebRTC 低延迟，RTMP 推流+HLS 拉流适合大规模分发。
- 播放器需支持多协议切换、UI 控件、数据上报等。

::: details 示例代码

```javascript
// 伪代码：根据类型选择播放器
function play(url, type) {
  const video = document.getElementById('video');
  if (type === 'hls' && Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else if (type === 'dash') {
    const player = dashjs.MediaPlayer().create();
    player.initialize(video, url, true);
  } else {
    video.src = url;
    video.play();
  }
}
```

:::



## 27. 如何在网页端实现视频通话？需要哪些技术和服务支持？

**核心答案：**  
通过 WebRTC 实现浏览器端视频通话，需信令服务器、STUN/TURN 服务器支持穿透和连接。

**原理讲解：**  

- WebRTC 负责音视频采集、编解码、点对点传输。
- 信令服务器用于交换 SDP、ICE 信息。
- STUN/TURN 服务器用于 NAT 穿透，保证连接成功率。

::: details 示例代码

```javascript
// 伪代码：WebRTC 视频通话
const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
// 信令交换 offer/answer 和 candidate 省略
```

:::



## 28. 如何实现音视频的美颜、降噪等效果？

**核心答案：**  
美颜可用 canvas/WebGL 处理视频帧，降噪可用 Web Audio API 或 AI 算法处理音频流。

**原理讲解：**  

- 视频美颜：将视频帧绘制到 canvas，应用滤镜或 WebGL 特效。
- 音频降噪：用 Web Audio API 的 BiquadFilterNode、ScriptProcessorNode 或 AI 降噪库处理音频。

::: details 示例代码

```javascript
// 视频美颜（简单磨皮滤镜）
const video = document.querySelector('video');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
function beautify() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  // 简单模糊滤镜
  ctx.filter = 'blur(2px) brightness(1.1)';
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(beautify);
}
beautify();
```

:::



## 29. 如何统计和上报音视频播放的各项数据指标？

**核心答案：**  
通过监听播放器事件、采集卡顿、缓冲、码率、播放时长等数据，定期上报到后端分析。

**原理讲解：**  

- 监听 play、pause、waiting、error 等事件，统计播放行为。
- 采集缓冲时长、卡顿次数、码率切换等关键指标。
- 定期或实时通过接口上报数据。

::: details 示例代码

```javascript
const video = document.querySelector('video');
let playStart, totalPlayTime = 0, stallCount = 0;
video.addEventListener('play', () => { playStart = Date.now(); });
video.addEventListener('pause', () => { totalPlayTime += Date.now() - playStart; });
video.addEventListener('waiting', () => { stallCount++; });
setInterval(() => {
  fetch('/report', {
    method: 'POST',
    body: JSON.stringify({ totalPlayTime, stallCount })
  });
}, 60000);
```

:::



## 30. 如何兼容不同浏览器和终端的音视频播放？

**核心答案：**  
通过多格式编码、MSE、第三方播放器库和特性检测，兼容不同浏览器和终端。

**原理讲解：**  

- 提供多种编码格式（如 mp4、webm、ogg），适配不同浏览器。
- 使用 hls.js、dash.js 等库兼容不支持原生 HLS/DASH 的浏览器。
- 通过 canPlayType、特性检测动态选择播放方案。

::: details 示例代码

```javascript
const video = document.createElement('video');
if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = 'video.m3u8';
} else if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource('video.m3u8');
  hls.attachMedia(video);
} else {
  video.src = 'video.mp4';
}
document.body.appendChild(video);
```

:::


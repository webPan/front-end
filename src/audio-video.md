## 一、基础原理

1. **简述音视频的采集、编码、传输、解码、播放的基本流程。**  
   **核心答案：**  
   采集 → 编码 → 传输 → 解码 → 播放。  
   **原理补充：**  
   - 采集：通过摄像头、麦克风等设备获取原始音视频数据。  
   - 编码：将原始数据压缩成特定格式（如H.264、AAC），以减少带宽占用。  
   - 传输：通过网络协议（如RTMP、HLS、WebRTC）将编码后的数据发送到接收端。  
   - 解码：接收端将压缩数据还原为可播放的音视频流。  
   - 播放：通过播放器进行渲染和输出。

2. **什么是码率、帧率、分辨率？它们对音视频质量和带宽的影响？**  
   **核心答案：**  
   - 码率：单位时间内传输的数据量，影响清晰度和带宽消耗。  
   - 帧率：每秒显示的帧数，影响流畅度和带宽。  
   - 分辨率：画面像素尺寸，影响清晰度和带宽。  
   **原理补充：**  
   码率高，画质好但带宽占用大；帧率高，画面流畅但带宽占用大；分辨率高，画质细腻但带宽占用大。

3. **常见的视频编码格式有哪些？H.264、H.265、VP8、VP9 有什么区别？**  
   **核心答案：**  
   常见格式：H.264、H.265、VP8、VP9、AV1。  
   - H.264：兼容性好，压缩率高，广泛应用。  
   - H.265：比H.264压缩率更高，适合4K/8K，但解码复杂。  
   - VP8/VP9：Google开源，VP9压缩率高于VP8，适合Web。  
   **原理补充：**  
   H.264/H.265为MPEG系列，VP8/VP9为Google主导，AV1为新一代开源高效编码。

4. **音频常见的编码格式有哪些？AAC、MP3、Opus 有什么特点？**  
   **核心答案：**  
   常见格式：AAC、MP3、Opus、WAV、FLAC。  
   - AAC：高压缩率，音质好，主流流媒体采用。  
   - MP3：兼容性强，音质一般，老牌格式。  
   - Opus：低延迟，高音质，适合实时通信（如WebRTC）。  
   **原理补充：**  
   AAC和Opus在低码率下表现优于MP3，Opus支持宽频带和自适应码率。

5. **什么是容器格式？常见的音视频容器格式有哪些？**  
   **核心答案：**  
   容器格式用于封装音视频流及其元数据。  
   常见格式：MP4、MKV、FLV、MOV、AVI、WebM。  
   **原理补充：**  
   容器可包含多路音视频流、字幕、元数据等，便于同步和管理。

---

## 二、Web 音视频相关 API

1. **如何使用 HTML5 的 `<video>` 和 `<audio>` 标签实现音视频播放？**  
   **核心答案：**  
   直接在HTML中使用`<video>`或`<audio>`标签，设置`src`属性即可播放。  
   **示例代码：**  

   ```html
   <video src="video.mp4" controls></video>
   <audio src="audio.mp3" controls></audio>
   ```

2. **MediaSource Extensions (MSE) 的作用是什么？如何实现自定义流媒体播放？**  
   **核心答案：**  
   MSE允许JavaScript动态地将音视频流数据推送到`<video>`标签，实现自定义流媒体播放。  
   **原理补充：**  
   适用于自适应码流（如HLS、DASH）和P2P点播。  
   **示例代码：**  

   ```js
   const mediaSource = new MediaSource();
   video.src = URL.createObjectURL(mediaSource);
   mediaSource.addEventListener('sourceopen', () => {
     const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');
     // fetch分片数据并appendBuffer
   });
   ```

3. **WebRTC 的基本原理是什么？主要应用场景有哪些？**  
   **核心答案：**  
   WebRTC实现浏览器间实时音视频通信，核心是点对点传输、低延迟、无需插件。  
   **应用场景：**  
   视频通话、在线会议、实时互动直播、屏幕共享等。

4. **如何通过 getUserMedia 获取本地音视频流？有哪些常见的权限和兼容性问题？**  
   **核心答案：**  
   使用`navigator.mediaDevices.getUserMedia`获取本地摄像头和麦克风流。  
   需用户授权，部分浏览器或HTTPS环境下才可用。  
   **示例代码：**  

   ```js
   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
     .then(stream => { /* 使用stream */ })
     .catch(err => { /* 处理异常 */ });
   ```

5. **如何使用 Web Audio API 实现音频的处理和可视化？**  
   **核心答案：**  
   通过`AudioContext`处理音频流，使用`AnalyserNode`实现可视化。  
   **示例代码：**  

   ```js
   const ctx = new AudioContext();
   const analyser = ctx.createAnalyser();
   const source = ctx.createMediaElementSource(audioElement);
   source.connect(analyser);
   analyser.connect(ctx.destination);
   // 获取频谱数据进行可视化
   ```

---

## 三、流媒体与协议

1. **简述 RTMP、HLS、DASH、WebRTC 的优缺点及适用场景。**  
   **核心答案：**  
   - RTMP：低延迟，适合直播，需Flash/专用播放器。  
   - HLS：兼容性好，支持自适应，延迟较高，适合点播/直播。  
   - DASH：自适应流，开源标准，兼容性略逊HLS。  
   - WebRTC：超低延迟，点对点，适合实时互动。  

2. **HLS 的分片原理是什么？M3U8 文件的作用？**  
   **核心答案：**  
   HLS将音视频切分为若干小TS文件，M3U8为索引播放列表，指示分片顺序和地址。

3. **什么是自适应码流（ABR）？如何实现？**  
   **核心答案：**  
   ABR根据网络状况动态切换不同码率的视频流，提升播放体验。  
   实现方式：客户端监测带宽和缓冲，自动切换M3U8/DASH中的不同码率分片。

4. **WebRTC 的信令过程包括哪些步骤？**  
   **核心答案：**  
   包括会话协商（SDP交换）、网络信息交换（ICE候选）、建立连接。  
   需借助信令服务器传递SDP和ICE信息。

5. **如何实现音视频的录制与回放？**  
   **核心答案：**  
   使用`MediaRecorder` API录制音视频流，生成Blob后可本地回放或上传。  
   **示例代码：**  

   ```js
   const recorder = new MediaRecorder(stream);
   recorder.ondataavailable = e => { /* 保存e.data */ };
   recorder.start();
   ```

---

## 四、性能优化与体验提升

1. **如何优化网页端音视频的首帧加载速度？**  
   **核心答案：**  
   采用首屏预加载、关键帧优先、CDN加速、减少首包体积等手段。

2. **如何减少音视频播放过程中的卡顿和延迟？**  
   **核心答案：**  
   使用自适应码流、合理设置缓冲区、CDN分发、弱网优化等。

3. **如何实现音视频的预加载和缓存？**  
   **核心答案：**  
   通过MSE、Service Worker、HTTP缓存等方式预加载分片或缓存数据。

4. **如何处理弱网环境下的音视频播放？**  
   **核心答案：**  
   降低码率、切换分辨率、增加缓冲、断点续传、错误重试。

5. **如何实现多路音视频流的切换与同步？**  
   **核心答案：**  
   通过多路流管理、时间戳同步、缓冲区对齐，动态切换流并保持同步。

---

## 五、常见问题与安全

1. **如何防止音视频内容被盗链或下载？**  
   **核心答案：**  
   采用防盗链、Token鉴权、加密、DRM等手段。

2. **如何处理音视频播放中的跨域问题？**  
   **核心答案：**  
   服务器设置CORS响应头，允许指定域名访问。

3. **如何实现 DRM（数字版权管理）保护音视频内容？**  
   **核心答案：**  
   通过EME（Encrypted Media Extensions）结合DRM服务商（如Widevine、FairPlay）实现加密播放。

4. **如何检测和处理音视频播放失败或异常？**  
   **核心答案：**  
   监听`<video>`/`<audio>`的`error`事件，捕获异常并重试或提示用户。  
   **示例代码：**  

   ```js
   video.addEventListener('error', e => { /* 处理异常 */ });
   ```

5. **如何实现音视频的静音、倍速、画中画等功能？**  
   **核心答案：**  
   通过HTMLMediaElement的`muted`、`playbackRate`属性和`requestPictureInPicture`方法实现。  
   **示例代码：**  

   ```js
   video.muted = true; // 静音
   video.playbackRate = 2.0; // 倍速
   video.requestPictureInPicture(); // 画中画
   ```

---

## 六、项目实战与场景题

### 1. 设计一个支持直播和点播的网页音视频播放器，简述技术选型和实现思路

**核心答案：**  
技术选型：HTML5 `<video>`、MSE、HLS.js、WebRTC。  
实现思路：点播用HLS/DASH，直播用HLS/WebRTC，统一UI，支持多协议切换和自适应码流。

**深入讲解：**  

- **技术选型理由：**  
  - `<video>`标签是Web原生支持，兼容性好。  
  - HLS.js、Dash.js等库可让不支持HLS/DASH的浏览器也能播放自适应流。  
  - MSE（Media Source Extensions）允许自定义流推送，适合自适应码流和自定义协议。  
  - WebRTC适合低延迟直播和互动场景。
- **实现思路：**  
  1. **点播（VOD）**：  
     - 推荐使用HLS（.m3u8）或DASH（.mpd）格式，支持自适应码流。  
     - PC端可直接用`<video>`，不支持的浏览器用HLS.js或Dash.js。  
  2. **直播（Live）**：  
     - 低延迟场景用WebRTC，普通直播用HLS（延迟高但兼容性好）。  
     - 也可用FLV.js实现HTTP-FLV直播。
  3. **统一UI**：  
     - 播放器UI组件统一，底层根据流类型切换不同的播放内核。  
     - 支持切换清晰度、倍速、画中画、弹幕等功能。
  4. **自适应码流**：  
     - 通过MSE或HLS.js自动根据网络状况切换码率，提升体验。
- **关键难点：**  
  - 多协议兼容与切换  
  - 直播与点播的业务逻辑分离  
  - 异常处理与播放状态监控

**示例代码片段：**  

```js
if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource('video.m3u8');
  hls.attachMedia(videoElement);
} else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
  videoElement.src = 'video.m3u8';
}
```

---

### 2. 如何在网页端实现视频通话？需要哪些技术和服务支持？

**核心答案：**  
采用WebRTC实现音视频采集、编解码、传输，需信令服务器、STUN/TURN服务器支持。

**深入讲解：**  

- **核心原理：**  
  - WebRTC提供浏览器端音视频采集、编解码、点对点传输能力。  
  - 但WebRTC本身不负责信令（即如何让两个用户互相找到并建立连接），需要自建或第三方信令服务器。  
  - NAT穿透需STUN服务器，极端网络需TURN服务器中转。
- **实现流程：**  
  1. A、B双方通过信令服务器交换SDP和ICE候选信息。  
  2. 浏览器通过`getUserMedia`采集本地音视频流。  
  3. 使用`RTCPeerConnection`建立P2P连接，传输音视频流。  
  4. 若P2P失败，TURN服务器中转流量。
- **关键难点：**  
  - 信令服务器的设计与实现（可用WebSocket、Socket.io等）  
  - NAT穿透与网络适配  
  - 多人通话需实现SFU/MCU等媒体服务器
- **常用开源方案：**  
  - 信令：Socket.io、WebSocket  
  - STUN/TURN：coturn  
  - SFU/MCU：mediasoup、janus、Jitsi

**示例代码片段：**  

```js
// 获取本地流
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  localVideo.srcObject = stream;
  peerConnection.addStream(stream);
});
// 信令交换略
```

---

### 3. 如何实现音视频的美颜、降噪等效果？

**核心答案：**  
美颜：Canvas/WebGL处理视频帧。  
降噪：Web Audio API处理音频流。

**深入讲解：**  

- **美颜原理：**  
  - 通过`canvas`或`WebGL`对视频帧进行像素级处理，如磨皮、滤镜、亮度调整等。  
  - 高级美颜可用TensorFlow.js等AI模型做人脸检测与特效。
- **降噪原理：**  
  - Web Audio API可用滤波器（如BiquadFilter）去除低频/高频噪声。  
  - 更高级的降噪可用WebAssembly或AI模型。
- **实现流程：**  
  1. 视频美颜：  
     - 将`<video>`帧绘制到`<canvas>`，对像素数据处理后再显示。  
  2. 音频降噪：  
     - 用`AudioContext`创建滤波器节点，处理音频流后输出。
- **关键难点：**  
  - 实时性要求高，需优化性能  
  - 兼容性与设备适配

**示例代码片段：**  

```js
// 视频美颜
function beautifyFrame() {
  ctx.drawImage(video, 0, 0, width, height);
  let frame = ctx.getImageData(0, 0, width, height);
  // 对frame.data做像素处理（如磨皮）
  ctx.putImageData(frame, 0, 0);
  requestAnimationFrame(beautifyFrame);
}

// 音频降噪
const audioCtx = new AudioContext();
const source = audioCtx.createMediaStreamSource(stream);
const filter = audioCtx.createBiquadFilter();
filter.type = 'highpass';
filter.frequency.value = 1000;
source.connect(filter).connect(audioCtx.destination);
```

---

### 4. 如何统计和上报音视频播放的各项数据指标？

**核心答案：**  
通过监听`<video>`事件、采集播放状态、卡顿、码率、延迟等数据，定时上报后端。

**深入讲解：**  

- **常见指标：**  
  - 首帧时间、卡顿次数与时长、播放时长、缓冲时长、码率、分辨率、错误码、用户行为等。
- **实现思路：**  
  1. 监听`<video>`的`play`、`pause`、`waiting`、`stalled`、`error`等事件，记录时间戳。  
  2. 通过`video.currentTime`、`buffered`等属性计算播放进度和卡顿。  
  3. 结合播放器内核（如HLS.js）可获取更详细的网络、解码、码率等信息。  
  4. 定时或按事件触发，将数据上报到后端分析系统。
- **关键难点：**  
  - 数据采集的准确性  
  - 上报频率与性能平衡  
  - 多端数据格式统一

**示例代码片段：**  

```js
video.addEventListener('waiting', () => { /* 记录卡顿开始时间 */ });
video.addEventListener('playing', () => { /* 记录卡顿结束，统计卡顿时长 */ });
setInterval(() => {
  // 定时上报播放进度、码率等
  fetch('/api/report', { method: 'POST', body: JSON.stringify(data) });
}, 60000);
```

---

### 5. 如何兼容不同浏览器和终端的音视频播放？

**核心答案：**  
检测浏览器能力，优先使用原生支持格式，必要时引入HLS.js、Dash.js等库做兼容处理。

**深入讲解：**  

- **兼容性挑战：**  
  - 不同浏览器对音视频格式支持不同，如Safari原生支持HLS，Chrome需HLS.js。  
  - 移动端与PC端的API和性能差异大。
- **实现思路：**  
  1. 检测浏览器对目标格式的支持（如`canPlayType`）。  
  2. 对于不支持的格式，动态加载HLS.js、Dash.js等JS库。  
  3. 移动端适配触摸事件、全屏、自动播放等特性。  
  4. 兼容性兜底：提供多种格式源（如mp4、webm、m3u8）。
- **关键难点：**  
  - 兼容性检测的准确性  
  - 第三方库的集成与维护  
  - 终端适配与体验优化

**示例代码片段：**  

```js
if (Hls.isSupported()) {
  // 用HLS.js播放m3u8
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  // Safari等原生支持
} else {
  // 提示用户或切换到mp4等格式
}
```

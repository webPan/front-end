# 音视频

## 音视频的采集、编码、传输、解码、播放的基本流程

**核心答案：**  
音视频的完整流程包括采集、编码、传输、解码和播放五个环节。采集获取原始数据，编码压缩数据，传输将数据发送到目标，解码还原数据，播放进行最终呈现。

**原理详解：**  

1. **采集**：通过摄像头、麦克风等硬件设备获取原始音视频信号，通常为未压缩的原始数据（如YUV、PCM）。
2. **编码**：使用音视频编码器（如H.264、AAC）对原始数据进行压缩，减少数据体积，便于传输和存储。
3. **传输**：通过网络协议（如RTMP、HLS、WebRTC等）将编码后的数据流发送到接收端，可能涉及分片、重传、拥塞控制等机制。
4. **解码**：接收端使用解码器将压缩的数据还原为原始音视频帧，供后续播放使用。
5. **播放**：将解码后的音视频帧送入播放器，进行同步渲染和输出，最终呈现给用户。

::: details 浏览器端音视频采集、编码、播放（Web API 示例）

```js
// 采集本地音视频流
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    // 播放采集到的视频
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.play();

    // 示例：将音视频流编码并发送（伪代码，实际需用WebRTC/MediaRecorder等）
    // const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8,opus' });
    // mediaRecorder.ondataavailable = (e) => sendToServer(e.data);
    // mediaRecorder.start();
  })
  .catch(err => {
    console.error('采集失败:', err);
  });
```

:::

::: details Node.js 端音视频流处理（伪代码示例）

```js
// 伪代码：Node.js 服务器端处理音视频流
const net = require('net');
const ffmpeg = require('fluent-ffmpeg');

// 接收客户端推流
const server = net.createServer(socket => {
  // 假设收到的是原始音视频流
  ffmpeg(socket)
    .inputFormat('rawvideo')
    .videoCodec('libx264')
    .audioCodec('aac')
    .output('output.mp4')
    .on('end', () => console.log('编码完成'))
    .run();
});
server.listen(9000);
```

:::

## 什么是码率、帧率、分辨率？它们对音视频质量和带宽的影响？

**核心答案：**  
码率决定单位时间内传输的数据量，影响清晰度和带宽消耗；帧率决定每秒显示的画面数，影响流畅度和运动表现；分辨率决定画面像素数量，影响清晰度和细节。三者共同影响音视频质量和所需带宽。

**原理详解：**  

1. **码率（Bitrate）**  
   - 指单位时间内传输的数据量，常用kbps或Mbps表示。  
   - 码率越高，画质和音质越好，但带宽消耗也越大。  
   - 过低的码率会导致马赛克、模糊、声音失真等问题。

2. **帧率（Frame Rate）**  
   - 指每秒钟显示的画面帧数，常用fps（frames per second）表示。  
   - 帧率越高，画面越流畅，运动表现越自然。  
   - 常见帧率有24fps（电影）、30fps（视频）、60fps（高帧率视频/游戏）。  
   - 帧率过低会导致画面卡顿、拖影。

3. **分辨率（Resolution）**  
   - 指画面中像素的数量，通常用“宽×高”表示，如1920×1080（1080p）。  
   - 分辨率越高，画面越清晰，细节越丰富，但对码率和带宽要求也更高。  
   - 低分辨率会导致画面模糊、细节丢失。

4. **三者关系与带宽**  
   - 在同等编码效率下，分辨率和帧率越高，所需码率越高。  
   - 码率越高，对网络带宽的要求越大。  
   - 实际应用中需根据场景权衡三者，兼顾画质、流畅度和带宽消耗。

::: details 获取视频的码率、帧率、分辨率（HTML5 + JS 示例）

```js
// 获取视频的分辨率和帧率
const video = document.querySelector('video');
video.onloadedmetadata = function() {
  console.log('分辨率:', video.videoWidth + 'x' + video.videoHeight);
  // 帧率通常需要通过流信息或媒体流Track获取
  if (video.getVideoPlaybackQuality) {
    const quality = video.getVideoPlaybackQuality();
    console.log('帧率（估算）:', quality.totalVideoFrames / video.duration);
  }
};

// 获取码率（需配合媒体流或后端统计）
function estimateBitrate(fileSizeBytes, durationSeconds) {
  // 码率 = 文件大小（字节）* 8 / 时长（秒） / 1000（kbps）
  return (fileSizeBytes * 8 / durationSeconds / 1000).toFixed(2) + ' kbps';
}
```

:::

::: details ffmpeg 获取视频参数（命令行+Node.js 示例）

```bash
# 命令行获取视频信息
ffmpeg -i input.mp4
```

```js
// Node.js 使用 fluent-ffmpeg 获取视频参数
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.ffprobe('input.mp4', (err, metadata) => {
  if (err) throw err;
  const videoStream = metadata.streams.find(s => s.codec_type === 'video');
  console.log('分辨率:', videoStream.width + 'x' + videoStream.height);
  console.log('帧率:', eval(videoStream.r_frame_rate)); // 例如 '30/1'
  console.log('码率:', videoStream.bit_rate + ' bps');
});
```

:::

## 常见的视频编码格式有哪些？H.264、H.265、VP8、VP9 有什么区别？

**核心答案：**  
常见视频编码格式有 H.264、H.265、VP8、VP9、AV1 等。H.264 兼容性好、应用广泛，H.265 压缩率更高但解码复杂，VP8/VP9 为 Google 推广的开源格式，VP9 压缩率接近 H.265，适合 Web 场景。

**原理详解：**  

1. **H.264（AVC）**  
   - 目前最主流的视频编码格式，广泛应用于流媒体、视频会议、监控等领域。
   - 优点：压缩效率高，兼容性好，硬件支持广泛。
   - 缺点：专利限制，需付费授权。

2. **H.265（HEVC）**  
   - H.264 的继任者，压缩效率提升约 50%，同等画质下码率更低。
   - 优点：高压缩率，适合 4K/8K 高清视频。
   - 缺点：解码复杂度高，对硬件要求高，专利问题更复杂。

3. **VP8**  
   - Google 推出的开源视频编码格式，主要用于 WebRTC、YouTube 等。
   - 优点：开源免费，适合网络传输，兼容性较好。
   - 缺点：压缩效率略低于 H.264。

4. **VP9**  
   - VP8 的升级版，压缩效率接近 H.265。
   - 优点：开源免费，适合高分辨率视频，YouTube 广泛使用。
   - 缺点：硬件支持不如 H.264/H.265，编码速度较慢。

5. **AV1**  
   - 新一代开源编码格式，压缩率更高，逐步被主流平台采纳。

**对比总结：**  

- H.264：兼容性最佳，应用最广。
- H.265：压缩率高，适合高清，但专利复杂。
- VP8/VP9：开源，适合 Web，VP9 压缩率高于 VP8。
- AV1：未来趋势，压缩率最高，完全开源。

::: details HTML5 `<video>` 标签支持多种编码格式

```html
<video controls width="400">
  <source src="video-h264.mp4" type="video/mp4; codecs='avc1.42E01E'">
  <source src="video-vp8.webm" type="video/webm; codecs='vp8, vorbis'">
  <source src="video-vp9.webm" type="video/webm; codecs='vp9'">
  您的浏览器不支持 video 标签。
</video>
<!-- 浏览器会自动选择支持的格式进行播放 -->
```

:::

::: details 使用 ffmpeg 转码为不同编码格式

```bash
# 转码为 H.264
ffmpeg -i input.mp4 -c:v libx264 output-h264.mp4

# 转码为 H.265
ffmpeg -i input.mp4 -c:v libx265 output-h265.mp4

# 转码为 VP8
ffmpeg -i input.mp4 -c:v libvpx output-vp8.webm

# 转码为 VP9
ffmpeg -i input.mp4 -c:v libvpx-vp9 output-vp9.webm
```

:::

## 音频常见的编码格式有哪些？AAC、MP3、Opus 有什么特点？

**核心答案：**  
常见音频编码格式有 AAC、MP3、Opus、WAV、FLAC 等。AAC 压缩率高、音质好，MP3 兼容性强、应用广泛，Opus 适合实时通信，低延迟、适应性强。

**原理详解：**  

1. **AAC（Advanced Audio Coding）**  
   - 新一代有损音频编码格式，广泛用于流媒体、视频、移动设备等。
   - 优点：同等码率下音质优于 MP3，支持多声道，压缩效率高。
   - 缺点：专利授权，部分老设备兼容性较差。

2. **MP3（MPEG Audio Layer III）**  
   - 最流行的有损音频格式，几乎所有设备都支持。
   - 优点：兼容性极佳，应用广泛。
   - 缺点：压缩效率低于 AAC，专利已过期。

3. **Opus**  
   - 开源、免费，专为实时语音/音频通信设计（如 WebRTC）。
   - 优点：低延迟，适应性强（6kbps-510kbps），高音质，支持语音和音乐。
   - 缺点：部分老设备或播放器支持有限。

4. **WAV**  
   - 无损音频格式，存储原始 PCM 数据。
   - 优点：音质无损，适合后期编辑。
   - 缺点：文件体积大，不适合网络传输。

5. **FLAC**  
   - 开源无损压缩格式，音质与 WAV 相同但体积更小。
   - 优点：无损压缩，音质高。
   - 缺点：兼容性不如 MP3/AAC。

**对比总结：**  

- AAC：主流流媒体首选，音质好，压缩高效。
- MP3：兼容性最强，音质一般。
- Opus：实时通信首选，低延迟，适应性强。
- WAV/FLAC：无损音质，适合存储和编辑。

::: details HTML5 `<audio>` 标签支持多种音频格式

```html
<audio controls>
  <source src="audio-aac.m4a" type="audio/mp4; codecs='mp4a.40.2'">
  <source src="audio-mp3.mp3" type="audio/mpeg">
  <source src="audio-opus.opus" type="audio/ogg; codecs=opus">
  您的浏览器不支持 audio 标签。
</audio>
<!-- 浏览器会自动选择支持的格式进行播放 -->
```

:::

::: details 使用 ffmpeg 转码为不同音频编码格式

```bash
# 转码为 AAC
ffmpeg -i input.wav -c:a aac output-aac.m4a

# 转码为 MP3
ffmpeg -i input.wav -c:a libmp3lame output-mp3.mp3

# 转码为 Opus
ffmpeg -i input.wav -c:a libopus output-opus.opus

# 转码为无损 FLAC
ffmpeg -i input.wav -c:a flac output-flac.flac
```

:::

## 什么是容器格式？常见的音视频容器格式有哪些？

**核心答案：**  
容器格式是一种用于封装音频、视频、字幕等多种数据流的文件格式，常见的有 MP4、MKV、AVI、MOV、FLV、WebM 等。容器本身不负责编码，只负责组织和同步不同类型的数据流。

**原理详解：**  

1. **容器格式（Container Format）**  
   - 容器格式是一种文件格式，用于将音频流、视频流、字幕流、元数据等多种数据打包在同一个文件中。
   - 容器负责数据流的同步、索引、时序管理等，但不直接决定音视频的编码方式。
   - 一个容器可以支持多种编码格式（如 MP4 可封装 H.264/AAC，也可封装 H.265/MP3 等）。

2. **常见容器格式及特点**  
   - **MP4（.mp4）**：最常用的容器，兼容性好，支持 H.264/H.265/AAC 等，适合流媒体和移动端。
   - **MKV（.mkv）**：开源，支持多音轨、多字幕，适合高清影视和收藏。
   - **AVI（.avi）**：较老的格式，兼容性好，但功能有限，不支持新编码和多音轨。
   - **MOV（.mov）**：苹果公司开发，适合 Mac/iOS 生态，支持高质量视频。
   - **FLV（.flv）**：适合 Flash 流媒体，现已逐渐被淘汰。
   - **WebM（.webm）**：Google 推广，适合网页播放，支持 VP8/VP9/Opus。

3. **容器与编码的关系**  
   - 容器格式 ≠ 编码格式。容器负责“装载”，编码负责“压缩”。
   - 例如 MP4 容器可以装 H.264 视频和 AAC 音频，也可以装 H.265 视频和 MP3 音频。

::: details 使用 ffmpeg 封装/转换不同容器格式

```bash
# 将 H.264/AAC 封装为 MP4
ffmpeg -i input.h264 -i input.aac -c copy output.mp4

# MP4 转 MKV（不重新编码，仅更换容器）
ffmpeg -i input.mp4 -c copy output.mkv

# MP4 转 WebM（需转码为 VP8/Opus）
ffmpeg -i input.mp4 -c:v libvpx -c:a libopus output.webm

# 提取 MP4 中的音频流
ffmpeg -i input.mp4 -vn -acodec copy output.aac
```

:::

::: details 检查视频文件的容器和编码信息（Node.js 示例）

```js
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.ffprobe('input.mp4', (err, metadata) => {
  if (err) throw err;
  console.log('容器格式:', metadata.format.format_name); // 如 mp4, matroska
  metadata.streams.forEach(stream => {
    if (stream.codec_type === 'video') {
      console.log('视频编码:', stream.codec_name);
    }
    if (stream.codec_type === 'audio') {
      console.log('音频编码:', stream.codec_name);
    }
  });
});
```

:::

## 如何使用 HTML5 的 `<video>` 和 `<audio>` 标签实现音视频播放？

**核心答案：**  
HTML5 提供了 `<video>` 和 `<audio>` 标签，直接在网页中嵌入并播放音视频文件，支持多种格式和常用控制属性。

**原理详解：**  

- `<video>` 和 `<audio>` 标签原生支持多种格式（如 MP4、WebM、OGG、MP3、AAC 等），可通过 `src` 或 `<source>` 指定资源。
- 常用属性有 `controls`（显示控制条）、`autoplay`（自动播放）、`loop`（循环）、`muted`（静音）、`poster`（视频封面）等。
- 可通过 JS 控制播放、暂停、音量、进度等，监听事件如 `play`、`pause`、`ended`、`timeupdate` 等。

::: details 基本用法与 JS 控制

```html
<video id="myVideo" width="400" controls poster="cover.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  您的浏览器不支持 video 标签。
</video>
<audio id="myAudio" controls>
  <source src="music.mp3" type="audio/mpeg">
  <source src="music.ogg" type="audio/ogg">
  您的浏览器不支持 audio 标签。
</audio>
<script>
  const video = document.getElementById('myVideo');
  video.addEventListener('play', () => console.log('视频开始播放'));
  video.addEventListener('pause', () => console.log('视频暂停'));
  // 控制播放
  // video.play();
  // video.pause();
  // video.currentTime = 10; // 跳转到第10秒
</script>
```

:::

## MediaSource Extensions (MSE) 的作用是什么？如何实现自定义流媒体播放？

**核心答案：**  
MSE 允许开发者通过 JS 动态拼接、推送媒体流，实现自定义流媒体播放（如 HLS、DASH），适合大文件分片、直播、点播等场景。

**原理详解：**  

- MSE 提供 `MediaSource` 对象，可将媒体数据分片（chunk）推送到 `<video>` 或 `<audio>` 标签，实现自定义缓冲、分片加载、ABR 等高级功能。
- 典型应用：HLS、DASH、P2P 点播/直播、广告插入等。
- 主要流程：创建 `MediaSource`，添加 `SourceBuffer`，通过 `appendBuffer` 动态推送媒体数据。

::: details MSE 基本用法

```js
const video = document.querySelector('video');
const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
  const mime = 'video/webm; codecs="vp8,vorbis"';
  const sourceBuffer = mediaSource.addSourceBuffer(mime);

  fetch('video-chunk.webm')
    .then(res => res.arrayBuffer())
    .then(data => {
      sourceBuffer.appendBuffer(data);
      sourceBuffer.addEventListener('updateend', () => {
        mediaSource.endOfStream();
      });
    });
});
```

:::

## WebRTC 的基本原理是什么？主要应用场景有哪些？

**核心答案：**  
WebRTC 实现浏览器间实时音视频通信，核心原理是点对点传输、NAT 穿透、媒体协商和数据通道，主要用于视频通话、实时互动、在线教育等场景。

**原理详解：**  

- WebRTC 由三大核心 API 组成：`getUserMedia`（采集）、`RTCPeerConnection`（点对点传输）、`RTCDataChannel`（数据通道）。
- 通过 ICE/STUN/TURN 实现 NAT 穿透，SDP 协商媒体参数，SRTP 加密传输。
- 支持音视频、文件、文本等多种实时数据传输。
- 典型应用：视频会议、在线客服、互动直播、远程协作等。

::: details WebRTC 基本流程（简化版）

```js
// 采集本地流
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    // 显示本地视频
    document.querySelector('video#local').srcObject = stream;
    // 创建 PeerConnection
    const pc = new RTCPeerConnection();
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    // 信令交换（伪代码）
    pc.onicecandidate = e => sendToRemote(e.candidate);
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    // 远端收到 offer 后 setRemoteDescription 并回复 answer
  });
```

:::

## 如何通过 getUserMedia 获取本地音视频流？有哪些常见的权限和兼容性问题？

**核心答案：**  
通过 `navigator.mediaDevices.getUserMedia` 获取本地摄像头和麦克风流，需用户授权，部分浏览器和 HTTPS 环境下才支持，权限被拒绝或设备不可用时需处理异常。

**原理详解：**  

- `getUserMedia` 返回 Promise，参数为约束条件（如 `{ video: true, audio: true }`）。
- 需用户授权，浏览器会弹窗请求权限。
- 仅在 HTTPS 或 localhost 下可用，部分移动端或老旧浏览器兼容性有限。
- 常见异常：用户拒绝、设备被占用、无可用设备等。

::: details 获取本地音视频流并处理异常

```js
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    document.querySelector('video').srcObject = stream;
  })
  .catch(err => {
    if (err.name === 'NotAllowedError') {
      alert('用户拒绝了摄像头/麦克风权限');
    } else if (err.name === 'NotFoundError') {
      alert('未检测到可用的摄像头或麦克风');
    } else {
      alert('获取音视频流失败: ' + err.message);
    }
  });
```

:::

## 如何使用 Web Audio API 实现音频的处理和可视化？

**核心答案：**  
Web Audio API 提供强大的音频处理能力，可实现音频分析、滤波、混音、可视化等功能，常用于音频特效、频谱动画等场景。

**原理详解：**  

- 通过 `AudioContext` 创建音频上下文，支持多种音频节点（如 `AnalyserNode`、`GainNode`、`BiquadFilterNode` 等）。
- 可实时获取音频数据，进行频谱分析、波形绘制、音量调节等。
- 支持链式连接，实现复杂音频处理流程。

::: details 音频可视化（频谱图）

```js
const audio = document.querySelector('audio');
const ctx = new AudioContext();
const src = ctx.createMediaElementSource(audio);
const analyser = ctx.createAnalyser();
src.connect(analyser);
analyser.connect(ctx.destination);

const canvas = document.querySelector('canvas');
const cxt = canvas.getContext('2d');
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];
    cxt.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
    cxt.fillRect(i * 3, canvas.height - barHeight, 2, barHeight);
  }
}
draw();
```

:::

## 简述 RTMP、HLS、DASH、WebRTC 的优缺点及适用场景

**核心答案：**  
RTMP 低延迟、适合直播但兼容性差；HLS 兼容性好、支持自适应但延迟高；DASH 开源、灵活、支持多码率但实现复杂；WebRTC 超低延迟、适合实时互动但部署难度大。

**原理详解：**  

- **RTMP（Real-Time Messaging Protocol）**
  - 优点：延迟低（1-3秒），推流简单，适合直播推流端。
  - 缺点：基于 Flash，浏览器端已不再支持，兼容性差。
  - 适用场景：直播推流、CDN 分发、内部监控。
- **HLS（HTTP Live Streaming）**
  - 优点：基于 HTTP，兼容性好，支持断点续播和自适应码流。
  - 缺点：延迟较高（10-30秒），实时性差。
  - 适用场景：点播、延时直播、大规模分发。
- **DASH（Dynamic Adaptive Streaming over HTTP）**
  - 优点：开源标准，支持多种编码和自适应码流，灵活性高。
  - 缺点：浏览器原生支持有限，需配合 JS 播放器。
  - 适用场景：高清视频点播、国际化分发。
- **WebRTC**
  - 优点：超低延迟（<1秒），点对点传输，支持实时互动。
  - 缺点：部署复杂，NAT 穿透难，带宽消耗大。
  - 适用场景：视频通话、互动直播、在线教育。

::: details HLS 播放器（hls.js 示例）

```html
<video id="video" controls></video>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource('https://example.com/playlist.m3u8');
    hls.attachMedia(document.getElementById('video'));
  } else {
    document.getElementById('video').src = 'https://example.com/playlist.m3u8';
  }
</script>
```

:::

## HLS 的分片原理是什么？M3U8 文件的作用？

**核心答案：**  
HLS 将音视频切分为若干小的 TS 分片文件，通过 M3U8 索引文件描述分片列表，播放器按需顺序加载分片，实现流式播放和自适应码流。

**原理详解：**  

- HLS（HTTP Live Streaming）将完整音视频流切分为数秒一个的 TS 文件（如 segment1.ts、segment2.ts）。
- M3U8 是基于文本的索引文件，记录所有分片的 URL、时长、序号等信息。
- 播放器先加载 M3U8 文件，再按顺序请求分片，实现边下边播。
- 支持多码率自适应（多级 M3U8），播放器可根据网络状况切换不同码率的分片。

::: details M3U8 文件示例

```m3u8
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:6
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:6.0,
segment0.ts
#EXTINF:6.0,
segment1.ts
#EXTINF:6.0,
segment2.ts
#EXT-X-ENDLIST
```

:::

## 什么是自适应码流（ABR）？如何实现？

**核心答案：**  
自适应码流（ABR）是根据用户网络状况动态切换不同码率的视频流，保证播放流畅和画质平衡，常见于 HLS、DASH 等协议。

**原理详解：**  

- 服务器端预先生成多种分辨率和码率的视频分片。
- 客户端播放器根据实时带宽、缓冲区状态等，自动选择最合适的码率分片进行播放。
- 切换过程无缝，用户几乎无感知。
- 典型实现：HLS 多级 M3U8、DASH 多 Representation。

::: details HLS 多码率 M3U8 示例

```m3u8
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
low/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=1280x720
mid/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1920x1080
high/index.m3u8
```

:::

## WebRTC 的信令过程包括哪些步骤？

**核心答案：**  
WebRTC 信令过程包括会话发起、SDP 协商、ICE 候选交换、连接建立等步骤，需借助外部信令服务器实现消息传递。

**原理详解：**  

1. A、B 双方通过信令服务器交换 SDP（Session Description Protocol）信息，协商音视频参数。
2. 交换 ICE（Interactive Connectivity Establishment）候选，进行 NAT 穿透。
3. 双方建立点对点连接，开始音视频/数据传输。
4. 信令过程不涉及媒体数据，仅用于连接建立前的参数协商。

::: details WebRTC 信令流程伪代码

```js
// A 端
const pc = new RTCPeerConnection();
pc.createOffer().then(offer => {
  pc.setLocalDescription(offer);
  sendToB({ type: 'offer', sdp: offer.sdp });
});
onReceiveFromB(msg => {
  if (msg.type === 'answer') {
    pc.setRemoteDescription(new RTCSessionDescription(msg));
  }
  if (msg.candidate) {
    pc.addIceCandidate(msg.candidate);
  }
});
// B 端
onReceiveFromA(msg => {
  if (msg.type === 'offer') {
    pc.setRemoteDescription(new RTCSessionDescription(msg));
    pc.createAnswer().then(answer => {
      pc.setLocalDescription(answer);
      sendToA({ type: 'answer', sdp: answer.sdp });
    });
  }
  if (msg.candidate) {
    pc.addIceCandidate(msg.candidate);
  }
});
```

:::

## 如何实现音视频的录制与回放？

**核心答案：**  
可通过 MediaRecorder API 录制音视频流，生成 Blob 文件后可本地回放或上传服务器。

**原理详解：**  

- MediaRecorder 支持录制 getUserMedia 获取的音视频流，输出 WebM、MP4 等格式。
- 录制过程中可分段获取数据，录制完成后生成可下载或回放的文件。
- 适用于网页端录屏、摄像头录制、语音留言等场景。

::: details MediaRecorder 录制与回放

```js
let chunks = [];
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      document.querySelector('video#playback').src = URL.createObjectURL(blob);
    };
    recorder.start();
    setTimeout(() => recorder.stop(), 5000); // 录制5秒
  });
```

:::

## 如何优化网页端音视频的首帧加载速度？

**核心答案：**  
优化首帧加载速度可通过减少首包时延、预加载关键分片、合理设置码率和分辨率、使用 CDN 加速等手段实现。

**原理详解：**  

- **减少首包时延**：优化服务器响应速度，减少 DNS、TLS、握手等网络延迟。
- **预加载关键分片**：HLS/DASH 可提前加载第一个分片，或使用 MSE 预推送数据。
- **合理设置码率/分辨率**：首帧可用低码率、低分辨率，待缓冲后再切换高质量。
- **CDN 加速**：将音视频资源分发到离用户更近的节点，降低访问延迟。
- **懒加载/首帧图**：未播放时先显示封面，点击后立即加载并播放。

::: details 视频首帧预加载与自动播放

```html
<video id="video" poster="cover.jpg" preload="auto" controls></video>
<script>
  const video = document.getElementById('video');
  video.src = 'video.mp4';
  // 可监听 canplay 事件，首帧可播放时提示用户
  video.addEventListener('canplay', () => {
    console.log('首帧已加载，可立即播放');
  });
</script>
```

:::

## 如何减少音视频播放过程中的卡顿和延迟？

**核心答案：**  
通过自适应码流、合理缓冲、CDN 加速、弱网优化、分片预加载等手段减少卡顿和延迟。

**原理详解：**  

- **自适应码流**：根据网络状况动态切换码率，保证流畅播放。
- **合理缓冲**：设置合适的缓冲区，防止网络波动导致卡顿。
- **CDN 加速**：减少跨地域访问延迟。
- **弱网优化**：丢包重传、FEC 前向纠错、降级策略（如只播音频）。
- **分片预加载**：提前加载后续分片，减少等待时间。

::: details 监听播放卡顿与自动降级

```js
const video = document.querySelector('video');
video.addEventListener('waiting', () => {
  console.log('播放卡顿，正在缓冲...');
  // 可切换低码率流或提示用户
});
video.addEventListener('stalled', () => {
  console.log('数据获取中断，尝试重连...');
  // 可尝试重新加载或切换备用源
});
```

:::

## 如何实现音视频的预加载和缓存？

**核心答案：**  
可通过 HTML5 的 preload 属性、MSE 动态缓冲、Service Worker 缓存分片等方式实现音视频预加载和缓存。

**原理详解：**  

- **preload 属性**：`auto` 表示自动加载，`metadata` 只加载元数据，`none` 不预加载。
- **MSE 动态缓冲**：可自定义缓冲区，提前加载多段分片。
- **Service Worker**：拦截请求，将分片缓存到本地，离线可用。
- **HTTP 缓存**：合理设置 Cache-Control、ETag 等头部，提升命中率。

::: details preload 属性与 Service Worker 缓存

```html
<video src="video.mp4" preload="auto" controls></video>
```

```js
// Service Worker 缓存分片
self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.ts')) {
    event.respondWith(
      caches.open('video-cache').then(cache =>
        cache.match(event.request).then(resp =>
          resp || fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
        )
      )
    );
  }
});
```

:::

## 如何处理弱网环境下的音视频播放？

**核心答案：**  
弱网环境下可通过自适应码流、降级策略、分片重传、缓冲优化等手段提升播放体验。

**原理详解：**  

- **自适应码流**：自动切换低码率流，保证流畅。
- **降级策略**：只播音频、降低分辨率、暂停视频等。
- **分片重传**：丢包时自动重试，保证数据完整。
- **缓冲优化**：增加缓冲区，减少因网络波动导致的卡顿。
- **网络状态检测**：监听 `navigator.connection`，动态调整播放策略。

::: details 检测网络状态并切换码率

```js
if ('connection' in navigator) {
  const conn = navigator.connection;
  conn.addEventListener('change', () => {
    if (conn.downlink < 1) {
      // 网络较差，切换低码率流
      switchToLowBitrate();
    }
  });
}
function switchToLowBitrate() {
  // 伪代码：切换到低码率视频源
  const video = document.querySelector('video');
  video.src = 'video-low.mp4';
  video.play();
}
```

:::

## 如何实现多路音视频流的切换与同步？

**核心答案：**  
可通过多 `<source>`、MSE 多 buffer、WebRTC 多 track 或 JS 控制流切换，并通过时间戳、时钟同步等方式保证多路流同步。

**原理详解：**  

- **多路切换**：可动态切换不同清晰度、角度、语言的流，或多摄像头画面。
- **同步方式**：通过统一时间戳、主时钟驱动、音视频同步算法等保证多路流同步播放。
- **WebRTC 多 track**：支持多路音视频 track，适合多方通话、画中画等场景。

::: details 切换多路视频流

```js
const video = document.querySelector('video');
function switchStream(url) {
  const currentTime = video.currentTime;
  video.src = url;
  video.currentTime = currentTime; // 保持进度同步
  video.play();
}
// 切换到另一路流
switchStream('video2.mp4');
```

:::

## 如何防止音视频内容被盗链或下载？

**核心答案：**  
可通过防盗链（Referer 校验）、Token 鉴权、分片加密、DRM、隐藏真实地址等手段防止盗链和非法下载。

**原理详解：**  

- **防盗链**：服务器校验 HTTP Referer，仅允许指定域名访问资源。
- **Token 鉴权**：为每个请求生成带时效性的 Token，校验通过才允许访问。
- **分片加密**：HLS/DASH 支持分片加密，未授权无法解密播放。
- **DRM（数字版权管理）**：通过 EME+CDM 实现内容加密和授权播放，防止下载和二次分发。
- **隐藏真实地址**：通过后端接口动态分发资源，避免直接暴露真实文件路径。

::: details Nginx 防盗链配置示例

```nginx
location /media/ {
  valid_referers none blocked server_names *.yourdomain.com;
  if ($invalid_referer) {
    return 403;
  }
}
```

:::

::: details HLS 分片加密与 Token 鉴权（伪代码）

```js
// 生成带签名的播放地址
function getSecureUrl(filename) {
  const token = generateToken(filename, Date.now() + 60000); // 1分钟有效
  return `/media/${filename}?token=${token}`;
}
```

:::

## 如何处理音视频播放中的跨域问题？

**核心答案：**  
需在服务器端设置 CORS 响应头（如 Access-Control-Allow-Origin），允许指定域名访问音视频资源。

**原理详解：**  

- 浏览器安全策略限制跨域资源访问，音视频流、分片、M3U8 文件等都需支持 CORS。
- 服务器需返回 `Access-Control-Allow-Origin`，可指定 `*` 或具体域名。
- 若需携带 Cookie，还需设置 `Access-Control-Allow-Credentials`。

::: details Nginx 设置 CORS 响应头

```nginx
location /media/ {
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods 'GET, OPTIONS';
}
```

:::

## 如何实现 DRM（数字版权管理）保护音视频内容？

**核心答案：**  
通过 EME（Encrypted Media Extensions）+ CDM（Content Decryption Module）实现音视频加密分发和授权解密播放，主流方案有 Widevine、PlayReady、FairPlay。

**原理详解：**  

- **EME**：浏览器提供的 JS API，用于与 CDM 通信，实现加密内容的解密和播放。
- **CDM**：浏览器内置的解密模块，只有获得授权的用户才能解密播放内容。
- **加密流程**：服务端加密音视频分片，客户端通过 EME 获取密钥，CDM 解密后播放。
- **主流 DRM**：Google Widevine（Chrome/Android）、Microsoft PlayReady（Edge/IE）、Apple FairPlay（Safari/iOS）。

::: details EME API 基本用法（伪代码）

```js
const video = document.querySelector('video');
const keySystem = 'com.widevine.alpha';
navigator.requestMediaKeySystemAccess(keySystem, [{ initDataTypes: ['cenc'], ... }])
  .then(keySystemAccess => keySystemAccess.createMediaKeys())
  .then(mediaKeys => video.setMediaKeys(mediaKeys))
  .then(() => {
    // 加载加密视频，处理 license 请求
  });
```

:::

## 如何检测和处理音视频播放失败或异常？

**核心答案：**  
可通过监听 `<video>`/`<audio>` 的 error、stalled、abort、ended 等事件，捕获异常并进行重试、切换源或提示用户。

**原理详解：**  

- **error 事件**：播放出错时触发，可通过 `video.error.code` 获取错误类型。
- **stalled/abort**：数据获取中断或用户中止。
- **ended**：播放结束。
- 可结合网络状态、重试机制、备用源切换等提升容错性。

::: details 监听播放异常并处理

```js
const video = document.querySelector('video');
video.addEventListener('error', e => {
  const err = video.error;
  switch (err.code) {
    case 1: alert('用户中止播放'); break;
    case 2: alert('网络错误'); break;
    case 3: alert('解码错误'); break;
    case 4: alert('不支持的格式或资源不可用'); break;
  }
  // 可尝试切换备用源
});
video.addEventListener('stalled', () => {
  console.log('数据获取中断，尝试重连...');
});
```

:::

## 如何实现音视频的静音、倍速、画中画等功能？

**核心答案：**  
可通过 `<video>`/`<audio>` 的 muted、playbackRate 属性和 requestPictureInPicture 方法实现静音、倍速、画中画等功能。

**原理详解：**  

- **静音**：设置 `video.muted = true`。
- **倍速**：设置 `video.playbackRate = 2.0`（2倍速）。
- **画中画**：调用 `video.requestPictureInPicture()` 进入画中画模式（需浏览器支持）。

::: details 控制静音、倍速、画中画

```js
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

## 设计一个支持直播和点播的网页音视频播放器，简述技术选型和实现思路

**核心答案：**  
可选用 HTML5 `<video>` 标签结合 hls.js、dash.js 等库实现点播和直播播放，后端采用 HLS/DASH/RTMP 协议，前端支持多码率自适应、弹幕、统计等功能。

**原理详解：**  

- **技术选型**：
  - 前端：HTML5 `<video>`，hls.js（HLS）、dash.js（DASH）、flv.js（FLV）、WebRTC（超低延迟直播）。
  - 后端：FFmpeg 转码、Nginx-RTMP/HLS/DASH 服务、CDN 分发。
- **实现思路**：
  1. 点播：将视频转码为多码率 HLS/DASH，前端用 hls.js/dash.js 播放。
  2. 直播：推流端用 RTMP 推流，服务器转封装为 HLS/DASH，前端用 hls.js/dash.js 播放，或用 flv.js/WebRTC 实现低延迟直播。
  3. 支持弹幕、倍速、画中画、统计等功能。
  4. 兼容移动端和 PC，支持多浏览器。

::: details hls.js 实现直播/点播播放器

```html
<video id="player" controls width="600"></video>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
  const video = document.getElementById('player');
  const url = 'https://example.com/live/stream.m3u8'; // 直播/点播地址
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.play();
  }
</script>
```

:::

## 如何在网页端实现视频通话？需要哪些技术和服务支持？

**核心答案：**  
可通过 WebRTC 实现网页端视频通话，需用到 getUserMedia、RTCPeerConnection、信令服务器（WebSocket）、STUN/TURN 服务器等。

**原理详解：**  

- **核心技术**：WebRTC（实时音视频通信）、getUserMedia（采集）、RTCPeerConnection（传输）、RTCDataChannel（数据）。
- **信令服务器**：用于交换 SDP、ICE 信息（常用 WebSocket）。
- **STUN/TURN 服务器**：实现 NAT 穿透，保证点对点连接。
- **流程**：采集本地流 → 信令交换 → 建立连接 → 传输音视频流。

::: details WebRTC 视频通话基本流程

```js
// 采集本地流
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    document.getElementById('local').srcObject = stream;
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    // 信令交换（通过 WebSocket 发送 offer/answer/ice）
    // 远端流
    pc.ontrack = e => document.getElementById('remote').srcObject = e.streams[0];
  });
```

:::

## 如何实现音视频的美颜、降噪等效果？

**核心答案：**  
可通过 WebGL/Canvas 实时处理视频帧实现美颜，通过 Web Audio API 或第三方库实现音频降噪。

**原理详解：**  

- **美颜**：使用 Canvas/WebGL 对视频帧进行滤镜处理（如磨皮、亮度、色彩调整）。
- **降噪**：Web Audio API 可实现简单降噪，复杂降噪可用第三方库（如 RNNoise、Speex）。
- **流程**：采集流 → 处理 → 输出到 `<video>` 或推送到远端。

::: details Canvas 实现简单美颜滤镜

```js
const video = document.querySelector('video#raw');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
function draw() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  // 简单美颜：高斯模糊、亮度调整等
  // 可用 ctx.filter = 'blur(2px) brightness(1.1)';
  requestAnimationFrame(draw);
}
video.onplay = draw;
```

:::

## 如何统计和上报音视频播放的各项数据指标？

**核心答案：**  
可通过监听 `<video>`/`<audio>` 事件、采集播放进度、卡顿、码率、分辨率等数据，定时或按需上报到后端。

**原理详解：**  

- 监听 `play`、`pause`、`waiting`、`error`、`ended` 等事件，统计播放行为。
- 采集 `currentTime`、`buffered`、`playbackRate`、`videoWidth`、`videoHeight` 等指标。
- 统计卡顿次数、播放时长、首帧耗时、码率切换等。
- 通过 AJAX、beacon、WebSocket 等方式上报数据。

::: details 采集并上报播放数据

```js
const video = document.querySelector('video');
let playStart, playEnd, stallCount = 0;
video.addEventListener('play', () => { playStart = Date.now(); });
video.addEventListener('pause', () => { playEnd = Date.now(); });
video.addEventListener('waiting', () => { stallCount++; });
video.addEventListener('ended', () => {
  const duration = (playEnd - playStart) / 1000;
  fetch('/api/report', {
    method: 'POST',
    body: JSON.stringify({
      duration,
      stallCount,
      resolution: `${video.videoWidth}x${video.videoHeight}`,
      bitrate: video.webkitVideoDecodedByteCount // 仅部分浏览器支持
    })
  });
});
```

:::

## 如何兼容不同浏览器和终端的音视频播放？

**核心答案：**  
通过多格式编码、特性检测、第三方库（如 hls.js、dash.js）、降级方案等手段实现跨浏览器和终端兼容。

**原理详解：**  

- **多格式编码**：同时提供 MP4（H.264/AAC）、WebM（VP8/VP9/Opus）、OGG 等多种格式。
- **特性检测**：用 JS 检测浏览器支持的格式和 API，动态选择合适的资源和播放方式。
- **第三方库**：hls.js、dash.js 可让不支持 HLS/DASH 的浏览器也能播放。
- **移动端适配**：注意触摸事件、自动播放策略、屏幕适配等。
- **降级方案**：不支持时提示用户下载或切换到兼容格式。

::: details 多格式兼容与特性检测

```html
<video id="video" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <source src="video.ogv" type="video/ogg">
  您的浏览器不支持 video 标签。
</video>
<script>
  const video = document.getElementById('video');
  if (!video.canPlayType('video/mp4')) {
    // 可用 hls.js 播放 HLS
  }
</script>
```

:::

## 如何检测和处理音视频播放失败或异常？

**核心答案：**  
通过监听 `<video>`/`<audio>` 的 error、stalled、abort、ended 等事件，捕获异常并进行重试、切换源或提示用户。

**原理详解：**  

- **error 事件**：播放出错时触发，可通过 `video.error.code` 获取错误类型。
- **stalled/abort**：数据获取中断或用户中止。
- **ended**：播放结束。
- 可结合网络状态、重试机制、备用源切换等提升容错性。

::: details 监听播放异常并处理

```js
const video = document.querySelector('video');
video.addEventListener('error', e => {
  const err = video.error;
  switch (err.code) {
    case 1: alert('用户中止播放'); break;
    case 2: alert('网络错误'); break;
    case 3: alert('解码错误'); break;
    case 4: alert('不支持的格式或资源不可用'); break;
  }
  // 可尝试切换备用源
});
video.addEventListener('stalled', () => {
  console.log('数据获取中断，尝试重连...');
});
```

:::

## 如何实现音视频的静音、倍速、画中画等功能？

**核心答案：**  
可通过 `<video>`/`<audio>` 的 muted、playbackRate 属性和 requestPictureInPicture 方法实现静音、倍速、画中画等功能。

**原理详解：**  

- **静音**：设置 `video.muted = true`。
- **倍速**：设置 `video.playbackRate = 2.0`（2倍速）。
- **画中画**：调用 `video.requestPictureInPicture()` 进入画中画模式（需浏览器支持）。

::: details 控制静音、倍速、画中画

```js
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

## 设计一个支持直播和点播的网页音视频播放器，简述技术选型和实现思路

**核心答案：**  
可选用 HTML5 `<video>` 标签结合 hls.js、dash.js 等库实现点播和直播播放，后端采用 HLS/DASH/RTMP 协议，前端支持多码率自适应、弹幕、统计等功能。

**原理详解：**  

- **技术选型**：
  - 前端：HTML5 `<video>`，hls.js（HLS）、dash.js（DASH）、flv.js（FLV）、WebRTC（超低延迟直播）。
  - 后端：FFmpeg 转码、Nginx-RTMP/HLS/DASH 服务、CDN 分发。
- **实现思路**：
  1. 点播：将视频转码为多码率 HLS/DASH，前端用 hls.js/dash.js 播放。
  2. 直播：推流端用 RTMP 推流，服务器转封装为 HLS/DASH，前端用 hls.js/dash.js 播放，或用 flv.js/WebRTC 实现低延迟直播。
  3. 支持弹幕、倍速、画中画、统计等功能。
  4. 兼容移动端和 PC，支持多浏览器。

::: details hls.js 实现直播/点播播放器

```html
<video id="player" controls width="600"></video>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
  const video = document.getElementById('player');
  const url = 'https://example.com/live/stream.m3u8'; // 直播/点播地址
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.play();
  }
</script>
```

:::

## 如何在网页端实现视频通话？需要哪些技术和服务支持？

**核心答案：**  
可通过 WebRTC 实现网页端视频通话，需用到 getUserMedia、RTCPeerConnection、信令服务器（WebSocket）、STUN/TURN 服务器等。

**原理详解：**  

- **核心技术**：WebRTC（实时音视频通信）、getUserMedia（采集）、RTCPeerConnection（传输）、RTCDataChannel（数据）。
- **信令服务器**：用于交换 SDP、ICE 信息（常用 WebSocket）。
- **STUN/TURN 服务器**：实现 NAT 穿透，保证点对点连接。
- **流程**：采集本地流 → 信令交换 → 建立连接 → 传输音视频流。

::: details WebRTC 视频通话基本流程

```js
// 采集本地流
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    document.getElementById('local').srcObject = stream;
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    // 信令交换（通过 WebSocket 发送 offer/answer/ice）
    // 远端流
    pc.ontrack = e => document.getElementById('remote').srcObject = e.streams[0];
  });
```

:::

## 如何实现音视频的美颜、降噪等效果？

**核心答案：**  
可通过 WebGL/Canvas 实时处理视频帧实现美颜，通过 Web Audio API 或第三方库实现音频降噪。

**原理详解：**  

- **美颜**：使用 Canvas/WebGL 对视频帧进行滤镜处理（如磨皮、亮度、色彩调整）。
- **降噪**：Web Audio API 可实现简单降噪，复杂降噪可用第三方库（如 RNNoise、Speex）。
- **流程**：采集流 → 处理 → 输出到 `<video>` 或推送到远端。

::: details Canvas 实现简单美颜滤镜

```js
const video = document.querySelector('video#raw');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
function draw() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  // 简单美颜：高斯模糊、亮度调整等
  // 可用 ctx.filter = 'blur(2px) brightness(1.1)';
  requestAnimationFrame(draw);
}
video.onplay = draw;
```

:::

## 如何统计和上报音视频播放的各项数据指标？

**核心答案：**  
可通过监听 `<video>`/`<audio>` 事件、采集播放进度、卡顿、码率、分辨率等数据，定时或按需上报到后端。

**原理详解：**  

- 监听 `play`、`pause`、`waiting`、`error`、`ended` 等事件，统计播放行为。
- 采集 `currentTime`、`buffered`、`playbackRate`、`videoWidth`、`videoHeight` 等指标。
- 统计卡顿次数、播放时长、首帧耗时、码率切换等。
- 通过 AJAX、beacon、WebSocket 等方式上报数据。

::: details 采集并上报播放数据

```js
const video = document.querySelector('video');
let playStart, playEnd, stallCount = 0;
video.addEventListener('play', () => { playStart = Date.now(); });
video.addEventListener('pause', () => { playEnd = Date.now(); });
video.addEventListener('waiting', () => { stallCount++; });
video.addEventListener('ended', () => {
  const duration = (playEnd - playStart) / 1000;
  fetch('/api/report', {
    method: 'POST',
    body: JSON.stringify({
      duration,
      stallCount,
      resolution: `${video.videoWidth}x${video.videoHeight}`,
      bitrate: video.webkitVideoDecodedByteCount // 仅部分浏览器支持
    })
  });
});
```

:::

## 如何兼容不同浏览器和终端的音视频播放？

**核心答案：**  
通过多格式编码、特性检测、第三方库（如 hls.js、dash.js）、降级方案等手段实现跨浏览器和终端兼容。

**原理详解：**  

- **多格式编码**：同时提供 MP4（H.264/AAC）、WebM（VP8/VP9/Opus）、OGG 等多种格式。
- **特性检测**：用 JS 检测浏览器支持的格式和 API，动态选择合适的资源和播放方式。
- **第三方库**：hls.js、dash.js 可让不支持 HLS/DASH 的浏览器也能播放。
- **移动端适配**：注意触摸事件、自动播放策略、屏幕适配等。
- **降级方案**：不支持时提示用户下载或切换到兼容格式。

::: details 多格式兼容与特性检测

```html
<video id="video" controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <source src="video.ogv" type="video/ogg">
  您的浏览器不支持 video 标签。
</video>
<script>
  const video = document.getElementById('video');
  if (!video.canPlayType('video/mp4')) {
    // 可用 hls.js 播放 HLS
  }
</script>
```

:::

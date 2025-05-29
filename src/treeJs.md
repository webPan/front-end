# Three.js

## Three.js 是什么？它的主要用途是什么？

**核心答案：**  
Three.js 是一个基于 WebGL 的 JavaScript 3D 渲染库，主要用于在网页中创建和展示高性能的三维图形和动画，广泛应用于可视化、游戏、交互式网站、虚拟现实等领域。

**原理讲解：**  
Three.js 封装了底层 WebGL API，简化了 3D 场景的创建流程。开发者无需直接操作复杂的 WebGL 代码，只需通过 Three.js 提供的对象和方法，即可实现三维模型的加载、材质设置、光照、动画、后期处理等功能。Three.js 支持多种渲染器（如 WebGLRenderer、CanvasRenderer），并且拥有丰富的扩展插件和社区资源。

::: details 示例代码
```js
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 设置相机位置
camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```
:::



## Three.js 的核心组成部分有哪些？请简要说明。

**核心答案：**  
Three.js 的核心组成部分包括：场景（Scene）、相机（Camera）、渲染器（Renderer）、几何体（Geometry）、材质（Material）、网格（Mesh）、光源（Light）等。

**原理讲解：**  
- 场景（Scene）：承载所有三维对象的容器。
- 相机（Camera）：决定从哪个角度和视野观察场景。
- 渲染器（Renderer）：负责将三维场景渲染为二维画面。
- 几何体（Geometry）：定义物体的形状。
- 材质（Material）：定义物体的表面外观。
- 网格（Mesh）：几何体和材质的结合体，是实际可见的三维物体。
- 光源（Light）：为场景提供照明效果。

::: details 示例代码
```js
import * as THREE from 'three';

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 创建几何体和材质
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

// 5. 创建网格对象
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 6. 添加光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// 7. 设置相机位置
camera.position.z = 5;

// 8. 渲染循环
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```
:::



## 如何在 Three.js 中创建一个基本的三维场景？需要哪些步骤？

**核心答案：**  
创建基本三维场景的步骤包括：初始化场景、相机和渲染器，创建几何体和材质并组合为网格对象，将网格添加到场景，设置相机位置，最后通过渲染器循环渲染场景。

**原理讲解：**  
1. 创建场景对象，作为所有物体的容器。
2. 创建相机，设置视角和可视范围。
3. 创建渲染器，将渲染结果输出到页面。
4. 创建几何体和材质，组合成网格对象。
5. 将网格对象添加到场景中。
6. 设置相机位置，确保能看到物体。
7. 启动渲染循环，不断更新和渲染场景。

::: details 示例代码
```js
import * as THREE from 'three';

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 创建几何体和材质
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

// 5. 创建网格对象
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 6. 添加光源
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// 7. 设置相机位置
camera.position.z = 5;

// 8. 渲染循环
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```
:::



## Three.js 中的 Mesh、Geometry 和 Material 分别是什么？它们之间有什么关系？

**核心答案：**  
Geometry（几何体）定义物体的形状，Material（材质）定义物体的表面属性，Mesh（网格）是几何体和材质的结合体，代表场景中可见的三维物体。

**原理讲解：**  
- Geometry 负责描述顶点、面等几何信息。
- Material 决定物体的颜色、纹理、透明度等视觉效果。
- Mesh 通过将 Geometry 和 Material 组合，生成可渲染的三维对象。一个 Mesh 只能有一个 Geometry 和一个 Material，但可以通过组（Group）实现更复杂的结构。

::: details 示例代码
```js
import * as THREE from 'three';

// 创建一个球体几何体
const geometry = new THREE.SphereGeometry(1, 32, 32);

// 创建一种材质
const material = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  shininess: 100,
  wireframe: false
});

// 组合为网格对象
const mesh = new THREE.Mesh(geometry, material);

// mesh 可以添加到场景中进行渲染
const scene = new THREE.Scene();
scene.add(mesh);

// 其余渲染、相机、光源等同前例
```
:::



## 如何在 Three.js 中添加光源？常见的光源类型有哪些？

**核心答案：**  
通过创建光源对象（如 AmbientLight、DirectionalLight、PointLight、SpotLight 等）并添加到场景中即可。常见光源类型有环境光、平行光、点光源、聚光灯等。

**原理讲解：**  
- 环境光（AmbientLight）：为场景提供均匀的基础照明，无方向性。
- 平行光（DirectionalLight）：模拟太阳光，具有方向性，常用于户外场景。
- 点光源（PointLight）：从一点向四周发射光线，类似灯泡。
- 聚光灯（SpotLight）：有方向和角度限制的光源，类似手电筒。
- 通过调整光源的位置、强度、颜色等参数，可以实现不同的照明效果。

::: details 示例代码
```js
import * as THREE from 'three';

const scene = new THREE.Scene();

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // 柔和的白色环境光
scene.add(ambientLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// 点光源
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(2, 5, 3);
scene.add(pointLight);

// 聚光灯
const spotLight = new THREE.SpotLight(0x00ff00, 1);
spotLight.position.set(-5, 10, 5);
scene.add(spotLight);

// 其余场景、相机、渲染器等同前例
```
:::


## Three.js 如何实现响应式渲染（自适应窗口大小）？

**核心答案：**  
通过监听窗口的 resize 事件，在事件回调中更新渲染器尺寸和相机的宽高比，并调用相机的 updateProjectionMatrix 方法，即可实现 Three.js 的响应式渲染。

**原理讲解：**  
Three.js 渲染器和相机的尺寸需要与浏览器窗口同步，否则会出现画面拉伸或显示不全。resize 事件触发时，需：
- 调用 renderer.setSize 更新渲染器尺寸；
- 更新 camera.aspect（宽高比），并调用 camera.updateProjectionMatrix 使其生效。

::: details 示例代码
```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 监听窗口大小变化，实现响应式
window.addEventListener('resize', () => {
  // 更新渲染器尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 更新相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
```
:::



## 请解释一下 Three.js 中的相机类型及其区别。

**核心答案：**  
Three.js 主要有两种常用相机类型：PerspectiveCamera（透视相机）和 OrthographicCamera（正交相机）。透视相机有近大远小的透视效果，适合三维场景；正交相机无透视变形，适合2D场景或工程制图。

**原理讲解：**  
- PerspectiveCamera：模拟人眼视觉，物体距离相机越远看起来越小，常用于真实感三维场景。
- OrthographicCamera：物体无论远近大小一致，常用于2D界面、CAD、建筑等场景。
- 选择哪种相机取决于实际需求。

::: details 示例代码
```js
import * as THREE from 'three';

// 透视相机
const perspectiveCamera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// 正交相机
const aspect = window.innerWidth / window.innerHeight;
const d = 5;
const orthographicCamera = new THREE.OrthographicCamera(
  -d * aspect, d * aspect, d, -d, 0.1, 1000
);

// 切换相机时只需将 renderer.render(scene, camera) 中的 camera 替换为对应相机即可
```
:::



## 如何在 Three.js 中实现物体的动画？有哪些常用的方法？

**核心答案：**  
Three.js 实现动画常用 requestAnimationFrame 循环，在每一帧中修改物体的属性（如位置、旋转、缩放等），并重新渲染场景。也可结合第三方动画库（如 tween.js）实现更复杂的动画。

**原理讲解：**  
- 通过 requestAnimationFrame 创建渲染循环，每帧更新物体属性。
- 可以直接修改 mesh.position、mesh.rotation、mesh.scale 等属性。
- 对于复杂动画，可用 tween.js、gsap 等库进行补间动画控制。

::: details 示例代码
```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

camera.position.z = 5;

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  // 让立方体自转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // 让立方体上下浮动
  cube.position.y = Math.sin(Date.now() * 0.002) * 2;
  renderer.render(scene, camera);
}
animate();
```
:::



## Three.js 如何加载外部模型（如 .obj、.gltf 文件）？

**核心答案：**  
Three.js 提供了多种加载器（如 OBJLoader、GLTFLoader），可用于加载不同格式的外部模型。加载后将模型对象添加到场景即可。

**原理讲解：**  
- 需先通过 npm 或 CDN 引入对应加载器。
- 使用加载器的 load 方法加载模型文件，回调中获取模型对象。
- 常用格式：.obj（OBJLoader）、.gltf/.glb（GLTFLoader）、.fbx（FBXLoader）等。

::: details 示例代码
```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 加载 glTF 模型
const loader = new GLTFLoader();
loader.load(
  'path/to/model.gltf', // 模型文件路径
  (gltf) => {
    // 加载成功，gltf.scene 是模型对象
    scene.add(gltf.scene);
  },
  (xhr) => {
    // 加载进度
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    // 加载出错
    console.error('An error happened', error);
  }
);

camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```
:::



## Three.js 如何实现阴影效果？需要注意哪些设置？

**核心答案：**  
要实现阴影效果，需要开启渲染器阴影、设置光源和物体的 castShadow 和 receiveShadow 属性，并合理调整光源参数和阴影贴图分辨率。

**原理讲解：**  
- 渲染器需开启阴影：renderer.shadowMap.enabled = true
- 支持阴影的光源（如 DirectionalLight、SpotLight）需设置 castShadow = true
- 物体需设置 castShadow（投射阴影）和 receiveShadow（接收阴影）
- 可通过 shadow.mapSize、shadow.bias 等参数优化阴影质量

::: details 示例代码
```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // 开启阴影
document.body.appendChild(renderer.domElement);

// 地面
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true; // 接收阴影
scene.add(plane);

// 立方体
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 0.5;
box.castShadow = true; // 投射阴影
scene.add(box);

// 平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
light.castShadow = true; // 光源投射阴影
light.shadow.mapSize.width = 1024; // 阴影贴图分辨率
light.shadow.mapSize.height = 1024;
scene.add(light);

camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```
:::

## Three.js 如何处理性能优化？有哪些常见的优化手段？

**核心答案：**  
Three.js 性能优化常见手段包括：减少场景中的物体数量、合并几何体、使用低面数模型、合理使用纹理和材质、开启硬件加速、降低阴影和后期处理质量、使用实例化渲染（InstancedMesh）等。

**原理讲解：**  
- 场景中物体越多，渲染压力越大，应合并静态物体或使用 InstancedMesh 批量渲染。
- 模型面数越低，渲染越快，尽量使用简化模型。
- 纹理分辨率不宜过高，材质类型选择要合理，避免过多透明和复杂着色器。
- 阴影、后期处理等特效会显著影响性能，可适当降低质量或关闭。
- 使用 frustum culling（视锥体裁剪）、LOD（多细节层次）等技术只渲染可见物体。

::: details 示例代码
```js
import * as THREE from 'three';

// 使用 InstancedMesh 批量渲染大量相同物体，提升性能
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const count = 1000;
const mesh = new THREE.InstancedMesh(geometry, material, count);

const dummy = new THREE.Object3D();
for (let i = 0; i < count; i++) {
  dummy.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  );
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}
scene.add(mesh);

// 关闭阴影、降低分辨率等也能提升性能
renderer.shadowMap.enabled = false;
renderer.setPixelRatio(window.devicePixelRatio * 0.5);
```
:::



## 如何在 Three.js 中实现交互（如鼠标点击选中物体）？

**核心答案：**  
通过 Raycaster（射线投射器）结合鼠标事件，可以检测鼠标与三维物体的交互，实现点击选中、悬停等功能。

**原理讲解：**  
- 监听鼠标事件，获取鼠标在画布上的归一化坐标（-1~1）。
- 使用 Raycaster 从相机发射射线，检测与场景中物体的交点。
- 通过 intersects 数组判断是否有物体被选中，并进行相应处理。

::: details 示例代码
```js
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  // 计算鼠标归一化设备坐标
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 设置射线
  raycaster.setFromCamera(mouse, camera);

  // 检测与场景中所有物体的交集
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // 选中第一个物体
    const selected = intersects[0].object;
    selected.material.color.set(0xffff00); // 例如：高亮显示
    console.log('选中物体：', selected);
  }
});
```
:::



## Three.js 如何实现粒子系统？

**核心答案：**  
Three.js 通过 Points（点云）和 PointsMaterial（点材质）结合 BufferGeometry 实现高效的粒子系统，可用于模拟烟雾、火花、星空等效果。

**原理讲解：**  
- 使用 BufferGeometry 存储大量粒子的位置数据。
- PointsMaterial 设置粒子的颜色、大小、透明度等。
- 创建 Points 对象并添加到场景中，通过动画循环更新粒子属性实现动态效果。

::: details 示例代码
```js
import * as THREE from 'three';

// 创建粒子几何体
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 创建粒子材质
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  transparent: true,
  opacity: 0.8
});

// 创建粒子系统
const points = new THREE.Points(geometry, material);
scene.add(points);

// 在动画循环中可动态修改粒子属性
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
```
:::



## 如何在 Three.js 中实现后期处理（Post-processing）？

**核心答案：**  
Three.js 可通过 EffectComposer 结合各种 Pass（如 RenderPass、UnrealBloomPass、ShaderPass 等）实现后期处理效果，如泛光、景深、抗锯齿等。

**原理讲解：**  
- EffectComposer 管理多个 Pass，按顺序处理渲染结果。
- RenderPass 负责基础场景渲染，其他 Pass 叠加特效。
- 可灵活组合多种后期处理效果，提升画面表现力。

::: details 示例代码
```js
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// 添加泛光效果
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // 强度
  0.4, // 半径
  0.85 // 阈值
);
composer.addPass(bloomPass);

// 渲染循环中用 composer 替代 renderer
function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
animate();
```
:::



## Three.js 如何与 HTML/CSS 进行结合，实现 UI 交互？

**核心答案：**  
Three.js 可通过 CSS3DRenderer 渲染 HTML/CSS 元素为三维对象，或通过监听 Three.js 事件与原生 DOM 事件结合，实现 UI 交互。

**原理讲解：**  
- CSS3DRenderer 可将 HTML 元素作为三维场景中的对象，与 WebGLRenderer 叠加使用。
- 也可通过事件联动（如点击 Three.js 物体时显示/隐藏 HTML 面板），实现三维与二维 UI 的结合。

::: details 示例代码
```js
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// 创建 CSS3D 渲染器
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild(cssRenderer.domElement);

// 创建 HTML 元素并包裹为 CSS3DObject
const element = document.createElement('div');
element.innerHTML = '<button>三维按钮</button>';
element.style.width = '100px';
element.style.height = '40px';
element.style.background = 'rgba(255,255,255,0.8)';
const cssObject = new CSS3DObject(element);
cssObject.position.set(0, 0, 0);
scene.add(cssObject);

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);      // 渲染三维内容
  cssRenderer.render(scene, camera);   // 渲染 HTML/CSS 内容
}
animate();
```
:::


## 请写出 Three.js 创建一个旋转立方体的完整代码。

**核心答案：**  
通过创建场景、相机、渲染器，添加立方体网格，并在动画循环中不断修改其旋转属性，即可实现旋转立方体。

**原理讲解：**  
- 创建 BoxGeometry 和 MeshStandardMaterial 生成 Mesh。
- 将 Mesh 添加到场景。
- 在 requestAnimationFrame 动画循环中，持续修改 mesh.rotation.x/y 实现旋转。
- 渲染器每帧渲染场景和相机视角。

::: details 示例代码
```js
import * as THREE from 'three';

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 创建立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. 添加光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// 6. 动画循环
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```
:::



## 如何让一个物体沿着指定路径运动？

**核心答案：**  
可通过自定义路径（如 CatmullRomCurve3），在动画循环中根据时间获取路径上的点，设置物体位置，实现沿路径运动。

**原理讲解：**  
- 使用 CatmullRomCurve3 创建三维路径。
- 通过 getPoint(t) 获取路径上 t（0~1）处的坐标。
- 在动画循环中递增 t，实现物体沿路径平滑移动。

::: details 示例代码
```js
import * as THREE from 'three';

// 定义路径上的点
const points = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(2, 2, 0),
  new THREE.Vector3(4, 0, 0),
  new THREE.Vector3(6, 2, 2)
];
const curve = new THREE.CatmullRomCurve3(points);

// 创建物体
const geometry = new THREE.SphereGeometry(0.2, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.001; // 控制速度
  if (t > 1) t = 0;
  const pos = curve.getPoint(t);
  sphere.position.copy(pos);
  renderer.render(scene, camera);
}
animate();
```
:::



## 如何实现摄像机围绕物体旋转的效果？

**核心答案：**  
通过在动画循环中不断改变摄像机的位置（如绕圆周运动），并始终用 camera.lookAt 指向物体中心，即可实现摄像机环绕效果。

**原理讲解：**  
- 设定一个圆心（通常为物体中心），让摄像机在圆周上运动。
- 每帧更新摄像机位置，并用 lookAt 保持视线指向目标。

::: details 示例代码
```js
import * as THREE from 'three';

const target = new THREE.Vector3(0, 0, 0); // 物体中心
let angle = 0;
const radius = 5;

function animate() {
  requestAnimationFrame(animate);
  angle += 0.01;
  camera.position.x = Math.cos(angle) * radius;
  camera.position.z = Math.sin(angle) * radius;
  camera.lookAt(target);
  renderer.render(scene, camera);
}
animate();
```
:::



## 请实现一个简单的鼠标拖拽物体的功能。

**核心答案：**  
通过 Raycaster 检测鼠标点击选中物体，监听鼠标移动事件，实时更新物体位置，实现拖拽效果。

**原理讲解：**  
- 鼠标按下时用 Raycaster 检测选中物体。
- 鼠标移动时计算新的三维坐标，更新物体位置。
- 鼠标松开时取消拖拽。

::: details 示例代码
```js
import * as THREE from 'three';

let selected = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let offset = new THREE.Vector3();

renderer.domElement.addEventListener('mousedown', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    selected = intersects[0].object;
    // 计算鼠标与物体中心的偏移
    offset.copy(selected.position).sub(raycaster.ray.origin);
  }
});

renderer.domElement.addEventListener('mousemove', (event) => {
  if (selected) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // 计算新的位置
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersect = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, intersect);
    selected.position.copy(intersect.add(offset));
  }
});

renderer.domElement.addEventListener('mouseup', () => {
  selected = null;
});
```
:::



## 如何在 Three.js 中实现多场景切换？

**核心答案：**  
可创建多个 Scene 实例，切换时只渲染当前激活的场景，并根据需要切换相机、渲染器等参数。

**原理讲解：**  
- 每个场景可有独立的物体、光源等。
- 切换场景时只需改变渲染目标 scene。
- 可配合 UI 控件实现场景切换。

::: details 示例代码
```js
import * as THREE from 'three';

// 创建两个场景
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();

// 分别添加物体
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
scene1.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
scene2.add(sphere);

let currentScene = scene1;

// 切换场景的函数
function switchScene() {
  currentScene = currentScene === scene1 ? scene2 : scene1;
}

// 例如通过按钮切换
document.getElementById('switchBtn').onclick = switchScene;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(currentScene, camera);
}
animate();
```
:::


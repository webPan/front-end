# Vue

## Vue3有哪些新特性

**核心答案：**  
Vue3 引入了 Composition API、响应式系统升级（Proxy）、更快的虚拟 DOM、TypeScript 支持、Fragment、Teleport、Suspense、Tree-shaking 优化等新特性，极大提升了性能、可维护性和类型安全。

**原理讲解：**  

1. **Composition API**：通过 `setup`、`ref`、`reactive`、`computed` 等 API，实现更灵活的逻辑复用和更好的 TypeScript 支持，解决了 Options API 下逻辑复用困难、代码分散的问题。
2. **响应式系统升级**：Vue2 使用 `Object.defineProperty`，只能劫持对象的属性，Vue3 使用 `Proxy`，可以直接代理整个对象，支持数组和对象的新增/删除属性的响应式。
3. **更快的虚拟 DOM**：重写了虚拟 DOM 和 Diff 算法，提升了渲染性能。
4. **TypeScript 支持**：Vue3 源码用 TypeScript 重写，类型推导更完善。
5. **Fragment**：支持组件返回多个根节点，减少无意义的 DOM 层级。
6. **Teleport**：可以将子组件的 DOM 渲染到指定的 DOM 节点，实现弹窗等场景的更优实现。
7. **Suspense**：支持异步组件的更优加载体验。
8. **Tree-shaking 优化**：按需引入，减少打包体积。

::: details 示例代码

```js
// Vue3 Composition API 示例
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const state = reactive({ list: [1, 2, 3] });
    const double = computed(() => count.value * 2);

    function add() {
      count.value++;
      state.list.push(count.value);
    }

    onMounted(() => {
      console.log('组件已挂载');
    });

    return { count, state, double, add };
  }
}
```

:::

## 说说 Vue2 和 Vue3 的响应式原理，有哪些区别？分别是如何实现的？各自的优缺点是什么？

**核心答案：**  
Vue2 通过 `Object.defineProperty` 劫持对象属性实现响应式，Vue3 通过 `Proxy` 代理整个对象实现响应式。Vue3 响应式能力更强，能监听对象和数组的新增、删除等操作，性能更优，代码更简洁。

**原理讲解：**  

- **Vue2 响应式原理**：递归遍历对象属性，使用 `Object.defineProperty` 劫持 getter/setter，实现依赖收集和派发更新。缺点是无法监听属性的新增/删除，数组变动需特殊处理，深层嵌套对象性能较差。
- **Vue3 响应式原理**：使用 `Proxy` 代理整个对象，拦截所有操作（包括属性的新增、删除、读取、赋值等），无需递归，性能更好，支持更多数据结构。
- **优缺点**：
  - Vue2：兼容性好，老项目多，但性能和功能有限。
  - Vue3：功能更强，性能更优，代码更简洁，但 IE11 不支持。

::: details 示例代码

```js
// Vue2 响应式实现（简化版）
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      return val;
    },
    set(newVal) {
      // 派发更新
      val = newVal;
    }
  });
}

// Vue3 响应式实现（简化版）
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 依赖收集
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      // 派发更新
      return Reflect.set(target, key, value, receiver);
    }
  });
}
```

:::


## Vue2 中 Object.defineProperty 有哪些缺陷？Vue3 使用 Proxy 有哪些优势？

**核心答案：**  
`Object.defineProperty` 只能劫持已存在的属性，无法监听新增/删除属性和数组索引变动，深层对象需递归处理。`Proxy` 能直接代理整个对象，支持所有操作，性能更优，代码更简洁。

**原理讲解：**  

- **Object.defineProperty 缺陷**：
  1. 只能劫持对象已存在的属性，新增属性需手动调用 `Vue.set`。
  2. 无法监听属性删除。
  3. 数组变动需重写数组原型方法。
  4. 深层嵌套对象需递归处理，性能较差。
- **Proxy 优势**：
  1. 代理整个对象，支持属性的新增、删除、读取、赋值等所有操作。
  2. 支持数组和对象的所有变动。
  3. 无需递归，性能更优。
  4. 代码更简洁，易于扩展。

::: details 示例代码

```js
// Vue2 新增属性需手动 set
Vue.set(obj, 'newKey', value);

// Vue3 Proxy 直接支持
const state = reactive({});
state.newKey = value; // 自动响应式

// Proxy 支持 delete
delete state.newKey; // 也会触发响应式更新
```

:::



## Vue2 和 Vue3 如何实现数据的双向绑定？v-model 的原理和变化是什么？

**核心答案：**  
Vue2 通过 `value` 和 `input` 事件实现双向绑定，`v-model` 本质是语法糖。Vue3 支持多 v-model 绑定和自定义 prop/event 名称，底层依然是 props + 事件。

**原理讲解：**  

- **Vue2**：`v-model` 等价于 `:value="xxx" @input="xxx = $event"`，只能绑定 `value` 和 `input`。
- **Vue3**：`v-model` 可指定 prop 和事件名（如 `v-model:title`），支持多个 v-model，底层是 `modelValue` 和 `update:modelValue`。
- **变化**：Vue3 更灵活，支持多数据源绑定和自定义事件名。

::: details 示例代码

```vue
<!-- Vue2 v-model -->
<my-input v-model="msg" />
// 等价于
<my-input :value="msg" @input="msg = $event" />

<!-- Vue3 v-model 多绑定 -->
<my-input v-model:title="title" v-model:content="content" />

// 组件内
props: {
  title: String,
  content: String
},
emits: ['update:title', 'update:content'],
methods: {
  onTitleInput(val) {
    this.$emit('update:title', val);
  }
}
```

:::



## Vue2 和 Vue3 如何处理数组和对象的响应式？深层监听是如何实现的？

**核心答案：**  
Vue2 通过递归遍历对象和重写数组方法实现响应式，深层监听需递归。Vue3 通过 Proxy 代理整个对象和数组，天然支持深层监听和所有变动。

**原理讲解：**  

- **Vue2**：对象递归遍历，数组重写 push/pop 等方法，深层对象需递归处理，新增/删除属性需手动 `Vue.set`/`Vue.delete`。
- **Vue3**：Proxy 直接代理对象和数组，所有属性和索引变动都能被监听，深层对象无需递归，性能更优。

::: details 示例代码

```js
// Vue2 深层监听
const obj = { a: { b: 1 } };
Vue.set(obj.a, 'c', 2); // 新增属性需手动 set

// Vue3 深层监听
const state = reactive({ a: { b: 1 } });
state.a.c = 2; // 自动响应式，无需手动 set

// 数组响应式
state.arr = [1, 2, 3];
state.arr.push(4); // 也会自动响应式
```

:::


## Vue2 和 Vue3 中 ref、reactive、computed、watch 的实现原理和区别是什么？

**核心答案：**  
`ref` 用于基本类型和对象的响应式包装，`reactive` 用于对象/数组的深度响应式，`computed` 实现计算属性，`watch` 监听数据变化。Vue3 通过 Proxy 和依赖收集机制实现，API 更灵活，类型更友好。

**原理讲解：**  

- **ref**：Vue2 通过 `Vue.observable` 包装对象，基本类型用对象包裹；Vue3 用 Proxy 包装对象，基本类型用 `{ value }` 包裹并响应式处理。
- **reactive**：Vue2 递归遍历对象属性，Vue3 直接用 Proxy 代理整个对象。
- **computed**：Vue2/3 都基于依赖收集，内部维护一个 watcher/effect，依赖变更时自动重新计算。
- **watch**：Vue2/3 都通过依赖收集实现，Vue3 支持更灵活的监听源和回调。

**区别：**  
Vue3 的 ref/reactive/computed/watch 都是基于 Proxy 和 effect，类型推导更好，API 更灵活，性能更优。

::: details 示例代码

```js
// Vue3 ref/reactive/computed/watch 示例
import { ref, reactive, computed, watch } from 'vue';

const count = ref(0); // 基本类型响应式
const state = reactive({ list: [1, 2, 3] }); // 对象响应式

const double = computed(() => count.value * 2); // 计算属性

watch(
  () => state.list,
  (newVal, oldVal) => {
    console.log('list changed:', newVal);
  },
  { deep: true }
);

// 修改数据
count.value++;
state.list.push(4);
```

:::



## 对比 Vue2 和 Vue3 的生命周期，有哪些变化？请分别列举各自的生命周期钩子

**核心答案：**  
Vue3 生命周期钩子名称有变化，合并和精简了部分钩子，支持在 `setup` 中使用。Vue2 生命周期分为 beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed。Vue3 对应为 onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted。

**原理讲解：**  

- **Vue2 生命周期**：基于 Options API，生命周期钩子为组件对象的方法，按组件创建、挂载、更新、销毁顺序调用。
- **Vue3 生命周期**：基于 Composition API，生命周期钩子以 `onXxx` 形式在 `setup` 中注册，支持逻辑复用和组合。
- **变化**：Vue3 移除了 beforeCreate/created（用 setup 代替），beforeDestroy/destroyed 改为 beforeUnmount/unmounted，支持在组合式函数中复用生命周期逻辑。

::: details 示例代码

```js
// Vue2 生命周期
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
}

// Vue3 生命周期
import { onMounted, onBeforeUnmount } from 'vue';
export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载');
    });
    onBeforeUnmount(() => {
      console.log('组件即将卸载');
    });
  }
}
```

:::



## Vue2 和 Vue3 中父子组件通信方式有哪些？还有哪些组件间通信方式？

**核心答案：**  
父子通信主要通过 props 和自定义事件。组件间通信还包括 provide/inject、$attrs/$listeners、Vuex/Pinia、EventBus、ref、context 等。Vue3 新增了更灵活的 provide/inject 和 context 机制。

**原理讲解：**  

- **父传子**：通过 props 传递数据。
- **子传父**：Vue2 通过 `$emit` 触发自定义事件，Vue3 通过 emits 选项和事件触发。
- **兄弟通信**：通过 EventBus、Vuex/Pinia、provide/inject、ref、context 等。
- **provide/inject**：祖先组件 provide 数据，后代 inject 获取，适合跨层级通信。
- **Vue3 context**：setup 中通过 context.attrs、context.emit 等访问父组件传递的属性和事件。

::: details 示例代码

```js
// 父传子
<MyChild :msg="parentMsg" />

// 子传父
// 子组件
this.$emit('update', value);
// 父组件
<MyChild @update="handleUpdate" />

// provide/inject
// 父组件
provide('theme', 'dark');
// 子组件
const theme = inject('theme');

// Vuex/Pinia
import { useStore } from 'vuex';
const store = useStore();
store.commit('setUser', user);

// EventBus（Vue2）
const bus = new Vue();
bus.$emit('event', data);
bus.$on('event', handler);
```

:::



## Vue2 和 Vue3 中如何实现自定义事件、provide/inject 及其原理？

**核心答案：**  
自定义事件：Vue2 通过 `$emit` 和 `$on`，Vue3 通过 emits 选项和 `emit` 函数。provide/inject：Vue2 通过选项式 API，Vue3 通过 Composition API 的 `provide` 和 `inject`，支持响应式和类型推导。

**原理讲解：**  

- **自定义事件**：  
  - Vue2 组件实例继承自事件总线，实现 `$emit` 触发、`$on` 监听。  
  - Vue3 组件实例不再继承事件总线，需在 `setup` 中通过 `emit` 触发事件，事件声明需在 `emits` 选项中注册，类型更安全。
- **provide/inject**：  
  - Vue2 通过选项式 API，provide/inject 只在初始化时绑定，非响应式。  
  - Vue3 通过 Composition API，provide/inject 支持响应式数据，且可以在 `setup` 中灵活调用，支持类型推导。

::: details 示例代码

```js
// Vue2 自定义事件
// 子组件
this.$emit('custom-event', data);
// 父组件
<MyChild @custom-event="handleEvent" />

// Vue3 自定义事件
// 子组件
emits: ['custom-event'],
setup(props, { emit }) {
  emit('custom-event', data);
}

// Vue2 provide/inject
// 父组件
provide: { theme: 'dark' }
// 子组件
inject: ['theme']

// Vue3 provide/inject
import { provide, inject, ref } from 'vue';
// 父组件
const theme = ref('dark');
provide('theme', theme);
// 子组件
const theme = inject('theme');
```

:::



## Vue2 和 Vue3 如何实现全局状态管理？常用方案有哪些？

**核心答案：**  
全局状态管理常用 Vuex（Vue2/3）、Pinia（Vue3 推荐）、EventBus、provide/inject 等。Vue3 推荐 Pinia，类型推导更好，API 更简洁。

**原理讲解：**  

- **Vuex**：集中式状态管理，适合大型项目，支持模块化、插件、持久化等。
- **Pinia**：Vue3 官方推荐，基于 Composition API，支持响应式、类型推导、模块化，API 更简洁。
- **EventBus**：适合简单场景，Vue3 不再推荐。
- **provide/inject**：适合跨层级传递简单状态。

::: details 示例代码

```js
// Vuex 示例
import { createStore } from 'vuex';
const store = createStore({
  state: { count: 0 },
  mutations: { increment(state) { state.count++; } }
});
store.commit('increment');

// Pinia 示例
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: { increment() { this.count++; } }
});
// 组件中
const counter = useCounterStore();
counter.increment();
```

:::



## Vue2 和 Vue3 如何实现自定义指令？实现原理有何不同？

**核心答案：**  
Vue2 通过 `directives` 选项注册指令，钩子函数有 bind、inserted、update、componentUpdated、unbind。Vue3 通过 `beforeMount`、`mounted`、`updated`、`beforeUnmount`，API 更简洁，支持函数式指令。

**原理讲解：**  

- **Vue2**：自定义指令通过对象形式注册，生命周期钩子较多，参数较复杂。
- **Vue3**：自定义指令支持对象和函数两种写法，生命周期钩子精简，参数更清晰，支持组合式 API。

::: details 示例代码

```js
// Vue2 自定义指令
Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
});

// Vue3 自定义指令
const vFocus = {
  mounted(el) {
    el.focus();
  }
};
// 组件中注册
directives: { focus: vFocus }
// 或全局注册
app.directive('focus', vFocus);

// 函数式指令
app.directive('color', (el, binding) => {
  el.style.color = binding.value;
});
```

:::



## Vue2 的 mixin 和 Vue3 的 Composition API 有哪些区别？各自的优缺点是什么？

**核心答案：**  
mixin 通过对象混入复用逻辑，易冲突、难追踪。Composition API 通过函数复用逻辑，灵活、类型友好、无命名冲突，逻辑聚合更清晰。

**原理讲解：**  

- **mixin**：将公共逻辑混入组件，属性和方法可能冲突，来源难追踪，类型推导不友好。
- **Composition API**：通过组合函数（hooks）复用逻辑，参数和返回值明确，类型推导好，逻辑聚合清晰，无命名冲突。

::: details 示例代码

```js
// Vue2 mixin
const myMixin = {
  data() { return { count: 0 }; },
  created() { this.hello(); },
  methods: { hello() { console.log('hello'); } }
};
export default {
  mixins: [myMixin]
}

// Vue3 Composition API
function useCounter() {
  const count = ref(0);
  function increment() { count.value++; }
  return { count, increment };
}
export default {
  setup() {
    const { count, increment } = useCounter();
    return { count, increment };
  }
}
```

:::


## Vue3 的 setup 语法糖和自定义 Hooks 是如何实现的？与 Vue2 有哪些不同？

**核心答案：**  
Vue3 的 `setup` 是组合式 API 的入口，支持响应式、生命周期、依赖注入等。自定义 Hooks（组合函数）可复用逻辑。与 Vue2 的 Options API 相比，Vue3 逻辑聚合更清晰、类型推导更好、复用更灵活。

**原理讲解：**  

- **setup 语法糖**：`setup` 在组件创建前执行，接收 props 和 context，返回的数据和方法会暴露给模板。可以在 `setup` 内使用响应式 API、生命周期钩子、provide/inject 等。
- **自定义 Hooks**：通过函数封装可复用的响应式逻辑，类似 React 的 hooks，支持参数传递和返回响应式数据。
- **与 Vue2 区别**：Vue2 逻辑分散在 data、methods、computed、watch 等选项中，复用靠 mixin，易冲突。Vue3 逻辑聚合在 `setup`，复用靠组合函数，无命名冲突，类型推导好。

::: details 示例代码

```js
// Vue3 自定义 Hook
function useMouse() {
  const x = ref(0), y = ref(0);
  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }
  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));
  return { x, y };
}

export default {
  setup() {
    const { x, y } = useMouse();
    return { x, y };
  }
}
```

:::



## Vue2 和 Vue3 如何做性能优化？常见的优化手段有哪些？

**核心答案：**  
常见优化手段包括懒加载、异步组件、虚拟滚动、事件防抖/节流、合理使用 key、避免不必要的响应式、按需引入、SSR、Tree-shaking、减少深层嵌套等。Vue3 性能更优，响应式和虚拟 DOM 更高效，支持 Fragment、Teleport、Suspense 等新特性。

**原理讲解：**  

- **懒加载/异步组件**：按需加载资源，减少首屏体积。
- **虚拟滚动**：只渲染可视区域内容，提升大列表性能。
- **事件防抖/节流**：减少高频事件触发次数。
- **合理使用 key**：提升 Diff 算法效率，避免不必要的重渲染。
- **按需引入/Tree-shaking**：减少打包体积。
- **SSR/Prerender**：提升首屏渲染速度和 SEO。
- **Vue3 优化**：Proxy 响应式、编译优化、静态提升、Fragment、Teleport、Suspense 等。

::: details 示例代码

```js
// 异步组件
const AsyncComp = defineAsyncComponent(() => import('./MyComp.vue'));

// 虚拟滚动（以 vue-virtual-scroller 为例）
<virtual-list :size="50" :remain="10" :bench="5" :start="0" :data-key="'id'" :data-sources="list">
  <template #default="{ item }">
    <div>{{ item.name }}</div>
  </template>
</virtual-list>

// 事件防抖
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}
window.addEventListener('resize', debounce(() => { /* ... */ }, 200));
```

:::



## Vue2 和 Vue3 如何实现异步组件、异步更新队列？实现原理有何不同？

**核心答案：**  
异步组件：Vue2/3 都支持 `defineAsyncComponent` 或异步工厂函数。异步更新队列：Vue2/3 都采用 nextTick 微任务队列，Vue3 更新机制更高效，批量合并更新。

**原理讲解：**  

- **异步组件**：Vue2 通过异步工厂函数，Vue3 推荐 `defineAsyncComponent`，支持 loading/error 组件、超时等配置。
- **异步更新队列**：数据变更后不会立即更新 DOM，而是将更新任务放入微任务队列，等当前同步任务结束后批量执行，避免重复渲染。Vue3 的调度器更高效，支持优先级和批量合并。

::: details 示例代码

```js
// Vue3 异步组件
import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyComp.vue'),
  loadingComponent: Loading,
  errorComponent: ErrorComp,
  delay: 200,
  timeout: 3000
});

// 异步更新队列
state.count++;
await nextTick(); // DOM 已更新
```

:::



## Vue2 和 Vue3 的虚拟 DOM、Diff 算法有何区别？key 的作用及原理是什么？

**核心答案：**  
Vue3 虚拟 DOM 和 Diff 算法重写，性能更优，支持 Fragment。key 用于唯一标识节点，提升 Diff 效率，避免错误复用。

**原理讲解：**  

- **虚拟 DOM**：Vue2/3 都用虚拟 DOM 表示真实 DOM，Diff 算法对比新旧虚拟 DOM，最小化真实 DOM 操作。
- **Diff 算法**：Vue3 算法更高效，支持 Fragment、静态提升、Block Tree 等优化，减少不必要的对比和更新。
- **key 作用**：唯一标识节点，Diff 时能正确复用、移动、销毁节点，避免因索引复用导致的状态错乱。

::: details 示例代码

```js
// 使用 key 提升 Diff 效率
<li v-for="item in list" :key="item.id">{{ item.name }}</li>

// Diff 算法伪代码
function diff(oldVNode, newVNode) {
  if (oldVNode.key !== newVNode.key) {
    // 直接替换
  } else {
    // 复用节点，递归对比子节点
  }
}
```

:::



如需继续补充后续题目，请回复“继续”或指定题号。
好的，继续为你补充后续题目的答案。



## Vue2 和 Vue3 的 slot、动态组件、keep-alive、Teleport、Suspense 等高级特性有何区别？实现原理是什么？

**核心答案：**  
Vue3 对 slot 进行了类型增强，支持 Fragment。动态组件和 keep-alive 机制更灵活。Teleport、Suspense 是 Vue3 新增特性，分别用于跨层级渲染和异步组件加载占位。底层均基于虚拟 DOM 和渲染器实现。

**原理讲解：**  

- **slot**：Vue2 作用域插槽基于函数实现，Vue3 支持多根节点（Fragment），类型推导更好，slot 传递更灵活。
- **动态组件**：`<component :is="compName" />`，Vue3 支持异步组件和类型推导。
- **keep-alive**：缓存组件实例，避免重复渲染，Vue3 支持 include/exclude 动态切换。
- **Teleport**：Vue3 新增，将子组件渲染到 DOM 其他位置，适合弹窗、全局提示等。
- **Suspense**：Vue3 新增，支持异步组件加载时的占位和错误处理。

::: details 示例代码

```vue
<!-- slot 示例 -->
<template>
  <BaseLayout>
    <template #header>头部内容</template>
    <template #default>主体内容</template>
  </BaseLayout>
</template>

<!-- 动态组件和 keep-alive -->
<keep-alive :include="['A', 'B']">
  <component :is="currentComp" />
</keep-alive>

<!-- Teleport -->
<teleport to="body">
  <div class="modal">弹窗内容</div>
</teleport>

<!-- Suspense -->
<Suspense>
  <template #default>
    <AsyncComp />
  </template>
  <template #fallback>
    <div>加载中...</div>
  </template>
</Suspense>
```

:::



## Vue2 和 Vue3 如何实现路由守卫、错误捕获、自定义插件和全局 API？

**核心答案：**  
路由守卫通过 vue-router 提供的 beforeEach、beforeResolve、afterEach 实现。错误捕获 Vue2 用 errorCaptured，Vue3 用 onErrorCaptured。自定义插件和全局 API Vue3 通过 app.use、app.config.globalProperties 实现，API 更规范。

**原理讲解：**  

- **路由守卫**：vue-router 提供全局、路由、组件级守卫，Vue3 支持组合式 API。
- **错误捕获**：Vue2 组件内 errorCaptured 钩子，Vue3 用 onErrorCaptured，支持组合式 API。
- **自定义插件**：Vue2 插件通过 install 方法注册，Vue3 通过 app.use 注册，支持多实例。
- **全局 API**：Vue2 通过 Vue.prototype，Vue3 通过 app.config.globalProperties，避免全局污染。

::: details 示例代码

```js
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.state.isLogin) next('/login');
  else next();
});

// 错误捕获
// Vue2
errorCaptured(err, vm, info) { /* ... */ }
// Vue3
import { onErrorCaptured } from 'vue';
onErrorCaptured((err, instance, info) => { /* ... */ });

// 自定义插件
const MyPlugin = {
  install(app, options) {
    app.config.globalProperties.$myMethod = () => { /* ... */ }
  }
}
app.use(MyPlugin);
```

:::



## Vue2 和 Vue3 如何实现服务端渲染（SSR）、服务端预渲染（Prerender）、代码分割与懒加载、Tree-shaking？

**核心答案：**  
SSR 通过 vue-server-renderer（Vue2）或 @vue/server-renderer（Vue3）实现。Prerender 用 prerender-spa-plugin 等工具。代码分割和懒加载通过 import() 动态引入。Tree-shaking Vue3 支持更好，按需打包。

**原理讲解：**  

- **SSR**：Vue2 用 vue-server-renderer，Vue3 用 @vue/server-renderer，支持同构渲染，提升首屏速度和 SEO。
- **Prerender**：构建时生成静态 HTML，适合内容不频繁变动的页面。
- **代码分割/懒加载**：通过 import() 动态加载组件，webpack 自动分包。
- **Tree-shaking**：Vue3 采用 ESM，支持按需引入，减少打包体积。

::: details 示例代码

```js
// 代码分割与懒加载
const AsyncComp = () => import('./MyComp.vue');

// SSR（Vue3）
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
const app = createSSRApp(App);
const html = await renderToString(app);

// Prerender
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [new PrerenderSPAPlugin({ /* ... */ })]
  }
}
```

:::



## Vue2 和 Vue3 如何支持 TypeScript？各自的实现方式和扩展性如何？

**核心答案：**  
Vue2 通过 vue-class-component、vue-property-decorator 等支持 TypeScript，类型推导有限。Vue3 源码用 TypeScript 重写，Composition API 类型推导完善，扩展性更好。

**原理讲解：**  

- **Vue2**：Options API 类型推导有限，需借助 class 组件和装饰器，类型不完全。
- **Vue3**：Composition API 天然支持 TypeScript，类型推导完善，泛型、接口、类型声明更灵活，支持 TSX/JSX。

::: details 示例代码

```ts
// Vue2 TypeScript
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class MyComp extends Vue {
  msg: string = 'hello';
}

// Vue3 TypeScript
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const msg = ref<string>('hello');
    return { msg };
  }
});
```

:::



## Vue2 和 Vue3 如何实现自定义渲染器（Renderer）和响应式原理的扩展？

**核心答案：**  
Vue3 提供 createRenderer API，可自定义渲染到任意平台。响应式系统可通过 effect、reactive、ref 等 API 扩展。Vue2 渲染器和响应式系统耦合，扩展性差。

**原理讲解：**  

- **自定义渲染器**：Vue3 通过 createRenderer 可实现自定义渲染逻辑（如渲染到 canvas、原生、微信小程序等）。
- **响应式扩展**：Vue3 响应式系统解耦，可自定义 effect、依赖收集、调度等，适合二次开发。
- **Vue2**：渲染器和响应式系统耦合，难以扩展。

::: details 示例代码

```js
// Vue3 自定义渲染器
import { createRenderer } from '@vue/runtime-core';
const renderer = createRenderer({
  createElement(type) { /* ... */ },
  insert(el, parent) { /* ... */ },
  // 其他平台相关实现
});
renderer.createApp(App).mount('#app');

// 响应式扩展
import { reactive, effect } from 'vue';
const state = reactive({ count: 0 });
effect(() => {
  console.log(state.count);
});
```

:::


## Vue2 和 Vue3 如何实现自定义渲染器（Renderer）和响应式原理的扩展？

**核心答案：**  
Vue3 提供 `createRenderer` API，可自定义渲染到任意平台。响应式系统可通过 `effect`、`reactive`、`ref` 等 API 灵活扩展。Vue2 渲染器和响应式系统耦合，扩展性较差。

**原理讲解：**  

- **自定义渲染器**：Vue3 通过 `@vue/runtime-core` 的 `createRenderer`，可实现渲染到 DOM 以外的平台（如 canvas、原生、小游戏等），渲染逻辑与响应式系统解耦，便于扩展。
- **响应式扩展**：Vue3 响应式系统基于 Proxy 和 effect，开发者可自定义依赖收集、调度、追踪等，适合二次开发和自定义需求。
- **Vue2**：渲染器和响应式系统高度耦合，难以实现自定义渲染和响应式扩展。

::: details 示例代码

```js
// Vue3 自定义渲染器
import { createRenderer } from '@vue/runtime-core';
const renderer = createRenderer({
  createElement(type) { /* ... */ },
  insert(el, parent) { /* ... */ },
  // 其他平台相关实现
});
renderer.createApp(App).mount('#app');

// 响应式扩展
import { reactive, effect } from 'vue';
const state = reactive({ count: 0 });
effect(() => {
  console.log(state.count);
});
```

:::


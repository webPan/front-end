# Vue

## Vue3有哪些新特性

### 核心答案

Vue3 相比 Vue2 拥有更高的性能、更灵活的 API、更好的 TypeScript 支持和更强的工程能力。主要新特性包括：Composition API、Proxy 响应式、Fragment、Teleport、Suspense、全新生命周期钩子、Tree-shaking 支持、TypeScript 原生支持、全新虚拟 DOM 和更快的渲染机制等。

### 原理详解

1. **Composition API**  
   提供 `setup`、`ref`、`reactive`、`computed`、`watch` 等新 API，实现逻辑复用和更灵活的代码组织，解决了 Options API 下逻辑分散、mixin 冲突等问题。

2. **Proxy 响应式系统**  
   Vue3 使用 ES6 Proxy 替代 Object.defineProperty，实现更彻底的响应式，支持对象属性的新增/删除、数组索引和 length 变化，性能更优。

3. **Fragment**  
   允许组件返回多个根节点，减少无意义的 DOM 包裹元素，提升渲染性能和结构灵活性。

4. **Teleport**  
   支持将组件内容渲染到 DOM 的任意位置，常用于弹窗、全局层等场景。

5. **Suspense**  
   支持异步组件加载时的占位和错误处理，提升异步渲染体验。

6. **全新生命周期钩子**  
   生命周期钩子名称更贴合语义，支持 Composition API 的 onXxx 形式，新增 renderTracked、renderTriggered 等调试钩子。

7. **Tree-shaking 支持**  
   基于 ESM 设计，未用到的 API 不会被打包，减小包体积。

8. **TypeScript 原生支持**  
   Vue3 用 TypeScript 重写，API 设计更友好，类型推断更完善。

9. **更快的虚拟 DOM 和渲染机制**  
   新的虚拟 DOM 算法和 Block Tree 优化，提升渲染性能。

10. **其它增强**  
    如 defineAsyncComponent、defineEmits、defineProps、全局 API 变更、全新插件机制等。

::: details Composition API 基本用法

```js
<script setup>
import { ref, computed, watch } from 'vue'

// 响应式数据
const count = ref(0)

// 计算属性
const double = computed(() => count.value * 2)

// 监听
watch(count, (newVal, oldVal) => {
  console.log('count changed:', newVal)
})

// 方法
function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>double: {{ double }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
```

:::

::: details Proxy 响应式原理示例

```js
import { reactive } from 'vue'

const state = reactive({ name: 'Vue3', age: 3 })
state.age = 4      // 新增/修改属性自动响应
delete state.name  // 删除属性也能响应
```

:::

::: details Fragment 示例（多根节点）

```vue
<template>
  <header>头部</header>
  <main>内容</main>
  <footer>底部</footer>
</template>
```

:::

::: details Teleport 示例

```vue
<template>
  <teleport to="body">
    <div class="modal">弹窗内容</div>
  </teleport>
</template>
```

:::

::: details Suspense 异步组件占位

```vue
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

::: details TypeScript 支持示例

```ts
<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)
function inc(): void {
  count.value++
}
</script>
<template>
  <button @click="inc">增加</button>
  <span>{{ count }}</span>
</template>
```

:::

## 对比 Vue2 和 Vue3 的生命周期，有哪些变化？请分别列举各自的生命周期钩子

### 核心答案

Vue3 的生命周期钩子名称和调用时机与 Vue2 有所不同，主要体现在钩子名称的变更和 Composition API 新增的生命周期钩子。Vue2 和 Vue3 的生命周期钩子如下：

- Vue2：beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed、activated、deactivated、errorCaptured
- Vue3：beforeCreate（已废弃）、created（已废弃）、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted、activated、deactivated、errorCaptured、renderTracked、renderTriggered

Vue3 推荐使用 Composition API 的 onXxx 形式（如 onMounted、onUnmounted），并对部分钩子名称进行了调整（如 beforeDestroy → beforeUnmount，destroyed → unmounted）。

### 原理详解

#### 1. 生命周期钩子的变化

- Vue2 采用 Options API，生命周期钩子以选项对象的形式声明。
- Vue3 支持 Options API 也支持 Composition API，推荐使用后者，生命周期钩子以 onXxx 函数形式注册。
- 钩子名称调整：beforeDestroy/ destroyed 改为 beforeUnmount/ unmounted，更贴合“卸载”语义。
- 新增 renderTracked、renderTriggered 钩子，用于响应式依赖追踪和触发调试。
- Vue3 的 beforeCreate、created 在 Composition API 下已不推荐使用，setup 函数本身就相当于 created 之前的阶段。

#### 2. 生命周期执行顺序

- Vue2 和 Vue3 的生命周期执行顺序基本一致，都是从创建、挂载、更新到销毁（卸载）。
- Vue3 的 setup 在 beforeCreate 和 created 之间执行，setup 里无法访问 this，只能通过参数获取 props、context。

#### 3. Composition API 生命周期注册

- 通过 import { onMounted, onUnmounted, ... } from 'vue'，在 setup 内注册钩子。
- 支持多次注册同一钩子，按注册顺序依次执行。

::: details Vue2 生命周期钩子示例

```js
export default {
  name: 'Vue2LifecycleDemo',
  data() {
    return { msg: 'Hello Vue2' }
  },
  beforeCreate() {
    // 实例初始化之后，数据观测和事件配置之前
    console.log('beforeCreate')
  },
  created() {
    // 实例创建完成，数据观测和事件配置已完成
    console.log('created')
  },
  beforeMount() {
    // 挂载之前，模板已编译
    console.log('beforeMount')
  },
  mounted() {
    // 挂载完成，DOM 可操作
    console.log('mounted')
  },
  beforeUpdate() {
    // 数据更新前
    console.log('beforeUpdate')
  },
  updated() {
    // 数据更新后
    console.log('updated')
  },
  beforeDestroy() {
    // 实例销毁前
    console.log('beforeDestroy')
  },
  destroyed() {
    // 实例销毁后
    console.log('destroyed')
  },
  activated() {
    // keep-alive 组件激活时
    console.log('activated')
  },
  deactivated() {
    // keep-alive 组件停用时
    console.log('deactivated')
  },
  errorCaptured(err, vm, info) {
    // 捕获子组件错误
    console.log('errorCaptured', err, info)
  }
}
```

:::

::: details Vue3 Options API 生命周期钩子示例

```js
export default {
  name: 'Vue3OptionsLifecycleDemo',
  data() {
    return { msg: 'Hello Vue3 Options API' }
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeUnmount() {
    // 替代 beforeDestroy
    console.log('beforeUnmount')
  },
  unmounted() {
    // 替代 destroyed
    console.log('unmounted')
  },
  activated() {
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  },
  errorCaptured(err, instance, info) {
    console.log('errorCaptured', err, info)
  },
  renderTracked(e) {
    // 响应式依赖被追踪时
    console.log('renderTracked', e)
  },
  renderTriggered(e) {
    // 响应式依赖被触发时
    console.log('renderTriggered', e)
  }
}
```

:::

::: details Vue3 Composition API 生命周期钩子示例

```js
import { ref, onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onActivated, onDeactivated, onErrorCaptured, onRenderTracked, onRenderTriggered } from 'vue'

export default {
  name: 'Vue3CompositionLifecycleDemo',
  setup(props, context) {
    const msg = ref('Hello Vue3 Composition API')

    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
    onActivated(() => {
      console.log('onActivated')
    })
    onDeactivated(() => {
      console.log('onDeactivated')
    })
    onErrorCaptured((err, instance, info) => {
      console.log('onErrorCaptured', err, info)
    })
    onRenderTracked((e) => {
      console.log('onRenderTracked', e)
    })
    onRenderTriggered((e) => {
      console.log('onRenderTriggered', e)
    })

    return { msg }
  }
}
```

:::

## 说说 Vue2 和 Vue3 的响应式原理，有哪些区别？分别是如何实现的？各自的优缺点是什么？

### 核心答案

Vue2 通过 Object.defineProperty 实现响应式，Vue3 通过 Proxy 实现响应式。Vue3 的响应式系统更强大，能直接监听数组和对象的新增/删除属性，性能更优，API 更灵活。

### 原理详解

#### Vue2 响应式原理

- 通过 Object.defineProperty 劫持对象的每个属性，递归处理嵌套对象。
- 只能监听已存在的属性，新增/删除属性需要 Vue.set/Vue.delete。
- 数组通过重写原型方法实现响应式，但无法监听索引和长度的变化。

#### Vue3 响应式原理

- 通过 Proxy 代理整个对象，直接监听所有操作（包括属性的新增、删除、数组索引、length 变化等）。
- 支持更深层次的响应式，性能更好，API 更简洁。
- 可以灵活实现只读、浅响应等多种模式。

#### 优缺点对比

- Vue2 优点：兼容性好，IE 支持；缺点：无法监听新增/删除属性，数组监听有限，递归性能差。
- Vue3 优点：功能更全，性能更优，API 更灵活；缺点：不支持 IE。

::: details Vue2 响应式原理示例

```js
// Vue2 响应式核心实现（简化版）
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal
        // 派发更新
      }
    }
  })
}

const data = { name: 'Vue2' }
defineReactive(data, 'name', data.name)
data.name = 'Vue2 响应式'
```

:::

::: details Vue3 响应式原理示例

```js
// Vue3 响应式核心实现（简化版）
function reactive(target) {
  return new Proxy(target, {
    get(obj, key, receiver) {
      // 依赖收集
      return Reflect.get(obj, key, receiver)
    },
    set(obj, key, value, receiver) {
      // 派发更新
      return Reflect.set(obj, key, value, receiver)
    }
  })
}

const data = reactive({ name: 'Vue3' })
data.name = 'Vue3 响应式'
data.age = 18 // 新增属性也能响应
```

:::

## Vue2 中 Object.defineProperty 有哪些缺陷？Vue3 使用 Proxy 有哪些优势？

### 核心答案

Object.defineProperty 只能劫持对象已有属性，无法监听新增/删除属性和数组索引变化，递归处理性能差。Proxy 能直接代理整个对象，支持所有操作，性能更优，API 更灵活。

### 原理详解

#### Object.defineProperty 缺陷

- 只能劫持已存在属性，新增/删除属性需手动处理（Vue.set/Vue.delete）。
- 无法监听数组索引和 length 变化。
- 需要递归遍历对象所有属性，性能较差。
- 代码复杂，维护成本高。

#### Proxy 优势

- 代理整个对象，能监听所有操作（包括属性的新增、删除、数组索引、length 变化等）。
- 支持多种拦截操作（get、set、deleteProperty、has、ownKeys 等）。
- 性能更优，API 更灵活，代码更简洁。
- 可实现只读、浅响应等多种模式。

::: details Object.defineProperty 缺陷示例

```js
const obj = {}
Object.defineProperty(obj, 'name', {
  value: 'Vue2',
  writable: true,
  configurable: true,
  enumerable: true
})
// 新增属性 obj.age = 18 无法响应式
// 删除属性 delete obj.name 也无法响应式
```

:::

::: details Proxy 优势示例

```js
const data = new Proxy({}, {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    // 新增/修改属性都能响应
    return true
  },
  deleteProperty(target, key) {
    delete target[key]
    // 删除属性也能响应
    return true
  }
})

data.name = 'Vue3' // 新增属性
delete data.name   // 删除属性
```

:::

## Vue2 和 Vue3 如何实现数据的双向绑定？v-model 的原理和变化是什么？

### 核心答案

Vue2 通过 prop + event（input/update）实现 v-model，默认绑定 value 和 input 事件。Vue3 支持多 v-model，默认绑定 modelValue 和 update:modelValue 事件，语法更灵活，支持自定义参数。

### 原理详解

#### Vue2 v-model 原理

- v-model 实际是 :value="xxx" @input="xxx = $event" 的语法糖。
- 组件内通过 props 接收 value，通过 $emit('input', newValue) 通知父组件更新。

#### Vue3 v-model 原理

- v-model 默认绑定 modelValue 和 update:modelValue。
- 支持多个 v-model，语法为 v-model:xxx="value"。
- 组件内通过 props 接收 modelValue，通过 $emit('update:modelValue', newValue) 通知父组件。

#### 变化总结

- 事件名和 prop 名称更语义化，支持多 v-model，增强了灵活性和可维护性。

::: details Vue2 v-model 实现示例

```js
// 父组件
<template>
  <Child v-model="msg" />
</template>
<script>
export default {
  data() {
    return { msg: 'hello' }
  }
}
</script>

// 子组件
<template>
  <input :value="value" @input="$emit('input', $event.target.value)" />
</template>
<script>
export default {
  props: ['value']
}
</script>
```

:::

::: details Vue3 v-model 实现示例

```js
// 父组件
<template>
  <Child v-model="msg" v-model:title="title" />
</template>
<script setup>
import { ref } from 'vue'
const msg = ref('hello')
const title = ref('标题')
</script>

// 子组件
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  <input :value="title" @input="$emit('update:title', $event.target.value)" />
</template>
<script setup>
defineProps(['modelValue', 'title'])
defineEmits(['update:modelValue', 'update:title'])
</script>
```

:::

## Vue2 和 Vue3 如何处理数组和对象的响应式？深层监听是如何实现的？

### 核心答案

Vue2 通过 Object.defineProperty 劫持对象属性和重写数组原型方法实现响应式，深层监听需递归处理。Vue3 通过 Proxy 代理整个对象和数组，天然支持深层监听，性能和能力更强。

### 原理详解

#### Vue2

- 对象：递归遍历每个属性，使用 Object.defineProperty 劫持 getter/setter。
- 数组：重写 push、pop、shift、unshift、splice、sort、reverse 等原型方法，拦截变更操作，但无法监听索引和 length 变化。
- 深层监听：递归所有嵌套对象和数组，初始化时性能消耗大，新增属性需 Vue.set。

#### Vue3

- 对象和数组：Proxy 代理整个对象或数组，所有操作（包括属性新增、删除、数组索引、length 变化）都能被拦截。
- 深层监听：访问到的嵌套对象会被自动递归代理，按需响应，性能更优。

::: details Vue2 对象和数组响应式示例

```js
// 对象
const obj = { a: 1 }
Vue.set(obj, 'b', 2) // 新增属性需 Vue.set

// 数组
const arr = [1, 2, 3]
arr.push(4) // 响应式
arr[1] = 5  // 不是响应式，需 Vue.set(arr, 1, 5)
arr.length = 1 // 不是响应式

// 深层监听
const deep = { nested: { value: 1 } }
// 需要递归 defineReactive
```

:::

::: details Vue3 对象和数组响应式示例

```js
import { reactive } from 'vue'

const obj = reactive({ a: 1 })
obj.b = 2 // 新增属性自动响应式

const arr = reactive([1, 2, 3])
arr.push(4)    // 响应式
arr[1] = 5     // 响应式
arr.length = 1 // 响应式

const deep = reactive({ nested: { value: 1 } })
// 访问 deep.nested 时自动递归代理
```

:::

## Vue2 和 Vue3 中 ref、reactive、computed、watch 的实现原理和区别是什么？

### 核心答案

ref 用于基本类型响应式，reactive 用于对象响应式，computed 实现计算属性，watch 监听响应式数据变化。Vue3 的实现基于 Proxy 和独立的响应式依赖收集系统，功能更强大，API 更灵活。

### 原理详解

#### ref

- Vue2：通过 Object.defineProperty 包装 value 属性，依赖收集在 getter/setter。
- Vue3：通过 Proxy 包装对象，基本类型用对象包裹，依赖收集在 value 的 getter/setter。

#### reactive

- Vue2：递归 defineReactive，劫持所有属性。
- Vue3：Proxy 代理整个对象，按需递归，性能更优。

#### computed

- Vue2：基于 watcher，惰性求值，依赖收集。
- Vue3：基于 effect，惰性求值，依赖收集，支持手动控制 getter/setter。

#### watch

- Vue2：基于 watcher，深度监听需 deep: true。
- Vue3：基于 effect，支持 ref、reactive、getter，API 更灵活。

::: details Vue2 ref、computed、watch 示例

```js
// ref（本质是 data 里的基本类型）
data() {
  return { count: 0 }
},
computed: {
  double() {
    return this.count * 2
  }
},
watch: {
  count(newVal, oldVal) {
    console.log('count changed:', newVal)
  }
}
```

:::

::: details Vue3 ref、reactive、computed、watch 示例

```js
import { ref, reactive, computed, watch } from 'vue'

const count = ref(0) // 基本类型响应式
const state = reactive({ count: 0 }) // 对象响应式

const double = computed(() => count.value * 2)

watch(count, (newVal, oldVal) => {
  console.log('count changed:', newVal)
})

watch(() => state.count, (newVal, oldVal) => {
  console.log('state.count changed:', newVal)
})
```

:::

## Vue2 和 Vue3 中父子组件通信方式有哪些？还有哪些组件间通信方式？

### 核心答案

Vue2 和 Vue3 父子组件通信主要通过 props（父传子）和事件（子传父，Vue2 用 $emit，Vue3 用 emits 选项）。除此之外，常见的组件间通信方式还包括：$refs、$parent/$children、provide/inject、eventBus、Vuex/Pinia、context、slots 等。Vue3 在类型安全、响应式和 API 灵活性上有进一步提升。

### 原理详解

#### 1. 父子组件通信

- **父传子**：父组件通过 props 向子组件传递数据，子组件通过 props 接收。
- **子传父**：
  - Vue2：子组件通过 `$emit('事件名', 数据)` 触发事件，父组件用 `@事件名` 监听。
  - Vue3：推荐在 `emits` 选项中声明事件，`setup` 中用 `emit` 触发，类型更安全。

#### 2. 其它组件间通信方式

- **$refs**：父组件通过 $refs 访问子组件实例或 DOM。
- **$parent/$children**：访问父/子组件实例（不推荐，耦合高）。
- **provide/inject**：祖先组件通过 provide 提供数据，后代组件 inject 注入，适合跨层级通信。Vue3 支持响应式和类型推断。
- **eventBus**：事件总线，适合兄弟组件通信（Vue2 常用，Vue3 可用 mitt 等库）。
- **Vuex/Pinia**：全局状态管理，适合大型项目。
- **context**：Vue3 setup 的 context 参数，包含 attrs、slots、emit 等。
- **slots**：插槽用于父组件向子组件传递内容和回调。

::: details 父子通信 props/$emit（Vue2）示例

```js
// 父组件
<template>
  <Child :msg="parentMsg" @childEvent="handleChildEvent" />
</template>
<script>
export default {
  data() {
    return { parentMsg: 'hello' }
  },
  methods: {
    handleChildEvent(val) {
      console.log('子组件传来：', val)
    }
  }
}
</script>

// 子组件
<template>
  <button @click="$emit('childEvent', '子组件数据')">发送</button>
</template>
<script>
export default {
  props: ['msg']
}
</script>
```

:::

::: details 父子通信 props/emits（Vue3）示例

```js
// 父组件
<template>
  <Child :msg="parentMsg" @childEvent="handleChildEvent" />
</template>
<script setup>
import { ref } from 'vue'
const parentMsg = ref('hello')
function handleChildEvent(val) {
  console.log('子组件传来：', val)
}
</script>

// 子组件
<script setup>
const props = defineProps(['msg'])
const emit = defineEmits(['childEvent'])
function send() {
  emit('childEvent', '子组件数据')
}
</script>
<template>
  <button @click="send">发送</button>
</template>
```

:::

::: details provide/inject 示例

```js
// 祖先组件
<script setup>
import { provide, ref } from 'vue'
const theme = ref('dark')
provide('theme', theme)
</script>

// 后代组件
<script setup>
import { inject } from 'vue'
const theme = inject('theme')
</script>
```

:::

::: details eventBus 示例（Vue2）

```js
// eventBus.js
import Vue from 'vue'
export const bus = new Vue()

// 组件A
bus.$emit('eventName', data)

// 组件B
bus.$on('eventName', (data) => { ... })
```

:::

::: details $refs、$parent/$children 示例

```js
// 父组件
<template>
  <Child ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>
<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.childRef.childMethod()
    }
  }
}
</script>

// 子组件
<script>
export default {
  methods: {
    childMethod() {
      alert('子组件方法被调用')
    }
  }
}
</script>
```

:::

::: details Vuex/Pinia 全局状态管理示例

```js
// Pinia 示例
import { defineStore, createPinia } from 'pinia'
const useCounter = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    inc() { this.count++ }
  }
})
// main.js
app.use(createPinia())
// 组件内
const counter = useCounter()
counter.inc()
```

:::

## Vue2 和 Vue3 中如何实现自定义事件、provide/inject 及其原理？

### 核心答案

自定义事件：Vue2 用 $emit/$on，Vue3 组件通信用 emits 选项，移除了 $on/$off。provide/inject：两者都可实现祖先与后代通信，Vue3 支持响应式和类型推断，功能更强。

### 原理详解

#### 自定义事件

- Vue2：组件实例通过 $emit 触发事件，父组件用 @xxx 监听，非父子可用 eventBus。
- Vue3：移除了 $on/$off，推荐用 emits 选项声明事件，setup 中用 emit 触发，类型更安全。

#### provide/inject

- Vue2：祖先组件 provide 提供数据，后代 inject 注入，数据非响应式。
- Vue3：provide/inject 支持响应式数据（如 ref、reactive），类型推断更好，setup 语法更简洁。

::: details Vue2 自定义事件和 provide/inject 示例

```js
// 自定义事件
// 子组件
this.$emit('customEvent', data)
// 父组件
<Child @customEvent="handleEvent" />

// provide/inject
// 祖先组件
provide: {
  theme: 'dark'
}
// 后代组件
inject: ['theme']
```

:::

::: details Vue3 emits 和 provide/inject 示例

```js
// emits
<script setup>
const emit = defineEmits(['customEvent'])
function send() {
  emit('customEvent', 'data')
}
</script>
<template>
  <button @click="send">发送</button>
</template>

// provide/inject
<script setup>
import { provide, inject, ref } from 'vue'
// 祖先组件
const theme = ref('dark')
provide('theme', theme)
// 后代组件
const theme = inject('theme')
</script>
```

:::

## Vue2 和 Vue3 如何实现自定义指令？实现原理有何不同？

### 核心答案

Vue2 和 Vue3 都支持自定义指令，Vue3 的指令钩子名称与生命周期保持一致，API 更简洁，支持函数式写法，原理都是操作真实 DOM。

### 原理详解

#### Vue2

- 通过 directives 选项注册，钩子有 bind、inserted、update、componentUpdated、unbind。
- 钩子函数参数包括 el、binding、vnode、oldVnode。

#### Vue3

- 通过 app.directive 注册，钩子名称与生命周期一致：created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted。
- 支持函数式简写，参数更精简。

::: details Vue2 自定义指令示例

```js
// 全局注册
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

// 局部注册
directives: {
  color: {
    bind(el, binding) {
      el.style.color = binding.value
    }
  }
}
```

:::

::: details Vue3 自定义指令示例

```js
// 全局注册
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// 函数式简写
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})
```

:::

## Vue2 的 mixin 和 Vue3 的 Composition API 有哪些区别？各自的优缺点是什么？

### 核心答案

mixin 通过对象混入复用逻辑，易冲突、难追踪。Composition API 通过函数组合复用逻辑，灵活、可组合、类型友好，推荐使用。

### 原理详解

#### mixin

- 通过 mixins 选项混入对象，属性和方法合并到组件实例。
- 多个 mixin 可能冲突，来源难追踪，逻辑分散。

#### Composition API

- 通过 setup 函数和自定义 hooks 复用逻辑，逻辑聚合，易组合，类型推断好。
- 代码更灵活，适合大型项目和 TypeScript。

::: details Vue2 mixin 示例

```js
// mixin.js
export const myMixin = {
  data() {
    return { count: 0 }
  },
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin')
    }
  }
}

// 组件
import { myMixin } from './mixin'
export default {
  mixins: [myMixin]
}
```

:::

::: details Vue3 Composition API 示例

```js
// useCount.js
import { ref } from 'vue'
export function useCount() {
  const count = ref(0)
  function hello() {
    console.log('hello from hook')
  }
  return { count, hello }
}

// 组件
import { useCount } from './useCount'
export default {
  setup() {
    const { count, hello } = useCount()
    hello()
    return { count }
  }
}
```

:::

## Vue3 的 setup 语法糖和自定义 Hooks 是如何实现的？与 Vue2 有哪些不同？

### 核心答案

Vue3 的 setup 是 Composition API 的入口，支持响应式、生命周期、逻辑复用（自定义 hooks），让逻辑聚合更清晰。Vue2 没有 setup 和 hooks，逻辑复用主要靠 mixin。

### 原理详解

#### setup 语法糖

- setup 在组件创建前执行，this 不可用，参数为 props 和 context。
- 所有 Composition API（ref、reactive、computed、watch、生命周期等）都在 setup 内调用。
- 返回的对象会暴露给模板使用。

#### 自定义 Hooks

- 本质是普通函数，内部可使用 Composition API，返回响应式数据和方法，实现逻辑复用。
- 可组合、可嵌套，类型推断好。

#### 与 Vue2 区别

- Vue2 逻辑分散在 data、methods、computed、watch、生命周期等选项，复用靠 mixin。
- Vue3 逻辑聚合在 setup，自定义 hooks 让复用更灵活、可组合。

::: details Vue3 setup 和自定义 hooks 示例

```js
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))
  return { x, y }
}

// 组件
<script setup>
import { useMouse } from './useMouse'
const { x, y } = useMouse()
</script>
<template>
  <div>鼠标坐标：{{ x }}, {{ y }}</div>
</template>
```

:::

## Vue2 和 Vue3 如何做性能优化？常见的优化手段有哪些？

### 核心答案

Vue2 和 Vue3 性能优化手段类似，包括懒加载、异步组件、虚拟滚动、事件防抖/节流、v-once/v-memo、合理使用 key、避免不必要的响应式、SSR、Tree-shaking 等。Vue3 内部优化更彻底，响应式和渲染性能更优。

### 原理详解

#### 通用优化手段

- 路由懒加载、异步组件、按需加载
- 虚拟滚动、大列表分片渲染
- v-once、v-memo（Vue3）、v-show/v-if 合理使用
- 事件防抖/节流、减少不必要的 watch
- 合理使用 key，避免不必要的 diff
- SSR、预渲染、静态资源压缩
- Tree-shaking、代码分割

#### Vue3 新增优化

- Fragment、Teleport、Suspense 支持
- 更快的响应式和渲染机制
- 静态提升、编译优化

::: details 路由懒加载和异步组件

```js
// 路由懒加载
const Foo = () => import('./Foo.vue')
const routes = [{ path: '/foo', component: Foo }]

// 异步组件
const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'))
```

:::

::: details v-once/v-memo/v-show/v-if

```html
<!-- v-once：只渲染一次 -->
<div v-once>{{ msg }}</div>

<!-- v-memo（Vue3）：缓存静态内容 -->
<div v-memo="[deps]">{{ msg }}</div>

<!-- v-show/v-if：按需渲染 -->
<div v-if="show">内容</div>
<div v-show="show">内容</div>
```

:::

## Vue2 和 Vue3 如何实现异步组件、异步更新队列？实现原理有何不同？

### 核心答案

异步组件：Vue2/3 都支持 defineAsyncComponent 异步加载组件。异步更新队列：Vue2/3 都采用 nextTick 微任务队列优化批量 DOM 更新，Vue3 内部实现更高效。

### 原理详解

#### 异步组件

- Vue2：通过工厂函数或异步组件语法实现。
- Vue3：推荐 defineAsyncComponent，支持超时、错误处理、加载状态。

#### 异步更新队列

- Vue2：数据变更后不会立即更新 DOM，而是将更新任务推入队列，等所有同步任务完成后统一批量更新（nextTick）。
- Vue3：同样采用 nextTick，队列和调度机制更高效，支持 Suspense 等新特性。

::: details 异步组件和 nextTick 示例

```js
// 异步组件
import { defineAsyncComponent, nextTick } from 'vue'
const AsyncComp = defineAsyncComponent({
  loader: () => import('./AsyncComp.vue'),
  loadingComponent: Loading,
  errorComponent: ErrorComp,
  delay: 200,
  timeout: 3000
})

// 异步更新队列
count.value++
await nextTick()
// 此时 DOM 已更新
```

:::

## Vue2 和 Vue3 的虚拟 DOM、Diff 算法有何区别？key 的作用及原理是什么？

### 核心答案

Vue2 和 Vue3 都采用虚拟 DOM 和 Diff 算法，Vue3 的 Diff 算法更快更简洁。key 用于唯一标识节点，优化 Diff，避免不必要的 DOM 操作。

### 原理详解

#### 虚拟 DOM

- 用 JS 对象描述真实 DOM 结构，数据变化时先生成新虚拟 DOM，再与旧虚拟 DOM 对比，最后最小化真实 DOM 操作。

#### Diff 算法

- Vue2：采用双端比较，优化常见场景，复杂度 O(n)。
- Vue3：采用静态提升、Block Tree、最长递增子序列等优化，减少 patch 次数，性能更优。

#### key 的作用

- 唯一标识节点，帮助 Diff 算法准确判断节点复用、移动或销毁，避免错误复用和重排。
- 建议用业务唯一 id 作为 key，避免用 index。

::: details 虚拟 DOM 和 key 示例

```js
// 虚拟 DOM 示例（伪代码）
const vnode = {
  tag: 'div',
  props: { id: 'app' },
  children: [
    { tag: 'span', children: 'hello' }
  ]
}

// key 的作用
<ul>
  <li v-for="item in list" :key="item.id">{{ item.name }}</li>
</ul>
```

:::

## Vue2 和 Vue3 的 slot、动态组件、keep-alive、Teleport、Suspense 等高级特性有何区别？实现原理是什么？

### 核心答案

Vue3 对 slot、动态组件、keep-alive 进行了增强，新增 Teleport（传送门）、Suspense（异步组件占位），实现原理均基于虚拟 DOM 和组件机制。

### 原理详解

#### slot

- Vue2：具名插槽、作用域插槽，语法复杂。
- Vue3：统一为 v-slot，语法更简洁，类型推断更好。

#### 动态组件

- Vue2/3：<component :is="compName" />，支持异步组件。

#### keep-alive

- 缓存组件状态，避免重复渲染，Vue3 支持 onActivated/onDeactivated 生命周期。

#### Teleport

- Vue3 新增，将子组件渲染到 DOM 结构外的任意位置，适合弹窗、全局层等场景。

#### Suspense

- Vue3 新增，异步组件加载时可显示占位内容，提升用户体验。

::: details slot、动态组件、keep-alive、Teleport、Suspense 示例

```html
<!-- slot -->
<template>
  <slot name="header"></slot>
  <slot></slot>
</template>

<!-- 动态组件 -->
<component :is="currentComp"></component>

<!-- keep-alive -->
<keep-alive>
  <component :is="currentComp"></component>
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

### 核心答案

路由守卫：Vue Router 提供 beforeEach、beforeResolve、afterEach 等钩子。错误捕获：Vue2 用 errorCaptured，Vue3 支持 errorCaptured 和全局 app.config.errorHandler。自定义插件和全局 API：Vue2 用 Vue.use，Vue3 用 app.use，API 更模块化。

### 原理详解

#### 路由守卫

- 全局守卫、路由独享守卫、组件内守卫，支持异步和权限控制。

#### 错误捕获

- 组件内 errorCaptured 钩子捕获子组件错误。
- Vue3 支持全局错误处理 app.config.errorHandler。

#### 自定义插件

- Vue2：插件对象需实现 install 方法，Vue.use 注册。
- Vue3：插件对象需实现 install(app, options)，app.use 注册。

#### 全局 API

- Vue2：Vue.component、Vue.directive、Vue.mixin 等。
- Vue3：app.component、app.directive、app.mixin，API 更分离。

::: details 路由守卫、错误捕获、自定义插件、全局 API 示例

```js
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isLogin()) next('/login')
  else next()
})

// 错误捕获
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误：', err)
}

// 自定义插件
const MyPlugin = {
  install(app, options) {
    app.config.globalProperties.$myMethod = () => { ... }
  }
}
app.use(MyPlugin)

// 全局 API
app.component('MyComp', MyComp)
app.directive('focus', { mounted(el) { el.focus() } })
```

:::

## Vue2 和 Vue3 如何实现服务端渲染（SSR）、服务端预渲染（Prerender）、代码分割与懒加载、Tree-shaking？

### 核心答案

Vue2/3 都支持 SSR、Prerender、代码分割与懒加载。Vue3 SSR 性能更优，API 更现代。Tree-shaking 方面，Vue3 采用 ESM，支持更彻底的按需打包。

### 原理详解

#### SSR（服务端渲染）

- Vue2：vue-server-renderer，Nuxt.js。
- Vue3：@vue/server-renderer，Nuxt3，性能更优，支持 Suspense、Teleport 等新特性。

#### Prerender（预渲染）

- 构建时将部分页面渲染为静态 HTML，适合内容不频繁变动的页面。
- 常用 prerender-spa-plugin、Vite 插件等。

#### 代码分割与懒加载

- 通过 import() 动态导入组件或模块，webpack/vite 自动分割代码块，实现懒加载。

#### Tree-shaking

- Vue3 完全基于 ESM，未用到的 API 不会被打包，减小包体积。
- Vue2 由于 CommonJS 兼容性，Tree-shaking 效果有限。

::: details SSR、Prerender、代码分割与懒加载、Tree-shaking 示例

```js
// SSR
// Vue3 官方文档：https://ssr.vuejs.org/
// Nuxt3 支持 Vue3 SSR

// Prerender
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prerender from 'vite-plugin-prerender'
export default defineConfig({
  plugins: [vue(), prerender({ routes: ['/about', '/contact'] })]
})

// 代码分割与懒加载
const Foo = () => import('./Foo.vue')

// Tree-shaking
// 只引入用到的 API
import { ref, computed } from 'vue'
```

:::

## Vue2 和 Vue3 如何支持 TypeScript？各自的实现方式和扩展性如何？

### 核心答案

Vue2 对 TypeScript 支持有限，需借助 vue-class-component、vue-property-decorator 等。Vue3 原生支持 TypeScript，API 设计更友好，类型推断更完善，扩展性更强。

### 原理详解

#### Vue2

- 通过 class 组件、装饰器等方式支持 TS，类型推断不完善，体验一般。

#### Vue3

- 全面用 TypeScript 重写，Composition API、defineComponent、defineProps、defineEmits 等都支持类型推断。
- setup 语法糖、泛型、类型推断极佳，适合大型项目。

::: details Vue2 TypeScript 支持示例

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MyComp extends Vue {
  msg: string = 'hello'
  mounted() {
    console.log(this.msg)
  }
}
```

:::

::: details Vue3 TypeScript 支持示例

```ts
<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)

interface Props {
  title: string
}
const props = defineProps<Props>()

function inc(): void {
  count.value++
}
</script>
<template>
  <div>{{ props.title }}: {{ count }}</div>
  <button @click="inc">增加</button>
</template>
```

:::

## Vue2 和 Vue3 如何实现自定义渲染器（Renderer）和响应式原理的扩展？

### 核心答案

Vue2 通过 runtime-only/runtime+compiler 架构，扩展性有限。Vue3 提供 createRenderer API，可自定义渲染到任意平台（如小程序、Canvas、WebGL），响应式系统也可独立使用和扩展。

### 原理详解

#### 自定义渲染器

- Vue3 提供 createRenderer，可自定义平台渲染逻辑（如 vue-native、vue-cesium、vue-3d）。
- 只需实现平台相关的 DOM 操作方法。

#### 响应式原理扩展

- Vue3 响应式系统（@vue/reactivity）可单独使用，适合状态管理、非 UI 场景。
- 支持自定义 ref、effect、scheduler 等。

::: details Vue3 自定义渲染器和响应式扩展示例

```js
// 自定义渲染器
import { createRenderer } from '@vue/runtime-core'
const renderer = createRenderer({
  createElement(type) { /* ... */ },
  insert(el, parent, anchor) { /* ... */ },
  // 其他平台相关方法
})
renderer.createApp(App).mount('#app')

// 响应式系统独立使用
import { reactive, effect } from '@vue/reactivity'
const state = reactive({ count: 0 })
effect(() => {
  console.log(state.count)
})
state.count++
```

:::

## Vue2 和 Vue3 如何实现全局状态管理？常用方案有哪些？

### 核心答案

Vue2 常用 Vuex，Vue3 推荐 Pinia（也支持 Vuex 4），都可实现全局状态管理。Pinia 基于 Composition API，类型推断更好，API 更简洁。

### 原理详解

#### Vuex

- Vue2/3 都支持，采用单一状态树，mutation/action 变更状态，支持模块化。
- Vue3 推荐 Vuex 4，兼容 Composition API。

#### Pinia

- Vue3 官方推荐，API 更现代，支持模块化、类型推断、热更新。
- 支持 setup 语法糖，和 Composition API 深度集成。

::: details Vuex 和 Pinia 示例

```js
// Vuex
import Vuex from 'vuex'
const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    inc(state) { state.count++ }
  }
})

// Pinia
import { defineStore, createPinia } from 'pinia'
const useCounter = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    inc() { this.count++ }
  }
})
// main.js
app.use(createPinia())
// 组件内
const counter = useCounter()
counter.inc()
```

:::

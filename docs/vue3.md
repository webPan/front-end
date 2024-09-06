## vue3新特性
1. 性能
双向响应原理由`Object.defineProperty`改为基于ES6的`Proxy` [ˈprɒksi]，使其速度更快；
    * 重写了 `Vdom`
    * 进行了模板编译的优化
    * 进行了更加高效的组件初始化
2. `Tree-Shaking` 的支持
使 `Vue3` 的体积更小。  
需要的模块才会打入到包里，优化后的 `Vue3.0` 的打包体积只有原来的一半（13kb）。哪怕把所有的功能都引入进来也只有23kb，依然比 `Vue2.x` 更小。像 `keep-alive` 、 `transition` 甚至 `v-for` 等功能都可以按需引入。
3. `Composition [ˌkɒmpəˈzɪʃn] API`
`composition-api` 是一个 Vue3 中新增的功能，它的灵感来自于 `React Hooks` ，是比 `mixin` 更强大的存在。
`composition-api` 可以提高代码逻辑的可复用性，从而实现与模板的无关性；同时使代码的可压缩性更强。另外，把 `Reactivity` 模块独立开来，意味着 `Vue3.0` 的响应式模块可以与其他框架相组合。
`composition-api` 把复杂组件的逻辑抽地更紧凑，而且可以将公共逻辑进行抽取。
4. `Fragments`
不再限制 `template` 只有一个根节点。
`render`函数也可以返回数组了，有点像 `React.Fragments`
5. `Better TypeScript Support`
更好的类型推导，使得 `Vue3` 把 `TypeScript` 支持得非常好
6. `Custom Renderer API`
实现用DOM的方式进行 `WebGL` 编程


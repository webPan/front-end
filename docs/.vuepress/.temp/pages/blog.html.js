import comp from "D:/wwwroot/front-end/docs/.vuepress/.temp/pages/blog.html.vue"
const data = JSON.parse("{\"path\":\"/blog.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"JavaScript深入之从原型到原型链\",\"slug\":\"javascript深入之从原型到原型链\",\"link\":\"#javascript深入之从原型到原型链\",\"children\":[]},{\"level\":3,\"title\":\"JS 中 proto 和 prototype 存在的意义是什么？\",\"slug\":\"js-中-proto-和-prototype-存在的意义是什么\",\"link\":\"#js-中-proto-和-prototype-存在的意义是什么\",\"children\":[]},{\"level\":3,\"title\":\"带你深度解锁Webpack系列\",\"slug\":\"带你深度解锁webpack系列\",\"link\":\"#带你深度解锁webpack系列\",\"children\":[]},{\"level\":3,\"title\":\"JavaScript中常见的十五种设计模式\",\"slug\":\"javascript中常见的十五种设计模式\",\"link\":\"#javascript中常见的十五种设计模式\",\"children\":[]}],\"git\":{\"updatedTime\":1725608966000,\"contributors\":[{\"name\":\"qing_321\",\"email\":\"qing_321@126.com\",\"commits\":1}]},\"filePathRelative\":\"blog.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

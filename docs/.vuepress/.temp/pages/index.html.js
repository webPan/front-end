import comp from "D:/wwwroot/front-end/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroAlt\":null,\"heroText\":\"前端文档\",\"tagline\":\"前端文档包含Vue、React、Webpack等\",\"actionText\":\"Get Started\",\"actionLink\":\"/base.html\",\"features\":[{\"title\":\"基础\",\"details\":\"CSS、HTML、JS的理解及使用\"},{\"title\":\"进阶\",\"details\":\"Vue、React等框架的使用\"},{\"title\":\"高级\",\"details\":\"模块化工具、算法、框架底层原理\",\"footer\":\"MIT Licensed | Copyright © 2019-present Evan You\"}]},\"headers\":[],\"git\":{\"updatedTime\":1725794173000,\"contributors\":[{\"name\":\"qing_321\",\"email\":\"qing_321@126.com\",\"commits\":2}]},\"filePathRelative\":\"index.md\"}")
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

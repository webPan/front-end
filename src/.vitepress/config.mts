import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "front-end",
  description: "front-end",
  outDir: './../docs',
  // assetsDir: 'front-end',
  base: '/front-end',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '设计模式', link: 'https://vue3js.cn/interview/design/design.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88' },
      { text: '其他题库', link: 'https://vue3js.cn/interview/' },
    ],
    sidebar: [
      { text: '初级', link: '/base.html' },
      { text: '中级', link: '/intermediate.html' },
      { text: '高级', link: '/senior.html' },
      { text: 'React', link: '/react.html' },
      { text: 'Vue', link: '/vue.html' },
      { text: 'Vue3', link: '/vue3.html' },
      { text: '移动端', link: '/mobile.html' },
      { text: '打包工具', link: '/packaging-tools.html' },
      { text: '算法', link: '/algorithm.html' },
      { text: '博文', link: '/blog.html' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/webPan' }
    ]
  }
})

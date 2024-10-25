import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "front-end",
  description: "front-end",
  outDir:'./../docs',
  assetsDir: 'front-end',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/index' },
    ],
    sidebar: [
      {text:'初级',link:'/base.html'},
      {text:'中级',link:'/intermediate.html'},
      {text:'高级',link:'/senior.html'},
      {text:'React',link:'/react.html'},
      {text:'Vue',link:'/vue.html'},
      {text:'Vue3',link:'/vue3.html'},
      {text:'移动端',link:'/mobile.html'},
      {text:'Es6',link:'/es6.html'},
      {text:'原理',link:'/principle.html'},
      {text:'算法',link:'/algorithm.html'},
      {text:'经典博文',link:'/blog.html'},
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/webPan' }
    ]
  }
})

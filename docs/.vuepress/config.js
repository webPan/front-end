import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',
  locale:{
    colorMode:'dark'
  },
  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: [
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
  }),
  bundler: viteBundler(),
  dest:`./docs/blog`,
  base:'/front-end/blog/',
})

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Column from '@/views/ColumnDetail/ColumnDetail.vue'
import Create from '@/views/CreatePost/CreatePost.vue'
import useStore from '@/store'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory, // 设置路由类型 这里为 histroy类型
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: Column
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { requiredLogin: true }
    }
  ]
})

// 定义前置路由守卫
router.beforeEach((to, from, next) => {
  const store = useStore() // store为什么放到这里是因为顺序问题
  //   https://blog.csdn.net/u011401390/article/details/123074721
  // 如果进入的路由需要登陆的话，没登陆就会跳转到login
  if (to.meta.requiredLogin && !store.user.isLogin) {
    next('/login')
  } else if (to.meta.isLogin && store.user.isLogin) { //   如果登录了，还是去login的话会强制跳转到/路由
    next('/')
  } else {
    next()
  }
})
export default router

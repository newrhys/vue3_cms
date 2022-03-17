import { firstMenu } from '@/store/login'
import { cacheStore } from '@/utils'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Login from './login/login'
import User from './main/system/user/user'
console.log(Login)
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: []
    // children: [] -> 根据userMenus来决定 -> children
  },
  Login
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach(to => {
  if (to.path !== '/login') {
    const token = cacheStore.getCache('token')
    // console.log(token, 'token')
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())
  // console.log(to) // route对象

  if (to.path === '/main') {
    return firstMenu.url
    // console.log(firstMenu, '----')
  }
})
export default router

import { defineStore } from 'pinia'
import {
  requestLogin,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/api/login'
import { cacheStore } from '@/utils'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { getPageListData } from '@/api/common'

export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  rememberPassword: boolean
  permissions: string[]
}
// 使用setup模式定义
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: {} as any,
      userMenus: [] as any[],
      permissions: [] as any[],
      name: '',
      password: '',
      token: '',
      rememberPassword: false,
      entireDepartment: [] as any[],
      entireRole: [] as any[],
      entireMenu: [] as any[]
    }
  },
  getters: {
    allUserMenus: state => state.userMenus
  },
  actions: {
    changeToken(token: string) {
      this.token = token
    },
    changeUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    logout() {
      this.userInfo = {}
      this.userMenus = []
      this.token = ''
    },
    async getInitialDataAction() {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      console.log(menuList, '=menuList')
      // 2.保存数据
      this.$patch(state => {
        state.entireDepartment = departmentList
        state.entireRole = roleList
        state.entireMenu = menuList
      })
    },
    test() {
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach(route => {
        router.addRoute('main', route)
        console.log(router, '-----')
      })
      console.log('注册动态路由')
    },
    loadLocalLogin() {
      if (this.token) {
        console.log('刷新注册动态路由')
        this.changeUserMenus(this.userMenus)
      }
    },
    changeUserMenus(userMenus: any) {
      this.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route => {
        router.addRoute('main', route)
      })
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions
      console.log('注册动态路由')
    },
    cacheLoginInfo(name?: string, password?: string, selectFlag?: boolean) {
      this.name = name ?? ''
      this.password = password ?? ''
      this.rememberPassword = selectFlag ?? false
    },

    async handleLogin(loginInfo = { name: '', password: '' }) {
      const { id, token } = await requestLogin(loginInfo)
      this.changeToken(token)
      await cacheStore.setCache('token', token)
      cacheStore.getCache('token')
      //userInfo
      const userInfo = await requestUserInfoById(id)
      this.changeUserInfo(userInfo)
      //enum
      this.getInitialDataAction()
      //menuInfo
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      console.log(userMenusResult)
      this.changeUserMenus(userMenusResult)
      // 4.跳到首页
      await router.push('/main')
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})

/**
 *
 * @param userMenru
 * @returns route:RouteRecordRaw
 */
export let firstMenu: any = undefined

export function mapMenusToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // const routeFiles = require.context('@/router/main', true, /\.ts$/)
  const routeFiles = require.context('@/router/main', true, /\.ts/)

  routeFiles.keys().forEach(key => {
    //get module of rquire ==> module.default
    const route = require('@/router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find(route => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function setCacheMenu() {
  const { loadLocalLogin } = useUserStore()
  loadLocalLogin()
}

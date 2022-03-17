import { createPinia } from 'pinia'
import { useUserStore } from '@/store/login'
// 使用setup模式定义
import piniaPluginPersist from 'pinia-plugin-persist'
export const piniaStore: any = {}

export const registerStore = (app: any) => {
  const store = createPinia()
  app.use(store)
  //presisit
  store.use(piniaPluginPersist)
  piniaStore.userStore = useUserStore()
  //注册store
}

import netRequest from '@/utils/request/request'
import { BASE_URL, TIME_OUT } from '@/utils/config'
import { useUserStore } from '@/store/login'
import { piniaStore } from '@/store'
import { cacheStore } from '@/utils'

const httpReuqest = new netRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor: config => {
      console.log('请求拦截')
      const token = piniaStore.userStore.token
      console.log(token)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: err => {
      console.log('响应了错误')
      return err
    },
    responseInterceptor: res => {
      console.log('响应拦截')
      return res
    },
    responseInterceptorCatch: err => {
      return err
    }
  }
})

export default httpReuqest

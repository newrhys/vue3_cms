import axios, { AxiosInstance } from 'axios'
import { RequestConfig, RequestInterceptors } from '@/utils/request/type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class netRequest {
  instance: AxiosInstance
  showLoading: boolean
  interceptors?: RequestInterceptors
  loading?: LoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    //loading
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          console.log(1231231)
          // this.loading = ElLoading.service({ fullscreen: true })
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgb(0,0,0,0.5)'
          })
          console.log(this.loading, '--this.loading')
        }
        return config
      },
      err => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      res => {
        this.loading?.close()
        // this.showLoading = false
        return res.data
      },
      err => {
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        // this.showLoading = false
        return err
      }
    )
    //传入的实例
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //响应
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    const { url, data, method } = config
    let newConfig: RequestConfig<T> = {}
    newConfig.url = url
    newConfig.method = method
    method!.toLowerCase() === 'get'
      ? (newConfig['params'] = data)
      : (newConfig['data'] = data)
    return new Promise((reolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        newConfig = config.interceptors.requestInterceptor(newConfig)
      }
      //
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(newConfig)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = true
          console.log(res)
          reolve(res)
        })
        .catch(err => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default netRequest

import axios, { AxiosInstance } from 'axios'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import { RequestConfig, RequestInterceptors } from '@/utils/request/type'
import { ElLoading } from 'element-plus'

class netRequest {
  instance: AxiosInstance
  showLoading: boolean
  interceptors?: RequestInterceptors
  loading?: LoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    //loading
    this.showLoading = config.showLoading ?? true

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

    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
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
        this.showLoading = false
        return res.data
      },
      err => {
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        this.showLoading = false
        return err
      }
    )
  }

  request(config: RequestConfig): Promise<any> {
    const { url, data, method } = config
    const newConfig: RequestConfig = {}
    newConfig.url = url
    method!.toLowerCase() === 'get'
      ? (newConfig['params'] = data)
      : (newConfig['data'] = data)
    console.log(newConfig)
    return new Promise((reolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(newConfig)
      }
      //
      this.instance(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
            console.log(res)
            reolve(res)
          }
        })
        .catch(err => {
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    console.log({ ...config, method: 'GET' })
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    console.log({ ...config, method: 'GET' })
    return this.request({ ...config, method: 'POST' })
  }
}

export default netRequest

import netRequest from '@/utils/request/request'
import { BASE_URL, TIME_OUT } from '@/utils/config'

const httpReuqest = new netRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default httpReuqest

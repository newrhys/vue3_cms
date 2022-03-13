import { accountInfo, resData } from '@/api/type'
import httpReuqest from '@/utils/request'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export function requestLogin(data: accountInfo) {
  return httpReuqest.post({
    url: LoginAPI.AccountLogin,
    data
  })
}

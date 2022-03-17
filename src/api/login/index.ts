import { accountInfo, resData } from '@/api/type'
import httpReuqest from '@/utils/request'
import { get } from 'lodash'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export async function requestLogin(data: accountInfo) {
  const res = await httpReuqest.post({
    url: LoginAPI.AccountLogin,
    data
  })
  return get(res, 'data')
}

export async function requestUserInfoById(data: number) {
  const res = await httpReuqest.get({
    url: LoginAPI.LoginUserInfo + data
  })
  return get(res, 'data')
}

export async function requestUserMenusByRoleId(id: number) {
  const res = await httpReuqest.get({
    url: LoginAPI.UserMenus + id + '/menu'
  })
  return get(res, 'data')
}

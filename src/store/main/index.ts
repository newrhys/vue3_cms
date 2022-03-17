import { createPageData, editPageData, getPageListData } from '@/api/common'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => {
    return {
      usersList: [] as any[]
    }
  },

  actions: {
    changeUsersList(data: []) {
      this.usersList = data
    },
    async getPageListAction(payload: any) {
      const pageName = payload.pageName
      const pageUrl = `/${payload.pageName}/list`
      console.log(pageUrl, '----')
      // 2.对页面发送请求
      const pageResult = (await getPageListData(pageUrl, payload.queryInfo))
        .data
      const eventName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      const actionName = `change${eventName}List`
      console.log(typeof actionName)
    },
    async editPageDataAction(payload: any) {
      const { pageName, editData, id } = payload
      console.log(editData)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      //   this.getPageListAction({
      //     pageName,
      //     queryInfo: {
      //       offset: 0,
      //       size: 10
      //     }
      //   })
    },
    async createPageDataAction(payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      //   this.getPageListAction({
      //     pageName,
      //     queryInfo: {
      //       offset: 0,
      //       size: 10
      //     }
      //   })
    }
  },
  getters: {
    getUserById: (state: any) => {
      return (pagename: any) => state[`${pagename}List`]
    }
  }
})

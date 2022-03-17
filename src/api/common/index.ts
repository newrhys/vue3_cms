import httpReuqest from '@/utils/request'

export function getPageListData(url: string, data: any) {
  return httpReuqest.post({
    url: url,
    data
  })
}

export function editPageData(url: string, editData: any) {
  return httpReuqest.patch({
    url: url,
    data: editData
  })
}

export function createPageData(url: string, editData: any) {
  return httpReuqest.post({
    url: url,
    data: editData
  })
}

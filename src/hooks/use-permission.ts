import { useUserStore } from '@/store/login'

export function usePermission(pageName: any, hanldeName: string) {
  const store = useUserStore()
  const permissions = store.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // xx = "xx"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item: string) => item === verifyPermission)
}

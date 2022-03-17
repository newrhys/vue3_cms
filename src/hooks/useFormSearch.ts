import { ref } from 'vue'
import TConetent from '@/components/TConetent.vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof TConetent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getDataList()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getDataList(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}

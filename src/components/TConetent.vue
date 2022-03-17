<template>
  <div class="container">
    <TTable
      :listCount="dataCount"
      v-bind="contentTableConfig"
      :listData="dataList"
      v-model:page="pageInfo"
    >
      <template #header>
        <slot name="header"> 标题 </slot>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            :icon="Edit"
            size="small"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isCreate"
            :icon="Delete"
            size="small"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </TTable>
  </div>
</template>

<script lang="ts" setup>
import TTable from './TTable.vue'
import { defineProps, ref, defineEmits, defineExpose, watch } from 'vue'
import { useMainStore } from '@/store/main'
import { getPageListData } from '@/api/common'
import { Edit, Share, Delete, Search, Upload } from '@element-plus/icons-vue'
import { usePermission } from '@/hooks/use-permission'

export interface TableRes {
  list: []
  totalCount: number
}

const props = defineProps({
  pageName: {
    tyep: String,
    required: true
  },
  contentTableConfig: {
    type: Object,
    require: true
  }
})
const emit = defineEmits(['newBtnClick', 'editBtnClick'])

const dataList = ref([])
const dataCount = ref(0)
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getDataList())
const store = useMainStore()
const getDataList = (queryInfo: any = {}) => {
  // if (!isQuery) return
  let payload = {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  }
  getPageListAction(payload)
}

async function getPageListAction(payload: any) {
  //   const pageName = payload.pageName
  const pageUrl = `/${payload.pageName}/list`
  //   console.log(pageUrl, '----')
  // 2.对页面发送请求
  const pageResult: TableRes = (
    await getPageListData(pageUrl, payload.queryInfo)
  ).data
  dataList.value = pageResult.list
  dataCount.value = pageResult.totalCount
}
getDataList()

// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

// 0.获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

const handleDeleteClick = (item: any) => {
  console.log(item)
}
const handleNewClick = () => {
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}

defineExpose({ getDataList })
</script>

<style lang="less" scoped>
//@import url()
</style>

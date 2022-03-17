<template>
  <div>
    <common-search
      :searchFormConfig="searchFormConfig"
      @handleQueryClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    >
    </common-search>
    <TConetent
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #header>
        用户列表
        <el-button @click="handleNewData" type="primary">新建用户</el-button>
      </template>
    </TConetent>
    <TModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
      :modalConfig="modalConfigRef"
      @updataList="updataList"
    >
    </TModal>
  </div>
</template>

<script setup lang="ts">
import CommonSearch from '@/components/CommonSearch.vue'
import TConetent from '@/components/TConetent.vue'
import TModal from '@/components/TModal.vue'
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/useFormSearch'
import { useUserStore } from '@/store/login'
import { computed } from 'vue'
import { searchFormConfig, modalConfig, contentTableConfig } from './config'

const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    item => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    item => item.field === 'password'
  )
  passwordItem!.isHidden = true
}

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
)

const { entireDepartment, entireRole } = useUserStore()

const updataList = () => {
  console.log(pageContentRef!.value.getDataList())
}
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    item => item.field === 'departmentId'
  )
  console.log(entireDepartment, entireRole, 'entireDepartment')
  departmentItem!.options = entireDepartment.map(item => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find(item => item.field === 'roleId')
  roleItem!.options = entireRole.map(item => {
    return { title: item.name, value: item.id }
  })

  return modalConfig
})
</script>

<style></style>

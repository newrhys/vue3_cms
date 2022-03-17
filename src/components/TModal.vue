<template>
  <div class="modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <TForm v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
//
import TForm from './TForm.vue'
import { defineProps, ref, defineEmits, defineExpose, watch } from 'vue'
import { useMainStore } from '@/store/main'
import { emitChangeFn } from 'element-plus'
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  }
})

const emit = defineEmits(['updataList'])
let dialogVisible = ref(false)
const formData = ref<any>({})
const { editPageDataAction, createPageDataAction } = useMainStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    console.log('编辑用户')
    editPageDataAction({
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    console.log('新建用户')
    createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
  emit('updataList')
}
watch(
  () => props.defaultInfo,
  newValue => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

defineExpose({
  dialogVisible
})
</script>

<style lang="less" scoped>
//@import url()
</style>

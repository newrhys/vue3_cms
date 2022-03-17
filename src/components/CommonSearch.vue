<template>
  <div class="container">
    <t-form v-bind="searchFormConfig" v-model="formData">
      <template #header>检索</template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </t-form>
  </div>
</template>

<script lang="ts" setup>
import TForm from './TForm.vue'
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
})

const emit = defineEmits(['handleQueryClick', 'resetBtnClick'])

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)
const handleQueryClick = () => {
  emit('handleQueryClick', formData.value)
}
const handleResetClick = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}
</script>

<style lang="less" scoped>
//@import url()
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>

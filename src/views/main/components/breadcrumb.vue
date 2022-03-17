<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
export interface Breadcrumb {
  name: string
  path?: string
}
const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
//@import url()
</style>

<template>
  <div class="container">
    <el-icon class="fold-menu">
      <component @click="handleFoldClick" :is="isFold ? 'Expand' : 'Fold'" />
    </el-icon>
    <div class="content">
      <breadcrumb :breadcrumbs="breadcrumbs" />
      <userInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, defineExpose, computed } from 'vue'
import userInfo from './userInfo.vue'
import breadcrumb from './breadcrumb.vue'
import { useUserStore } from '@/store/login'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils'
const props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const { userMenus } = useUserStore()
const breadcrumbs = computed(() => {
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
const emit = defineEmits(['update:isFold'])
const handleFoldClick = () => {
  emit('update:isFold', !props.isFold)
}

defineExpose({
  handleFoldClick
})
</script>

<style lang="less" scoped>
//@import url()
.container {
  width: 100%;

  display: flex;
  align-items: center;
  .fold-menu {
    font-size: 20px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>

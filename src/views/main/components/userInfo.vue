<template>
  <div class="main">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="p_l_5">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/login'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()
let name = store.userInfo.name
const handleExitClick = async () => {
  await store.logout()
  router.push('/')
}
</script>

<style lang="less" scoped>
//@import url()
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.p_l_5 {
  padding-left: 10px;
}
</style>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '64px' : '210px'" class="main_aside">
        <nav-menu v-model:collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header>
          <navHeader v-model:isFold="isCollapse" />
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/login'
import { ref } from 'vue'
import navMenu from './components/navMenu.vue'
import navHeader from './components/navHeader.vue'
const { test } = useUserStore()
const sss = () => {
  test()
}
const isCollapse = ref(false)
</script>

<style scoped lang="less">
.main {
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  width: 100%;
  height: 100%;
}

.main_aside {
  // width: 200px;
  // min-height: 400px;
  height: 100%;

  // animation-duration: 2s;
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>

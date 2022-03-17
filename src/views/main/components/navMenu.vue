<template>
  <div class="main">
    <div class="logo" @click="changeCollapse">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultMenu || 39"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in allUserMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component class="el-icon" :is="changeName(item.icon)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/login'
import { firstMenu } from '@/store/login'
import { pathMapToMenu } from '@/utils'
import { defineProps, defineEmits, defineExpose, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const changeName = (name: any) => 'edit'
const emit = defineEmits(['update:collapse'])
const { allUserMenus } = useUserStore()
const router = useRouter()
const handleMenuItemClick = (item: any) => {
  console.log(item, '---跳转rul')
  router.push({
    path: item.url ?? '/not-found'
  })
}

const changeCollapse = () => {
  emit('update:collapse', !props.collapse)
}

const route = useRoute()
const currentPath = route.path
const menu = pathMapToMenu(allUserMenus, currentPath)

const defaultMenu = ref(menu.id + '')
console.log(defaultMenu, '---defaultMenu')
defineExpose({
  handleMenuItemClick
})
</script>

<style scoped lang="less">
.main {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}

.el-menu {
  border-right: none;
}

.el-menu-vertical {
  height: calc(100% - 48px);
}
.el-menu-vertical:not(.el-menu--collapse) {
  // width: 200px;
  // min-height: 400px;
  height: calc(100% - 48px);
}

// 目录
.el-submenu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}

::v-deep .el-submenu__title {
  background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
</style>

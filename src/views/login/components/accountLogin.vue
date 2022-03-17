<template>
  <div class="login">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { rules } from '@/views/login/components/config'
import { FormInstance } from 'element-plus'
import { useUserStore } from '@/store/login'

const userStore = useUserStore()
const { name: cacheName, password: cacehPassword, handleLogin } = userStore
const account = reactive({
  name: cacheName || '',
  password: cacehPassword || ''
})
const formRef = ref<FormInstance>()
const loginAction = (isKeepPassword: boolean) => {
  console.log(123)
  return formRef.value?.validate(valid => {
    if (valid) {
      // 1.判断是否需要记住密码
      // if (isKeepPassword) {
      //   // 本地缓存
      //   userStore.cacheLoginInfo(account.name, account.password, isKeepPassword)
      // } else {
      //   userStore.cacheLoginInfo(account.name, account.password)
      // }
      userStore.cacheLoginInfo(account.name, account.password, isKeepPassword)
      // 2.开始进行登录验证
      handleLogin(account)
      // store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

defineExpose({ loginAction })
</script>

<style scoped lang="less"></style>

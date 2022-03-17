<template>
  <div class="login">
    <div class="login-panel">
      <h1 class="title">后台管理系统</h1>
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </template>
          <account-login ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </template>
          <phoneLogin ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>

      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button type="primary" class="login-btn" @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { piniaStore } from '@/store'
import { useUserStore } from '@/store/login'
import { defineComponent, ref } from 'vue'
import { accountLogin, phoneLogin } from './components'
// import accountLogin from './components/accountLogin.vue'
export default defineComponent({
  name: 'login',
  components: {
    accountLogin,
    phoneLogin
  },
  setup() {
    let isKeepPassword = ref(true)

    const { rememberPassword } = useUserStore()
    if (rememberPassword) isKeepPassword.value = rememberPassword
    let currentTab = ref('account')
    const accountRef = ref<InstanceType<typeof accountLogin>>()
    // const accountRef = ref()
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }

    return { isKeepPassword, accountRef, handleLoginClick, currentTab }
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}

.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>

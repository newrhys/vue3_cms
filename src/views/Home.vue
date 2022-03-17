<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <button @click="test">123</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import httpReuqest from '@/utils/request'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    const test = async () => {
      let cc = await httpReuqest.post({
        url: '/login',
        data: { name: 'coderwhy', password: '123456' }
      })
    }
    //
    // onBeforeMount(async () => {
    //   let cc = await httpReuqest.get({
    //     url: '/login',
    //     data: { name: 'coderwhy', password: 123456 }
    //   })
    //   console.log(cc)
    // })

    return {
      test
    }
  }
})
</script>

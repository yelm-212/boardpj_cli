<template>
  <UserHeader/>
  <el-container>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import UserHeader from './components/UserHeader.vue'

export default {
  name: 'App',
  components: {
    UserHeader
  }
}
</script>
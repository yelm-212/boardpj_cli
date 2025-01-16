<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">게시판</router-link>
      <UserHeader />
    </div>
  </nav>

  <div class="container mt-4">
    <router-view />
  </div>
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
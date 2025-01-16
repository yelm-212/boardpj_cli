<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">게시글 작성</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">제목</label>
            <input v-model="form.title" type="text" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">내용</label>
            <textarea v-model="form.content" class="form-control" rows="5" required></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <router-link to="/" class="btn btn-secondary">취소</router-link>
            <button type="submit" class="btn btn-primary">작성</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { postAPI } from '@/api'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const username = computed(() => store.getters.getUsername)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    const form = ref({
      title: '',
      content: ''
    })

    const handleSubmit = async () => {
      if (!isLoggedIn.value) {
        alert('사용자 이름을 먼저 설정해주세요.')
        return
      }

      try {
        await postAPI.createPost({
          ...form.value,
          author: username.value
        })
        router.push('/')
      } catch (error) {
        console.error('게시글 작성 실패:', error)
      }
    }

    return {
      form,
      handleSubmit
    }
  }
}
</script>
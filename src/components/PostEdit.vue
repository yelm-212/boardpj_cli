<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>게시글 수정</h2>
    </div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" v-if="post">
          <div class="mb-3">
            <label class="form-label">제목</label>
            <input v-model="form.title" type="text" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">내용</label>
            <textarea v-model="form.content" class="form-control" rows="5" required></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <router-link :to="'/posts/' + id" class="btn btn-secondary">취소</router-link>
            <button type="submit" class="btn btn-primary">수정</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { postAPI } from '@/api'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },


  setup(props) {
    const store = useStore()
    const router = useRouter()
    const post = ref(null)
    const form = ref({
      id: '',  // id 필드 추가
      title: '',
      content: ''
    })

    const username = computed(() => store.getters.getUsername)

    const fetchPost = async () => {
      try {
        const response = await postAPI.getPost(props.id)
        post.value = response.data

        // 컴포넌트 레벨에서도 한번 더 체크
        if (username.value !== post.value.author) {
          alert('자신의 게시글만 수정할 수 있습니다.')
          router.push('/')
          return
        }

        form.value = {
          id: props.id,
          title: response.data.title,
          content: response.data.content
        }
      } catch (error) {
        console.error('게시글 조회 실패:', error)
        router.push('/')
      }
    }

    const handleSubmit = async () => {
      try {
        console.log(form.value)
        await postAPI.updatePost(form.value)
        router.push(`/posts/${props.id}`)
      } catch (error) {
        console.error('게시글 수정 실패:', error)
        if (error.response) {
          console.log('Error Data:', error.response.data)
          console.log('Error Status:', error.response.status)
          console.log('Error Headers:', error.response.headers)
        }
      }
    }

    onMounted(() => {
      fetchPost()
    })

    return {
      post,
      form,
      handleSubmit
    }
  }
}
</script>
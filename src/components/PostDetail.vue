<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0">{{ post.title }}</h5>
          <div>
            <router-link :to="`/posts/${post.id}/edit`" class="btn btn-primary me-2">수정</router-link>
            <button @click="handleDelete" class="btn btn-danger">삭제</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <small class="text-muted">
            작성자: {{ post.author }} | 조회수: {{ post.viewCount }} |
            작성일: {{ formatDate(post.createdAt) }}
          </small>
        </div>
        <p class="card-text">{{ post.content }}</p>
      </div>
      <div class="card-footer">
        <router-link to="/" class="btn btn-secondary">목록으로</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
    const router = useRouter()
    const post = ref({})

    const fetchPost = async () => {
      try {
        const response = await postAPI.getPost(props.id)
        post.value = response.data
      } catch (error) {
        console.error('게시글 조회 실패:', error)
      }
    }

    const handleDelete = async () => {
      if (!confirm('정말 삭제하시겠습니까?')) return

      try {
        await postAPI.deletePost(props.id)
        router.push('/')
      } catch (error) {
        console.error('게시글 삭제 실패:', error)
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(() => {
      fetchPost()
    })

    return {
      post,
      handleDelete,
      formatDate
    }
  }
}
</script>

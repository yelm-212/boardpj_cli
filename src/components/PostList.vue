<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>게시글 목록</h2>
      <router-link to="/create" class="btn btn-primary">게시글 작성</router-link>
    </div>

    <div class="list-group">
      <router-link
          v-for="post in posts"
          :key="post.id"
          :to="'/posts/' + post.id"
          class="list-group-item list-group-item-action"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ post.title }}</h5>
          <small>{{ formatDate(post.createdAt) }}</small>
        </div>
        <p class="mb-1">{{ post.author }}</p>
        <small>조회수: {{ post.viewCount }}</small>
      </router-link>
    </div>
  </div>

  <!-- 페이지네이션 추가 -->
  <nav v-if="pageInfo" aria-label="Page navigation" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pageInfo.hasPrevious }">
        <a
            class="page-link"
            href="#"
            @click.prevent="handlePageChange(pageInfo.currentPage - 1)"
        >
          이전
        </a>
      </li>
      <li class="page-item">
          <span class="page-link">
            {{ pageInfo.currentPage }} / {{ pageInfo.totalPages }}
          </span>
      </li>
      <li class="page-item" :class="{ disabled: !pageInfo.hasNext }">
        <a
            class="page-link"
            href="#"
            @click.prevent="handlePageChange(pageInfo.currentPage + 1)"
        >
          다음
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { postAPI } from '@/api'

export default {
  setup() {
    const posts = ref([])
    const pageInfo = ref(null)

    const fetchPosts = async (page = 1) => {
      try {
        const response = await postAPI.getList(page)
        posts.value = response.data.content
        pageInfo.value = {
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          hasNext: response.data.hasNext,
          hasPrevious: response.data.hasPrevious
        }
      } catch (error) {
        console.error('게시글 목록 조회 실패:', error)
      }
    }

    const handlePageChange = (page) => {
      fetchPosts(page)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(() => {
      fetchPosts()
    })

    return {
      posts,
      pageInfo,
      handlePageChange,
      formatDate
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-bottom: 0;
}

.page-link {
  cursor: pointer;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>
<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>게시글 목록</h2>
      <router-link to="/create" class="btn btn-primary">게시글 작성</router-link>
    </div>

    <el-table :data="posts" style="width: 100%">
      <el-table-column prop="title" label="제목" min-width="200">
        <template #default="{ row }">
          <router-link :to="'/posts/' + row.id" class="text-decoration-none">
            {{ row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="작성자" width="120" />
      <el-table-column prop="viewCount" label="조회수" width="100" align="center" />
      <el-table-column label="작성일시" width="180" align="center">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="likeCount" label="좋아요" width="100" align="center" />
    </el-table>

    <div class="d-flex justify-content-center mt-4">
      <el-pagination
          v-if="pageInfo"
          v-model:currentPage="pageInfo.currentPage"
          :total="pageInfo.totalPages * 10"
          :page-size="10"
          layout="prev, pager, next"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { postAPI } from '@/api'
import { formatDate } from '@/utils/dateutils'

const store = useStore()
const route = useRoute()
const posts = ref([])
const pageInfo = ref(null)

const fetchPosts = async (page = store.state.currentPage) => {
  try {
    const response = await postAPI.getList(page)
    posts.value = response.data.content
    pageInfo.value = {
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      hasNext: response.data.hasNext,
      hasPrevious: response.data.hasPrevious
    }
    // store에 현재 페이지 저장
    store.dispatch('setCurrentPage', response.data.currentPage)
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error)
  }
}

const handlePageChange = (page) => {
  fetchPosts(page)
}

onMounted(() => {
  // URL에 페이지 파라미터가 있으면 해당 페이지로, 없으면 store의 현재 페이지로
  const page = Number(route.query.page) || store.state.currentPage
  fetchPosts(page)
})
</script>

<style scoped>
.el-table {
  --el-table-border-color: var(--el-border-color-lighter);
}

.text-decoration-none {
  text-decoration: none;
  color: var(--el-text-color-primary);
}

.text-decoration-none:hover {
  color: var(--el-color-primary);
}
</style>
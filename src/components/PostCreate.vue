<template>
  <el-card class="card-body">
    <h2 class="card-title">게시글 작성</h2>
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="제목" :label-width="'60px'">
        <el-input v-model="form.title" placeholder="제목을 입력하세요" required />
      </el-form-item>
      <el-form-item label="내용"
                    :label-width="'60px'"
                    :rows="5">
        <el-input v-model="form.content"
                  :rows="5"
                  type="textarea"
                  placeholder="내용을 입력하세요" required />
      </el-form-item>
      <el-row justify="space-between">
        <router-link to="/">
          <el-button>취소</el-button>
        </router-link>
        <el-button type="primary"
                   @click="handleSubmit">작성
        </el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { postAPI } from '@/api'

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
    await router.push('/')
  } catch (error) {
    console.error('게시글 작성 실패:', error)
  }
}
</script>
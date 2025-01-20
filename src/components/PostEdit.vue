<template>
  <div class="container mt-4">
    <el-row class="mb-4">
      <el-col>
        <h2>게시글 수정</h2>
      </el-col>
    </el-row>
    <el-card v-if="post">
      <el-form @submit.prevent="handleSubmit">
        <el-form-item label="제목">
          <el-input v-model="form.title" required />
        </el-form-item>
        <el-form-item label="내용">
          <el-input
              v-model="form.content"
              type="textarea"
              :rows="5"
              required
          />
        </el-form-item>
        <el-row justify="space-between" align="center">
          <el-col :span="4">
            <el-button @click="$router.push(`/posts/${id}`)" type="info">
              취소
            </el-button>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" native-type="submit">
              수정
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, defineProps} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {postAPI} from '@/api'
import {ElMessageBox} from 'element-plus'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()
const router = useRouter()
const post = ref(null)
const form = ref({
  id: '',
  title: '',
  content: ''
})

const username = computed(() => store.getters.getUsername)

const fetchPost = async () => {
  try {
    const response = await postAPI.getPost(props.id, username.value)
    post.value = response.data

    if (username.value !== post.value.author) {
      await ElMessageBox.alert(
          '자신의 게시글만 수정할 수 있습니다.',
          '권한 없음',
          {
            type: 'error',
            confirmButtonText: '확인'
          }
      )
      return
    }

    form.value = {
      id: props.id,
      title: response.data.title,
      content: response.data.content
    }
  } catch (error) {
    console.error('게시글 조회 실패:', error)
    ElMessageBox.alert(
        '게시글 조회에 실패했습니다.',
        '조회 실패',
        {
          type: 'error',
          confirmButtonText: '확인'
        }
    )
    return
  }
}

const handleSubmit = async () => {
  try {
    await postAPI.updatePost({
      ...form.value,
      author: username.value
    })
    await ElMessageBox.confirm(
        '게시글이 성공적으로 수정되었습니다.',
        '수정 성공',
        {
          type: 'success',
          confirmButtonText: '확인'
        }
    )
    await router.push(`/posts/${props.id}`)
  } catch (error) {
    console.error('게시글 수정 실패:', error)
    if (error.response) {
      console.log('Error Data:', error.response.data)
      console.log('Error Status:', error.response.status)
      console.log('Error Headers:', error.response.headers)
    }
    ElMessageBox.alert(
        '게시글 수정에 실패했습니다.',
        '수정 실패',
        {
          type: 'error',
          confirmButtonText: '확인'
        }
    )
  }
}

onMounted(() => {
  fetchPost()
})
</script>
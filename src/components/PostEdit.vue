<template>
  <el-card v-if="post">
    <h2 class="title">게시글 수정</h2>
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="제목">
        <el-input v-model="form.title" required />
      </el-form-item>

      <!-- Bind PostEditor with form.content -->
      <PostEditor v-model="form.content" />

      <el-row justify="space-between" align="middle">
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
</template>

<script setup>
import {ref, onMounted, computed, defineProps} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {postAPI} from '@/api'
import {ElMessageBox} from 'element-plus'
import PostEditor from './PostEditor.vue'

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

    // Check if the user is the author of the post
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

    // Set form values with the fetched data
    form.value = {
      id: props.id,
      title: response.data.title,
      content: response.data.content // Ensure the content is set
    }
  } catch (error) {
    console.error('게시글 조회 실패:', error)
    await ElMessageBox.alert(
        '게시글 조회에 실패했습니다.',
        '조회 실패',
        {
          type: 'error',
          confirmButtonText: '확인'
        }
    )
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
    await ElMessageBox.alert(
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
  fetchPost() // Fetch the post data when the component is mounted
})
</script>

<style>
.title {
  margin-bottom: 20px;
}
</style>
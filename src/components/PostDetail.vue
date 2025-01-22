<template>
  <el-row justify="center" class="mt-20">
    <el-col :span="16">
      <el-card v-if="post" shadow="hover">
        <template #header>
          <el-row align="middle" justify="space-between">
            <el-col :span="18">
              <h3>{{ post.title }}</h3>
            </el-col>
            <el-col :span="6">
              <div class="button-container">
                <router-link :to="'/posts/' + post.id + '/edit'" class="edit-button">
                  <el-button
                      type="primary"
                  >수정</el-button>
                </router-link>
                <el-button
                    type="danger"
                    @click="handleDelete"
                    class="delete-button"
                >삭제</el-button>
              </div>
            </el-col>
          </el-row>
        </template>

        <el-text type="info" size="small">
          작성자: {{ post.author }} | 조회수: {{ post.viewCount }} |
          작성일: {{ formatDate(post.createdAt) }}
        </el-text>

        <el-divider />

        <div class="content-area" v-html="sanitizedContent"></div>

        <el-divider />

        <el-row align="middle" class="post-footer">
          <el-col class="post-liked">
            <el-button
                :type="post.liked ? 'danger' : 'default'"
                @click="toggleLike"
            >
              <template #icon>
                <el-icon>
                  <span v-if="post.liked">♥︎</span>
                  <span v-else>♡</span>
                </el-icon>
              </template>
              {{ post.likeCount }}명 좋아요
            </el-button>
          </el-col>
          <el-col class="go-back">
            <el-button
                type="primary"
                plain
                @click="goBack"
            >
              목록으로
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { postAPI } from '@/api'
import { ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/dateutils'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const store = useStore()
const username = store.state.username
const post = ref(null)

const fetchPost = async () => {
  try {
    const response = await postAPI.getPost(props.id, username)
    post.value = response.data
  } catch (error) {
    console.error('게시글 조회 실패:', error)
  }
}

const sanitizedContent = computed(() => {
  return post.value?.content || ''
})

const handleDelete = async () => {
  try {
    if (post.value.author !== username.value) {
      await ElMessageBox.alert(
          '작성자만 게시글을 삭제할 수 있습니다.',
          '권한 없음',
          {
            type: 'error',
            confirmButtonText: '확인'
          }
      )
    } else {
      await ElMessageBox.confirm(
          '정말 삭제하시겠습니까?',
          '삭제 확인',
          {
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            type: 'warning',
          }
      )

      await postAPI.deletePost(props.id, username)
      router.push('/')
    }
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data === 'Only Author can be deleted') {
      await ElMessageBox.alert(
          '작성자만 게시글을 삭제할 수 있습니다.',
          '권한 없음',
          {
            type: 'error',
            confirmButtonText: '확인'
          }
      )
    } else if (error.name !== 'ElementPlusError') { // 취소 버튼 클릭 시 에러 무시
      console.error('게시글 삭제 실패:', error)
    }
  }
}

const toggleLike = async () => {
  if (!post.value) return

  try {
    const payload = {
      postId: post.value.id,
      username
    }

    if (post.value.liked) {
      await postAPI.unlikePost({
        data: payload
      })
    } else {
      await postAPI.likePost(payload)
    }

    await fetchPost()
  } catch (error) {
    console.error('좋아요 처리 실패:', error)
  }
}

const goBack = () => {
  router.replace({
    path: '/',
    query: { page: store.state.currentPage }
  })
}

onMounted(() => {
  fetchPost()
})
</script>

<style scoped>

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.post-liked {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.go-back {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

 .button-container {
   display: flex;
   justify-content: flex-end;
 }

.button-container .edit-button {
  order: 0;  /* 수정 버튼 */
  margin-right: 10px;
}

.button-container .el-button[type="danger"] {
  order: 1;  /* 삭제 버튼 */
}

/* content-area */

.content-area :deep(h1) {
  font-size: 2em;
  margin: 0.67em 0;
}

.content-area :deep(h2) {
  font-size: 1.5em;
  margin: 0.75em 0;
}

.content-area :deep(ul), .content-area :deep(ol) {
  padding-left: 2em;
  margin: 1em 0;
}

.content-area :deep(p) {
  margin: 1em 0;
}

.content-area :deep(a) {
  color: #409eff;
  text-decoration: underline;
}

.content-area :deep(strong) {
  font-weight: bold;
}

.content-area :deep(em) {
  font-style: italic;
}

</style>
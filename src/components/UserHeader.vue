<template>
  <div class="d-flex align-items-center">
    <!-- 사용자가 설정되지 않았을 때 -->
    <div v-if="!isLoggedIn" class="user-input-group">
      <el-input
          v-model="usernameInput"
          type="text"
          class="custom-input"
          placeholder="사용자 이름 입력"
          @keyup.enter="handleSetUsername"
      ></el-input>
      <el-button class="custom-btn" @click="handleSetUsername">
        확인
      </el-button>
    </div>

    <!-- 사용자가 설정되었을 때 -->
    <div v-else class="usernamed">
      <span class="username me-3">{{ username }}</span>
      <el-button class="custom-btn" @click="handleClearUsername">
        로그아웃
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserHeader',
  setup() {
    const store = useStore()
    const usernameInput = ref('')

    const username = computed(() => store.getters.getUsername)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    const handleSetUsername = () => {
      if (usernameInput.value.trim()) {
        store.dispatch('setUsername', usernameInput.value.trim())
        usernameInput.value = ''
      }
    }

    const handleClearUsername = () => {
      store.dispatch('clearUsername')
    }

    return {
      usernameInput,
      username,
      isLoggedIn,
      handleSetUsername,
      handleClearUsername
    }
  }
}
</script>

<style scoped>
.user-input-group {
  display: flex;          /* Flexbox로 설정 */
  align-items: center;    /* 수직 정렬 */
  gap: 10px;              /* 입력창과 버튼 사이 간격 */
  min-width: 250px;       /* 입력 그룹 최소 너비 */
}

.custom-input {
  min-width: 180px;  /* 입력창 최소 너비 */
  height: 35px;      /* 입력창 높이 */
  border-radius: 4px;
}

.custom-btn {
  height: 35px;          /* 버튼 높이 */
  min-width: 60px;       /* 버튼 최소 너비 */
  padding: 0 15px;       /* 버튼 좌우 패딩 */
  white-space: nowrap;   /* 버튼 텍스트 줄바꿈 방지 */
  word-break: keep-all;  /* 한글 단어 분리 방지 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.username {
  font-size: 0.95rem;
  font-weight: 500;
}

.usernamed {
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px;                  /* username과 로그아웃 버튼 간격 */
  min-width: 250px;           /* 입력 필드와 동일한 최소 너비 */
  display: flex;          /* Flexbox로 설정 */
  align-items: center;    /* 수직 정렬 */
  min-width: 250px;       /* 입력 그룹 최소 너비 */
}

</style>
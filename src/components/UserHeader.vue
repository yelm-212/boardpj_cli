<template>
  <div class="d-flex align-items-center">
    <!-- 사용자가 설정되지 않았을 때 -->
    <div v-if="!isLoggedIn" class="user-input-group d-flex align-items-center">
      <input
          v-model="usernameInput"
          type="text"
          class="form-control form-control-sm custom-input"
          placeholder="사용자 이름 입력"
          @keyup.enter="handleSetUsername"
      >
      <button class="btn btn-sm btn-light custom-btn ms-2" @click="handleSetUsername">
        확인
      </button>
    </div>

    <!-- 사용자가 설정되었을 때 -->
    <div v-else class="text-light d-flex align-items-center">
      <span class="username me-3">{{ username }}</span>
      <button class="btn btn-sm btn-outline-light custom-btn" @click="handleClearUsername">
        로그아웃
      </button>
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
  min-width: 250px;  /* 입력 그룹 최소 너비 설정 */
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
</style>
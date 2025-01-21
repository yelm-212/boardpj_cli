<template>
  <el-header class="header">
    <router-link
        to="/"
    >
      <div class="to_home">
        <h5>게시판</h5>
      </div>
    </router-link>
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
  </el-header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// 상태 변수
const usernameInput = ref('')

// 계산된 속성
const username = computed(() => store.getters.getUsername)
const isLoggedIn = computed(() => store.getters.isLoggedIn)

// 메소드
const handleSetUsername = () => {
  if (usernameInput.value.trim()) {
    store.dispatch('setUsername', usernameInput.value.trim())
    usernameInput.value = ''
  }
}

const handleClearUsername = () => {
  store.dispatch('clearUsername')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #000; /* 검정 배경색 */
  color: #fff; /* 흰색 텍스트 */
  width: 100%;                    /* 전체 너비를 차지하도록 설정 */
}

.to_home {
  display: flex;          /* Flexbox로 설정 */
  flex-grow: 1;           /* 남은 공간을 차지 */
  justify-content: flex-end;  /* 오른쪽 정렬 */
  background-color: #000; /* 검정 배경색 */
  color: #fff; /* 흰색 텍스트 */
}

.to_home a {
  text-decoration: none; /* 밑줄 제거 */
}

.user-input-group {
  display: flex;          /* Flexbox로 설정 */
  align-items: center;    /* 수직 정렬 */
  gap: 10px;              /* username과 로그아웃 버튼 간격 */
  flex-grow: 1;           /* 남은 공간을 차지 */
  justify-content: flex-end;  /* 오른쪽 정렬 */
}

.custom-input {
  width: 180px;  /* 입력창 최소 너비 */
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
  display: flex;          /* Flexbox로 설정 */
  align-items: center;    /* 수직 정렬 */
  gap: 10px;              /* username과 로그아웃 버튼 간격 */
  flex-grow: 1;           /* 남은 공간을 차지 */
  justify-content: flex-end;  /* 오른쪽 정렬 */
}
</style>

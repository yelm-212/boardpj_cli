<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label>제목</label>
      <input
          v-model="form.title"
          type="text"
          class="form-control"
          required
      >
    </div>
    <div class="form-group">
      <label>내용</label>
      <textarea
          v-model="form.content"
          class="form-control"
          rows="5"
          required
      ></textarea>
    </div>
    <div class="form-group">
      <label>작성자</label>
      <input
          v-model="form.author"
          type="text"
          class="form-control"
          required
          :disabled="isEdit"
      >
    </div>
    <div class="mt-3">
      <button type="submit" class="btn btn-primary mr-2">{{ submitButtonText }}</button>
      <router-link to="/" class="btn btn-secondary">취소</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    initialData: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
        author: ''
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    submitButtonText: {
      type: String,
      default: '저장'
    }
  },

  emits: ['submit'],

  setup(props, { emit }) {
    const form = ref({...props.initialData})

    const onSubmit = () => {
      emit('submit', {...form.value})
    }

    return {
      form,
      onSubmit
    }
  }
}
</script>
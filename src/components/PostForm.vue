<template>
  <el-form @submit.prevent="onSubmit">
    <el-form-item>제목</el-form-item>
    <el-input
        v-model="form.title"
        type="text"
        required
    ></el-input>
    <el-form-item>내용</el-form-item>
    <el-input
        v-model="form.content"
        style="height: 300px"
        required
    ></el-input>
    <el-form-item>
      <el-button type="submit">{{ submitButtonText }}</el-button>
      <router-link to="/">취소</router-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { defineEmits, defineProps, reactive } from 'vue'

const props = defineProps({
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
})

const emit = defineEmits(['submit'])

const form = reactive({ ...props.initialData })

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>
// components/PostEditor.vue
<template>
  <div class="post-editor">
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="제목">
        <el-input v-model="form.title" required />
      </el-form-item>

      <el-form-item label="내용">
        <div class="editor-container">
          <div class="editor-toolbar">
            <el-button
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
            >
              굵게
            </el-button>
            <el-button
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
            >
              기울임
            </el-button>
            <el-button
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >
              제목
            </el-button>
            <el-button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
            >
              목록
            </el-button>
            <el-button
                @click="setLink"
                :class="{ 'is-active': editor.isActive('link') }"
            >
              링크
            </el-button>
          </div>
          <editor-content :editor="editor" class="editor-content" />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">{{ submitButtonText }}</el-button>
        <el-button @click="handleCancel">취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      content: ''
    })
  },
  submitButtonText: {
    type: String,
    default: '저장'
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  title: props.initialData.title,
  content: props.initialData.content
})

const editor = useEditor({
  content: props.initialData.content,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-500 underline',
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    form.value.content = editor.getHTML()
  },
})

const setLink = () => {
  const url = window.prompt('URL을 입력하세요:')
  if (url) {
    editor.value.chain().focus().setLink({ href: url }).run()
  }
}

const handleSubmit = () => {
  emit('submit', {
    title: form.value.title,
    content: form.value.content
  })
}

const handleCancel = () => {
  emit('cancel')
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.editor-toolbar {
  padding: 0.5rem;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  gap: 0.5rem;
}

.editor-content {
  padding: 1rem;
  min-height: 300px;
}

.editor-content :deep(p) {
  margin: 0.5em 0;
}

.is-active {
  background-color: #ecf5ff;
  color: #409eff;
}
</style>
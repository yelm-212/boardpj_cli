<template>
  <ckeditor
      v-if="editor"
      v-model="internalData"
      :editor="editor"
      :config="config"
  />
</template>

<script setup>
import {ref, computed, watch, defineProps, defineEmits} from 'vue';
import {Ckeditor, useCKEditorCloud} from '@ckeditor/ckeditor5-vue';

// Define props and emits
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);

// CKEditor initialization
const cloud = useCKEditorCloud({
  version: '44.1.0',
  translations: [ 'ko' ],
});

const editor = computed(() => {
  if (!cloud.data.value) {
    return null;
  }
  return cloud.data.value.CKEditor.ClassicEditor;
});

const config = computed(() => {
  if (!cloud.data.value) {
    return null;
  }

  const {
    Essentials, Paragraph, Heading, Font, FontSize, FontFamily, FontColor, FontBackgroundColor,
    Bold, Italic, Code, Underline,
    CodeBlock, Subscript, Superscript, TodoList
  } = cloud.data.value.CKEditor;

  return {
    licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjkwMzk5OTksImp0aSI6ImYxOGU4ZmZiLWU5MDUtNDEwYi04ZTkxLWQ5ODgzOGNlYTAwNSIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiZjQzNzU4YjgifQ.DQ3scm_f7igKIHSpg3dEY_FV5eMunuxwrC5rYIzUAlDYAFRd9yFv5NAuSuOr3KP_hXiqGQmqyfsku8UdfYRtbg',
    plugins: [
      Essentials, Paragraph, Heading,
      Font, FontSize, FontFamily, FontColor, FontBackgroundColor,
      Bold, Italic, Code, Underline, CodeBlock, Subscript, Superscript,
      TodoList],
    toolbar: [
        'undo', 'redo', '|',
      'heading',
      '|',
      'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
      '|',
        'bold', 'italic', 'code', 'underline', 'subscript', 'superscript', '|',
        'codeblock', 'todoList'
    ],
    language: {
      ui: 'ko'
    }
  };
});

// Internal data for the CKEditor
const internalData = ref(props.modelValue);

// Watch for changes in props and emit updates
watch(
    () => props.modelValue,
    (newValue) => {
      internalData.value = newValue;
    }
);

watch(internalData, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>


<style>
.ck.ck-editor {
  width: 100%;
  margin: 5% auto;
}

.ck-editor__editable {
  min-height: 200px !important;
  max-height: 400px !important;
}
</style>


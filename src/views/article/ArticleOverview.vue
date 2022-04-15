<template>
  <n-card class="font-mono m-auto rounded-md">
    <Markdown :source="source" :linkify="true"></Markdown>
  </n-card>
  <upload-button style="width: 20%; margin-top: 10px" :show-file-list="false" ref="upload" @change="clickUpload">
    上传Markdown
  </upload-button>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Markdown from 'vue3-markdown-it';
import type UploadButton from '@/components/common/UploadButton.vue';

const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const source = ref('');

const clickUpload = () => {
  const file = upload.value?.file as File;
  console.log(file.name);
  file.text().then((res) => {
    source.value = res;
  });
  upload.value?.clearFile();
};
</script>

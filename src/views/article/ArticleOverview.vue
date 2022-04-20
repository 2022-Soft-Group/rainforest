<template>
  <n-card class="flex m-auto rounded-md w-200">
    <n-h1 class="font-bold">设计模式</n-h1>
    <router-link :to="'/user/' + userInfo.id">
      <n-thing>
        <template #avatar>
          <n-avatar round :src="AvatarImg"></n-avatar>
        </template>
        <template #header>{{ userInfo.name }}</template>
        <template #description> {{ userInfo.description }} </template>
      </n-thing>
    </router-link>
    <n-divider />
    <Markdown :source="source" :linkify="true" class="markdown"></Markdown>
  </n-card>
  <upload-button style="width: 20%; margin-top: 10px" :show-file-list="false" ref="upload" @change="clickUpload">
    上传Markdown
  </upload-button>
</template>
<script setup lang="ts">
import AvatarImg from '@/assets/avatar.png';
import { ref, onMounted, h } from 'vue';
import Markdown from 'vue3-markdown-it';
import type UploadButton from '@/components/common/UploadButton.vue';

const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const markdown = ref<InstanceType<typeof Markdown> | null>(null);
const source = ref('');

const userInfo = ref<UserInfo>({
  name: 'Kurino',
  id: 0,
  description: '来自北航软工，怎么也学不会图形学',
  avatar: '',
});

const clickUpload = () => {
  const file = upload.value?.file as File;
  console.log(file.name);
  file.text().then((res) => {
    source.value = res;
  });
  upload.value?.clearFile();
};
</script>
<style scoped>
.markdown {
  font-family: Arial, Helvetica, sans-serif;
}
.markdown :deep(h1):first-of-type {
  display: none;
}
.markdown :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 40px;
}
.markdown :deep(p) {
  font-size: medium;
}
.markdown :deep(code) {
  border-radius: 8px;
  max-height: 800px;
}
.markdown :deep(nav) {
  font-weight: bold;
}
.markdown :deep(img) {
  border-radius: 8px;
}

@media only screen and (min-width: 1400px) {
  .markdown :deep(nav) {
    position: fixed;
    top: 60px;
    left: 10px;
  }
  .markdown :deep(nav) ol {
    max-width: 300px;
  }
}
</style>

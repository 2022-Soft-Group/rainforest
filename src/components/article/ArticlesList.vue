<template>
  <n-card :bordered="false" class="flex-auto m-4 rounded-10px shadow-sm">
    <n-tabs type="line" size="large" class="mb-6">
      <n-tab name="推荐">推荐</n-tab>
      <n-tab name="关注">关注</n-tab>
    </n-tabs>
    <div v-for="(item, index) in articles">
      <n-divider v-if="index != 0"></n-divider>
      <articles-list-item :is-loading="isLoading" :article-info="item" />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// const props = defineProps<{ articles: Array<ArticlesListItem> }>();
const isLoading = ref(false);
const articles: Array<ArticlesListItem> = [
  {
    title: '文章标题1',
    author: '作者1',
    description: '文章描述',
    like: 10,
    collection: 20,
    comments: 7,
  },
  {
    title: '文章标题2',
    author: '作者1',
    description: '文章描述',
    like: 10,
    collection: 20,
    comments: 7,
  },
  {
    title: '文章标题3',
    author: '作者1',
    description: '文章描述',
    like: 10,
    collection: 20,
    comments: 7,
  },
];
</script>

<style scoped></style>

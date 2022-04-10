<template>
  <n-card :bordered="false" class="flex-auto m-4 w-180 rounded-10px shadow-sm">
    <n-tabs type="line" size="large" class="mb-6">
      <n-tab name="推荐">推荐</n-tab>
      <n-tab name="关注">关注</n-tab>
    </n-tabs>
    <articles-list :articles="articles" :is-loading="isLoading" />
  </n-card>
</template>

<script setup lang="ts">
import { getArticleListRecommand } from '@/api/article';
import { ref, onMounted } from 'vue';

function reload() {
  isLoading.value = true;
  getArticleListRecommand().then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfo as Array<ArticlesListItem>;
      isLoading.value = false;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);
onMounted(reload);
</script>

<style scoped></style>

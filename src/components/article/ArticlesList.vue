<template>
  <n-card :bordered="false" class="flex-auto m-4 w-180 rounded-10px shadow-sm">
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
import { getArticleListRecommand } from '@/api/article';
import { ref, onMounted } from 'vue';

// const props = defineProps<{ articles: Array<ArticlesListItem> }>();
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);

function reload() {
  getArticleListRecommand().then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfo as Array<ArticlesListItem>;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}

onMounted(reload);
</script>

<style scoped></style>

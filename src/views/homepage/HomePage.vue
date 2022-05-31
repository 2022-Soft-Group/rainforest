<template>
  <div class="flex flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab name="推荐">推荐</n-tab>
        <n-tab name="关注">关注</n-tab>
      </n-tabs>
      <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
    </n-card>
    <div class="flex-col basis-2/7">
      <n-card :bordered="false" class="my-4 rounded-md shadow-sm">
        <quick-guider />
      </n-card>
      <n-card :bordered="false" class="sticky top-16 my-4 rounded-md shadow-sm">
        <ranking-list />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleListRecommand } from '@/api/article';
import { useLoadingBar } from 'naive-ui';
import { ref, onMounted } from 'vue';
let currentPage = 0;
const loadingBar = useLoadingBar();

function handleRequest() {
  isLoading.value = true;
  loadingBar.start();
  getArticleListRecommand({ size: 10, page: ++currentPage }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}

function reload() {
  isLoading.value = true;
  loadingBar.start();
  getArticleListRecommand({ size: 10, page: currentPage }).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticlesListItem>;
      isLoading.value = false;
      loadingBar.finish();
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

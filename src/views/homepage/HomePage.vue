<template>
  <div class="flex flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab-pane name="recommend" tab="推荐">
          <keep-alive>
            <articles-list :articles="articles" :is-loading="isLoading" @request-articles="requestRecommand" />
          </keep-alive>
        </n-tab-pane>
        <n-tab-pane name="trend" tab="关注">
          <keep-alive>
            <articles-list :articles="trends" :is-loading="isLoading" @request-articles="requestTrend" />
          </keep-alive>
        </n-tab-pane>
      </n-tabs>
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
import { getTrends } from '@/api/message';
import { useLoadingBar } from 'naive-ui';
import { ref, onMounted } from 'vue';
let currentRecommandPage = 0;
let currentTrendPage = 0;
const loadingBar = useLoadingBar();

function requestRecommand() {
  isLoading.value = true;
  loadingBar.start();
  getArticleListRecommand({ size: 10, page: ++currentRecommandPage }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}

function requestTrend() {
  isLoading.value = true;
  loadingBar.start();
  getTrends({ size: 10, page: ++currentTrendPage, new: 0 }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articles.forEach((element: any) => {
        trends.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}

function reload() {
  isLoading.value = true;
  loadingBar.start();
  getArticleListRecommand({ size: 10, page: currentRecommandPage }).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticleItem>;
    }
  });
  getTrends({ size: 10, page: currentTrendPage, new: 0 }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articles.forEach((element: any) => {
        trends.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}
const isLoading = ref(false);
const articles = ref<Array<ArticleItem>>([]);
const trends = ref<Array<ArticleItem>>([]);
onMounted(reload);
</script>

<style scoped></style>

<template>
  <n-card class="flex m-auto rounded-md w-200">
    <n-thing>
      <template #avatar>
        <n-avatar object-fit="cover" :size="150" :src="columnInfo.img"> </n-avatar>
      </template>
      <template #header>
        <n-h1>{{ columnInfo.title }}</n-h1>
      </template>
      <template #description>
        <div class="text-gray-400">
          {{ columnInfo.description }}
        </div>
      </template>
    </n-thing>
  </n-card>
  <n-card class="flex m-auto mt-2 rounded-t-md w-200">
    <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
  </n-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getColumnArticleList, getColumnDetail } from '@/api/columns';
const route = useRoute();
let currentPage = 0;
const isLoading = ref(false);
const articles = ref<Array<ArticleItem>>([]);
const columnInfo = ref<ColumnListItem>({
  id: 0,
  img: '',
  title: '',
  description: '',
  followerNum: 0,
  ArticleNum: 0,
});
onMounted(reload);
function reload() {
  getColumnDetail(route.params.id as string).then((res) => {
    if (res.data.status == 0) {
      columnInfo.value = res.data.data.columnInfo as ColumnListItem;
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
  isLoading.value = true;
  getColumnArticleList({ size: 10, page: currentPage, id: columnInfo.value.id }).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticleItem>;
      isLoading.value = false;
    } else {
      window.$message.error('获取文章列表失败');
    }
  });
}
function handleRequest() {
  isLoading.value = true;
  getColumnArticleList({ size: 10, page: ++currentPage, id: columnInfo.value.id }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
    }
  });
}
</script>

<template>
  <n-card class="flex m-auto rounded-md w-200">
    <n-thing>
      <template #avatar>
        <n-avatar object-fit="cover" :size="150" :src="tagInfo.img"> </n-avatar>
      </template>
      <template #header>
        <n-h1>{{ tagInfo.title }}</n-h1>
      </template>
      <!-- <template #header-extra>
        <n-button circle size="small">
          <template #icon>
            <Accessibility />
          </template>
        </n-button>
      </template> -->

      <template #description>
        <div class="text-gray-400">
          {{ tagInfo.description }}
        </div>
      </template>
    </n-thing>
  </n-card>
  <n-card class="flex m-auto mt-2 rounded-t-md w-200">
    <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
  </n-card>
</template>
<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getTagArticleList, getTagDetail } from '@/api/sections';
import { Accessibility } from '@vicons/ionicons5';
const route = useRoute();
const isLoading = ref(false);
let currentPage = 0;
const articles = ref<Array<ArticleItem>>([]);
const tagInfo = ref<TagItem>({
  sectionName: '',
  title: '',
  img: '',
  description: '',
  id: 0,
});
onMounted(reload);
function reload() {
  getTagDetail(route.params.id as string).then((res) => {
    if (res.data.status == 0) {
      tagInfo.value = res.data.data.TagInfo as TagItem;
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
  isLoading.value = true;
  getTagArticleList({ size: 10, page: currentPage, id: tagInfo.value.id }).then((res) => {
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
  getTagArticleList({ size: 10, page: ++currentPage, id: tagInfo.value.id }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
    }
  });
}
</script>

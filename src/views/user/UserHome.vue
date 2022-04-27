<template>
  <n-card title="用户中心" size="large" id="userHeader" class="m-2 rounded-md shadow-sm">
    资料
    <n-avatar size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
  </n-card>

  <div class="flex flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-2 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab-pane name="我的关注">我的关注---fdsafdsfasdfdsa</n-tab-pane>
        <n-tab-pane name="我的粉丝">我的粉丝fdsaf</n-tab-pane>
        <n-tab-pane name="我的文章">
          <!-- <articles-list :articles="articles" :is-loading="isLoading" /> -->
        </n-tab-pane>
        <n-tab-pane name="我的收藏">我的afsd收藏</n-tab-pane>
        <n-tab-pane name="我的资源">我的sdfa资源</n-tab-pane>
      </n-tabs>
    </n-card>
    <div class="flex-col basis-2/7">
      <n-card :bordered="false" class="my-2 rounded-md shadow-sm"> 我的成就 </n-card>
      <n-card :bordered="false" class="sticky top-16 my-4 rounded-md shadow-sm">
        关注的作者 <br />
        关注的文章 <br />
        关注的专栏 <br />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { getArticleListRecommand } from '@/api/article';
// import { ref, onMounted } from 'vue';

// function reload() {
//   isLoading.value = true;
//   getArticleListRecommand().then((res) => {
//     if (res.data.status == 0) {
//       articles.value = res.data.data.articleInfos as Array<ArticlesListItem>;
//       isLoading.value = false;
//     } else {
//       window.$message.error('获取推荐列表失败');
//     }
//   });
// }
// const isLoading = ref(false);
// const articles = ref<Array<ArticlesListItem>>([]);
// onMounted(reload);
</script>

<style scoped>
#userHeader {
  margin-top: 15px;
}
</style>

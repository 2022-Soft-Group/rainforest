<template>
  <div class="flex flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6" :default-value="route.query.target">
        <n-tab-pane name="文章">
          <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
        </n-tab-pane>
        <n-tab-pane name="标签">
          <tag-list :tags="tags" vertical></tag-list>
        </n-tab-pane>
        <n-tab-pane name="专栏">
          <div class="flex flex-wrap">
            <div v-for="item in columns">
              <column-list-item :column-info="item"></column-list-item>
            </div>
          </div>
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
import { searchArticle, searchColumn, searchTag } from '../../api/search';
import { useLoadingBar } from 'naive-ui';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
let currentPage = 0;
const route = useRoute();
const loadingBar = useLoadingBar();

function handleRequest() {
  isLoading.value = true;
  loadingBar.start();
  searchArticle({ size: 10, page: ++currentPage, key: route.query.key as string }).then((res) => {
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
  console.log('loading' + route.query.target);
  if (route.query.target == '文章') {
    searchArticle({ size: 10, page: currentPage, key: route.query.key as string }).then((res) => {
      if (res.data.status == 0) {
        articles.value = res.data.data.articleInfos as Array<ArticlesListItem>;
        isLoading.value = false;
        loadingBar.finish();
      } else {
        window.$message.error('搜索文章失败');
      }
    });
  } else if (route.query.target == '标签') {
    searchTag({ size: 10, page: currentPage, key: route.query.key as string }).then((res) => {
      if (res.data.status == 0) {
        tags.value = res.data.data.tagInfos as Array<TagItem>;
        isLoading.value = false;
        loadingBar.finish();
      } else {
        window.$message.error('搜索标签失败');
      }
    });
  } else if (route.query.target == '专栏') {
    searchColumn({ size: 10, page: currentPage, key: route.query.key as string }).then((res) => {
      if (res.data.status == 0) {
        columns.value = res.data.data.columnInfos as Array<ColumnListItem>;
        isLoading.value = false;
        loadingBar.finish();
      } else {
        window.$message.error('搜索专栏失败');
      }
    });
  }
}
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);
const tags = ref<Array<TagItem>>([]);
const columns = ref<Array<ColumnListItem>>([]);
onMounted(reload);
</script>

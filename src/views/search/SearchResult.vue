<template>
  <div class="flex flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
      <n-tabs
        type="line"
        size="large"
        class="mb-6"
        :default-value="(route.query.target as string)"
        @update-value="handleUpdateValue"
      >
        <n-tab-pane name="文章" tab="文章">
          <articles-list :articles="articles" :is-loading="isLoading" @request-articles="reload" />
        </n-tab-pane>
        <n-tab-pane name="标签" tab="标签">
          <tag-list :tags="tags" vertical></tag-list>
        </n-tab-pane>
        <n-tab-pane name="专栏" tab="专栏">
          <div class="flex flex-wrap">
            <div v-for="item in columns" class="some">
              <column-list-item :column-info="item"></column-list-item>
            </div>
            <n-empty v-if="columns.length == 0" description="还没有专栏哦"></n-empty>
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
let currentPage = [0, 0, 0];
const route = useRoute();
const loadingBar = useLoadingBar();
const isLoading = ref(false);
const articles = ref<Array<ArticleItem>>([]);
const tags = ref<Array<TagItem>>([]);
const columns = ref<Array<ColumnListItem>>([]);
let loaded = [false, false, false];

const handleUpdateValue = (value: string) => {
  if (value == '文章' && !loaded[0]) {
    loadArtile();
  } else if (value == '标签' && !loaded[1]) {
    loadTag();
  } else if (value == '专栏' && !loaded[2]) {
    loadColumn();
  }
};

function reload() {
  isLoading.value = true;
  if (route.query.target == '文章') {
    loadArtile();
  } else if (route.query.target == '标签') {
    loadTag();
  } else if (route.query.target == '专栏') {
    loadColumn();
  }
}

function loadArtile() {
  loadingBar.start();
  searchArticle({ size: 10, page: currentPage[0]++, key: route.query.key as string }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
      loaded[0] = true;
    } else {
      window.$message.error('搜索文章失败');
    }
  });
}

function loadTag() {
  loadingBar.start();
  searchTag({ size: 10, page: currentPage[1]++, key: route.query.key as string }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.tagInfos.forEach((element: any) => {
        tags.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
      loaded[1] = true;
    } else {
      window.$message.error('搜索标签失败');
    }
  });
}

function loadColumn() {
  loadingBar.start();
  searchColumn({ size: 10, page: currentPage[2]++, key: route.query.key as string }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.columnInfos.forEach((element: any) => {
        columns.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
      loaded[2] = true;
    } else {
      window.$message.error('搜索专栏失败');
    }
  });
}

onMounted(reload);
</script>
<style>
.some {
  margin: 5px;
}
</style>

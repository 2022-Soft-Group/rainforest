<template>
  <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
    <n-h1>草稿箱</n-h1>
    <n-divider />
    <drafts-list :drafts="drafts" :is-loading="isLoading" @request-drafts="handleRequest"> </drafts-list>
  </n-card>
</template>

<script setup lang="ts">
import { getDraftList } from '@/api/article';
import { useLoadingBar } from 'naive-ui';
import { onMounted, ref } from 'vue';
const isLoading = ref(false);
const loadingBar = useLoadingBar();
const drafts = ref<Array<DraftItem>>([]);
let currentPage = 0;

onMounted(() => {
  isLoading.value = true;
  loadingBar.start();
  getDraftList({ size: 10, page: 0 }).then((res) => {
    if (res.data.status == 0) {
      drafts.value = res.data.data.draftInfos;
      isLoading.value = false;
      loadingBar.finish();
    }
  });
});

function handleRequest() {
  isLoading.value = true;
  loadingBar.start();
  getDraftList({ size: 10, page: ++currentPage }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.draftInfos.forEach((element: any) => {
        drafts.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}
</script>

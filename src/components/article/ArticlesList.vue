<template>
  <div v-if="isLoading">
    <div v-for="index of 10" :key="index">
      <n-divider v-if="index != 1"></n-divider>
      <n-skeleton text :repeat="2" />
      <n-skeleton text style="width: 60%" />
    </div>
  </div>
  <div v-else>
    <n-empty v-if="articles.length == 0" description="还没有文章哦"></n-empty>
    <div v-for="(item, index) in articles">
      <n-divider v-if="index != 0"></n-divider>
      <articles-list-item :is-loading="isLoading" :article-info="item" @delete="emits('reload-articles')" />
    </div>
  </div>
  <n-divider />
  <n-button v-if="articles.length != 0" text @click="emits('request-articles')" class="flex m-auto">
    浏览更多
  </n-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ articles: Array<ArticleItem>; isLoading: boolean }>();
const emits = defineEmits(['request-articles', 'reload-articles']);
</script>

<style scoped>
:deep(.n-divider) {
  margin-top: 5px;
  margin-bottom: 7px;
}
</style>

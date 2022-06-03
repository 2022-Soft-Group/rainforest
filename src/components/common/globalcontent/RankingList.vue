<template>
  <n-list>
    <template #header>文章热榜</template>
    <n-list-item v-for="item in hotArticles"> </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const hotArticles = ref<Array<ArticlesListItem>>([]);
</script>

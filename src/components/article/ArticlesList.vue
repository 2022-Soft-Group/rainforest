<template>
  <div v-for="(item, index) in articles">
    <n-divider v-if="index != 0"></n-divider>
    <articles-list-item :is-loading="isLoading" :article-info="item" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ articles: Array<ArticlesListItem>; isLoading: boolean }>();
</script>

<style scoped></style>

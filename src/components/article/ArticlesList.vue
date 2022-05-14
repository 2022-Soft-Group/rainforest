<template>
  <div v-for="(item, index) in articles" ref="listContext">
    <n-divider v-if="index != 0"></n-divider>
    <articles-list-item :is-loading="isLoading" :article-info="item" />
  </div>
  <n-divider />
  <n-button text @click="emits('request-articles')" class="flex m-auto"> 浏览更多</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ articles: Array<ArticlesListItem>; isLoading: boolean }>();
const emits = defineEmits(['request-articles']);
</script>

<style scoped></style>

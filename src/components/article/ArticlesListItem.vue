<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <div v-else>
    <n-thing :title="articleInfo.title"> </n-thing>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isLoading: boolean; articleInfo: ArticlesListItem }>();
</script>

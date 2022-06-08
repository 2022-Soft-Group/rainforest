<template>
  <div v-for="resource in resouces">
    <resouce-list-item :isLoading="isLoading" :resource-info="resource"></resouce-list-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// const props = defineProps<{}>
const isLoading = ref(false);
const resouces = ref<Array<ResourceItem>>([
  {
    fileName: 'another',
    fileSize: 10,
    downloadTimes: 19,
    downloadUrl: '',
    description: 'hello',
    cost: 1,
    createTime: '2019-1-9',
  },
]);
</script>

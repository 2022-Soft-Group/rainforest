<template>
  <div v-if="isLoading">
    <div v-for="index of 10" :key="index">
      <n-divider v-if="index != 1"></n-divider>
      <n-skeleton text :repeat="2" />
      <n-skeleton text style="width: 60%" />
    </div>
  </div>
  <div v-else>
    <n-empty v-if="resoucesInfo.length == 0" description="还没有文章哦"></n-empty>
    <div v-for="(resource, index) in resoucesInfo">
      <n-divider v-if="index != 0"></n-divider>
      <resouce-list-item :isLoading="isLoading" :resource-info="resource"></resouce-list-item>
    </div>
  </div>
  <n-divider />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ resoucesInfo: Array<ResourceItem>; isLoading: boolean }>();
const isLoading = ref(false);
</script>

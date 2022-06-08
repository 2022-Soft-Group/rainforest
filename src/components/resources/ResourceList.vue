<template>
  <resource-upload-button ref="upload" />
  <div v-if="isLoading">
    <div v-for="index of 10" :key="index">
      <n-divider v-if="index != 1"></n-divider>
      <n-skeleton text :repeat="2" />
      <n-skeleton text style="width: 60%" />
    </div>
  </div>
  <div v-else>
    <!-- <n-empty v-if="resoucesInfo.length == 0" description="还没有资源哦"></n-empty> -->
    <div v-for="(resource, index) in resoucesInfo">
      <n-divider v-if="index != 0"></n-divider>
      <resource-list-item :isLoading="isLoading" :resource-info="resource"></resource-list-item>
    </div>
  </div>
  <n-divider />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ resoucesInfo: Array<ResourceItem>; isLoading: boolean }>();
</script>

<style scoped>
:deep(.n-divider) {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>

<template>
  <resource-upload-button ref="upload" @finish-upload="addNewResource" />
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
import { getUserResourceList } from '@/api/asset';
import { watch, ref } from 'vue';
import type ResourceUploadButton from './ResourceUploadButton.vue';

const props = defineProps<{ userId: string }>();
const upload = ref<InstanceType<typeof ResourceUploadButton> | null>(null);
const resoucesInfo = ref<Array<ResourceItem>>([]);
const isLoading = ref(false);
let currentPage = 0;
function addNewResource() {
  resoucesInfo.value.unshift(upload.value?.resource as ResourceItem);
}

watch(
  () => props.userId,
  () => {
    getUserResourceList(props.userId, { page: currentPage, size: 10 }).then((res) => {
      isLoading.value = true;
      if (res.data.status == 0) {
        resoucesInfo.value = res.data.data.resources;
        isLoading.value = false;
      } else {
        window.$message.error('获取我的资源列表失败');
      }
    });
  },
  { immediate: true }
);
</script>

<style scoped>
:deep(.n-divider) {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>

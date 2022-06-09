<template>
  <glossy-card class="flex flex-col m-auto mt-80 h-full">
    <n-h1> 资源下载 </n-h1>
    <n-card class="w-full">
      <resource-list-item :is-loading="false" :resource-info="resourceInfo"></resource-list-item>
    </n-card>
  </glossy-card>
</template>

<script setup lang="ts">
import { getResourceInfo } from '@/api/asset';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const assetID = ref(0);
const resourceInfo = ref<ResourceItem>({
  assetID: 0,
  ownerID: 0,
  fileName: '',
  fileSize: 0,
  createTime: '',
  description: '',
  cost: 0,
  downloadTimes: 0,
});
onMounted(() => {
  assetID.value = parseInt(route.params.id as string);
  getResourceInfo(assetID.value).then((res) => {
    if (res.data.status == 0) {
      resourceInfo.value = res.data.data.resource;
    }
  });
});
</script>

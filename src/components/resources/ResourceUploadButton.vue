<template>
  <upload-button :show-file-list="false" ref="upload">
    <n-button @click="clickUploadResource"> 上传资源 </n-button>
  </upload-button>
  <n-divider></n-divider>
</template>

<script setup lang="ts">
import { uploadResource } from '@/api/asset';
import { ref } from 'vue';
import UploadButton from '../common/UploadButton.vue';
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const description = ref('');
const clickUploadResource = () => {
  const file = upload.value?.file as File;
  uploadResource(file, description.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('资源上传成功');
    } else {
      window.$message.error('资源上传失败');
    }
  });
  upload.value?.clearFile();
};
</script>
<style scoped>
:deep(.n-divider) {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>

<template>
  <n-button @click="showModal = true"> 上传资源 </n-button>
  <n-divider></n-divider>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    :style="{ width: '400px' }"
    title="上传资源"
    size="huge"
    :bordered="true"
    positive-text="上传文件"
    negative-text="取消"
    preset="dialog"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <n-space vertical>
      <upload-button :show-file-list="false" ref="upload" @change="clickUploadResource">
        <n-button class="w-full"> 选择文件</n-button>
      </upload-button>
      <n-input v-model:value="name" placeholder="文件名称"></n-input>
      <n-input v-model:value="description" placeholder="资源简介"></n-input>
      <div class="flex">
        <div class="basis-2/5">设定下载积分</div>
        <n-slider class="basis-3/5" v-model:value="cost" :step="1" :max="10" :min="0" />
      </div>
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { uploadResource } from '@/api/asset';
import { ref } from 'vue';
import UploadButton from '../common/UploadButton.vue';
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const description = ref('');
const name = ref('');
const cost = ref(0);
const resource = ref<ResourceItem>({
  assetID: 0,
  ownerID: 0,
  fileName: '',
  fileSize: 0,
  downloadTimes: 0,
  description: '',
  cost: 0,
  createTime: '',
});
const showModal = ref(false);
defineExpose({ resource });
const emits = defineEmits(['finish-upload']);
const clickUploadResource = () => {
  const file = upload.value?.file as File;
  name.value = file.name;
};

const handlePositiveClick = () => {
  const file = upload.value?.file as File;
  uploadResource(file, description.value, cost.value, name.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('资源上传成功');
      resource.value = res.data.data.resource;
      emits('finish-upload');
    } else {
      window.$message.error('资源上传失败');
    }
  });
  upload.value?.clearFile();
  showModal.value = false;
};
const handleNegativeClick = () => {
  showModal.value = false;
};
</script>
<style scoped>
:deep(.n-divider) {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>

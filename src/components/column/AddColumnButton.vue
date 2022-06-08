<template>
  <n-button strong type="primary" @click="showModal = true" class="main"> 申请开通专栏 </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    :style="bodyStyle"
    title="新建专栏"
    size="huge"
    :bordered="true"
    positive-text="新建专栏"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <n-card class="modalCard">
      <n-h1 class="text-center">新建专栏</n-h1>
      <n-space vertical size="large">
        <n-input v-model:value="title" type="text" placeholder="请输入专栏名称" class="mt-6" />
        <n-input
          type="textarea"
          placeholder="请输入一句话介绍"
          v-model:value="description"
          :autosize="{
            minRows: 3,
          }"
          class="mt-1"
        />
        <div v-if="description.length > 80" class="text-red-600">请输入少于80个字</div>
        <div>
          <upload-button
            class="w-138 h-48 border-2 border-dashed rounded-md"
            :show-file-list="false"
            ref="upload"
            @change="clickUploadImage"
          >
            <div v-if="imgSrc == ''" class="text-center mt-20 text-gray-400">
              <div>点击上传封面</div>
              <div>.jpeg/.png/.svg</div>
            </div>
            <n-image
              v-else
              preview-disabled
              width="240"
              object-fit="cover"
              class="h-48 flex-none rounded-md"
              :src="imgSrc"
            />
          </upload-button>
        </div>
      </n-space>
      <div class="flex-auto mt-10 justify-between">
        <n-button @click="onNegativeClick" class="w-67 mr-2">取消</n-button>
        <n-button type="primary" @click="onPositiveClick" class="w-67" v-if="description.length > 80" disabled
          >新建专栏</n-button
        >
        <n-button type="primary" @click="onPositiveClick" class="w-67" v-else>新建专栏</n-button>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type UploadButton from '@/components/common/UploadButton.vue';
import { uploadImage } from '@/api/asset';
import { addColumn } from '@/api/columns';

const showModal = ref(false);
const bodyStyle = { width: '600px' };

function onNegativeClick() {
  showModal.value = false;
}
//
const title = ref('');
const description = ref('');
const imgSrc = ref('');
let imageID = 0;
//
const column = ref<ColumnUpload>({
  cover: '',
  title: '',
  description: '',
  private: 0,
});
//
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    if (res.data.status == 0) {
      imgSrc.value = res.data.data.url;
      imageID = res.data.data.id;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};
function onPositiveClick() {
  if (title.value == '') {
    window.$message.warning('标题不能为空');
  }
  column.value.title = title.value;
  column.value.description = description.value;
  column.value.cover = imgSrc.value;
  showModal.value = false;
  addColumn(column.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('创建专栏成功');
    } else {
      window.$message.error('创建专栏失败');
    }
  });
}
</script>
<style scoped>
.main {
  text-align: center;
  margin-top: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modalCard {
  width: 100px;
  height: 600px;
  border-radius: 10px;
}
</style>

<template>
  <n-button type="primary" @click="showModal = true"> 新建标签 </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    :style="bodyStyle"
    title="新建标签"
    size="huge"
    :bordered="true"
    positive-text="新建标签"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <n-card class="modalCard">
      <n-h1 class="text-center">新建标签</n-h1>
      <n-space vertical size="large">
        <n-input v-model:value="newTagTitle" type="text" placeholder="请输入标签名称" class="mt-4" />
        <div class="flex mt-4">
          <n-h3 class="w-30 mt-1">标签所属板块:</n-h3>
          <n-select v-model:value="newTagValue" :options="newTagOptions" />
        </div>
        <n-input
          type="textarea"
          placeholder="请输入一句话介绍"
          v-model:value="newTagDescription"
          :autosize="{
            minRows: 3,
          }"
          class="mt-4"
        />
        <div>
          <upload-button
            class="w-138 h-40 border-2 border-dashed rounded-md"
            :show-file-list="false"
            ref="upload"
            @change="clickUploadNewTagImage"
          >
            <div v-if="newTagImg == ''" class="text-center mt-20 text-gray-400">
              <div>点击上传封面</div>
              <div>.jpeg/.png/.svg</div>
            </div>
            <n-image v-else width="240" object-fit="cover" class="h-48 flex-none rounded-md" :src="newTagImg" />
          </upload-button>
        </div>
      </n-space>

      <div class="flex-auto mt-10 justify-between">
        <n-button @click="onNegativeClick" class="w-67 mr-2">取消</n-button>
        <n-button type="primary" @click="onPositiveClick" class="w-67">新建标签</n-button>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { addTag, getSections, getTags } from '@/api/sections';
import { onMounted, ref } from 'vue';
import type UploadButton from '@/components/common/UploadButton.vue';
import { uploadImage } from '@/api/asset';
const showModal = ref(false);
const bodyStyle = { width: '600px' };
const newTagTitle = ref('');
const newTagDescription = ref('');
const newTagOptions: { label: string; value: string }[] = []; //模态框里里面的n-select数组
const newTagValue = ref('');
const newTagImg = ref('');
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
let newTagImgID;
const tag = ref<TagItem>({
  img: '',
  title: '',
  description: '',
  sectionName: '',
  id: 0,
});
function onNegativeClick() {
  showModal.value = false;
}
function onPositiveClick() {
  if (newTagTitle.value == '') {
    window.$message.warning('标题不能为空');
  }
  tag.value.title = newTagTitle.value;
  tag.value.description = newTagDescription.value;

  tag.value.img = newTagImg.value;
  if (tag.value.img == '')
    tag.value.img = 'https://avatar-static.segmentfault.com/401/950/4019500210-5640baf5641ed_huge100';
  tag.value.sectionName = newTagValue.value;
  showModal.value = false;
  addTag(tag.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('创建标签成功');
    } else {
      window.$message.error('创建标签失败');
    }
  });
}
const clickUploadNewTagImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    if (res.data.status == 0) {
      newTagImg.value = res.data.data.url;
      newTagImgID = res.data.data.id;
    } else {
      window.$message.error('图片发布失败');
    }
  });
  upload.value?.clearFile();
};
onMounted(() => {
  reload();
});
function reload() {
  getSections().then((res) => {
    if (res.data.status == 0) {
      res.data.data.sections.forEach((elm: string) => {
        newTagOptions.push({
          label: elm,
          value: elm,
        });
      });
    } else {
      window.$message.error('获取Section失败');
    }
  });
}
</script>
<style></style>

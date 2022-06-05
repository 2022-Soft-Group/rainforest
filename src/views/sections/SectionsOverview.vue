<template>
  <div class="flex">
    <n-menu :options="sectionInfo" class="Menu" @update:value="handleUpdateValue" />
    <div>
      <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
        <router-view></router-view>
      </n-card>

      <n-space class="mx-2">
        <n-button type="primary" @click="showModal = true" class="ml-30"> 新建标签 </n-button>
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
              <n-input v-model:value="title" type="text" placeholder="请输入标签名称" class="mt-6" />
              <n-select v-model:value="value" :options="options" class="mt-6" />
              <n-input
                type="textarea"
                placeholder="请输入一句话介绍"
                v-model:value="description"
                :autosize="{
                  minRows: 3,
                }"
                class="mt-6"
              />
              <div>
                <upload-button
                  class="w-138 h-40 border-2 border-dashed rounded-md"
                  :show-file-list="false"
                  ref="upload"
                  @change="clickUploadImage"
                >
                  <div v-if="imgSrc == ''" class="text-center mt-20 text-gray-400">
                    <div>点击上传封面</div>
                    <div>.jpeg/.png/.svg</div>
                  </div>
                  <n-image v-else width="240" object-fit="cover" class="h-48 flex-none rounded-md" :src="imgSrc" />
                </upload-button>
              </div>
            </n-space>

            <div class="flex-auto mt-10 justify-between">
              <n-button @click="onNegativeClick" class="w-67 mr-2">取消</n-button>
              <n-button type="primary" @click="onPositiveClick" class="w-67">新建标签</n-button>
            </div>
          </n-card>
        </n-modal>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { computed, h, onMounted, ref } from 'vue';
import { NIcon } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import type { Component } from 'vue';
import { RouterView } from 'vue-router';
import { BookOutline as BookIcon } from '@vicons/ionicons5';
import { addTag, getSections } from '@/api/sections';
import { useRouter, useRoute } from 'vue-router';
import { addColumn } from '@/api/columns';
import type UploadButton from '@/components/common/UploadButton.vue';
import { uploadImage } from '@/api/asset';
const tags = ref<Array<TagItem>>([]);
const router = useRouter();
const sectionInfo = ref<Array<SectionInfo>>([]);
const options: { label: string; value: string }[] = []; //模态框里里面的n-select数组
function handleUpdateValue(key: string, item: MenuOption) {
  router.push({ path: `/sections/${key}` });
}
const handleCreateTag = () => {
  router.push({ name: 'write' });
};

onMounted(() => {
  reload();
});
function reload() {
  getSections().then((res) => {
    if (res.data.status == 0) {
      sectionInfo.value.length = 0;
      res.data.data.sections.forEach((elm: string) => {
        sectionInfo.value.push({
          label: elm,
          key: elm,
          icon: renderIcon(BookIcon),
        });
      });
      res.data.data.sections.forEach((elm: string) => {
        options.push({
          label: elm,
          value: elm,
        });
      });
      let key = sectionInfo.value[0].key;
      router.push({ path: `/sections/${key}` });
    } else {
      window.$message.error('获取Section失败');
    }
  });
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

let tagsArray = ref<Array<TagItem>>([]);
tagsArray = tags;

const bodyStyle = { width: '600px' };
const showModal = ref(false);
function onNegativeClick() {
  showModal.value = false;
}
const title = ref('');
const description = ref('');
const imgSrc = ref('');
const value = ref('');

const tag = ref<TagItem>({
  img: '',
  title: '',
  description: '',
  sectionName: '',
});
function onPositiveClick() {
  if (title.value == '') {
    window.$message.warning('标题不能为空');
  }
  tag.value.title = title.value;
  tag.value.description = description.value;

  tag.value.img = imgSrc.value;
  if (tag.value.img == '')
    tag.value.img = 'https://avatar-static.segmentfault.com/401/950/4019500210-5640baf5641ed_huge100';
  tag.value.sectionName = value.value;
  showModal.value = false;
  addTag(tag.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('创建标签成功');
    } else {
      window.$message.error('创建标签失败');
    }
  });
}
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
let imageID = 0;
const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    console.log(res);
    if (res.data.status == 0) {
      imgSrc.value = res.data.data.url;
      imageID = res.data.data.id;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};
</script>
<style>
.Menu {
  position: relative;
  left: -50px;
  width: 220px;
  margin-top: 20px;
}
.modalCard {
  width: 100px;
  height: 600px;
  border-radius: 10px;
}
.main {
  text-align: center;
  margin-top: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

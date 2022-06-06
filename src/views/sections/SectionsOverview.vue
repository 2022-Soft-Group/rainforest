<template>
  <div class="flex">
    <n-menu :options="sectionInfo" class="Menu" @update:value="handleUpdateValue" />

    <div>
      <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
        <router-view></router-view>
      </n-card>
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
  id: 0,
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
  height: 100%;
  margin-top: 17px;
  border-radius: 6px;
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

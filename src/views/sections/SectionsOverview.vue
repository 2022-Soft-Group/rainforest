<template>
  <div class="flex">
    <n-menu :options="sectionInfo" class="Menu" @update:value="handleUpdateValue" />
    <div>
      <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
        <router-view></router-view>
      </n-card>
      <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
        <n-space class="mx-2">
          <n-button type="primary"> 新建板块 </n-button>
          <n-button type="primary" @click="handleCreateTag"> 新建标签 </n-button>
        </n-space>
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
import { getSections } from '@/api/sections';
import { useRouter, useRoute } from 'vue-router';
const tags = ref<Array<TagItem>>([]);
const router = useRouter();
const sectionInfo = ref<Array<SectionInfo>>([]);
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
</script>
<style>
.Menu {
  position: relative;
  left: -50px;
  width: 220px;
}
</style>

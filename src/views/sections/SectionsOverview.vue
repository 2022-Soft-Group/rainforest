<template>
  <div class="flex">
    <n-menu :options="sectionInfo" class="Menu" @update:value="handleUpdateValue" />

    <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
      <router-view></router-view>
    </n-card>
    <!-- <router-view v-slot="{ Component }"> -->
    <!-- <component :is="currentView"></component> -->
  </div>
</template>

<script setup lang="tsx">
import { computed, h, onMounted, ref } from 'vue';
import { NIcon } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import type { Component } from 'vue';
import { RouterLink } from 'vue-router';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  Accessibility as AccessIcon,
} from '@vicons/ionicons5';
import { getSections } from '@/api/sections';
import { useRouter, useRoute } from 'vue-router';
const tags = ref<Array<TagItem>>([]);
const router = useRouter();
const route = useRoute();
const sectionInfo = ref<Array<SectionInfo>>([]);
const selectedSectionName = ref<string>('');
function handleUpdateValue(key: string, item: MenuOption) {
  // selectedSectionName.value = key;
  //window.$message.info(selectedSectionName.value);
  router.push({ path: `/sections/${key}` });
}

onMounted(reload);
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
    } else {
      window.$message.error('获取Section失败');
    }
  });
  // getTags({ size: 10, page: 0 }, selectedSectionName.value as string).then((res) => {
  //   if (res.data.status == 0) {
  //     tags.value = res.data.data.tags as Array<TagItem>;
  //   } else {
  //     window.$message.error('获取二级列表失败');
  //   }
  // });
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

let tagsArray = ref<Array<TagItem>>([]);
tagsArray = tags;
let selectedTagsArray = ref<Array<TagItem>>([]);
</script>
<style>
.Menu {
  position: relative;
  left: -50px;
  width: 220px;
}
</style>

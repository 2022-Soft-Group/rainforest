<template>
  <div class="flex">
    <n-menu :options="sections" class="Menu" @update:value="handleSelect" />
    <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
      <tag-list v-if="!isSelect" :tags="tagsArray"></tag-list>
      <tag-list v-else :tags="selectedTagsArray"></tag-list>
    </n-card>
    <!-- <router-view v-slot="{ Component }"> -->
    <!-- <component :is="currentView"></component> -->
    <!-- </router-view> -->
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
import type { defineComponent } from 'vue';
import { CashOutline as CashIcon } from '@vicons/ionicons5';
import { getTags } from '@/api/sections';
import {} from '../../store/auth';
const tags = ref<Array<TagItem>>([]);
const sections = ref<Array<SectionInfo>>([]);
let isSelect = ref(false);

onMounted(reload);
function reload() {
  getSections().then((res) => {
    if (res.data.status == 0) {
      sections.value = res.data.data.sections as Array<SectionInfo>;
      sections.value.filter((element: SectionInfo) => {
        element.icon = renderIcon(BookIcon);
      });
    } else {
      window.$message.error('获取Section失败');
    }
  });
  getTags().then((res) => {
    if (res.data.status == 0) {
      tags.value = res.data.data.tags as Array<TagItem>;
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

let tagsArray = ref<Array<TagItem>>([]);
tagsArray = tags;
let selectedTagsArray = ref<Array<TagItem>>([]);

const handleSelect = (label: string) => {
  // selectedTagsArray.value.length = 0;
  // tagsArray.forEach((element) => {
  //   if (element.key == selectedKey) {
  //     selectedTagsArray.value.push(element);
  //   }
  // });
  isSelect.value = true;
  selectedTagsArray.value = tagsArray.value.filter((element: TagItem) => {
    if (element.sectionKey == label) {
      return true;
    } else return false;
  });
};
</script>
<style>
.Menu {
  position: relative;
  left: -50px;
  width: 220px;
}
</style>

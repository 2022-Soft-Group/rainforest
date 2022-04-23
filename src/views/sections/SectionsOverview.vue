<template>
  <div class="flex">
    <n-menu :options="menuOptions" class="Menu" />
    <n-card :bordered="false" class="m-4 rounded-md shadow-sm relative right-15">
      <tag-list :tags="tags"></tag-list>
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
// import{ num } from './1.vue';

//动态组件
// const arr: [] = [g1,]
// const  currentView = computed({
//   return ;
// });
// const changeView = () => {
//   re
// }
const tags = ref<Array<TagItem>>([]);

onMounted(reload);
function reload() {
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
const menuOptions: MenuOption[] = [
  {
    label: '前端',
    key: 'qd',
    icon: renderIcon(BookIcon),
  },
  {
    label: '后端',
    key: 'hd',
    icon: renderIcon(BookIcon),
  },
  {
    label: '小程序',
    key: 'xcx',
    icon: renderIcon(BookIcon),
  },
  {
    label: 'iOS',
    key: 'ios',
    icon: renderIcon(BookIcon),
  },
  {
    label: 'Android',
    key: 'an',
    icon: renderIcon(BookIcon),
  },
  {
    label: '工具',
    key: 'gj',
    icon: renderIcon(BookIcon),
  },
  {
    label: '程序员',
    key: 'cxy',
    icon: renderIcon(BookIcon),
  },
  {
    label: 'AI',
    key: 'ai',
    icon: renderIcon(BookIcon),
  },
  {
    label: '云计算',
    key: 'yjs',
    icon: renderIcon(BookIcon),
  },
  {
    label: '安全',
    key: 'aq',
    icon: renderIcon(BookIcon),
  },
];

// const menuOptions = ref<Array<SectionInfo>>([]);
// onMounted(() => {
//   getSections().then((res) => {
//     menuOptions.value = res.data.data.sections as Array<SectionInfo>;
//   });
// });
</script>
<style>
.Menu {
  position: relative;
  left: -50px;
  width: 220px;
}
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>

<template>
  <div class="flex">
    <div class="sticky top-16">
      <n-menu :options="menuOptions" class="Menu" />
    </div>
    <n-card :bordered="false" class="m-4 rounded-md shadow-sm">
      <n-grid :x-gap="12" :y-gap="8" :cols="3">
        <n-grid-item> </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
        <n-grid-item>
          <div class="light-green" />
        </n-grid-item>
        <n-grid-item>
          <div class="green" />
        </n-grid-item>
      </n-grid>
    </n-card>

    <!-- <articles-list /> -->
  </div>
</template>

<script setup lang="tsx">
import { h, onMounted, ref } from 'vue';
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

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const articles = ref<Array<ArticlesListItem>>([]);
onMounted(reload);
function reload() {
  isLoading.value = true;
  getArticleListRecommand().then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfo as Array<ArticlesListItem>;
      isLoading.value = false;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}

const avatar = ref(true);
const header = ref(true);
const headerExtra = ref(true);
const description = ref(true);
const footer = ref(true);
const action = ref(true);

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

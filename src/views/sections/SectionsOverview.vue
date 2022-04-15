<template>
  <div class="grid-cols-1">
    <n-menu :options="menuOptions" class="w-48 absolute left-40" />
    <articles-list />
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

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
// function handleUpdateValue(key: string, item: MenuOption) {
//   window.$message.info('[onUpdate:value]: ' + JSON.stringify(key));
//   window.$message.info('[onUpdate:value]: ' + JSON.stringify(item));
// }

// const menuOptions: MenuOption[] = [
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name: 'homepage',
//             params: {
//               lang: 'zh-CN',
//             },
//           },
//         },
//         { default: () => '回家' }
//       ),
//     key: 'go-back-home',
//     icon: renderIcon(AccessIcon),
//   },
//   {
//     key: 'divider-1',
//     type: 'divider',
//     props: {
//       style: {
//         marginLeft: '32px',
//       },
//     },
//   },
//   // {
//   //   label: () =>
//   //     h(
//   //       'a',
//   //       {
//   //         href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
//   //         target: '_blank',
//   //         rel: 'noopenner noreferrer',
//   //       },
//   //       '且听风吟'
//   //     ),
//   //   key: 'hear-the-wind-sing',
//   //   icon: renderIcon(BookIcon),
//   // },
//   {
//     label: '前端',
//     key: 'qd',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: '后端',
//     key: 'hd',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: '小程序',
//     key: 'xcx',
//     icon: renderIcon(BookIcon),
//     // children: [
//     //   {
//     //     type: 'group',
//     //     label: '人物',
//     //     key: 'people',
//     //     children: [
//     //       {
//     //         label: '叙事者',
//     //         key: 'narrator',
//     //         icon: renderIcon(PersonIcon),
//     //       },
//     //       {
//     //         label: '羊男',
//     //         key: 'sheep-man',
//     //         icon: renderIcon(PersonIcon),
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     label: '饮品',
//     //     key: 'beverage',
//     //     icon: renderIcon(WineIcon),
//     //     children: [
//     //       {
//     //         label: '威士忌',
//     //         key: 'whisky',
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     label: '食物',
//     //     key: 'food',
//     //     children: [
//     //       {
//     //         label: '三明治',
//     //         key: 'sandwich',
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     label: '过去增多，未来减少',
//     //     key: 'the-past-increases-the-future-recedes',
//     //   },
//     // ],
//   },
//   {
//     label: 'iOS',
//     key: 'ios',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: 'Android',
//     key: 'an',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: '工具',
//     key: 'gj',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: '程序员',
//     key: 'cxy',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: 'AI',
//     key: 'ai',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: '云计算',
//     key: 'yjs',
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: '安全',
//     key: 'aq',
//     icon: renderIcon(BookIcon),
//   },
// ];

const menuOptions = ref<Array<SectionInfo>>([]);
onMounted(() => {
  getSections().then((res) => {
    menuOptions.value = res.data.data.sections as Array<SectionInfo>;
  });
});
</script>

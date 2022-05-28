<template>
  <n-input-group>
    <n-dropdown
      trigger="click"
      :options="searchOptions"
      width="trigger"
      size="medium"
      :render-icon="renderDropdownIcon"
      :render-label="renderDropdownLabel"
      @select="handleSelectOption"
    >
      <n-input
        class="ml-4"
        round
        :placeholder="'请输入搜索的' + searchTarget"
        v-model:value="searchContent"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <template #suffix>
          <n-icon><search-icon /></n-icon>
        </template>
      </n-input>
    </n-dropdown>
    <n-button v-if="showButton" round type="primary" @click="handleSearch" @keydown.enter="handlekeyDownSearch">
      搜索{{ searchTarget }}
      <n-dropdown trigger="hover" :options="searchTargetOptions" @select="handleSelectSearchTarget">
        <n-icon class="ml-1"><down-icon /></n-icon>
      </n-dropdown>
    </n-button>
  </n-input-group>
</template>

<script setup lang="ts">
import { h, onMounted, ref, watchEffect } from 'vue';
import {
  Search as SearchIcon,
  CaretDownOutline as DownIcon,
  CloseOutline as CloseIcon,
  ThermometerOutline as HotIcon,
} from '@vicons/ionicons5';
import type { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface';
import { NButton, useLoadingBar, NIcon } from 'naive-ui';
import { deleteSearchHistory, getSearchHistoryAndHotWord } from '@/api/search';
import { useRouter, useRoute } from 'vue-router';

const loadingBar = useLoadingBar();
const showButton = ref(true);
const router = useRouter();
const route = useRoute();
const searchTarget = ref('文章');
const searchContent = ref('');
const isFocusing = ref(false);
const searchTargetOptions: Array<DropdownMixedOption> = [
  { label: '文章', key: 'article' },
  { label: '标签', key: 'tag' },
  { label: '专栏', key: 'column' },
];
const searchOptions = ref<Array<DropdownMixedOption>>([
  {
    key: 'hotword',
    type: 'render',
    render: () => {
      return h('div', { style: 'display: flex; align-items: center; padding: 4px 12px; color: gray' }, '搜索热词');
    },
  },
  {
    key: 'hotword-divider',
    type: 'divider',
  },
  {
    key: 'history',
    type: 'render',
    render: () => {
      return h('div', { style: 'display: flex; align-items: center; padding: 4px 12px; color: gray' }, '搜索历史');
    },
  },
  {
    key: 'history-divider',
    type: 'divider',
  },
]);
const searchHotwords = ref<Array<DropdownMixedOption>>([]);
const searchHistorys = ref<Array<DropdownMixedOption>>([]);
const handleFocus = () => {
  console.log(searchContent.value);
  if (searchContent.value != undefined && searchContent.value != '') return;
  showButton.value = false;
  isFocusing.value = true;
};

const handleBlur = () => {
  showButton.value = true;
  isFocusing.value = false;
};
const handleSelectOption = (key: number, option: DropdownMixedOption) => {
  let content = (option.label as string).split('_')[0];
  let routeUrl = router.resolve({ name: 'search', query: { key: content, target: searchTarget.value } });
  window.open(routeUrl.href, '_blank');
};
const handleSelectSearchTarget = (key: string, option: DropdownMixedOption) => {
  searchTarget.value = option.label as string;
};
const handleSearch = () => {
  if (searchContent.value == undefined) {
    window.$message.warning('搜索内容不能为空！');
    return;
  }
  let routeUrl = router.resolve({ name: 'search', query: { key: searchContent.value, target: searchTarget.value } });
  window.open(routeUrl.href, '_blank');
};

const handlekeyDownSearch = () => {
  console.log('enter');
  if (isFocusing.value) {
    handleSearch();
  }
};

function loadSearchInfos() {
  getSearchHistoryAndHotWord()
    .then((res) => {
      if (res.data.status == 0) {
        res.data.data.history.forEach((element: any) => {
          searchHistorys.value.push({ label: element.content, key: 'history_' + element.id + '_' + element.content });
        });
        res.data.data.hot.forEach((element: any, index: number) => {
          searchHotwords.value.push({
            label: element.content + '_' + element.hot,
            key: 'hot_' + index + '_' + element.content,
          });
        });
      } else {
        window.$message.error('无法获取历史与热词');
      }
    })
    .finally(() => {
      let hotwordIdx = 2;
      let historyIdx = 0;
      searchOptions.value.splice(hotwordIdx, 0, ...searchHotwords.value);
      searchOptions.value.forEach((elm, index) => {
        if (elm.key == 'history-divider') {
          historyIdx = index + 1;
        }
      });
      searchOptions.value.splice(historyIdx, 0, ...searchHistorys.value);
    });
}

function renderDropdownIcon(option: DropdownMixedOption) {
  let key = option.key as string;
  let optionSplit = key.split('_');
  if (optionSplit[0] == 'history') {
    return h(
      NButton,
      {
        onClick: (event: Event) => {
          event.stopPropagation();
          handleDeleteHistory(key, parseInt(optionSplit[1]));
        },
        text: true,
      },
      {
        default: () => h(NIcon, null, { default: () => h(CloseIcon) }),
      }
    );
  } else {
    let order = parseInt(key.split('_')[1]);
    let color;
    if (order == 0) {
      color = { color: 'red' };
    } else if (order == 1) {
      color = { color: 'orange' };
    } else if (order == 2) {
      color = { color: 'yellow' };
    } else {
      color = { color: 'gray' };
    }

    return h(NIcon, color, {
      default: () => h(HotIcon),
    });
  }
}

function renderDropdownLabel(option: DropdownMixedOption) {
  let key = option.key as string;
  let optionSplit = key.split('_');
  if (optionSplit[0] == 'history') {
    return h('div', null, option.label as string);
  } else {
    let label = option.label as string;
    return h('div', { style: 'display: flex; justify-content: space-between; ' }, [
      h('div', null, label.split('_')[0]),
      h('div', null, label.split('_')[1]),
    ]);
  }
}
const handleDeleteHistory = (key: string, id: number) => {
  deleteSearchHistory(id).then((res) => {
    if (res.data.status == 0) {
      let deleteIdx = 0;
      searchOptions.value.forEach((elm, index) => {
        if (elm.key == key) {
          deleteIdx = index;
        }
      });
      searchOptions.value.splice(deleteIdx, 1);
    }
  });
};
onMounted(() => {
  loadSearchInfos();
  if (route.query != undefined) {
    console.log(route);
    searchContent.value = route.query.key as string;
  }
});

watchEffect(() => {
  if (searchContent.value != '') {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
});
</script>

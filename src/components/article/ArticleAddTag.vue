<template>
  <n-space>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button text>
          <template #icon>
            <n-icon><alert-icon /></n-icon>
          </template>
          添加标签
        </n-button>
      </template>
      回车以添加,最多4个
    </n-tooltip>

    <n-dynamic-tags v-model:value="selectedValue" :max="4">
      <template #input="{ deactivate }">
        <n-select
          class="w-60"
          v-model:value="newTag"
          filterable
          placeholder="搜索标签"
          :options="options"
          :loading="isLoading"
          clearable
          remote
          @search="handleSearch"
          @blur="deactivate"
          @keydown.enter="handleFinishSearch"
        >
        </n-select>
      </template>
      <template #trigger="{ activate, disabled }">
        <n-button size="small" type="primary" dashed :disabled="disabled" @click="activate()">
          <template #icon>
            <n-icon>
              <add-icon />
            </n-icon>
          </template>
          添加
        </n-button>
      </template>
    </n-dynamic-tags>
  </n-space>
</template>
<script setup lang="ts">
import { searchTag } from '@/api/search';
import { Add as AddIcon } from '@vicons/ionicons5';
import { ref, watch } from 'vue';
import { AlertCircleOutline as AlertIcon } from '@vicons/ionicons5';
const props = defineProps<{ tags: Array<TagItem> }>();
const isLoading = ref(false);
const selectedValue = ref<Array<{ label: string; value: string }>>([]);
const newTag = ref('');
const selectedSet = new Set<string>();
const options = ref<Array<{ label: string; value: string }>>([]);
let tagIdMap = new Map<number, string>();
defineExpose({ selectedValue });

function handleSearch(key: string) {
  if (key != '' && key != null) {
    isLoading.value = true;
    searchTag({ size: 10, page: 0, key: key }).then((res) => {
      options.value.length = 0;
      res.data.data.tagInfos.forEach((ele: any) => {
        options.value.push({ label: ele.title, value: ele.id });
        console.log('加入map' + ele.title + ele.id.toString());
        tagIdMap.set(ele.id, ele.title);
      });
      isLoading.value = false;
    });
  }
}

function handleFinishSearch() {
  if (selectedSet.has(newTag.value)) {
    window.$message.warning('不可以添加重复的标签');
  } else {
    selectedSet.add(newTag.value);
    let option = tagIdMap.get(parseInt(newTag.value)) as string;
    selectedValue.value.push({ label: option, value: newTag.value });
  }
}

watch(
  () => props.tags,
  () => {
    props.tags.forEach((ele) => {
      let option = { label: ele.title, value: ele.id.toString() };
      selectedValue.value.push(option);
      tagIdMap.set(ele.id, option.label);
      selectedSet.add(ele.id.toString());
    });
  }
);
</script>

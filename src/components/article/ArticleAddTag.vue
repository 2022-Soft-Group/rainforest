<template>
  <n-space vertical>
    <n-space>
      <n-radio :checked="!isPubTag" @change="isPubTag = !isPubTag"> 不关联到标签 </n-radio>
      <n-radio :checked="isPubTag" @change="isPubTag = !isPubTag"> 关联到标签 </n-radio>
    </n-space>
    <n-select
      class="w-full"
      v-model:value="multipleSelectValue"
      :default-value="defaultValue"
      v-if="isPubTag && !isLoading"
      filterable
      multiple
      max-tag-count="responsive"
      tag
      remote
      :fallback-option="false"
      :options="options"
      clearable
      :consistent-menu-width="false"
      @blur="emits('tag-finish')"
    />
  </n-space>
</template>
<script setup lang="ts">
import { getSections, getTags } from '@/api/sections';
import type { SelectOption } from 'naive-ui';
import { onMounted, ref, watch } from 'vue';
const props = defineProps<{ tags: Array<TagItem> }>();
const isPubTag = ref(false);
const multipleSelectValue = ref<Array<Number>>([]);
const isLoading = ref(false);
const defaultValue = ref<Array<{ label: string; value: number }>>([]);
defineExpose({ multipleSelectValue });
const emits = defineEmits(['tag-finish']);
const options: { label: string; value: string; type: 'group'; children: Array<SelectOption> }[] = [];

function reload() {
  getSections().then((res) => {
    if (res.data.status == 0) {
      res.data.data.sections.forEach((elm: string) => {
        const optionsChildren: { label: string; value: number }[] = [];
        getTags({ sectionName: elm as string, size: 100, page: 0 }).then((res) => {
          if (res.data.status == 0) {
            res.data.data.tags.forEach((elen: TagItem) => {
              optionsChildren.push({
                label: elen.title,
                value: elen.id,
              });
            });
          } else {
            window.$message.error('获取二级列表失败');
          }
        });
        options.push({
          label: elm,
          value: elm,
          type: 'group',
          children: optionsChildren,
        });
      });
    } else {
      window.$message.error('获取Section失败');
    }
  });
}
onMounted(() => {
  isLoading.value = true;
  reload();
});

watch(
  () => props.tags,
  () => {
    if (props.tags.length != 0) {
      props.tags.forEach((ele) => {
        multipleSelectValue.value.push(ele.id);
      });
      isPubTag.value = true;
      isLoading.value = false;
    }
  }
);
</script>

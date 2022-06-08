<template>
  <n-select
    v-model:value="multipleSelectValue"
    v-if="isTag"
    filterable
    multiple
    tag
    :fallback-option="false"
    :options="options"
    clearable
    :consistent-menu-width="false"
    @blur="emits('tag-finish')"
  />
</template>
<script setup lang="ts">
import { getSections, getTags } from '@/api/sections';
import type { SelectOption } from 'naive-ui';
import { onMounted, ref } from 'vue';
const props = defineProps<{ isTag: boolean }>();

const multipleSelectValue = ref([]);
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
  reload();
});
</script>

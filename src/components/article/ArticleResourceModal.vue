<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    title="添加我的资源"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitCallback"
  >
    <n-select v-model:value="selectedResourceId" v-model:label="selectedResourceLabel" :options="options"> </n-select>
  </n-modal>
</template>

<script setup lang="ts">
import { getUserResourceList } from '@/api/asset';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps<{ show: boolean }>();
const options: { label: string; value: number }[] = [];
const selectedResourceId = ref();
const selectedResourceLabel = ref('');
let resourceNameMap = new Map<number, string>();
const emits = defineEmits(['finish-resource']);

const submitCallback = () => {
  if (selectedResourceId.value != null) {
    emits('finish-resource', getUrl());
  } else {
    window.$message.warning('还没有选择任何资源');
  }
};

function getUrl() {
  return (
    '::: info\n' +
    '[' +
    resourceNameMap.get(selectedResourceId.value) +
    ']' +
    '(http://kurino.top/resource/' +
    selectedResourceId.value +
    ')\n' +
    ':::\n'
  );
}

onMounted(() => {
  getUserResourceList(localStorage.getItem('userID') as string, { page: 0, size: 99 }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.resources.forEach((ele: any) => {
        options.push({
          label: ele.fileName,
          value: ele.assetID,
        });
        resourceNameMap.set(ele.assetID, ele.fileName);
      });
    }
  });
});
</script>

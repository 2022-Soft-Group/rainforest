<template>
  <tag-list :tags="tags" :vertical="false"></tag-list>
</template>

<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getTags } from '../../api/sections';

const route = useRoute();
const tags = ref<Array<TagItem>>([]);
watch(
  () => route.params,
  async (curVal, preVal) => {
    let sectionKey: string = route.params.sectionKey as string;
    if (sectionKey == undefined || sectionKey == '' || sectionKey == null) {
      sectionKey = '计算机';
    }
    console.log(sectionKey);
    getTags({ sectionName: sectionKey as string, size: 2, page: 0 }).then((res) => {
      if (res.data.status == 0) {
        tags.value = res.data.data.tags as Array<TagItem>;
        console.log('load');
      } else {
        window.$message.error('获取二级列表失败');
      }
    });
  }
);
onMounted(reload);
function reload() {
  getTags({ sectionName: route.params.sectionKey as string, size: 2, page: 0 }).then((res) => {
    if (res.data.status == 0) {
      tags.value = res.data.data.tags as Array<TagItem>;
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
}
</script>
<style>
.Menu {
  position: relative;
  left: -50px;
  width: 220px;
}
</style>

<template>
  <!-- {{ selectedSectionName }} -->
  <tag-list :tags="tags"></tag-list>
</template>

<script setup lang="tsx">
import { computed, h, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getTags } from '@/api/sections';
import {} from '../../store/auth';

const route = useRoute();
const tags = ref<Array<TagItem>>([]);
// const selectedSectionName = ref<string>(route.params.sectionKey as string);
watch(
  () => route.params,
  async (curVal, preVal) => {
    getTags({ sectionName: curVal.sectionKey as string, size: 2, page: 0 }).then((res) => {
      if (res.data.status == 0) {
        tags.value = res.data.data.tags as Array<TagItem>;
      } else {
        window.$message.error('获取二级列表失败a');
      }
    });
  }
);
onMounted(reload);
function reload() {
  getTags({ sectionName: 'C++', size: 2, page: 0 }).then((res) => {
    if (res.data.status == 0) {
      tags.value = res.data.data.tags as Array<TagItem>;
    } else {
      window.$message.error('获取二级列表失败b');
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

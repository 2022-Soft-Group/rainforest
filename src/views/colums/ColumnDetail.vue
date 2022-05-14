<template>
  <n-card class="flex m-auto rounded-md w-200">
    <n-thing>
      <template #avatar>
        <n-avatar object-fit="cover" :size="150" :src="columnInfo.imgSrc"> </n-avatar>
      </template>
      <template #header>
        <n-h1>{{ columnInfo.title }}</n-h1>
      </template>

      <template #description>
        <div class="text-gray-400">
          {{ columnInfo.description }}
        </div>
      </template>
    </n-thing>
  </n-card>
  <n-card class="flex m-auto mt-2 rounded-t-md w-200">
    <articles-list :articles="articles" :is-loading="isLoading" />
  </n-card>
</template>
<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { CashOutline as CashIcon } from '@vicons/ionicons5';
import { getSections, getTagArticleList, getTagDetail, getTags } from '@/api/sections';
import TagListVue from '@/components/tag/TagList.vue';
import { getColumnDetail } from '@/api/columns';
const route = useRoute();
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);
const columnInfo = ref<ColumnListItem>({
  id: 0,
  href: '',
  imgSrc: '',
  title: '',
  description: '',
  followerNum: 0,
  ArticleNum: 0,
});
onMounted(reload);
function reload() {
  getColumnDetail(route.params.id as string).then((res) => {
    if (res.data.status == 0) {
      columnInfo.value = res.data.data.columnInfo as ColumnListItem;
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
}
</script>

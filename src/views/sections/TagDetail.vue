<template>
  <n-card class="flex m-auto rounded-md w-200">
    <n-thing>
      <template #avatar>
        <n-avatar object-fit="cover" :size="150" :src="tagInfo.img"> </n-avatar>
      </template>
      <template #header>
        <n-h1>{{ tagInfo.title }}</n-h1>
      </template>

      <template #description>
        <div class="text-gray-400">
          {{ tagInfo.description }}
        </div>
      </template>
      <template #action>
        <n-space>
          <n-button v-if="isFollowed" size="large" type="primary" @click="handleClick"> 关注 </n-button>
          <n-button v-else size="large" type="primary" @click="handleClick"> 关注 </n-button>
        </n-space>
      </template>
    </n-thing>
    <articles-list :articles="articles" :is-loading="isLoading" />
  </n-card>
</template>
<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { CashOutline as CashIcon } from '@vicons/ionicons5';
import { getSections, getTagDetail, getTags } from '@/api/sections';
import { getArticleListRecommand } from '@/api/article';
const route = useRoute();
const isFollowed = ref(false);
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);
const tagInfo = ref<TagItem>({
  sectionKey: '前端',
  title: 'Vue',
  img: 'https://avatar-static.segmentfault.com/195/823/1958237468-1040000000089436_huge100',
  description:
    'Vu 自动追踪依赖的模 自动追踪依赖的模板表达式和计算属性。板表达式和计算属性。e.j 自动追踪依赖的模板表达式和计算属性。s 是 自动追踪依赖的模板表达式和计算属性。一个 自动追踪依赖的模板表达式和计算属性。用于创 自动追踪依赖的模板表达式和计算属性。建 web 交互界面的HTML 模板 + JSON 数据，再创建一个 Vue 实例，就这么简单。 自动追踪依赖的模板表达式和计算属性。',
  id: 0,
});
function handleClick() {
  isFollowed.value = !isFollowed.value;
}
onMounted(reload);
function reload() {
  getTagDetail(route.params.id as string).then((res) => {
    if (res.data.status == 0) {
      tagInfo.value = res.data.data.tags as TagItem;
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
  isLoading.value = true;
  getArticleListRecommand().then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticlesListItem>;
      isLoading.value = false;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}
</script>

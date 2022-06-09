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
        <div class="text-gray-400 h-6">
          {{ tagInfo.description }}
        </div>
        <div class="mt-7"></div>
        <div class="flex">
          <div v-if="showEditButton">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button size="small" @click="showModal = true" type="error" class="w-20"> 删除 </n-button>
              </template>
              删除该专栏
            </n-tooltip>
          </div>
          <n-modal
            v-model:show="showModal"
            :mask-closable="false"
            preset="dialog"
            title="删除标签"
            content="是否要删除标签"
            positive-text="确认"
            negative-text="取消"
            @positive-click="handleClick"
            @negative-click="onNegativeClick"
          />
        </div>
      </template>
    </n-thing>
  </n-card>
  <n-card class="flex m-auto mt-2 rounded-t-md w-200">
    <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
  </n-card>
</template>
<script setup lang="ts">
import { ref, onMounted, defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { deleteTag, getTagArticleList, getTagDetail } from '@/api/sections';
import { Accessibility } from '@vicons/ionicons5';
import { useAuthStore } from '@/store/auth';
const { isLogin, isAdmin } = useAuthStore();
const route = useRoute();
const isLoading = ref(false);
let currentPage = 0;
const articles = ref<Array<ArticleItem>>([]);
const tagInfo = ref<TagItem>({
  sectionName: '',
  title: '',
  img: '',
  description: '',
  id: 0,
});
onMounted(reload);
function reload() {
  getTagDetail(route.params.id as string).then((res) => {
    if (res.data.status == 0) {
      tagInfo.value = res.data.data.TagInfo as TagItem;
      isLoading.value = true;
      getTagArticleList({ size: 10, page: currentPage, id: tagInfo.value.id }).then((res) => {
        if (res.data.status == 0) {
          articles.value = res.data.data.articleInfos as Array<ArticleItem>;
          isLoading.value = false;
        } else {
          window.$message.error('获取文章列表失败');
        }
      });
    } else {
      window.$message.error('获取二级列表失败');
    }
  });
}
function handleRequest() {
  isLoading.value = true;
  getTagArticleList({ size: 10, page: ++currentPage, id: tagInfo.value.id }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
    }
  });
}
//****按钮相关参数
const showModal = ref(false);
const showEditButton = computed(() => {
  return isLogin && isAdmin;
});
function onNegativeClick() {
  showModal.value = false;
}
const handleClick = () => {
  deleteTag(route.params.id as string).then((res) => {
    if (res.data.status != 0) {
      window.$message.error('删除标签失败');
    } else {
      window.location.replace('/sections/计算机');
      window.$message.info('删除标签成功');
    }
  });
};
//****end
</script>

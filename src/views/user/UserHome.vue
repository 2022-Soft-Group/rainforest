<template>
  <n-card title="   " size="large" id="userHeader" class="m-2 rounded-md shadow-sm">
    <profiler-header :articleNum="articleNum" :userInfo="(userInfo as User)" />
  </n-card>

  <div class="flex flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-2 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab-pane name="我的关注">
          <user-list />
        </n-tab-pane>
        <n-tab-pane name="我的粉丝">我的粉丝fdsaf</n-tab-pane>
        <n-tab-pane name="我的文章">
          <articles-list :articles="articles" :is-loading="isLoading" />
        </n-tab-pane>
        <n-tab-pane name="我的收藏">我的afsd收藏</n-tab-pane>
        <n-tab-pane name="我的资源">我的sdfa资源</n-tab-pane>
      </n-tabs>
    </n-card>
    <div class="flex-col basis-2/7">
      <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
        <achivement />
      </n-card>
      <n-card :bordered="false" class="sticky top-16 my-4 rounded-md shadow-sm">
        <follow />
      </n-card>
    </div>
  </div>
  <n-icon size="40">
    <game-controller-outline />
  </n-icon>
</template>

<script setup lang="ts">
import { getArticleListRecommand } from '@/api/article';
import { ref, onMounted } from 'vue';
import ProfilerHeader from '../user/ProfilerHeader.vue';
import Achivement from './Achivement.vue';
import Follow from './Follow.vue';
import UserList from './UserList.vue';
import { getUserInfo } from '@/api/user';
import { useAuthStore } from '@/store/auth';

const { userID } = useAuthStore();
function reload() {
  isLoading.value = true;
  getArticleListRecommand({ size: 10, page: 0 }).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticlesListItem>;
      isLoading.value = false;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
  getUserInfo(userID).then((res) => {
    if (res.data.status == 0) {
      userInfo.value = res.data.data.user as User;
    } else {
      window.$message.error('获取用户信息失败');
    }
  });
}
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);
const userInfo = ref<User>();
const articleNum = ref(0);

onMounted(reload);
</script>

<style scoped>
#userHeader {
  margin-top: 15px;
}
</style>

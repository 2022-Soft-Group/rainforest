<template>
  <n-card title="   " size="large" id="userHeader" class="m-2 rounded-md shadow-sm">
    <profiler-header :articleNum="userFeature.articleNum" :userInfo="(userInfo as User)" />
  </n-card>

  <div class="flex">
    <n-card :bordered="false" class="basis-5/7 m-2 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab-pane name="关注">
          <user-list :users="userListFollowing" :is-loading="userListFollowingIsLoading" list-type="following" />
        </n-tab-pane>
        <n-tab-pane name="粉丝">
          <user-list :users="userListFollowed" :is-loading="userListFollowedIsLoading" list-type="fan" />
        </n-tab-pane>
        <n-tab-pane name="文章">
          <articles-list :articles="articles" :is-loading="isLoading" />
        </n-tab-pane>
        <n-tab-pane name="收藏">
          <collect-button :article-id="4" />
        </n-tab-pane>
        <n-tab-pane name="资源">我的资源</n-tab-pane>
      </n-tabs>
    </n-card>
    <div class="flex-col basis-2/7">
      <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
        <user-achivement :liked="userFeature.likedNum" :collected="userFeature.collectedNum" />
      </n-card>
      <n-card :bordered="false" class="sticky top-16 my-4 rounded-md shadow-sm">
        <user-follow-num :following="userFeature.followingNum" :followed="userFeature.followedNum" />
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
import userAchivement from './UserAchivement.vue';
import userFollowNum from './UserFollowNum.vue';
import UserList from './UserList.vue';
import { getUserInfo, getUserListFollowing, getUserFeature, getUserListFollowed } from '@/api/user';
import { useAuthStore } from '@/store/auth';
import UserFollowNum from './UserFollowNum.vue';

const { userID } = useAuthStore();
function reload() {
  isLoading.value = true;
  userListFollowingIsLoading.value = true;
  userListFollowedIsLoading.value = true;
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
      window.$message.error('获取我的用户信息失败');
    }
  });
  getUserListFollowing({ size: 10, page: 0 }, userID).then((res) => {
    if (res.data.status == 0) {
      userListFollowing.value = res.data.data.userListFollowing as Array<UserFeature>;
      userListFollowingIsLoading.value = false;
    } else {
      window.$message.error('获取我关注的用户失败');
    }
  });
  getUserListFollowed({ size: 10, page: 0 }, userID).then((res) => {
    if (res.data.status == 0) {
      userListFollowed.value = res.data.data.userListFollowed as Array<UserFeature>;
      userListFollowingIsLoading.value = false;
    } else {
      window.$message.error('获取关注我的用户失败');
    }
  });
  getUserFeature(userID).then((res) => {
    if (res.data.status == 0) {
      userFeature.value = res.data.data.userFeature;
    } else {
      window.$message.error('获取我的关注数量失败');
    }
  });
}

// 我的文章
const isLoading = ref(false);
const articles = ref<Array<ArticlesListItem>>([]);

// 我的个人信息
const userInfo = ref<User>({
  name: '',
  description: '',
  avatar: '',
  id: 0,
  sex: 0,
  email: '',
  phone: '',
  coin: 0,
  createTime: '',
  modifyTime: '',
});

const userFeature = ref<UserFeature>({
  id: 0,
  name: '',
  avatar: '',
  articleNum: 0,
  followingNum: 0,
  followedNum: 0,
  collectedNum: 0,
  likedNum: 0,
});

// 我关注的用户列表
const userListFollowingIsLoading = ref(false);
const userListFollowing = ref<Array<UserFeature>>([]);

// 关注我的用户列表
const userListFollowedIsLoading = ref(false);
const userListFollowed = ref<Array<UserFeature>>([]);

onMounted(reload);
</script>

<style scoped>
#userHeader {
  margin-top: 15px;
}
</style>

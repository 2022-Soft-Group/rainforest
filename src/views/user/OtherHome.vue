<template>
  <n-card title="  " size="large" id="userHeader" class="m-2 rounded-md shadow-sm">
    <template #cover>
      <img id="pic1" src="https://s2.loli.net/2022/06/07/MyYlw7S8CfOusNn.jpg" />
    </template>
    <profiler-header
      :articleNum="userFeature.articleNum"
      :userInfo="(userInfo as User)"
      :change-count="changeCount"
      @update-info="handleUpdateInfo"
      @change-follow="handleChangeFollow"
      class="-mt-22"
    />
  </n-card>
  <!-- {{ userID }}
  {{ userListFollowing }} -->
  <!-- <follow-button :target-user-id="userInfo.id" :change-count="changeCount" @change-follow="handleChangeFollow" /> -->
  <div class="flex -mr-1.5 -mt-2">
    <n-card :bordered="false" class="basis-5/7 m-2 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab-pane name="关注" display-directive="if">
          <user-list
            :users="userListFollowing"
            :is-loading="userListFollowingIsLoading"
            :change-count="changeCount"
            list-type="following"
            @change-follow="handleChangeFollow"
          />
        </n-tab-pane>
        <n-tab-pane name="粉丝" display-directive="show:lazy">
          <user-list
            :users="userListFollowed"
            :is-loading="userListFollowedIsLoading"
            :change-count="changeCount"
            list-type="fan"
            @change-follow="handleChangeFollow"
          />
        </n-tab-pane>
        <n-tab-pane name="文章">
          <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
        </n-tab-pane>
        <n-tab-pane name="收藏">
          <collect-button :article-id="4" />
        </n-tab-pane>
        <n-tab-pane name="资源"> </n-tab-pane>
      </n-tabs>
    </n-card>
    <div class="flex-col basis-2/7 ml-1">
      <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
        <user-achivement :liked="userFeature.likedNum" :collected="userFeature.collectedNum" />
      </n-card>
      <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
        <user-follow-num :following="userFeature.followingNum" :followed="userFeature.followedNum" />
      </n-card>
    </div>
  </div>
  <n-icon size="40">
    <game-controller-outline />
  </n-icon>
</template>

<script setup lang="ts">
import { getUserArticleList } from '@/api/user';
import { ref, onMounted } from 'vue';
import { useLoadingBar } from 'naive-ui';
import ProfilerHeader from '../user/ProfilerHeader.vue';
import userAchivement from './UserAchivement.vue';
import userFollowNum from './UserFollowNum.vue';
import UserList from './UserList.vue';
import { getUserInfo, getUserListFollowing, getUserFeature, getUserListFollowed } from '@/api/user';
// import { useAuthStore } from '@/store/auth';
import UserFollowNum from './UserFollowNum.vue';
import { useRoute } from 'vue-router';

let currentPage = 0;
const changeCount = ref(0);
const loadingBar = useLoadingBar();
// const { userID } = useAuthStore();
const route = useRoute();
const userID = route.params.id as string;

function handleRequest() {
  isLoading.value = true;
  loadingBar.start();
  getUserArticleList({ size: 10, page: ++currentPage }, userID).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}

function handleUpdateInfo() {
  getUserInfo(userID).then((res) => {
    if (res.data.status == 0) {
      userInfo.value = res.data.data.user as User;
    } else {
      window.$message.error('修改用户信息失败');
    }
  });
}

function handleChangeFollow() {
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
  changeCount.value++;
}

function reload() {
  isLoading.value = true;
  userListFollowingIsLoading.value = true;
  userListFollowedIsLoading.value = true;
  loadingBar.start();
  getUserArticleList({ size: 10, page: currentPage }, userID).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticleItem>;
      isLoading.value = false;
      loadingBar.finish();
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
const articles = ref<Array<ArticleItem>>([]);

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
  isAdmin: false,
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
#pic1 {
  width: 100%;
  height: 200px;
}
</style>

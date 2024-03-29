<template>
  <n-card title="   " size="large" id="userHeader" class="m-2 mt-4 rounded-md shadow-sm">
    <template #cover>
      <!-- <div class="text-right -mb-15">
        <n-button>编辑封面图片</n-button>
      </div> -->
      <n-image class="w-full h-50" object-fit="cover" :src="userInfo.cover" />
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

  <div class="flex -mr-1.5 -mt-2 flex-y-auto">
    <n-card :bordered="false" class="basis-5/7 m-2 rounded-md shadow-sm">
      <n-tabs v-if="!isLoading" v-model:value="defaultTabName" type="line" size="large" class="mb-6" animated>
        <n-tab-pane tab="文章" name="article">
          <articles-list
            :articles="articles"
            :is-loading="isLoading"
            @request-articles="handleRequest"
            @reload-articles="loadUserArticle"
          />
        </n-tab-pane>
        <n-tab-pane tab="专栏" name="column">
          <div class="flex flex-wrap">
            <div v-for="item in columns" class="some">
              <column-list-item :column-info="item"></column-list-item>
            </div>
          </div>
          <no-item :list-num="columns.length" item-type="专栏"></no-item>
        </n-tab-pane>
        <n-tab-pane tab="关注" name="follow" display-directive="if">
          <user-list
            :users="userListFollowing"
            :is-loading="userListFollowingIsLoading"
            :change-count="changeCount"
            list-type="following"
            @change-follow="handleChangeFollow"
          />
        </n-tab-pane>
        <n-tab-pane tab="粉丝" name="fan" display-directive="if">
          <user-list
            :users="userListFollowed"
            :is-loading="userListFollowedIsLoading"
            :change-count="changeCount"
            list-type="fan"
            @change-follow="handleChangeFollow"
          />
        </n-tab-pane>
        <n-tab-pane tab="收藏" name="collection">
          <n-tabs type="line" animated>
            <n-tab-pane name="收藏的文章">
              <articles-list
                :articles="collectedArticles"
                :is-loading="isLoading2"
                @request-articles="handleRequest2"
              />
            </n-tab-pane>
            <n-tab-pane name="收藏的专栏">
              <div class="flex flex-wrap">
                <div v-for="item in collectedColumns" class="some">
                  <column-list-item :column-info="item"></column-list-item>
                </div>
              </div>
              <no-item :list-num="collectedColumns.length" item-type="收藏的专栏"></no-item>
            </n-tab-pane>
          </n-tabs>
        </n-tab-pane>
        <n-tab-pane tab="资源" name="resource">
          <resource-list :user-id="userID"></resource-list>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <div class="flex-col basis-2/7 ml-1">
      <div class="sticky top-16">
        <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
          <quick-guider />
        </n-card>
        <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
          <user-achivement :liked="userFeature.likedNum" :collected="userFeature.collectedNum" />
        </n-card>
        <n-card :bordered="false" class="my-2 rounded-md shadow-sm">
          <user-follow-num :following="userFeature.followingNum" :followed="userFeature.followedNum" />
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useLoadingBar } from 'naive-ui';
import ProfilerHeader from '../user/ProfilerHeader.vue';
import userAchivement from './UserAchivement.vue';
import userFollowNum from './UserFollowNum.vue';
import UserList from './UserList.vue';
import {
  getUserInfo,
  getUserArticleList,
  getUserListFollowing,
  getUserFeature,
  getUserListFollowed,
  getUserCollectArticleList,
  getUserCollectColumns,
} from '@/api/user';
import { getUserColumns, getMyColumns } from '@/api/columns';
import { useRoute } from 'vue-router';
const route = useRoute();
let currentPage = [0, 0, 0, 0, 0, 0, 0, 0];
const changeCount = ref(0);
const loadingBar = useLoadingBar();
const userID = ref('');
userID.value = route.params.id as string;
const defaultTabName = ref('article');

function handleRequest() {
  isLoading.value = true;
  loadingBar.start();
  getUserArticleList({ size: 10, page: currentPage[0]++ }, userID.value).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
      loadingBar.finish();
    }
  });
}

function handleRequest2() {
  isLoading2.value = true;
  loadingBar.start();
  getUserCollectArticleList({ size: 10, page: currentPage[4]++ }, userID.value).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        collectedArticles.value.push(element);
      });
      isLoading2.value = false;
      loadingBar.finish();
    }
  });
}

function handleUpdateInfo() {
  getUserInfo(userID.value).then((res) => {
    if (res.data.status == 0) {
      userInfo.value = res.data.data.user as User;
    } else {
      window.$message.error('修改用户信息失败');
    }
  });
}

function handleChangeFollow() {
  getUserListFollowing({ size: 10, page: 0 }, userID.value).then((res) => {
    if (res.data.status == 0) {
      userListFollowing.value = res.data.data.userListFollowing as Array<UserFeature>;
      userListFollowingIsLoading.value = false;
    } else {
      window.$message.error('获取关注的用户失败');
    }
  });
  getUserListFollowed({ size: 10, page: 0 }, userID.value).then((res) => {
    if (res.data.status == 0) {
      userListFollowed.value = res.data.data.userListFollowed as Array<UserFeature>;
      userListFollowingIsLoading.value = false;
    } else {
      window.$message.error('获取关注的用户失败');
    }
  });
  changeCount.value++;
}

function loadColumn() {
  loadingBar.start();
  getUserColumns(parseInt(userID.value), { size: 10, page: currentPage[2]++ }).then((res) => {
    if (res.data.status == 0) {
      columns.value = res.data.data.columns;
      loadingBar.finish();
    } else {
      window.$message.error('获取专栏失败');
    }
  });
}

function loadCollectColumn() {
  loadingBar.start();
  getUserCollectColumns(userID.value, { size: 10, page: currentPage[5]++ }).then((res) => {
    if (res.data.status == 0) {
      collectedColumns.value = res.data.data.columnInfos;
      // res.data.data.columns.forEach((element: any) => {
      //   columns.value.push(element);
      // });
      loadingBar.finish();
    } else {
      window.$message.error('获取收藏专栏失败');
    }
  });
}

function loadUserArticle() {
  loadingBar.start();
  getUserArticleList({ size: 10, page: 0 }, userID.value).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticleItem>;
      isLoading.value = false;
      loadingBar.finish();
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}

function reload() {
  userID.value = route.params.id as string;
  currentPage[0] = 0;
  currentPage[2] = 0;
  currentPage[4] = 0;
  currentPage[5] = 0;
  isLoading.value = true;
  isLoading2.value = true;
  userListFollowingIsLoading.value = true;
  userListFollowedIsLoading.value = true;
  getUserInfo(userID.value).then((res) => {
    if (res.data.status == 0) {
      userInfo.value = res.data.data.user as User;
    } else {
      window.$message.error('获取用户信息失败');
    }
  });
  loadingBar.start();
  getUserArticleList({ size: 10, page: currentPage[0]++ }, userID.value).then((res) => {
    if (res.data.status == 0) {
      articles.value = res.data.data.articleInfos as Array<ArticleItem>;
      isLoading.value = false;
      loadingBar.finish();
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
  loadingBar.start();
  getUserCollectArticleList({ size: 10, page: currentPage[4]++ }, userID.value).then((res) => {
    if (res.data.status == 0) {
      collectedArticles.value = res.data.data.articleInfos as Array<ArticleItem>;
      isLoading2.value = false;
      loadingBar.finish();
    } else {
      window.$message.error('获取收藏列表失败');
    }
  });

  getUserListFollowing({ size: 10, page: 0 }, userID.value).then((res) => {
    if (res.data.status == 0) {
      userListFollowing.value = res.data.data.userListFollowing as Array<UserFeature>;
      userListFollowingIsLoading.value = false;
    } else {
      window.$message.error('获取关注的用户失败');
    }
  });
  getUserListFollowed({ size: 10, page: 0 }, userID.value).then((res) => {
    if (res.data.status == 0) {
      userListFollowed.value = res.data.data.userListFollowed as Array<UserFeature>;
      userListFollowingIsLoading.value = false;
    } else {
      window.$message.error('获取关注的用户失败');
    }
  });
  getUserFeature(userID.value).then((res) => {
    if (res.data.status == 0) {
      userFeature.value = res.data.data.userFeature;
    } else {
      window.$message.error('获取关注数量失败');
    }
  });
  loadColumn();
  loadCollectColumn();
}

// 专栏
const columns = ref<Array<ColumnListItem>>([]);
const collectedColumns = ref<Array<ColumnListItem>>([]);

// 我的文章
const isLoading = ref(false);
const isLoading2 = ref(false);
const articles = ref<Array<ArticleItem>>([]);

// 收藏的文章
const collectedArticles = ref<Array<ArticleItem>>([]);

// 我的个人信息
const userInfo = ref<User>({
  name: '',
  description: '',
  avatar: '',
  cover: '',
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
  hot: 0,
});

// 我关注的用户列表
const userListFollowingIsLoading = ref(false);
const userListFollowing = ref<Array<UserFeature>>([]);

// 关注我的用户列表
const userListFollowedIsLoading = ref(false);
const userListFollowed = ref<Array<UserFeature>>([]);

watch(
  () => route.params,
  () => {
    if (route.params.target !== undefined) {
      defaultTabName.value = route.params.target as string;
      userID.value = route.params.id as string;
    }
    if (route.params.id != null && route.name == 'userhome') {
      reload();
    }
  }
);

onMounted(() => {
  defaultTabName.value = route.params.target as string;
  userID.value = route.params.id as string;
  if (userID.value === 'null') return;
  reload();
});
</script>

<style>
.some {
  margin: 5px;
}
</style>

<template>
  <n-card class="flex m-auto rounded-md w-200">
    <div>
      <router-link :to="'/user/' + columnInfo.userID">
        <n-thing>
          <template #avatar>
            <n-avatar round :src="userInfo.avatar"></n-avatar>
          </template>
          <template #header>{{ userInfo.name }}</template>
        </n-thing>
      </router-link>
    </div>
    <n-divider />
    <n-thing>
      <template #avatar>
        <n-avatar object-fit="cover" :size="150" :src="columnInfo.img"> </n-avatar>
      </template>
      <template #header>
        <n-h1>{{ columnInfo.title }}</n-h1>
      </template>
      <template #header-extra
        ><n-button circle size="small" title="删除该专栏" @click="handleClick">
          <template #icon>
            <ArrowRedo />
          </template> </n-button
      ></template>

      <template #description>
        <div class="text-gray-400">
          {{ columnInfo.description }}
        </div>
      </template>

      <n-divider />
      <template #footer>
        <div class="flex justify-around">
          <n-statistic :value="[columnInfo.articleNum, '篇文章'].join('')">
            <template #prefix>
              <n-icon size="30">
                <paper></paper>
              </n-icon>
            </template>
          </n-statistic>
          <n-statistic :value="[columnInfo.followerNum, '次收藏'].join('')">
            <template #prefix>
              <n-icon size="30">
                <albums></albums>
              </n-icon>
            </template>
          </n-statistic>
        </div>
      </template>
    </n-thing>
  </n-card>

  <n-card class="flex m-auto mt-2 rounded-t-md w-200">
    <articles-list :articles="articles" :is-loading="isLoading" @request-articles="handleRequest" />
  </n-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { deleteColumn, getColumnArticleList, getColumnDetail } from '@/api/columns';
import { NewspaperOutline as paper, Albums } from '@vicons/ionicons5';
import { ArrowRedo } from '@vicons/ionicons5';
import { getUserInfo } from '@/api/user';
import router from '@/router';
const route = useRoute();
let currentPage = 0;
const isLoading = ref(false);
const articles = ref<Array<ArticleItem>>([]);
const columnInfo = ref<ColumnListItem>({
  id: 0,
  img: '',
  title: '',
  description: '',
  followerNum: 0,
  articleNum: 0,
  userID: 0,
});
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
onMounted(reload);
function reload() {
  getColumnDetail(route.params.id as string)
    .then((res) => {
      if (res.data.status == 0) {
        columnInfo.value = res.data.data.columnInfo as ColumnListItem;
      } else {
        window.$message.error('获取二级列表失败');
      }
      isLoading.value = true;
      getColumnArticleList({ size: 10, page: currentPage, columnID: columnInfo.value.id }).then((res) => {
        if (res.data.status == 0) {
          articles.value = res.data.data.articleInfos as Array<ArticleItem>;
          isLoading.value = false;
        } else {
          window.$message.info('33333333');
        }
      });
    })
    .then(() => {
      getUserInfo(columnInfo.value.userID.toString()).then((res) => {
        if (res.data.status == 0) {
          userInfo.value = res.data.data.user;
        } else {
          window.$message.error('获取用户信息失败');
        }
      });
    });
}
function handleRequest() {
  isLoading.value = true;
  getColumnArticleList({ size: 10, page: ++currentPage, columnID: columnInfo.value.id }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: any) => {
        articles.value.push(element);
      });
      isLoading.value = false;
    }
  });
}

const handleClick = () => {
  deleteColumn(columnInfo.value.id)
    .then((res) => {
      if (res.data.status != 0) {
        window.$message.error('删除专栏失败');
      } else {
        window.$message.info('删除专栏成功');
      }
    })
    .finally(() => {
      window.location.replace('/columns');
    });
};
</script>

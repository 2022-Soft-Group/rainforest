<template>
  <n-card class="flex m-auto rounded-md w-200">
    <router-link :to="'/user/' + columnInfo.userID">
      <n-thing>
        <template #avatar>
          <n-avatar round :src="userInfo.avatar"></n-avatar>
        </template>
        <template #header>{{ userInfo.name }}</template>
        <template #description> {{ userInfo.description }} </template>
      </n-thing>
    </router-link>
    <n-divider />
    <n-thing>
      <template #avatar>
        <n-avatar object-fit="cover" :size="150" :src="columnInfo.img"> </n-avatar>
      </template>
      <template #header>
        <n-h1>{{ columnInfo.title }}</n-h1>
      </template>
      <template #header-extra></template>

      <template #description>
        <div class="text-gray-400 h-6">
          {{ columnInfo.description }}
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
            title="删除专栏"
            content="是否要删除专栏"
            positive-text="确认"
            negative-text="取消"
            @positive-click="handleClick"
            @negative-click="onNegativeClick"
          />
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button size="small" @click="handleCollect" class="ml-2 w-20" v-if="collected" type="info">
                已收藏
              </n-button>
              <n-button size="small" @click="handleCollect" class="ml-2 w-20" v-else type="info"> 收藏 </n-button>
            </template>
            收藏该专栏
          </n-tooltip>
          <div v-if="showEditButton">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button size="small" @click="isAdd = !isAdd" class="ml-2 w-20" type="warning"> 收录文章 </n-button>
              </template>
              选择要收录的文章
            </n-tooltip>
          </div>
          <div v-if="showEditButton">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button size="small" class="ml-2 w-20" type="success" @click="showchange = true"> 修改信息 </n-button>
              </template>
              修改专栏信息
            </n-tooltip>
          </div>
          <n-modal
            v-model:show="showchange"
            :mask-closable="false"
            :style="bodyStyle"
            title="修改专栏信息"
            size="huge"
            :bordered="true"
            positive-text="确定"
            negative-text="取消"
            @positive-click="onPositiveClick"
            @negative-click="onNegativeClick"
          >
            <n-card class="modalCard">
              <n-h1 class="text-center">修改专栏信息</n-h1>
              <n-space vertical size="large">
                <n-input v-model:value="title" type="text" placeholder="请输入专栏名称" class="mt-6" />
                <n-input
                  type="textarea"
                  placeholder="请输入一句话介绍"
                  v-model:value="description"
                  :autosize="{
                    minRows: 3,
                  }"
                  class="mt-10"
                />
                <div v-if="description.length > 80" class="text-red-600">请输入少于80个字</div>
                <div>
                  <upload-button
                    class="w-138 h-48 border-2 border-dashed rounded-md"
                    :show-file-list="false"
                    ref="upload"
                    @change="clickUploadImage"
                    ><div v-if="imgSrc == ''" class="text-center mt-20 text-gray-400">
                      <div>点击上传封面</div>
                      <div>.jpeg/.png/.svg</div>
                    </div>
                    <n-image
                      v-else
                      preview-disabled
                      width="240"
                      object-fit="cover"
                      class="h-48 flex-none rounded-md"
                      :src="imgSrc"
                    />
                  </upload-button>
                </div>
              </n-space>
              <div class="flex-auto mt-10 justify-between">
                <n-button @click="onNegativeClick" class="w-67 mr-2">取消</n-button>
                <n-button type="primary" @click="onPositiveClick" class="w-67" v-if="description.length > 80" disabled
                  >确认修改</n-button
                >
                <n-button type="primary" @click="onPositiveClick" class="w-67" v-else>确认修改</n-button>
              </div>
            </n-card>
          </n-modal>
        </div>
        <div class="flex mt-2">
          <n-select v-model:value="value" :options="options" v-if="isAdd" class="w-120" />
          <n-button size="small" @click="handlePutin" class="ml-2 mt-1" v-if="isAdd"> 确认收录 </n-button>
        </div>
        <!-- <n-tooltip trigger="hover">
          <template #trigger>
            <n-button size="small" @click="showModal = true" type="error" class="w-20"> 删除 </n-button>
          </template>
          删除该专栏
        </n-tooltip>

        <n-modal
          v-model:show="showModal"
          :mask-closable="false"
          preset="dialog"
          title="删除标签"
          content="是否要删除专栏"
          positive-text="确认"
          negative-text="取消"
          @positive-click="handleClick"
          @negative-click="onNegativeClick"
        />
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button size="small" @click="handleCollect" class="ml-2 w-20" v-if="collected" type="info">
              已收藏
            </n-button>
            <n-button size="small" @click="handleCollect" class="ml-2 w-20" v-else type="info"> 收藏 </n-button>
          </template>
          收藏该专栏
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button size="small" @click="isAdd = !isAdd" class="ml-2 w-20" type="warning"> 收录文章 </n-button>
          </template>
          选择要收录的文章
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button size="small" class="ml-2 w-20" type="success" @click="showchange = true"> 修改信息 </n-button>
          </template>
          修改专栏信息
        </n-tooltip>
        <n-modal
          v-model:show="showchange"
          :mask-closable="false"
          :style="bodyStyle"
          title="修改专栏信息"
          size="huge"
          :bordered="true"
          positive-text="确定"
          negative-text="取消"
          @positive-click=""
          @negative-click="onNegativeClick"
        >
          <n-card class="modalCard">
            <n-h1 class="text-center">修改专栏信息</n-h1>
            <n-space vertical size="large">
              <n-input v-model:value="title" type="text" placeholder="请输入专栏名称" class="mt-6" />
              <n-input
                type="textarea"
                placeholder="请输入一句话介绍"
                v-model:value="description"
                :autosize="{
                  minRows: 3,
                }"
                class="mt-10"
              />
              <div v-if="description.length > 80" class="text-red-600">请输入少于80个字</div>
              <div>
                <upload-button
                  class="w-138 h-48 border-2 border-dashed rounded-md"
                  :show-file-list="false"
                  ref="upload"
                  @change="clickUploadImage"
                  ><div v-if="imgSrc == ''" class="text-center mt-20 text-gray-400">
                    <div>点击上传封面</div>
                    <div>.jpeg/.png/.svg</div>
                  </div>
                  <n-image
                    v-else
                    preview-disabled
                    width="240"
                    object-fit="cover"
                    class="h-48 flex-none rounded-md"
                    :src="imgSrc"
                  />
                </upload-button>
              </div>
            </n-space>
            <div class="flex-auto mt-10 justify-between">
              <n-button @click="onNegativeClick" class="w-67 mr-2">取消</n-button>
              <n-button type="primary" @click="onPositiveClick" class="w-67" v-if="description.length > 80" disabled
                >确认修改</n-button
              >
              <n-button type="primary" @click="onPositiveClick" class="w-67" v-else>确认修改</n-button>
            </div>
          </n-card>
        </n-modal>
        <div class="flex mt-2">
          <n-select v-model:value="value" :options="options" v-if="isAdd" class="w-120" />
          <n-button size="small" @click="handlePutin" class="ml-2 mt-1" v-if="isAdd"> 确认收录 </n-button>
        </div> -->
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  deleteColumn,
  getColumnArticleList,
  getColumnDetail,
  collectColumn,
  addArticleToColumn,
  getColumnFollowStatus,
  updateColumn,
} from '@/api/columns';
import { NewspaperOutline as paper, Albums, CloseSharp, CloseCircleOutline } from '@vicons/ionicons5';
import { getCollectStatus, getUserInfo } from '@/api/user';
import { useAuthStore } from '@/store/auth';
import { getArticle, getMyArticle } from '@/api/article';
import router from '@/router';
import { uploadImage } from '@/api/asset';
import type UploadButton from '@/components/common/UploadButton.vue';
const { isLogin, isAdmin } = useAuthStore();

const route = useRoute();
let currentPage = 0;
const isLoading = ref(false);
const articles = ref<Array<ArticleItem>>([]);
const myArticles = ref<Array<ArticleItem>>([]);
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
  cover: '',
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
      getColumnFollowStatus(route.params.id as string).then((res) => {
        if (res.data.status == 0) {
          collected.value = res.data.data.isFollowed;
        }
      });
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
  getMyArticle({ size: 99, page: 0 }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.articleInfos.forEach((element: ArticleItem) => {
        options.push({
          value: element.articleID,
          label: element.title,
        });
      });
    }
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
  deleteColumn(columnInfo.value.id).then((res) => {
    if (res.data.status != 0) {
      window.$message.error('删除专栏失败');
    } else {
      window.location.replace('/columns');
      window.$message.info('删除专栏成功');
    }
  });
};
const showModal = ref(false);
const showchange = ref(false);
const bodyStyle = { width: '600px' };
const collected = ref(false);
function onNegativeClick() {
  showModal.value = false;
  showchange.value = false;
}
const handleCollect = () => {
  if (isLogin) {
    collectColumn(columnInfo.value.id.toString()).then((res) => {
      if (res.data.status == 0) {
        if (!collected.value) {
          columnInfo.value.followerNum++;
          collected.value = !collected.value;
        } else {
          if (columnInfo.value.followerNum > 0) columnInfo.value.followerNum--;
          collected.value = !collected.value;
        }
        if (res.data.data.isFollowed) {
          window.$message.info('收藏成功');
        }
      } else {
        window.$message.error('现在不能收藏');
      }
    });
  } else {
    router.push({ name: 'login' });
  }
};
const isAdd = ref(false);
const value = ref();
const options: { label: string; value: number }[] = [];
function handlePutin() {
  addArticleToColumn(value.value, columnInfo.value.id).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('收录文章成功');
      getArticle(value.value).then((res) => {
        if (res.data.status == 0) {
          articles.value.push(res.data.data.articleInfo);
        }
      });
      columnInfo.value.articleNum++;
    } else {
      window.$message.error('收录文章失败');
    }
  });
}
//
const title = ref('');
const description = ref('');
const imgSrc = ref('');
let imageID = 0;
//
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    if (res.data.status == 0) {
      imgSrc.value = res.data.data.url;
      imageID = res.data.data.id;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};
//
const columnChan = ref<ColumnUpload>({
  cover: columnInfo.value.img,
  title: columnInfo.value.title,
  description: columnInfo.value.description,
  private: 0,
});
//
function onPositiveClick() {
  columnChan.value.title = title.value == '' ? columnInfo.value.title : title.value;
  columnChan.value.description = description.value == '' ? columnInfo.value.description : description.value;
  columnChan.value.cover = imgSrc.value == '' ? columnInfo.value.img : imgSrc.value;
  showchange.value = false;
  updateColumn(columnInfo.value.id as unknown as string, columnChan.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('修改成功');
    } else {
      window.$message.error('修改失败');
    }
  });
}
//
const showEditButton = computed(() => {
  const userID = localStorage.getItem('userID');
  return (isLogin && columnInfo.value.userID.toString() == userID) || isAdmin;
});
//
</script>
<style>
.modalCard {
  width: 100px;
  height: 600px;
  border-radius: 10px;
}
</style>

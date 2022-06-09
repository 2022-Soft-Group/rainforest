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
          <div v-if="showEditButton">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button size="small" class="ml-2 w-20" type="success" @click="showchange = true"> 修改信息 </n-button>
              </template>
              修改专栏信息
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
          <n-modal
            v-model:show="showchange"
            :mask-closable="false"
            :style="bodyStyle"
            title="修改标签信息"
            size="huge"
            :bordered="true"
            positive-text="确定"
            negative-text="取消"
            @positive-click="onPositiveClick"
            @negative-click="onNegativeClick"
          >
            <n-card class="modalCard">
              <n-h1 class="text-center">修改标签信息</n-h1>
              <n-space vertical size="large">
                <n-input v-model:value="title" type="text" placeholder="请输入标签名称" class="mt-6" />
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
                  >
                    <div v-if="imgSrc == ''" class="text-center mt-20 text-gray-400">
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
import { deleteTag, getTagArticleList, getTagDetail, updateTag } from '@/api/sections';
import { Accessibility } from '@vicons/ionicons5';
import { useAuthStore } from '@/store/auth';
import { uploadImage } from '@/api/asset';
import type UploadButton from '@/components/common/UploadButton.vue';
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
const showchange = ref(false);
const bodyStyle = { width: '600px' };
const showEditButton = computed(() => {
  return isLogin && isAdmin;
});
const tagChan = ref<TagUpdate>({
  title: '',
  img: '',
  description: '',
});
function onNegativeClick() {
  showModal.value = false;
  showchange.value = false;
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
function onPositiveClick() {
  tagChan.value.title = title.value == '' ? tagInfo.value.title : title.value;
  tagChan.value.description = description.value == '' ? tagInfo.value.description : description.value;
  tagChan.value.img = imgSrc.value == '' ? tagInfo.value.img : imgSrc.value;
  showchange.value = false;
  updateTag(tagInfo.value.id as unknown as string, tagChan.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('修改成功');
    } else {
      window.$message.error('修改失败');
    }
  });
}
const title = ref('');
const description = ref('');
const imgSrc = ref('');
let imageID = 0;
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
//****end
</script>
<style>
.modalCard {
  width: 100px;
  height: 600px;
  border-radius: 10px;
}
</style>

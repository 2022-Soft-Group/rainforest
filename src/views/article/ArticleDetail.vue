<template>
  <n-card class="flex m-auto m-4 rounded-md w-200">
    <n-h1 class="font-bold">{{ articleInfo.title }}</n-h1>
    <router-link :to="'/user/' + articleInfo.authorID">
      <n-thing>
        <template #avatar>
          <n-avatar round :src="userInfo.avatar"></n-avatar>
        </template>
        <template #header>{{ userInfo.name }}</template>
        <template #description> {{ userInfo.description }} </template>
      </n-thing>
    </router-link>
    <n-divider />
    <Markdown :source="articleContent" :linkify="true" class="markdown"></Markdown>
  </n-card>
  <!-- <upload-button style="width: 20%; margin-top: 10px" :show-file-list="false" ref="upload" @change="clickUpload">
    上传Markdown
  </upload-button> -->
</template>
<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import Markdown from 'vue3-markdown-it';
import type UploadButton from '@/components/common/UploadButton.vue';
import { getUserInfo } from '@/api/user';
import { useRoute } from 'vue-router';
import { getArticle } from '@/api/article';

const route = useRoute();
const userInfo = ref<UserInfo>({
  name: '',
  description: '',
  avatar: '',
});
const articleContent = ref('');
const articleInfo = ref<ArticlesListItem>({
  title: '',
  author: '',
  authorID: 0,
  description: '',
  like: 0,
  collection: 0,
  comments: 0,
  tags: [],
  image: '',
  articleID: 0,
});

//const upload = ref<InstanceType<typeof UploadButton> | null>(null);
// const clickUpload = () => {
//   const file = upload.value?.file as File;
//   console.log(file.name);
//   file.text().then((res) => {
//     source.value = res;
//   });
//   upload.value?.clearFile();
// };

onMounted(() => {
  getArticle(route.params.id as string)
    .then((res) => {
      if (res.data.status == 0) {
        articleInfo.value = res.data.data.articleInfo;
        articleContent.value = res.data.data.articleContent;
      } else {
        window.$message.error('获取文章失败');
      }
    })
    .then(() => {
      getUserInfo(articleInfo.value.authorID.toString()).then((res) => {
        if (res.data.status == 0) {
          userInfo.value = res.data.data.user;
        } else {
          window.$message.error('获取用户信息失败');
        }
      });
    });
});
</script>
<style scoped>
.markdown {
  font-family: Arial, Helvetica, sans-serif;
}
.markdown :deep(h1):first-of-type {
  display: none;
}
.markdown :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 40px;
}
.markdown :deep(p) {
  font-size: medium;
}
.markdown :deep(code) {
  border-radius: 8px;
  max-height: 800px;
}
.markdown :deep(nav) {
  font-weight: bold;
}
.markdown :deep(img) {
  border-radius: 8px;
}

@media only screen and (min-width: 1400px) {
  .markdown :deep(nav) {
    position: fixed;
    top: 60px;
    left: 10px;
  }
  .markdown :deep(nav) ol {
    max-width: 300px;
  }
}
</style>

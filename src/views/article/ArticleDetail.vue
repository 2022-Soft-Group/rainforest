<template>
  <n-space vertical>
    <n-card class="flex m-auto rounded-md">
      <template #cover v-if="articleInfo.image != ''">
        <img class="max-h-400" :src="articleInfo.image" />
      </template>
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
      <markdown-it-vue class="markdown" :content="articleContent" :options="options" />
    </n-card>
    <n-card class="flex m-auto rounded-md">
      <article-info-panel :article-info="articleInfo"></article-info-panel>
    </n-card>
    <n-card class="flex m-auto rounded-md">
      <comment-overview :comment-num="articleInfo.comments"></comment-overview>
    </n-card>
  </n-space>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, provide } from 'vue';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import { getUserInfo } from '@/api/user';
import { useRoute } from 'vue-router';
import { getArticle } from '@/api/article';
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {
    MarkdownItVue,
    RouterLink,
  },
  setup() {
    const route = useRoute();
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
    const articleContent = ref('');
    const articleInfo = ref<ArticlesListItem>({
      title: '',
      author: '',
      authorID: 0,
      description: '',
      view: 0,
      like: 0,
      collection: 0,
      comments: 0,
      tags: [],
      image: '',
      articleID: 0,
      thumbnail: '',
      columns: [],
    });

    const options = {
      markdownIt: {
        linkify: true,
      },
      linkAttributes: {
        attrs: {
          target: '_blank',
          rel: 'noopener',
        },
      },
    };

    const authorID = ref(0);
    provide('authorID', authorID);
    onMounted(() => {
      getArticle(route.params.id as string)
        .then((res) => {
          if (res.data.status == 0) {
            articleInfo.value = res.data.data.articleInfo;
            authorID.value = articleInfo.value.authorID;
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
    return {
      userInfo,
      articleInfo,
      articleContent,
      options,
    };
  },
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
.markdown :deep(.toc) {
  font-weight: bold;
}
.markdown :deep(img) {
  border-radius: 8px;
  pointer-events: none;
}
</style>

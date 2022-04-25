<template>
  <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
    <n-tabs type="line" size="large" class="mb-6">
      <n-tab name="推荐">推荐</n-tab>
      <n-tab name="关注">关注</n-tab>
    </n-tabs>
  </n-card>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import { getUserInfo } from '@/api/user';
import { useRoute } from 'vue-router';
import { getArticle } from '@/api/article';

export default defineComponent({
  components: {
    MarkdownItVue,
  },
  setup() {
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
      view: 0,
      like: 0,
      collection: 0,
      comments: 0,
      tags: [],
      image: '',
      articleID: 0,
      column: '',
      columnID: 0,
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
}
</style>

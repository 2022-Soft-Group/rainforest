<template>
  <div class="flex">
    <div class="w-0">
      <n-space vertical size="large" class="sticky top-1/4 mr-5">
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-badge :value="infoPanel?.likeNum" color="#63e2b7">
              <n-button
                class="shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
                type="primary"
                size="large"
                :secondary="!infoPanel?.liked"
                circle
                @click="handleLike"
              >
                <n-icon size="26"> <like-icon /> </n-icon>
              </n-button>
            </n-badge>
          </template>
          点赞
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-badge :value="infoPanel?.commentNum" color="#e88080">
              <n-button
                class="shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
                type="error"
                size="large"
                secondary
                circle
                @click="scrollToComment"
              >
                <n-icon size="24"> <comment-icon /> </n-icon>
              </n-button>
            </n-badge>
          </template>
          评论
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-badge :value="infoPanel?.collectNum" color="#f2c97d">
              <n-button
                class="shadow-md"
                type="warning"
                size="large"
                :secondary="!infoPanel?.collected"
                circle
                @click="handleCollect"
              >
                <n-icon size="25"> <collection-icon /> </n-icon>
              </n-button>
            </n-badge>
          </template>
          收藏
        </n-tooltip>
        <n-tooltip trigger="hover" placement="right">
          <template #trigger>
            <n-button
              class="clip shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60"
              color="#a29bfe"
              size="large"
              circle
              @click="handleShare"
            >
              <n-icon size="25"> <share-icon /> </n-icon>
            </n-button>
          </template>
          分享
        </n-tooltip>
      </n-space>
    </div>
    <n-space class="mx-13 w-240" vertical>
      <n-card class="flex rounded-md">
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
            <template #header-extra><follow-button :target-user-id="userInfo.id"></follow-button></template>
            <template #description> {{ userInfo.description }} </template>
          </n-thing>
        </router-link>
        <n-divider />
        <div class="text-gray-400">
          {{
            '文章发布于' +
            articleInfo.createTime +
            '，全文' +
            articleContent.length +
            '字，约花费' +
            Math.ceil(articleContent.length / 1000) +
            '分钟阅读'
          }}
        </div>
        <n-divider />
        <markdown-it-vue class="markdown" :content="articleContent" :options="options" />
        <n-divider />
        <div class="text-gray-400">{{ '最后修改于' + articleInfo.modifyTime }}</div>
      </n-card>
      <div id="like-zone">
        <n-card class="flex m-auto rounded-md">
          <article-info-panel :article-info="articleInfo" ref="infoPanel"></article-info-panel>
        </n-card>
      </div>
      <div id="comment-zone">
        <n-card class="flex m-auto rounded-md">
          <comment-overview :comment-num="articleInfo.comments"></comment-overview>
        </n-card>
      </div>
    </n-space>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, provide } from 'vue';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import { getUserInfo } from '@/api/user';
import { useRoute } from 'vue-router';
import { getArticle } from '@/api/article';
import { RouterLink } from 'vue-router';
import {
  CaretUpOutline as LikeIcon,
  ChatboxEllipses as CommentIcon,
  Star as CollectionIcon,
  PaperPlane as ShareIcon,
} from '@vicons/ionicons5';
import type ArticleInfoPanel from '@/components/article/ArticleInfoPanel.vue';
import ClipBoardJS from 'clipboard';
import { useLoadingBar } from 'naive-ui';

export default defineComponent({
  components: {
    MarkdownItVue,
    RouterLink,
    LikeIcon,
    CommentIcon,
    CollectionIcon,
    ShareIcon,
  },
  setup() {
    const route = useRoute();
    const loadingBar = useLoadingBar();
    const isLoading = ref(false);
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
    const articleContent = ref('');
    const articleInfo = ref<ArticleItem>({
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
      deleted: false,
      modifyTime: '',
      createTime: '',
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
    const infoPanel = ref<InstanceType<typeof ArticleInfoPanel> | null>(null);
    const liked = ref();
    const collected = ref(infoPanel.value?.collected);

    const scrollToComment = () => {
      document.querySelector('#comment-zone')?.scrollIntoView({
        behavior: 'auto',
      });
    };
    const handleLike = () => {
      infoPanel.value?.handleLike();
    };

    const handleCollect = () => {
      infoPanel.value?.handleCollect();
    };

    const handleShare = () => {
      const clipboard = new ClipBoardJS('.clip');
      clipboard.on;
      window.$message.info('网址已复制');
    };

    provide('authorID', authorID);
    onMounted(() => {
      loadingBar.start();
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
              loadingBar.finish();
            } else {
              window.$message.error('获取用户信息失败');
            }
          });
        });
    });
    return {
      userInfo,
      route,
      articleInfo,
      articleContent,
      options,
      infoPanel,
      liked,
      collected,
      isLoading,
      scrollToComment,
      handleLike,
      handleCollect,
      handleShare,
    };
  },
});
</script>
<style scoped>
.markdown :deep(.markdown-body) {
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(213, 213, 213);
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
  color: rgb(213, 213, 213);
}

.markdown :deep(.hljs) {
  background: #34343c;
}
.markdown :deep(.toc) {
  font-weight: bold;
}

.markdown :deep(thead tr) {
  background: #34343c;
}

.markdown :deep(img) {
  border-radius: 8px;
  margin: auto;
  pointer-events: none;
}

/* .markdown :deep(.markdown-it-vue-alter-info) {
  margin: auto;
  width: 200px;
  height: 50px;
} */
</style>

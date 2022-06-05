<template>
  <n-space class="w-full">
    <n-space class="mx-2">
      <n-button size="small" :secondary="!liked" type="primary" @click="handleLike">
        <template #icon>
          <n-icon size="18"><like-icon /></n-icon>
        </template>
        {{ likeNum }} 赞
      </n-button>
      <n-button size="small" :secondary="!disliked" type="primary" @click="handleDislike">
        <template #icon>
          <n-icon size="18"><dislike-icon /></n-icon>
        </template>
      </n-button>
    </n-space>
    <n-space justify="space-between">
      <div class="text-gray-400 mt-1">
        <n-icon size="small"><comment-icon /></n-icon>
        {{ articleInfo.comments }} 条评论
      </div>
      <div class="text-gray-400 mt-1">
        <n-icon size="small"><collection-icon /></n-icon>
        {{ collectNum }} 次收藏
      </div>
    </n-space>
    <div class="text-gray-400">
      <n-space class="ml-2">
        <n-icon size="small" class="mt-2"><tags-icon /></n-icon>
        <div v-for="item in articleInfo.tags">
          <router-link :to="'/tag/' + item.id">
            <n-tag type="primary" class="cursor-pointer">{{ item.title }}</n-tag>
          </router-link>
        </div>
      </n-space>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { collectArticle, dislikeArticle, getUserArticleStatus, likeArticle } from '@/api/article';
import {
  CaretUpOutline as LikeIcon,
  CaretDownOutline as DislikeIcon,
  Star as CollectionIcon,
  Pricetags as TagsIcon,
  ChatboxEllipses as CommentIcon,
} from '@vicons/ionicons5';

const props = defineProps<{ articleInfo: ArticleItem }>();

const liked = ref(false);
const disliked = ref(false);
const collected = ref(false);
const likeNum = ref(0);
const collectNum = ref(0);
const router = useRouter();
const { isLogin } = useAuthStore();

const handleLike = () => {
  if (isLogin) {
    likeArticle(props.articleInfo.articleID.toString()).then((res) => {
      if (res.data.status == 0) {
        likeNum.value = liked.value ? likeNum.value - 1 : likeNum.value + 1;
        liked.value = !liked.value;
        if (disliked.value) {
          disliked.value = false;
        }
      } else {
        window.$message.error('现在不能点赞');
      }
    });
  } else {
    router.push({ name: 'login' });
  }
};

const handleDislike = () => {
  if (isLogin) {
    dislikeArticle(props.articleInfo.articleID.toString()).then((res) => {
      if (res.data.status == 0) {
        disliked.value = !disliked.value;
        if (liked.value) {
          likeNum.value--;
          liked.value = false;
        }
      } else {
        window.$message.error('现在不能点踩');
      }
    });
  } else {
    router.push({ name: 'login' });
  }
};

const handleCollect = () => {
  if (isLogin) {
    collectArticle(props.articleInfo.articleID.toString()).then((res) => {
      if (res.data.status == 0) {
        collectNum.value = collectNum.value ? collectNum.value - 1 : collectNum.value + 1;
        collected.value = !collected.value;
      } else {
        window.$message.error('现在不能收藏');
      }
    });
  } else {
    router.push({ name: 'login' });
  }
};

function reload() {
  likeNum.value = props.articleInfo.like;
  collectNum.value = props.articleInfo.collection;
  getUserArticleStatus(props.articleInfo.articleID).then((res) => {
    if (res.data.status == 0) {
      liked.value = res.data.data.liked;
      disliked.value = res.data.data.disliked;
      collected.value = res.data.data.collected;
    }
  });
}
defineExpose({ reload, handleCollect, handleLike, liked, collected });
watch(() => props.articleInfo, reload);
</script>

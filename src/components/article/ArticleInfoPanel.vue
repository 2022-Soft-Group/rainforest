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
        {{ articleInfo.collection }} 次收藏
      </div>
      <collect-button :target-user-id="1"></collect-button>
    </n-space>
    <div class="text-gray-400">
      <n-space class="ml-2">
        <n-icon size="small" class="mt-2"><tags-icon /></n-icon>
        <div v-for="item in articleInfo.tags">
          <router-link :to="'/sections/' + item.id">
            <n-tag type="primary" class="cursor-pointer" target="_blank">{{ item.title }}</n-tag>
          </router-link>
        </div>
      </n-space>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { dislikeArticle, getUserLikeStatus, likeArticle } from '@/api/article';
import {
  CaretUpOutline as LikeIcon,
  CaretDownOutline as DislikeIcon,
  FolderOpen as CollectionIcon,
  Pricetags as TagsIcon,
  ChatboxEllipses as CommentIcon,
} from '@vicons/ionicons5';

const props = defineProps<{ articleInfo: ArticlesListItem }>();
const liked = ref(false);
const disliked = ref(false);
const likeNum = ref(0);
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

watch(
  () => props.articleInfo,
  () => {
    likeNum.value = props.articleInfo.like;
    getUserLikeStatus(props.articleInfo.articleID.toString()).then((res) => {
      if (res.data.status == 0) {
        liked.value = res.data.data.liked;
        disliked.value = res.data.data.disliked;
      }
    });
  },
  {
    deep: true,
  }
);
</script>

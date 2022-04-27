<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <div v-else>
    <router-link tag="a" target="_blank" :to="articleDirection" class="font-bold text-xl m-2 mt-0 hover:text-[#18a058]">
      {{ articleInfo.title }}
    </router-link>
    <div class="flex justify-between mx-2 my-4">
      <n-image
        v-if="articleInfo.image != ''"
        width="200"
        object-fit="cover"
        class="h-40 flex-none rounded-md"
        :src="articleInfo.image"
      ></n-image>
      <div class="w-full ml-4 text-base self-center">
        {{ articleInfo.author + ': ' + articleInfo.description + '...' }}
        <router-link :to="articleDirection"><n-button type="primary" text>查看全文</n-button></router-link>
      </div>
    </div>
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
      </n-space>
      <div class="text-gray-400">
        <n-space class="ml-2">
          <n-icon size="small" class="mt-2"><tags-icon /></n-icon>
          <div v-for="item in articleInfo.tags">
            <n-tag type="primary">{{ item }}</n-tag>
          </div>
        </n-space>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  CaretUpOutline as LikeIcon,
  CaretDownOutline as DislikeIcon,
  FolderOpen as CollectionIcon,
  Pricetags as TagsIcon,
  ChatboxEllipses as CommentIcon,
} from '@vicons/ionicons5';
import { dislikeArticle, getUserLikeStatus, likeArticle } from '@/api/article';
const props = defineProps<{ isLoading: boolean; articleInfo: ArticlesListItem }>();
const articleDirection = ref('/article/' + props.articleInfo.articleID);
const likeNum = ref(0);
const liked = ref(false);
const disliked = ref(false);
const handleLike = () => {
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
};

const handleDislike = () => {
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
};

onMounted(() => {
  likeNum.value = props.articleInfo.like;
  getUserLikeStatus(props.articleInfo.articleID.toString()).then((res) => {
    if (res.data.status == 0) {
      liked.value = res.data.data.liked;
      disliked.value = res.data.data.disliked;
    } else {
      console.log(res.data.data.status);
      window.$message.error('获取用户点赞信息失败');
    }
  });
});
</script>

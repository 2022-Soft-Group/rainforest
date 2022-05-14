<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <n-space vertical v-else>
    <n-thing>
      <template #avatar>
        <n-avatar round :src="userInfo.avatar"></n-avatar>
      </template>
      <template #header>
        <router-link :to="'/user/' + userInfo.id" class="hover:text-[#18a058]">
          {{ userInfo.name }}
        </router-link>
        <span> 回复 {{ comment.toCommentorName }}</span>
      </template>
      <template #header-extra>
        <div class="mt-1">
          <n-button text class="text-gray-400" @click="showCommentBox = !showCommentBox">
            <n-icon size="small"><reply-icon /></n-icon>
            <span v-if="!showCommentBox">回复</span>
            <span v-else>取消回复</span>
          </n-button>
        </div>
      </template>
      <template #description> 回复于{{ comment.createTime }} </template>
      <div class="text-base">{{ comment.content }}</div>
      <template #action>
        <n-space>
          <n-space justify="space-between">
            <div class="mt-1">
              <n-button text class="text-gray-400" @click="handleLikeComments">
                <n-icon size="small"><like-icon /></n-icon>
                {{ comment.like }}
              </n-button>
            </div>
            <div v-if="isFirstLayer" class="mt-1">
              <n-button text class="text-transparent" @click="handleShowComments">
                <n-icon size="small"><comment-icon /></n-icon>
                查看评论
              </n-button>
            </div>
          </n-space>
        </n-space>
      </template>
    </n-thing>
    <comment-box
      v-if="showCommentBox"
      :to-comment-id="comment.commentID"
      :article-id="articleId"
      @comment-success="handleShowComments"
    ></comment-box>
    <div v-if="showSubComments && isFirstLayer" v-for="comment in subComments">
      <comment-item :comment="comment" :article-id="articleId" :class="{ 'ml-10': isFirstLayer }"></comment-item>
    </div>
  </n-space>
  <n-divider />
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/user';
import { ref, watch } from 'vue';
import {
  ChatboxEllipses as CommentIcon,
  ReturnUpBack as ReplyIcon,
  ThumbsUpSharp as LikeIcon,
} from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';
import { getComments, likeComment } from '@/api/article';
const props = defineProps<{ comment: CommentListItem; articleId: number }>();
const userInfo = ref<User>({
  name: '',
  description: '',
  avatar: '',
  id: 0,
  sex: '',
  email: '',
  phone: '',
  coin: 0,
  createTime: '',
  modifyTime: '',
});
const toCommentorName = ref('');
const showCommentBox = ref(false);
const showSubComments = ref(false);
const isFirstLayer = computed(() => {
  return props.comment.toCommentID == null;
});
const subComments = ref<Array<CommentListItem>>([]);
const isLoading = ref(false);

const handleLikeComments = () => {
  likeComment(props.articleId, props.comment.commentID).then((res) => {
    if (res.data.status != 0) {
      window.$message.error('点赞评论失败');
    }
  });
};

const handleShowComments = () => {
  showSubComments.value = !showSubComments.value;
  isLoading.value = true;
  getComments({ size: 100, page: 0, toCommentID: props.comment.toCommentID as number }, props.articleId).then((res) => {
    if (res.data.status == 0) {
      subComments.value = res.data.data.comments;
      isLoading.value = false;
    } else {
      window.$message.error('获取评论失败');
    }
  });
};

watch(
  () => props.comment,
  () => {
    getUserInfo(props.comment.commentorID.toString()).then((res) => {
      userInfo.value = res.data.data.user;
    });
  },
  {
    immediate: true,
  }
);
</script>

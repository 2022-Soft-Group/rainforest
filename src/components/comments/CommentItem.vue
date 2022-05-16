<template>
  <n-space vertical>
    <n-thing>
      <template #avatar>
        <n-avatar round :src="userInfo.avatar"></n-avatar>
      </template>
      <template #header>
        <router-link :to="'/user/' + userInfo.id">{{ userInfo.name }}</router-link>
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
      {{ comment.content }}
      <template #action>
        <n-space>
          <n-space justify="space-between">
            <div class="mt-1">
              <n-button text class="text-gray-400" @click="">
                <n-icon size="small"><like-icon /></n-icon>
                {{ comment.like }}
              </n-button>
            </div>
            <div class="mt-1">
              <n-button text class="text-gray-400" @click="showSubComments = !showSubComments">
                <n-icon size="small"><comment-icon /></n-icon>
                查看评论
              </n-button>
            </div>
          </n-space>
        </n-space>
      </template>
    </n-thing>
    <comment-box v-if="showCommentBox"></comment-box>
    <div v-if="showSubComments" v-for="comment in subComments">
      <n-divider />
      <comment-item :comment="comment" :class="{ 'ml-10': isFirstLayer }"></comment-item>
    </div>
  </n-space>
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
const props = defineProps<{ comment: CommentListItem }>();
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
const subComments: CommentListItem[] = [
  {
    commentorID: 10,
    content: '这是一条评论',
    image: null,
    toCommentID: 10,
    like: 10,
    createTime: '',
    commentID: 15,
  },
  {
    commentorID: 10,
    content: '这是一条评论',
    image: null,
    toCommentID: 10,
    like: 10,
    createTime: '',
    commentID: 16,
  },
  {
    commentorID: 10,
    content: '这是一条评论',
    image: null,
    toCommentID: 10,
    like: 10,
    createTime: '',
    commentID: 17,
  },
];

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

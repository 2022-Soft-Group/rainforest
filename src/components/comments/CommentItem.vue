<template>
  <n-space vertical>
    <n-thing>
      <template #avatar>
        <n-avatar round :src="userInfo.avatar"></n-avatar>
      </template>
      <template #header>
        <router-link :to="'/user/' + userInfo.id" class="hover:text-[#63e2b7]">
          <span v-if="userInfo.id == authorID" class="font-semibold">{{ userInfo.name }}(作者)</span>
          <span v-else>{{ userInfo.name }}</span>
        </router-link>
        <span v-if="comment.toCommentorName != null"> 回复 {{ comment.toCommentorName }}</span>
      </template>
      <template #header-extra>
        <div class="mt-1">
          <n-button v-if="!comment.deleted" text class="text-gray-400" @click="showCommentBox = !showCommentBox">
            <n-icon size="small"><reply-icon /></n-icon>
            <span v-if="!showCommentBox">回复</span>
            <span v-else>取消回复</span>
          </n-button>
        </div>
      </template>
      <template #description> 回复于{{ comment.createTime }} </template>
      <div v-if="!comment.deleted" class="text-base">{{ comment.content }}</div>
      <div v-else class="text-base text-gray-300">{{ comment.content }}</div>
      <div v-if="comment.image != ''">
        <n-image
          :src="(comment.image as string)"
          width="240"
          object-fit="cover"
          class="h-48 flex-none rounded-md"
        ></n-image>
      </div>
      <template #action v-if="!comment.deleted">
        <n-space>
          <n-space justify="space-between">
            <div class="mt-1">
              <n-button text class="text-gray-400" @click="handleLikeComments">
                <n-icon size="small"><like-icon /></n-icon>
                {{ like != 0 ? like : '点赞' }}
              </n-button>
            </div>
            <div v-if="subComments.length != 0" class="mt-1">
              <n-button text class="text-transparent" @click="handleShowComments">
                <n-icon size="small"><comment-icon /></n-icon>
                {{ showSubComments ? '取消查看' : '查看回复' }}
              </n-button>
            </div>
            <div class="mt-1">
              <n-button
                v-if="comment.commentorID == parseInt(userID as string)"
                text
                class="text-transparent"
                @click="handleClickDeleteComment"
              >
                <n-icon size="small"><delete-icon /></n-icon>
                删除评论
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
      :to-commentor-name="userInfo.name"
      @comment-success="handleAddComment"
      ref="commentBox"
    ></comment-box>
    <div v-if="showSubComments">
      <div v-for="(comment, index) in subComments">
        <n-divider></n-divider>
        <comment-item
          :comment="comment"
          :article-id="articleId"
          :comment-order="index"
          :sort-by-time="sortByTime"
          :class="{ 'ml-12': isFirstLayer }"
          @delete-comment="handleDeleteComment"
        ></comment-item>
      </div>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/user';
import { inject, ref, watch } from 'vue';
import {
  ChatboxEllipses as CommentIcon,
  ReturnUpBack as ReplyIcon,
  ThumbsUpSharp as LikeIcon,
  TrashBinSharp as DeleteIcon,
} from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';
import { deleteComment, getComments, likeComment } from '@/api/article';
import CommentBox from './CommentBox.vue';
import { compareByLike, compareByTime } from './CommentUtils';
const props = defineProps<{ comment: CommentListItem; commentOrder: number; articleId: number; sortByTime: boolean }>();
const emits = defineEmits(['delete-comment']);
const userID = localStorage.getItem('userID');
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
  isAdmin: false,
  cover: '',
});

const showCommentBox = ref(false);
const showSubComments = ref(false);
const commentBox = ref<InstanceType<typeof CommentBox> | null>(null);
const authorID = inject('authorID');
const like = ref(0);
const liked = ref(false);
const isFirstLayer = computed(() => {
  return props.comment.toCommentID == null;
});
const subComments = ref<Array<CommentListItem>>([]);

const handleLikeComments = () => {
  if (liked.value) return;
  likeComment(props.articleId, props.comment.commentID).then((res) => {
    if (res.data.status != 0) {
      window.$message.error('点赞评论失败');
    } else {
      liked.value = true;
      like.value += 1;
    }
  });
};

const handleClickDeleteComment = () => {
  deleteComment(props.articleId, props.comment.commentID).then((res) => {
    if (res.data.status != 0) {
      window.$message.error('删除评论失败');
    } else {
      emits('delete-comment', props.commentOrder);
    }
  });
};

const handleDeleteComment = (index: number) => {
  subComments.value.splice(index, 1);
};

const handleShowComments = () => {
  getComments({ size: 100, page: 0, toCommentID: props.comment.commentID as number }, props.articleId).then((res) => {
    if (res.data.status == 0) {
      subComments.value = res.data.data.comments;
      showSubComments.value = !showSubComments.value;
    } else {
      window.$message.error('获取评论失败');
    }
  });
  showCommentBox.value = false;
};

const handleAddComment = () => {
  if (subComments.value.length == 0) {
    handleShowComments();
  } else {
    subComments.value.push(commentBox.value?.commentInfo as CommentListItem);
    showCommentBox.value = false;
  }
  showSubComments.value = true;
};

function sortCommentsInfo(sortByTime: boolean) {
  if (sortByTime) {
    subComments.value.sort(compareByTime);
  } else {
    subComments.value.sort(compareByLike);
  }
}

watch(
  () => props.comment,
  () => {
    getUserInfo(props.comment.commentorID.toString()).then((res) => {
      userInfo.value = res.data.data.user;
    });
    handleShowComments();
    like.value = props.comment.like;
    liked.value = props.comment.liked;
  },
  {
    immediate: true,
  }
);

watch(
  () => props.sortByTime,
  () => sortCommentsInfo(props.sortByTime),
  {
    immediate: true,
  }
);
</script>

<style scoped>
:deep(.n-divider) {
  margin-top: 5px;
  margin-bottom: 7px;
}
</style>

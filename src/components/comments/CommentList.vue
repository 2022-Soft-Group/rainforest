<template>
  <n-card>
    <div v-if="commentsInfo.length == 0">
      <n-empty description="还没有评论哦"></n-empty>
    </div>
    <div v-else>
      <div v-for="(comment, index) in commentsInfo">
        <comment-item
          :comment="comment"
          :comment-order="index"
          :article-id="articleId"
          :sort-by-time="sortByTime"
          @delete-comment="handleDeleteComment"
        ></comment-item>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getComments } from '../../api/article';
import { compareByTime, compareByLike } from './CommentUtils';

const props = defineProps<{ articleId: number; sortByTime: boolean }>();
const commentsInfo = ref<Array<CommentListItem>>([]);
const handleGetComments = () => {
  getComments({ size: 100, page: 0, toCommentID: null }, props.articleId).then((res) => {
    if (res.data.status == 0) {
      commentsInfo.value = res.data.data.comments;
    } else {
      window.$message.error('获取评论失败');
    }
  });
};

const handleAddComments = (comment: CommentListItem) => {
  commentsInfo.value.push(comment);
};

const handleDeleteComment = (index: number) => {
  commentsInfo.value.splice(index, 1);
};

defineExpose({ handleAddComments });

function sortCommentsInfo(sortByTime: boolean) {
  if (sortByTime) {
    commentsInfo.value.sort(compareByTime);
  } else {
    commentsInfo.value.sort(compareByLike);
  }
}

watch(
  () => props.sortByTime,
  (newValue) => {
    sortCommentsInfo(newValue);
  }
);
onMounted(handleGetComments);
</script>

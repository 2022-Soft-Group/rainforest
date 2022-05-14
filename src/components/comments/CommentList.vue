<template>
  <n-card>
    <div v-if="commentsInfo.length == 0">
      <n-empty description="还没有评论哦"></n-empty>
    </div>
    <div v-else>
      <div v-for="comment in commentsInfo">
        <comment-item :comment="comment" :article-id="articleId"></comment-item>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getComments } from '../../api/article';

const props = defineProps<{ articleId: number; sortByTime: boolean }>();
const commentsInfo = ref<Array<CommentListItem>>([]);
const handleGetComments = () => {
  getComments({ size: 100, page: 0, toCommentID: null }, props.articleId).then((res) => {
    if (res.data.status == 0) {
    } else {
      window.$message.error('获取评论失败');
    }
  });
};

defineExpose({ handleGetComments });

function sortCommentsInfo(sortByTime: boolean) {
  if (sortByTime) {
    commentsInfo.value.sort(compareByTime);
  } else {
    commentsInfo.value.sort(compareByLike);
  }
}

const compareByTime = (a: CommentListItem, b: CommentListItem) => {
  var date1 = new Date(a.createTime);
  var date2 = new Date(b.createTime);
  return date1 < date2 ? 1 : -1;
};

const compareByLike = (a: CommentListItem, b: CommentListItem) => {
  return a.like < b.like ? 1 : -1;
};

watch(
  () => props.sortByTime,
  (newValue) => {
    sortCommentsInfo(newValue);
  }
);
onMounted(handleGetComments);
</script>

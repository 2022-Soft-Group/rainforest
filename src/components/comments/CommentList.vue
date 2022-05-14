<template>
  <comment-item :comment="commentInfo"></comment-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const commentInfo = ref<CommentListItem>({
  commentorID: 10,
  content: '这是一条评论',
  image: null,
  toCommentID: null,
  like: 10,
  createTime: '',
  commentID: 15,
});
</script>

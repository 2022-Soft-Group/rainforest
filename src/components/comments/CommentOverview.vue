<template>
  <div class="flex justify-between mb-5">
    <div class="font-bold text-xl">评论区</div>
    <n-button text class="text-gray-600 cursor-pointer" @click="sortByTime = !sortByTime">
      按照{{ sortByTime ? '热度' : '时间' }}排序
      <n-icon class="px-1">
        <sort-icon />
      </n-icon>
    </n-button>
  </div>
  <comment-list :article-id="parseInt(articleId as string)" :sort-by-time="sortByTime" ref="commentList"></comment-list>
  <comment-box
    :to-comment-id="null"
    :article-id="parseInt(articleId as string)"
    :to-commentor-name="null"
    @comment-success="handleAddComment"
    ref="commentBox"
  ></comment-box>
</template>

<script setup lang="ts">
import { FilterSharp as SortIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
import CommentBox from './CommentBox.vue';
import CommentList from './CommentList.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const articleId = ref(route.params.id);
const sortByTime = ref(false);
const commentBox = ref<InstanceType<typeof CommentBox> | null>(null);
const commentList = ref<InstanceType<typeof CommentList> | null>(null);
const handleAddComment = () => {
  commentList.value?.handleAddComments(commentBox.value?.commentInfo as CommentListItem);
};
</script>

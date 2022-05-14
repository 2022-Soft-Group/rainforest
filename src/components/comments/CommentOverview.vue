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
  <comment-list :article-id="parseInt(articleId as string)" :sort-by-time="sortByTime"></comment-list>
  <comment-box
    :to-comment-id="null"
    :article-id="parseInt(articleId as string)"
    @comment-success="handleUploadComment"
  ></comment-box>
</template>

<script setup lang="ts">
import { FilterSharp as SortIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
import CommentList from './CommentList.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const articleId = ref(route.params.id);
const sortByTime = ref(false);
const commentList = ref<InstanceType<typeof CommentList> | null>(null);
const handleUploadComment = () => {
  commentList.value?.handleGetComments();
};
</script>

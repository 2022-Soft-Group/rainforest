<template>
  <div>
    <n-button @click="handleGetComment">请求评论 </n-button>
    {{ commentContent }}
  </div>
</template>

<script setup lang="ts">
import { getHello } from '@/api/user';
import { ref } from 'vue';
const commentContent = ref('0');
function handleGetComment() {
  getHello().then((res) => {
    commentContent.value = res.data;
  });
}
</script>

<style scoped></style>

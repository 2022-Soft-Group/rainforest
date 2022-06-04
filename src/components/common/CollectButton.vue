<template>
  <div
    :class="buttonColor"
    @mouseleave="buttonColor = 'text-gray-400 mt-1'"
    @mouseenter="buttonColor = 'text-gray-500 mt-1'"
    @click="handleCollect"
  >
    <n-icon size="small"><collect-icon /></n-icon>
    <span v-if="collected"> 取消收藏</span>
    <span v-else> 收藏</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Star as CollectIcon } from '@vicons/ionicons5';
import { collectArticle, getCollectStatus, followUser } from '@/api/user';
const props = defineProps<{ articleId: number }>();
const collected = ref(true);
const buttonColor = ref('text-gray-400 mt-1');

const handleCollect = () => {
  collectArticle(props.articleId.toString()).then((res) => {
    if (res.data.status == 0) {
      collected.value = !collected.value;
    } else {
      window.$message.error('现在不能收藏该文章');
    }
  });
};

watch(
  () => collected.value,
  () => {
    getCollectStatus(props.articleId.toString()).then((res) => {
      if (res.data.status == 0) {
        collected.value = res.data.data.isCollected;
      }
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

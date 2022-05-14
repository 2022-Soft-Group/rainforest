<template>
  <n-page-header subtitle="已认证账号">
    <template #title>
      <div class="text-lg font-bold">{{ userFeature.name }}</div>
    </template>
    <template #avatar>
      <n-avatar :src="userFeature.avatar" :size="60" />
    </template>
    <template #extra>
      <n-space>
        <n-button type="default" ghost> 已关注 </n-button>
      </n-space>
    </template>
    <template #footer>
      <div class="text-gray-500 leading-3">
        {{ userFeature.articleNum }} 篇文章 · {{ userFeature.followedNum }} 关注着 · {{ userFeature.likedNum }} 点赞
      </div>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
const props = defineProps<{ userFeature: UserFeature; isLoading: boolean }>();
</script>

<template>
  <n-page-header subtitle="">
    <template #title>
      <div class="text-lg font-bold">{{ userFeature.name }}</div>
    </template>
    <template #avatar>
      <n-avatar :src="userFeature.avatar" :size="60" />
    </template>
    <template #extra>
      <n-space>
        <!-- <follow-button :target-user-id="userFeature.id" /> -->
        <follow-button
          :target-user-id="userFeature.id"
          :change-count="changeCount"
          @change-follow="emits('change-follow')"
        />
      </n-space>
    </template>
    <template #footer>
      <div class="text-gray-500 leading-3">
        {{ userFeature.articleNum }} 篇文章 · {{ userFeature.followedNum }} 关注者 · {{ userFeature.likedNum }} 点赞
      </div>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
const { userID } = useAuthStore();
const props = defineProps<{ userFeature: UserFeature; isLoading: boolean; listType: String; changeCount: number }>();
const emits = defineEmits(['change-follow']);
</script>

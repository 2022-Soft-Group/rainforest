<template>
  <n-page-header>
    <template #title>
      <router-link :to="'/user/' + userFeature.id" target="_blank">
        <div class="text-lg font-bold">{{ userFeature.name }}</div>
      </router-link>
    </template>
    <template #avatar>
      <n-avatar :src="userFeature.avatar" :size="60" id="avatar" />
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
import { RouterLink } from 'vue-router';
const props = defineProps<{ userFeature: UserFeature; isLoading: boolean; listType: String; changeCount: number }>();
const emits = defineEmits(['change-follow']);
</script>

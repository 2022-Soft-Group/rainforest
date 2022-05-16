<template>
  <n-page-header>
    <n-grid :cols="2">
      <n-gi class="text-center">
        <n-statistic label="获得点赞" :value="liked" />
      </n-gi>
      <n-gi class="text-center">
        <n-statistic label="获得收藏" :value="collected" />
      </n-gi>
    </n-grid>
    <template #title>
      <div style="text-decoration: none; color: inherit">我的成就</div>
    </template>

    <template #avatar>
      <n-icon size="30"><checkmark-done-icon /></n-icon>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { CheckmarkDone as CheckmarkDoneIcon } from '@vicons/ionicons5';
const props = defineProps<{ liked: number; collected: number }>();
</script>

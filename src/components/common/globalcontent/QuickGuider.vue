<template>
  <div class="flex m-auto w-60 justify-around">
    <n-button type="primary" size="large" secondary circle>
      <div class="flex h-6 items-center flex-col">
        <n-icon size="24"> <article-icon /> </n-icon>
        <div class="text-xs mt-4">我的文章</div>
      </div>
    </n-button>
    <n-button type="info" size="large" secondary circle>
      <div class="flex h-6 items-center flex-col">
        <n-icon size="24"> <assets-icon /> </n-icon>
        <div class="text-xs mt-4">我的资源</div>
      </div>
    </n-button>
    <n-button type="warning" size="large" secondary circle>
      <div class="flex h-6 items-center flex-col">
        <n-icon size="24"> <collection-icon /> </n-icon>
        <div class="text-xs mt-4">我的收藏</div>
      </div>
    </n-button>
  </div>
  <n-space class="mt-10 w-full" vertical>
    <n-button class="flex mx-auto w-54" type="primary" tertiary @click="handleWriteArticle">
      写文章
      <n-icon><forward-icon /></n-icon>
    </n-button>
    <n-button class="flex mx-auto w-54" type="primary" tertiary @click="handleDraftBox">
      草稿箱
      <n-icon><forward-icon /></n-icon>
    </n-button>
  </n-space>
</template>
<script setup lang="ts">
import {
  Star as CollectionIcon,
  Archive as AssetsIcon,
  ColorWand as ArticleIcon,
  ChevronForwardSharp as ForwardIcon,
} from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleWriteArticle = () => {
  let routeUrl = router.resolve({ name: 'write' });
  window.open(routeUrl.href, '_blank');
};
const handleDraftBox = () => {
  let routeUrl = router.resolve({ name: 'draft' });
  window.open(routeUrl.href, '_blank');
};
</script>

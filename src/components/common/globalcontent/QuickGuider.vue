<template>
  <div class="flex m-auto w-60 justify-around">
    <n-button type="primary" size="large" secondary circle @click="handleWriteArticle">
      <div class="flex flex-col">
        <n-icon size="24"> <article-icon /> </n-icon>
        <div>写文章</div>
      </div>
    </n-button>
    <n-button type="info" size="large" secondary circle>
      <n-icon size="22"> <collection-icon /> </n-icon>
    </n-button>
    <n-button type="warning" size="large" secondary circle>
      <n-icon size="24"> <assets-icon /></n-icon>
    </n-button>
  </div>
</template>
<script setup lang="ts">
import { FolderOpen as CollectionIcon, Archive as AssetsIcon, ColorWand as ArticleIcon } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleWriteArticle = () => {
  router.push({ name: 'write' });
};
</script>

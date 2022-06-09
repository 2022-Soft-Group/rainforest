<template>
  <div class="flex m-auto w-60 justify-around">
    <n-button type="primary" size="large" secondary circle @click="handleUserDirect('article')">
      <div class="flex h-6 items-center flex-col">
        <n-icon size="24"> <article-icon /> </n-icon>
        <div class="text-xs mt-4">我的文章</div>
      </div>
    </n-button>
    <n-button type="info" size="large" secondary circle @click="handleUserDirect('resource')">
      <div class="flex h-6 items-center flex-col">
        <n-icon size="24"> <assets-icon /> </n-icon>
        <div class="text-xs mt-4">我的资源</div>
      </div>
    </n-button>
    <n-button type="warning" size="large" secondary circle @click="handleUserDirect('collection')">
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
    <n-button class="flex mx-auto w-54" type="primary" tertiary @click="handleSignIn">
      <div v-if="!isSign" class="animate-pulse">
        今日未签到
        <n-icon><forward-icon /></n-icon>
      </div>
      <div v-else>
        今日已签到<n-icon><check-icon /> </n-icon>
      </div>
    </n-button>
  </n-space>
</template>
<script setup lang="ts">
import {
  Star as CollectionIcon,
  Archive as AssetsIcon,
  ColorWand as ArticleIcon,
  ChevronForwardSharp as ForwardIcon,
  Checkmark as CheckIcon,
} from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getSignInStatus, signIn } from '@/api/clock';
const isSign = ref(false);
const coinGet = ref(0);
const router = useRouter();
const handleWriteArticle = () => {
  let routeUrl = router.resolve({ name: 'write' });
  window.open(routeUrl.href, '_blank');
};
const handleDraftBox = () => {
  let routeUrl = router.resolve({ name: 'draft' });
  window.open(routeUrl.href, '_blank');
};

const handleUserDirect = (direct: string) => {
  let id = localStorage.getItem('userID');
  if (id != null)
    router.replace({ name: 'userDirect', params: { id: localStorage.getItem('userID'), target: direct } });
  else {
  }
};

const handleSignIn = () => {
  if (isSign.value == true) {
    window.$message.info('已经签到过了');
  } else {
    signIn().then((res) => {
      if (res.data.status == 0) {
        isSign.value = true;
        coinGet.value = res.data.data.getCoin;
        window.$message.success('+ ' + coinGet.value + ' 积分 ！恭喜！');
      }
    });
  }
};

const setSignInStatus = () => {
  getSignInStatus().then((res) => {
    if (res.data.status == 0) {
      isSign.value = res.data.data.isSignIn;
    } else {
      window.$message.error('获取签到状态失败');
    }
  });
};

onMounted(setSignInStatus);
</script>

<template>
  <div class="global-header flex justify-around px-20 py-1 bg-light-200">
    <img :src="BrandImg" class="flex self-center h-9 w-20 ml-10 mr-5" @click="router.push({ name: 'homepage' })" />
    <div class="flex self-end w-70 mr-5">
      <n-tabs type="bar" size="large">
        <n-tab name="首页" @click="router.push({ name: 'homepage' })"> 首页 </n-tab>
        <n-tab name="板块" @click="router.push({ name: 'sections' })"> 板块 </n-tab>
        <n-tab name="专栏" @click="router.push({ name: 'columns' })"> 专栏 </n-tab>
      </n-tabs>
    </div>
    <div class="flex self-center w-80 mr-5">
      <n-input round placeholder="请输入搜索的文章" class="mx-4">
        <template #suffix>
          <n-icon><search-icon /></n-icon>
        </template>
      </n-input>
      <n-button round type="primary">写文章</n-button>
    </div>
    <div class="flex justify-around w-50">
      <hover-container tooltip-content="通知" class="w-36px h-full">
        <n-badge :value="9">
          <n-icon size="25">
            <mail-icon class="text-25px text-[#666]"></mail-icon>
          </n-icon>
        </n-badge>
      </hover-container>
      <hover-container tooltip-content="我的私信" class="w-36px h-full">
        <n-badge :value="1">
          <n-icon size="25">
            <chat-icon class="text-25px text-[#666]"></chat-icon>
          </n-icon>
        </n-badge>
      </hover-container>
      <div class="w-36px h-full pt-2">
        <avatar-dropdown />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BrandImg from '@/assets/svg.svg';
import AvatarDropdown from './AvatarDropdown.vue';
import { ChatbubbleSharp as ChatIcon, Mail as MailIcon, Search as SearchIcon } from '@vicons/ionicons5';
const router = useRouter();
</script>

<style scoped>
.global-header {
  box-shadow: 0 2px 3px rgb(0 21 41 / 8%);
}
</style>

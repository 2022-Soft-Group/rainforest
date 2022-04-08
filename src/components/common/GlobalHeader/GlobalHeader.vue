<template>
  <div class="global-header bg-light-200">
    <div class="flex w-300 m-auto justify-between pr-30 py-1">
      <img :src="BrandImg" class="flex self-center h-9 w-20 ml-10 mr-5" @click="router.push({ name: 'homepage' })" />
      <div class="flex self-end mr-5">
        <n-tabs type="bar" size="large">
          <n-tab name="首页" @click="router.push({ name: 'homepage' })"> 首页 </n-tab>
          <n-tab name="板块" @click="router.push({ name: 'sections' })"> 板块 </n-tab>
          <n-tab name="专栏" @click="router.push({ name: 'columns' })"> 专栏 </n-tab>
        </n-tabs>
      </div>
      <div class="flex self-center w-100 mr-5">
        <n-input
          round
          placeholder="请输入搜索的文章"
          class="mx-4"
          @focus="showButton = false"
          @blur="showButton = true"
        >
          <template #suffix>
            <n-icon><search-icon /></n-icon>
          </template>
        </n-input>
        <n-button v-if="showButton" round type="primary">写文章</n-button>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BrandImg from '@/assets/svg.svg';
import AvatarDropdown from './AvatarDropdown.vue';
import { ChatbubbleSharp as ChatIcon, Mail as MailIcon, Search as SearchIcon } from '@vicons/ionicons5';
const router = useRouter();
const showButton = ref(true);
</script>

<style scoped>
.global-header {
  box-shadow: 0 2px 3px rgb(0 21 41 / 8%);
}
</style>

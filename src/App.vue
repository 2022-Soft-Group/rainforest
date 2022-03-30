<template>
  <div class="global-header flex justify-between px-100 py-1">
    <img :src="BrandImg" class="h-12 w-24" />
    <div class="self-end">
      <n-tabs type="bar" size="large">
        <n-tab name="文章"> 文章 </n-tab>
        <n-tab name="板块"> 板块 </n-tab>
        <n-tab name="社区"> 社区 </n-tab>
      </n-tabs>
    </div>
    <div class="flex justify-around w-50">
      <hover-container tooltip-content="信息" class="w-40px h-full">
        <icon-mdi-account-supervisor-circle class="text-30px text-[#666]"></icon-mdi-account-supervisor-circle>
      </hover-container>
      <hover-container tooltip-content="个人中心" class="w-40px h-full">
        <icon-mdi-message-alert class="text-30px text-[#666]"></icon-mdi-message-alert>
      </hover-container>
      <n-avatar round :src="IconImg" class="self-center"> </n-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import BrandImg from './assets/svg.svg';
import IconImg from './assets/icon.jpg';
</script>

<style scoped>
.global-header {
  box-shadow: 0 2px 3px rgb(0 21 41 / 8%);
}
</style>

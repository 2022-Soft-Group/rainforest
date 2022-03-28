<template>
  <div class="global-header flex-y-center h-full">
    <n-page-header subtitle="也许能成为你的精神家园">
      <template #title> 语林RainForest </template>
      <template #avatar>
        <n-avatar
          round
          :src="IconImg"
          fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        ></n-avatar>
      </template>
    </n-page-header>
  </div>
</template>

<script setup lang="ts">
import IconImg from './assets/icon.jpg';
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  height: 60px;
}
</style>

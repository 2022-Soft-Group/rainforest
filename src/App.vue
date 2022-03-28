<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN" class="h-full">
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import NaiveProvider from './components/common/NaiveProvider.vue';
</script>

<style scoped></style>

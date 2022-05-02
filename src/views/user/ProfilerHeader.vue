<template>
  <n-page-header>
    <n-grid :cols="3">
      <n-gi>
        <n-icon size="30"><Coins /></n-icon>
        <n-statistic :value="[userInfo.coin, '币'].join('')" />
      </n-gi>
      <n-gi>
        <div class="text-justify">
          <n-icon size="30"><Mail /></n-icon>
          <n-statistic :value="userInfo.email" />
        </div>
      </n-gi>
      <n-gi>
        <n-icon size="30"><Book /></n-icon>
        <n-statistic label="" :value="[articleNum, '篇'].join('')" />
      </n-gi>
    </n-grid>
    <template #title>
      <span>
        <span class="text-2xl">{{ userInfo.name }}</span>
        <br /><br />
        <div v-if="userInfo.sex == 1">
          <n-icon size="25"><Male /></n-icon>
        </div>
        <div v-else>
          <n-icon size="25"><Female /></n-icon>
        </div>
      </span>
    </template>

    <template #avatar>
      <n-avatar :size="100" :src="userInfo.avatar" />
    </template>
    <template #extra>
      <n-space>
        <n-button type="info" ghost> 编辑资料 </n-button>
      </n-space>
    </template>
    <template #footer>
      <n-collapse>
        <n-collapse-item title="详细资料">
          <div>{{ userInfo.description }}</div>
        </n-collapse-item>
      </n-collapse>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { HomeSharp, Mail, Book, Transgender, IdCard, Male, Female } from '@vicons/ionicons5';
import { Coins } from '@vicons/fa';

const props = defineProps<{ articleNum: number; userInfo: User }>();
</script>

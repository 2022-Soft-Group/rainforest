<template>
  <n-page-header>
    <n-grid :cols="3">
      <n-gi>
        <n-statistic :value="[userInfo.coin, '币'].join('')">
          <template #prefix>
            <n-icon size="30">
              <Coins />
            </n-icon>
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <div class="text-justify">
          <n-statistic :value="userInfo.email">
            <template #prefix>
              <n-icon size="30"><Mail /></n-icon>
            </template>
          </n-statistic>
        </div>
      </n-gi>
      <n-gi class="text-center">
        <n-statistic label="" :value="[articleNum, '篇'].join('')">
          <template #prefix>
            <n-icon size="30"><Pencil /></n-icon>
          </template>
        </n-statistic>
      </n-gi>
    </n-grid>
    <template #title>
      <span>
        <span class="text-2xl">{{ userInfo.name }}</span>
        <br /><br />
        <div v-if="userInfo.sex == 1">
          <n-icon size="25"><Man /></n-icon>
        </div>
        <div v-else>
          <n-icon size="25"><Woman /></n-icon>
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
        <n-collapse-item title="个人简介">
          <div>{{ userInfo.description }}</div>
        </n-collapse-item>
      </n-collapse>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { HomeSharp, Mail, Pencil, Transgender, IdCard, Man, Woman } from '@vicons/ionicons5';
import { Coins } from '@vicons/fa';

const props = defineProps<{ articleNum: number; userInfo: User }>();
</script>

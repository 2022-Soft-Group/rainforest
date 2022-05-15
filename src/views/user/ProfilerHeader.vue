<template>
  <n-page-header>
    <n-grid :cols="3">
      <n-gi>
        <n-statistic :value="[userInfo.coin, '币'].join('')">
          <template #prefix>
            <n-icon size="30">
              <point-icon />
            </n-icon>
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <div class="text-justify">
          <n-statistic :value="userInfo.email">
            <template #prefix>
              <n-icon size="30"><mail-icon /></n-icon>
            </template>
          </n-statistic>
        </div>
      </n-gi>
      <n-gi class="text-center">
        <n-statistic label="" :value="[articleNum, '篇'].join('')">
          <template #prefix>
            <n-icon size="30"><pencil-icon /></n-icon>
          </template>
        </n-statistic>
      </n-gi>
    </n-grid>
    <template #title>
      <span>
        <span class="text-2xl">{{ userInfo.name }}</span>
        <br /><br />
        <div v-if="userInfo.sex == 1">
          <n-icon size="25"><man-icon /></n-icon>
        </div>
        <div v-else>
          <n-icon size="25"><woman-icon /></n-icon>
        </div>
      </span>
    </template>

    <template #avatar>
      <n-avatar :size="100" :src="userInfo.avatar" />
    </template>
    <template #extra>
      <n-space>
        <n-button type="primary" ghost> 编辑资料 </n-button>
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
import {
  Mail as MailIcon,
  Pencil as PencilIcon,
  Man as ManIcon,
  Woman as WomanIcon,
  Sparkles as PointIcon,
} from '@vicons/ionicons5';

const props = defineProps<{ articleNum: number; userInfo: User }>();
</script>

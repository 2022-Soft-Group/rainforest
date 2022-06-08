<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <div v-else>
    <n-thing>
      <template #avatar>
        <n-avatar>
          <n-icon>
            <file-icon />
          </n-icon>
        </n-avatar>
      </template>
      <template #header>
        <div class="font-bold text-xl m-2 mt-0 text-[#63e2b7]">
          {{ resourceInfo.fileName }}
        </div>
      </template>
      <template #description>{{ resourceInfo.description }} </template>
      <template #header-extra>
        <n-button circle size="small">
          <template #icon>
            <download-icon />
          </template>
        </n-button>
      </template>
      <template #action>
        <n-space justify="space-between" class="w-70">
          <div class="text-gray-400 mt-1">
            <n-icon size="small"><point-icon /></n-icon>
            积分{{ resourceInfo.cost }}
          </div>
          <div class="text-gray-400 mt-1">
            <n-icon size="small"><assets-icon /></n-icon>
            下载次数{{ resourceInfo.downloadTimes }}
          </div>
          <div class="text-gray-400 mt-1">
            <n-icon size="small"><time-icon /></n-icon>
            创建时间{{ resourceInfo.downloadTimes }}
          </div>
        </n-space>
      </template>
    </n-thing>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Sparkles as PointIcon,
  Archive as AssetsIcon,
  FileTrayFull as FileIcon,
  CloudDownload as DownloadIcon,
  TimeOutline as TimeIcon,
} from '@vicons/ionicons5';
const props = defineProps<{ isLoading: boolean; resourceInfo: ResourceItem }>();
</script>

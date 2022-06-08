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
        <div class="flex space-x-4">
          <n-button v-if="curUserID == resourceInfo.ownerID" circle size="small" @click="handleDelete">
            <template #icon>
              <delete-icon />
            </template>
          </n-button>
          <n-button circle size="small" @click="handleDownload">
            <template #icon>
              <download-icon />
            </template>
          </n-button>
        </div>
      </template>
      <template #action>
        <n-space justify="space-between" class="w-100">
          <div class="text-gray-400 mt-1">
            <n-icon size="small"><point-icon /></n-icon>
            积分 {{ resourceInfo.cost }}
          </div>
          <div class="text-gray-400 mt-1">
            <n-icon size="small"><assets-icon /></n-icon>
            下载次数 {{ resourceInfo.downloadTimes }}
          </div>
          <div class="text-gray-400 mt-1">
            <n-icon size="small"><time-icon /></n-icon>
            创建时间 {{ resourceInfo.createTime }}
          </div>
        </n-space>
      </template>
    </n-thing>
  </div>
</template>

<script setup lang="ts">
import {
  Sparkles as PointIcon,
  Archive as AssetsIcon,
  FileTrayFull as FileIcon,
  CloudDownload as DownloadIcon,
  TimeOutline as TimeIcon,
  Close as DeleteIcon,
} from '@vicons/ionicons5';
import { downloadResource, purchaseResource, deleteResource } from '@/api/asset';
const curUserID = Number(localStorage.getItem('userID'));
const emits = defineEmits(['delete-resource']);
const props = defineProps<{ isLoading: boolean; resourceInfo: ResourceItem }>();
const handleDownload = () => {
  purchaseResource(props.resourceInfo.assetID).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('本次花费:' + res.data.data.cost + '积分');
      downloadResource(props.resourceInfo.assetID).then((res) => {
        var blob = new Blob([res.data]);
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = props.resourceInfo.fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      });
    }
  });
};
const handleDelete = () => {
  deleteResource(props.resourceInfo.assetID).then((res) => {
    if (res.data.status == 0) {
      emits('delete-resource');
      window.$message.info('删除资源' + props.resourceInfo.fileName + '成功');
    }
  });
};
</script>

<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <div v-else>
    <router-link
      tag="a"
      target="_blank"
      :to="resourceInfo.downloadUrl"
      class="font-bold text-xl m-2 mt-0 hover:text-[#63e2b7]"
    >
      {{ resourceInfo.fileName }}
    </router-link>
    <n-space justify="space-between">
      <div class="text-gray-400 mt-1">
        <n-icon size="small"><point-icon /></n-icon>
      </div>
      <div class="text-gray-400 mt-1">
        <n-icon size="small"><collection-icon /></n-icon>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Sparkles as PointIcon } from '@vicons/ionicons5';
const props = defineProps<{ isLoading: boolean; resourceInfo: ResourceItem }>();
</script>

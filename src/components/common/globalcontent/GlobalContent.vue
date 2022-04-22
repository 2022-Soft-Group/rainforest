<template>
  <n-back-top :listen-to="target" :bottom="20" :right="10" :visibility-height="0">
    <div style="width: 40px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">
      <n-icon size="36"><backup-icon /></n-icon>
    </div>
  </n-back-top>
  <div class="flex min-h-screen bg-light-500" ref="globalContent">
    <div :class="{ 'w-260': showPadding, 'w-full': !showPadding }" class="h-full mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronUp as BackupIcon } from '@vicons/ionicons5';
const props = defineProps<{ showPadding: boolean }>();
const globarContent = ref<HTMLElement>(null as unknown as HTMLElement);
const target = () => globarContent.value;
</script>

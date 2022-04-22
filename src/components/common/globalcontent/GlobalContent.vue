<template>
  <n-back-top :listen-to="target" :bottom="20" :visibility-height="0">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">回到顶部</div>
  </n-back-top>
  <div class="flex min-h-screen bg-light-500" ref="globalContent">
    <div :class="{ 'w-260': showPadding, 'w-full': !showPadding }" class="h-full mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ showPadding: boolean }>();
const globarContent = ref<HTMLElement>(null as unknown as HTMLElement);
const target = () => globarContent.value;
</script>

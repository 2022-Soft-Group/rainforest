<template>
  <div v-if="showTooltip">
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="flex-center h-full cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { FollowerPlacement } from 'vueuc';

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
}
const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
});

const showTooltip = computed(() => Boolean(props.tooltipContent));
</script>
<style scoped></style>

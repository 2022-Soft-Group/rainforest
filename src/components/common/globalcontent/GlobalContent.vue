<template>
  <div class="flex h-full w-full bg-light-800">
    <div :class="{ 'w-260': showPadding, 'w-full': !showPadding }" class="h-full m-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ showPadding: boolean }>();
</script>

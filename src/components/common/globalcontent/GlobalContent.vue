<template>
  <div class="flex h-screen w-screen bg-light-800">
    <div :class="{ 'w-240': showPadding, 'w-full': !showPadding }" class="h-full m-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ showPadding: boolean }>();
</script>
<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="3">
    <div v-for="item in grids">
      <grid-list-item :grid-info="item" />
    </div>
  </n-grid>
</template>

<script setup lang="ts">
const props = defineProps<{ grids: Array<GridListItem> }>();
</script>

<style scoped></style>

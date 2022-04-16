<template>
  <div v-for="(item, index) in grids">
    <grid-list-item :grid-info="item" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ grids: Array<GridListItem> }>();
</script>

<style scoped></style>

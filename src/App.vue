<template>
  <global-header v-if="route.name != 'login'" />
  <router-view />
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

window.$message = useMessage();
const route = useRoute();
</script>

<style scoped></style>

<template>
  <global-header />
  <router-view />
</template>

<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader/GlobalHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped></style>

<template>
  <div v-for="(item, index) in users">
    <n-divider v-if="index != 0"></n-divider>
    <user-list-item :user-feature="(item as UserFeature)" :is-loading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import UserListItem from './UserListItem.vue';
const props = defineProps<{ users: Array<UserFeature>; isLoading: boolean }>();
</script>

<style scoped></style>

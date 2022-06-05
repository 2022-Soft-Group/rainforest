<template>
  <div v-for="(item, index) in users">
    <n-divider v-if="index != 0"></n-divider>
    <user-list-item
      :user-feature="(item as UserFeature)"
      :is-loading="isLoading"
      :list-type="listType"
      :change-count="changeCount"
      @change-follow="emits('change-follow')"
    />
  </div>
</template>

<script setup lang="ts">
import UserListItem from './UserListItem.vue';
const props = defineProps<{ users: Array<UserFeature>; isLoading: boolean; listType: String; changeCount: number }>();
const emits = defineEmits(['change-follow']);
</script>

<style scoped></style>

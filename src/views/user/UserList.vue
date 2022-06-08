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
  <div v-if="users.length == 0" class="text-center text-gray-500">
    <br />
    <n-icon size="70"><list-icon /></n-icon> <br />
    还没有关注的用户
    <n-divider></n-divider>
  </div>
</template>

<script setup lang="ts">
import { ListOutline as listIcon } from '@vicons/ionicons5';
import UserListItem from './UserListItem.vue';
const props = defineProps<{ users: Array<UserFeature>; isLoading: boolean; listType: String; changeCount: number }>();
const emits = defineEmits(['change-follow']);
</script>

<style scoped></style>

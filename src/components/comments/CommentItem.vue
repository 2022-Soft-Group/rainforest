<template>
  <router-link :to="'/user/' + userInfo.id">
    <n-thing>
      <template #avatar>
        <n-avatar round :src="userInfo.avatar"></n-avatar>
      </template>
      <template #header>{{ userInfo.name }}</template>
      <template #description> {{ userInfo.description }} </template>
    </n-thing>
  </router-link>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/user';
import { onMounted, ref } from 'vue';
const props = defineProps<{ userID: number; comment: Comment }>();
const userInfo = ref<User>({
  name: '',
  description: '',
  avatar: '',
  id: 0,
  sex: '',
  email: '',
  phone: '',
  coin: 0,
  createTime: '',
  modifyTime: '',
});
</script>

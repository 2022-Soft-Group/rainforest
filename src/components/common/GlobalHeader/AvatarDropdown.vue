<template>
  <n-dropdown trigger="hover" :options="options" show-arrow>
    <n-avatar round :src="AvatarImg" @click="handleAvatarClick"> </n-avatar>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h } from 'vue';
import type { Component } from 'vue';
import { NIcon } from 'naive-ui';
import { useRouter } from 'vue-router';
import AvatarImg from '@/assets/avatar.png';
import { PersonCircle as PersonIcon, LogOut as LogOutIcon } from '@vicons/ionicons5';

const router = useRouter();

const handleAvatarClick = () => {
  router.push({ name: 'userhome' });
};

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options = [
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon(PersonIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutIcon),
  },
];
</script>

<style scoped></style>

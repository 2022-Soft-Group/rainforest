<template>
  <n-dropdown trigger="hover" :options="options" show-arrow @select="handleDropdownSelect">
    <router-link to="/user"> <n-avatar round :src="AvatarImg"> </n-avatar></router-link>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h } from 'vue';
import type { Component } from 'vue';
import { NIcon } from 'naive-ui';
import { useRouter } from 'vue-router';
import AvatarImg from '@/assets/avatar.png';
import { PersonCircle as PersonIcon, LogOut as LogOutIcon } from '@vicons/ionicons5';
import { useAuthStore } from '@/store/auth';
import { logout } from '@/api/auth';

const router = useRouter();
const { signOut } = useAuthStore();
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
    key: 'userhome',
    icon: renderIcon(PersonIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutIcon),
  },
];

const handleDropdownSelect = (key: string) => {
  if (key == 'userhome') {
    router.push({ name: 'userhome' });
  } else if (key == 'logout') {
    logout().then((res) => {
      if (res.data.status == 0) {
        localStorage.clear();
        signOut();
        window.$message.info('登出成功');
        router.push({ name: 'login' });
      }
    });
  }
};
</script>

<style scoped></style>

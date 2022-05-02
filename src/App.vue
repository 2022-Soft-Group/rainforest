<template>
  <global-header class="relative z-10" v-if="!isLoginPage" />
  <global-content class="relative z-0" :show-padding="!isLoginPage">
    <router-view />
  </global-content>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { backend, jsonBackend } from '@/api/utils/request';
import { useAuthStore } from '@/store/auth';
import type { AxiosResponse } from 'axios';

const isLoginPage = computed(() => {
  return route.name == 'login';
});

window.$message = useMessage();
const route = useRoute();
const router = useRouter();
const { signOut } = useAuthStore();
backend.interceptors.response.use(
  (response) => {
    handleResponse(response);
  },
  (error) => {
    handleError(error);
  }
);

jsonBackend.interceptors.response.use(
  (response) => {
    handleResponse(response);
  },
  (error) => {
    handleError(error);
  }
);

function handleResponse(response: AxiosResponse) {
  if (response.data.status == 102) {
    window.$message.error('登录认证失败');
    signOut();
    router.push({ name: 'login' });
  } else if (response.data.status != 0) {
    window.$message.error(response.data.message);
    return Promise.reject(response);
  } else return Promise.resolve(response);
}

function handleError(error: any) {
  window.$message.error('网络故障, 请检查网络连接');
  return Promise.reject(error);
}
</script>

<style scoped></style>

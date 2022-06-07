<template>
  <div>
    <global-header class="relative z-300" v-if="!isLoginPage" />
    <global-content class="relative z-0">
      <router-view />
    </global-content>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { backend } from '@/api/utils/request';
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
    if (response.data.status == 102) {
      signOut();
      router.push({ name: 'login' });
    } else if (response.data.status != 0) {
      window.$message.error(response.data.message);
      return Promise.reject(response);
    } else return Promise.resolve(response);
  },
  (error) => {
    window.$message.error('网络故障, 请检查网络连接');
    return Promise.reject(error);
  }
);

function handleResponse(response: AxiosResponse) {}

function handleError(error: any) {}
</script>

<style scoped></style>

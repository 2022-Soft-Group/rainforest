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
    let contentType = response.headers['content-type'];
    if (
      contentType == 'application/json;charset=utf-8' ||
      contentType == 'application/json' ||
      contentType == 'application/x-www-form-urlencoded'
    ) {
      if (response.data.status == 102) {
        signOut();
        router.push({ name: 'login' });
      } else if (response.data.status == 501) {
        router.push({ name: 'error' });
      } else if (response.data.status != 0) {
        window.$message.error(response.data.message);
        return Promise.reject(response);
      } else return Promise.resolve(response);
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

function handleResponse(response: AxiosResponse) {}

function handleError(error: any) {}
</script>

<style scoped></style>

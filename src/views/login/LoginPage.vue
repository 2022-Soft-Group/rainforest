<template>
  <div class="flex flex-col h-screen my-auto items-center bg-cover">
    <div class="relative flex-center wh-full">
      <div class="w-100 p-10 rounded-xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60">
        <n-gradient-text class="align-middle" type="primary" :size="28">语林</n-gradient-text>
        <main class="pt-24px">
          <n-tabs
            class="card-tabs"
            size="large"
            animated
            justify-content="space-evenly"
            :value="tabValue"
            @update-value="handleUpdateTab"
          >
            <n-tab-pane name="signin" tab="账户登录">
              <sign-in-form />
            </n-tab-pane>
            <n-tab-pane name="signup" tab="账户注册">
              <sign-up-form @finish-register="handleFinishRegister" />
            </n-tab-pane>
          </n-tabs>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { backend } from '@/api/utils/request';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const { signOut } = useAuthStore();
const tabValue = ref('signin');

const handleFinishRegister = () => {
  tabValue.value = 'signin';
};

const handleUpdateTab = (value: string) => {
  tabValue.value = value;
};

backend.interceptors.response.use(
  (response) => {
    if (response.data.status == 102) {
      window.$message.error('登录认证失败');
      signOut();
      router.push({ name: 'login' });
    } else if (response.data.status != 0) {
      window.$message.error(response.data.message);
      return Promise.reject(response);
    } else return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);
</script>

<style scoped></style>

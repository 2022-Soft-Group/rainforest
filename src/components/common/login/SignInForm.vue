<template>
  <n-form ref="formRef" :model="model" size="large" :show-label="false">
    <n-form-item path="email">
      <n-input v-model:value="model.email" placeholder="请输入邮箱" />
    </n-form-item>
    <n-form-item path="passwd">
      <n-input v-model:value="model.passwd" type="password" show-password-on="click" placeholder="请输入密码" />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="">忘记密码？</n-button>
      </div>
      <n-button type="primary" size="large" :block="true" :round="true" @click="handleLogin"> 确定 </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { login, hello } from '@/api/user';
import { onMounted, reactive, ref } from 'vue';

const model = reactive({
  email: '',
  passwd: '',
});

const rememberMe = ref(false);

const handleLogin = () => {
  if (rememberMe.value) {
    localStorage.setItem('email', model.email);
    localStorage.setItem('passwd', model.passwd);
  } else {
    localStorage.removeItem('email');
    localStorage.removeItem('passwd');
  }
  login({ uid: model.email, passwd: model.passwd });
};

onMounted(() => {
  model.email = localStorage.getItem('email') as string;
  model.passwd = localStorage.getItem('passwd') as string;
});
</script>

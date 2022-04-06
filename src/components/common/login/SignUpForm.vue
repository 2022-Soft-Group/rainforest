<template>
  <n-form ref="formRef" :model="model" size="large" :show-label="false">
    <n-form-item path="email">
      <n-input v-model:value="model.email" placeholder="邮箱地址" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center">
        <n-input v-model:value="model.code" placeholder="验证码" />
        <div class="w-18px"></div>
        <n-button size="large" @click="handleGetCaptcha"> 获取验证码 </n-button>
      </div>
    </n-form-item>
    <n-form-item path="pwd">
      <n-input v-model:value="model.pwd" placeholder="密码" />
    </n-form-item>
    <n-form-item path="confirmPwd">
      <n-input v-model:value="model.confirmPwd" placeholder="确认密码" />
    </n-form-item>
    <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">确定</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { getCaptcha, register } from '@/api/user';
import { modalDark } from 'naive-ui';
import { reactive, ref } from 'vue';
const model = reactive({
  email: 'gejingze@163.com',
  code: '',
  pwd: '',
  confirmPwd: '',
});

const handleGetCaptcha = () => {
  getCaptcha({ uid: model.email });
};

const handleSubmit = () => {
  register({ uid: model.email, passwd: model.pwd, code: model.code });
};
</script>

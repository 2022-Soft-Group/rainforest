<template>
  <n-form ref="formRef" :model="model" size="large" :show-label="false">
    <n-form-item path="name">
      <n-input v-model:value="model.name" placeholder="昵称" />
    </n-form-item>
    <n-form-item path="email">
      <n-input v-model:value="model.email" placeholder="邮箱地址" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center">
        <n-input v-model:value="model.code" placeholder="验证码" />
        <div class="w-18px"></div>
        <n-button
          size="large"
          :type="valid ? 'primary' : 'default'"
          :disabled="!valid"
          secondary
          @click="handleGetCaptcha"
        >
          获取验证码
          <n-countdown
            v-if="!valid"
            :duration="60000"
            :active="!valid"
            @finish="valid = !valid"
            :render="renderCountdown"
          />
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="passwd">
      <n-input v-model:value="model.passwd" type="password" show-password-on="click" placeholder="密码" />
    </n-form-item>
    <n-form-item path="confirmpasswd">
      <n-input v-model:value="model.confirmpasswd" type="password" show-password-on="click" placeholder="确认密码" />
    </n-form-item>
    <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">确定</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { getCaptcha, register } from '@/api/auth';
import type { CountdownProps } from 'naive-ui';
import { reactive, ref } from 'vue';
const emits = defineEmits(['finish-register']);

const model = reactive({
  name: '',
  email: '',
  code: '',
  passwd: '',
  confirmpasswd: '',
});
const valid = ref(true);
const handleGetCaptcha = () => {
  if (model.name == '') {
    window.$message.warning('昵称不能为空');
  }
  if (model.email == '') {
    window.$message.warning('输入邮箱不能为空');
    return;
  }
  getCaptcha({ email: model.email });
  valid.value = false;
};

const renderCountdown: CountdownProps['render'] = ({ hours, minutes, seconds }) => {
  return `(${String(seconds).padStart(2, '0')})`;
};
const handleSubmit = () => {
  if (model.passwd != model.confirmpasswd) {
    window.$message.warning('两次输入密码不同！');
  }
  register({ name: model.name, email: model.email, passwd: model.passwd, code: model.code }).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('注册成功');
      emits('finish-register');
    }
  });
};
</script>

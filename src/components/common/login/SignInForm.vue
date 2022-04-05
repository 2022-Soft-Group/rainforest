<template>
  <n-form ref="formRef" :model="model" size="large" :show-label="false">
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="请输入邮箱" />
    </n-form-item>
    <n-form-item path="pwd">
      <n-input v-model:value="model.pwd" type="password" show-password-on="click" placeholder="请输入密码" />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true">忘记密码？</n-button>
      </div>
      <n-button type="primary" size="large" :block="true" :round="true"> 确定 </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';

const rememberMe = ref(false);

const model = reactive({
  phone: '15170283876',
  pwd: 'abc123456',
});
</script>

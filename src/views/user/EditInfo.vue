<template>
  <n-button @click="handleInit" ghost type="primary"> 编辑资料 </n-button>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      style="width: 700px"
      title="编辑资料"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="性别：" path="sex">
          <n-radio-group v-model:value="model.sex" name="sexRadioGroup">
            <n-space>
              <n-radio :value="0" :checked="true"> 男 </n-radio>
              <n-radio :value="1" :checked="false"> 女 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="密码：" path="changePasswd">
          <n-button text type="primary" @click="showModal2 = true"> 修改密码 </n-button>
        </n-form-item>

        <n-form-item label="昵称：" path="name">
          <n-input v-model:value="model.name" placeholder="总得有个名字吧" />
        </n-form-item>

        <n-form-item label="邮箱：" path="email">
          <n-input v-model:value="model.email" placeholder="很有用的邮箱" />
        </n-form-item>

        <n-form-item label="电话：" path="phone">
          <n-input v-model:value="model.phone" placeholder="没有用的电话" />
        </n-form-item>

        <n-form-item label="个人简介：" path="description">
          <n-input
            v-model:value="model.description"
            placeholder="这个人很懒，什么也没写."
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>

        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" @click="handleUpdateInfo"> 提交 </n-button>
        </div>
      </n-form>

      <!-- <pre>
        {{ JSON.stringify(model, null, 2) }}
      </pre> -->
    </n-card>
  </n-modal>

  <n-modal v-model:show="showModal2" transform-origin="center">
    <n-card
      style="width: 600px"
      title="编辑资料/修改密码"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <n-form
        ref="formRef"
        :model="model2"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="旧密码：" path="oldPasswd">
          <n-input
            v-model:value="model2.oldPasswd"
            type="password"
            show-password-on="click"
            placeholder="旧密码"
            @input="handlePasswordInput2"
            :maxlength="15"
          />
        </n-form-item>
        <n-form-item label="新密码：" path="newPasswd" ref="newPasswdRef">
          <n-input
            v-model:value="model2.newPasswd"
            type="password"
            show-password-on="click"
            placeholder=">5位字符组合"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item label="确认新密码：" path="newPasswd2" ref="rPasswordFormItemRef" first>
          <n-input
            v-model:value="model2.newPasswd2"
            :disabled="!model2.newPasswd"
            type="password"
            @keydown.enter.prevent
            show-password-on="click"
            placeholder="确认新密码"
          />
        </n-form-item>

        <div style="display: flex; justify-content: center">
          <n-button round type="primary" @click="handleValidateButtonClick"> 确认 </n-button>
        </div>
      </n-form>

      <!-- <pre>
        {{ JSON.stringify(model2, null, 2) }}
      </pre> -->
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type FormInst, useMessage, type FormItemInst, type FormItemRule, type FormRules } from 'naive-ui';
import { updateUserInfo, changePasswd } from '@/api/user';

const props = defineProps<{ userInfo: User }>();
const model = ref({
  sex: 0,
  name: '',
  email: '',
  phone: '',
  description: '',
});
const model2 = ref({
  oldPasswd: '',
  newPasswd: '',
  newPasswd2: '',
});
const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const newPasswdRef = ref<FormItemInst | null>(null);
const message = useMessage();
const showModal = ref(false);
const showModal2 = ref(false);
const emits = defineEmits(['update-info']);

function validatePasswordLength(rule: FormItemRule, value: string): boolean {
  return !(value.length < 5 && value.length > 0);
}

function validatePasswordNotNull(rule: FormItemRule, value: string): boolean {
  return value.length > 0;
}

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!model2.value.newPasswd &&
    model2.value.newPasswd.startsWith(value) &&
    model2.value.newPasswd.length >= value.length
  );
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === model2.value.newPasswd;
}

function validatePasswordNotSame(rule: FormItemRule, value: string): boolean {
  return value !== model2.value.oldPasswd;
}

const rules: FormRules = {
  oldPasswd: [
    {
      validator: validatePasswordNotNull,
      message: '密码不能为空',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordLength,
      message: '密码长度不能小于5',
      trigger: ['input', 'blur'],
    },
  ],
  newPasswd: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      validator: validatePasswordNotNull,
      message: '密码不能为空',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordLength,
      message: '密码长度不能小于5',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordNotSame,
      message: '新旧密码不能一样',
      trigger: ['blur', 'password-input2'],
    },
  ],
  newPasswd2: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ],
};

const handleInit = () => {
  showModal.value = true;
  model.value = {
    sex: props.userInfo.sex,
    name: props.userInfo.name,
    email: props.userInfo.email,
    phone: props.userInfo.phone,
    description: props.userInfo.description,
  };
};

function handlePasswordInput() {
  if (model2.value.newPasswd2) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
  }
}

function handlePasswordInput2() {
  if (model2.value.newPasswd) {
    newPasswdRef.value?.validate({ trigger: 'password-input2' });
  }
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      changePasswd({ oldPasswd: model2.value.oldPasswd, newPasswd: model2.value.newPasswd }).then((res) => {
        if (res.data.status == 0) {
          message.success('修改成功');
          showModal2.value = false;
        } else {
          message.error('旧密码错误');
        }
      });
    } else {
      console.log(errors);
      message.error('验证失败');
    }
  });
}

function handleUpdateInfo() {
  updateUserInfo(model.value).then((res) => {
    if (res.data.status == 0) {
      message.success('修改成功');
      emits('update-info');
      showModal.value = false;
    } else {
      message.error('修改失败');
    }
  });
}
</script>

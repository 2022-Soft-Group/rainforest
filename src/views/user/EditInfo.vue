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
        <n-form-item label="性别" path="sex">
          <n-radio-group v-model:value="model.sex" name="sexRadioGroup">
            <n-space>
              <n-radio :value="0" :checked="true"> 男 </n-radio>
              <n-radio :value="1" :checked="false"> 女 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="昵称" path="name">
          <n-input v-model:value="model.name" placeholder="总得有个名字吧" />
        </n-form-item>

        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="model.email" placeholder="很有用的邮箱" />
        </n-form-item>

        <n-form-item label="电话" path="phone">
          <n-input v-model:value="model.phone" placeholder="没有用的电话" />
        </n-form-item>

        <n-form-item label="个人简介" path="description">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type FormInst, useMessage } from 'naive-ui';
import { updateUserInfo } from '@/api/user';

const props = defineProps<{ userInfo: User }>();
const model = ref({
  sex: 0,
  name: '',
  email: '',
  phone: '',
  description: '',
});
const formRef = ref<FormInst | null>(null);
const message = useMessage();
const showModal = ref(false);
const emits = defineEmits(['update-info']);

const rules = ref({
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue',
  },
  textareaValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 textareaValue',
  },

  radioGroupValue: {
    required: true,
    trigger: 'change',
    message: '请选择 radioGroupValue',
  },
});

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

function handleUpdateInfo() {
  updateUserInfo(model.value).then((res) => {
    if (res.data.status == 0) {
      message.success('修改成功');
      emits('update-info');
    } else {
      message.error('修改失败');
    }
  });
}
</script>

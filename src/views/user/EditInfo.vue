<template>
  <n-button @click="handleInit" ghost type="primary"> 编辑资料 </n-button>
  <n-modal v-model:show="showModal" transform-origin="center" :auto-focus="false">
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
      <template #header-extra>
        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" @click="handleUpdateInfo"> 提交修改 </n-button>
        </div>
      </template>
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
        <n-form-item label="头像：" path="avatar">
          <upload-button class="w-35 h-35 rounded-md" ref="upload" @change="clickUploadImage">
            <div v-if="image == ''" class="m-18 text-gray-400">
              <div>点击上传图片</div>
              <div>.jpeg/.png/.svg</div>
            </div>
            <n-image
              v-else
              preview-disabled
              width="240"
              object-fit="cover"
              :class="avatarUploadClass"
              :src="image"
              @mouseenter="avatarUploadClass = 'h-35 flex-none rounded-md ring-white ring-3'"
              @mouseleave="avatarUploadClass = 'h-35 flex-none rounded-md ring-white ring-2'"
            />
          </upload-button>
          （建议图片长宽比为1:1）
        </n-form-item>
        <n-form-item label="封面：" path="cover">
          <upload-button class="w-75 h-15 mr-2" ref="upload2" @change="clickUploadCover">
            <div v-if="cover == ''" class="m-18 text-gray-400">
              <div>点击上传图片</div>
              <div>.jpeg/.png/.svg</div>
            </div>
            <n-image
              v-else
              preview-disabled
              width="800"
              object-fit="cover"
              :class="coverUploadClass"
              :src="cover"
              @mouseenter="coverUploadClass = 'h-15  flex-none  ring-white ring-2'"
              @mouseleave="coverUploadClass = 'h-15 flex-none  ring-white ring-1'"
            />
          </upload-button>
          (建议图片长宽比为5:1)
        </n-form-item>
        <n-form-item label="性别：" path="sex">
          <n-radio-group v-model:value="model.sex" name="sexRadioGroup">
            <n-space>
              <n-radio :value="1" :checked="true"> 男 </n-radio>
              <n-radio :value="2" :checked="false"> 女 </n-radio>
              <n-radio :value="0" :checked="false"> 未知 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="密码：" path="changePasswd">
          <n-button text type="primary" @click="showModal2 = true"> 修改密码 </n-button>
        </n-form-item>

        <n-form-item label="昵称：" path="name">
          <n-input v-model:value="model.name" placeholder="总得有个名字吧" />
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
          />
        </n-form-item>
        <n-form-item label="新密码：" path="newPasswd" ref="newPasswdRef">
          <n-input
            v-model:value="model2.newPasswd"
            type="password"
            show-password-on="click"
            placeholder=">7位字符组合"
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
import { uploadImage } from '@/api/asset';
import type UploadButton from '@/components/common/UploadButton.vue';

const props = defineProps<{ userInfo: User }>();
const model = ref({
  sex: 0,
  name: '',
  avatar: '',
  phone: '',
  description: '',
  cover: '',
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
const image = ref('');
const cover = ref('');
const avatarUploadClass = ref('h-35 flex-none rounded-md ring-white ring-2');
const coverUploadClass = ref('h-15 flex-none  ring-white ring-1');
let imageID = 0;
let coverID = 0;
const emits = defineEmits(['update-info']);

function validatePasswordLength(rule: FormItemRule, value: string): boolean {
  return !(value.length < 7 && value.length > 0);
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
      message: '密码长度不能小于8',
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
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const upload2 = ref<InstanceType<typeof UploadButton> | null>(null);
// upload.value = {
//   accept: 'image/*,.jpg,.png,.jpeg,.svg',
//   max: 10 * 1024 * 1024,
//   multiple: false,
//   url: 'http://kurino.top/api/asset/uploadimg',
//   headers: {
//     Authorization: localStorage.getItem('token') || '',
//   },
//   fieldName: 'image',

//   filename(name: string) {
//     return name
//       .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
//       .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
//       .replace('/\\s/g', '');
//   },

//   success() {
//     window.$message.success('图片上传成功');
//   },
//   error() {
//     window.$message.error('图片上传失败');
//   },
// };

const handleInit = () => {
  showModal.value = true;
  model.value = {
    sex: props.userInfo.sex,
    name: props.userInfo.name,
    avatar: props.userInfo.avatar,
    phone: props.userInfo.phone,
    description: props.userInfo.description,
    cover: props.userInfo.cover,
  };
  image.value = model.value.avatar;
  cover.value = model.value.cover;
};

const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, 150, 150).then((res) => {
    if (res.data.status == 0) {
      window.$message.success('图片上传成功');
      image.value = res.data.data.url;
      imageID = res.data.data.id;
      model.value.avatar = image.value;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};

const clickUploadCover = () => {
  const file = upload2.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    if (res.data.status == 0) {
      window.$message.success('封面上传成功');
      cover.value = res.data.data.url;
      coverID = res.data.data.id;
      model.value.cover = cover.value;
    } else {
      window.$message.error('封面上传失败');
    }
  });
  upload2.value?.clearFile();
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

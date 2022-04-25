<template>
  <div class="h-full">
    <n-card class="flex m-auto mt-4 rounded-md">
      <n-input
        class="bg-light-300 text-2xl"
        size="large"
        placeholder="请输入文章标题"
        v-model:value="title"
        @change="addTitle"
      ></n-input>
      <div ref="domRef"></div>
    </n-card>
    <upload-button style="width: 20%; margin-top: 10px" :show-file-list="false" ref="upload" @change="clickUpload">
      上传封面图片
    </upload-button>
    <n-button @click="uploadArticle">上传文章</n-button>
    <img :src="image" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import type UploadButton from '@/components/common/UploadButton.vue';
import 'vditor/src/assets/scss/index.scss';
import { uploadImage } from '@/api/asset';
import { addArticle } from '@/api/article';
import Compressor from 'compressorjs';

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();
const title = ref('');
const image = ref('');
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const article = ref<ArticleUpload>({
  title: '',
  content: '',
  description: '',
  image: '',
  tags: [],
  columnID: 0,
});

ref<InstanceType<typeof UploadButton> | null>(null);

function addTitle() {
  let lines = vditor.value?.getValue() as string;
  let content = lines.substring(lines.indexOf('\n') + 1);
  vditor.value?.setValue('# ' + title.value + '\n' + content);
}

function renderVditor() {
  if (!domRef.value) return;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 900,
    theme: 'classic', //主题
    cache: {
      enable: false,
    },
    preview: {
      markdown: {
        toc: true,
      },
      hljs: {
        enable: true,
        style: 'github',
      },
    },
    counter: {
      enable: true,
      type: 'text',
    },
    upload: {
      accept: 'image/*,.wav,.jpg,.png,.gif,.jpeg,.svg',
      max: 10 * 1024 * 1024,
      multiple: false,
      url: 'http://47.96.71.148/api/asset/uploadimg',
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
      fieldName: 'image',

      filename(name) {
        return name
          .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
          .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
          .replace('/\\s/g', '');
      },

      success(editor, msg) {
        let responseData = JSON.parse(msg);
        console.log(responseData);
        let imageUrl = responseData.data.url;
        let succFileText = '';
        if (vditor && vditor.value?.getCurrentMode() === 'wysiwyg') {
          succFileText += `\n <img alt=${imageUrl} src="${imageUrl}">`;
        } else {
          succFileText += `\n![${imageUrl}](${imageUrl})`;
        }
        //将图片路径写入文本
        document.execCommand('insertHTML', false, succFileText);
      },
      error() {
        window.$message.error('图片上传失败');
      },
    },
  });
}

function uploadArticle() {
  article.value.title = title.value;
  article.value.content = vditor.value?.getValue() as string;
  article.value.description = article.value.content
    .substring(article.value.content.indexOf('\n') + 1)
    .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
    .substring(0, 50);
  article.value.image = image.value;
  article.value.tags = [];
  article.value.columnID = 0;
  addArticle(article.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章上传成功');
    } else {
      window.$message.error('文章上传失败');
    }
  });
}

const clickUpload = () => {
  const file = upload.value?.file as File;
  uploadImage(file).then((res) => {
    if (res.data.status == 0) {
      image.value = res.data.data.url;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};

onMounted(() => {
  renderVditor();
});
</script>
<style scoped></style>
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
    <n-divider />

    <n-card class="flex m-auto mt-4 rounded-md">
      <n-h2 class="flex m-4 font-semibold">发布选项</n-h2>
      <n-space justify="space-around">
        <upload-button
          class="w-60 h-48 m-4 border-2 border-dashed rounded-md"
          :show-file-list="false"
          ref="upload"
          @change="clickUploadImage"
        >
          <div v-if="image == ''" class="m-18 text-gray-400">
            <div>点击上传封面</div>
            <div>.jpeg/.png/.svg</div>
          </div>
          <n-image v-else width="240" object-fit="cover" class="h-48 flex-none rounded-md" :src="image" />
        </upload-button>
        <n-space vertical class="my-4 mx-10">
          <n-space>
            <n-radio :checked="!isPublish" @change="isPublish = !isPublish"> 不发布到专栏 </n-radio>
            <n-radio :checked="isPublish" @change="isPublish = !isPublish"> 发布到专栏 </n-radio>
          </n-space>
          <n-select v-if="isPublish"></n-select>
        </n-space>
        <n-space vertical class="my-4 mx-10">
          <n-space>
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-radio :checked="!isPrivate" @change="isPrivate = !isPrivate"> 公开发布 </n-radio>
              </template>
              所有人都能看到你的文章
            </n-tooltip>
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-radio :checked="isPrivate" @change="isPrivate = !isPrivate"> 私有发布 </n-radio>
              </template>
              只有你自己能看到你的文章
            </n-tooltip>
          </n-space>
          <n-space class="pt-30">
            <n-button type="primary" @click="uploadArticle">上传文章</n-button>
            <n-button type="info">保存文章</n-button>
          </n-space>
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import type UploadButton from '@/components/common/UploadButton.vue';
import 'vditor/src/assets/scss/index.scss';
import { uploadImage } from '@/api/asset';
import { addArticle } from '@/api/article';
import { addArticleToColumn } from '@/api/columns';

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();
const title = ref('');
const image = ref('');
let imageID = 0;
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const article = ref<ArticleUpload>({
  title: '',
  content: '',
  description: '',
  image: '',
  tags: [],
  private: false,
  imageID: 0,
});
const isPublish = ref(false);
const selectedColumnID = ref(7);
const isPrivate = ref(false);

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
      accept: 'image/*,.wav,.jpg,.png,.jpeg,.svg',
      max: 10 * 1024 * 1024,
      multiple: false,
      url: 'http://kurino.top/api/asset/uploadimg',
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
  if (title.value == '') {
    window.$message.warning('标题不能为空');
    return;
  }
  article.value.title = title.value;
  article.value.content = vditor.value?.getValue() as string;
  article.value.description = article.value.content
    .substring(article.value.content.indexOf('\n') + 1)
    .replace(new RegExp('!\\[.*]\\(.*\\)', 'g'), '')
    .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
    .substring(0, 50);
  article.value.image = image.value;
  article.value.tags = [];
  article.value.private = isPrivate.value;
  article.value.imageID = imageID;
  addArticle(article.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章上传成功');
      if (isPublish.value) {
        addArticleToColumn(res.data.data.articleID, selectedColumnID.value).then((res) => {
          if (res.data.status != 0) {
            window.$message.error('添加专栏失败');
          }
        });
      }
    } else {
      window.$message.error('文章上传失败');
    }
  });
}

const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    console.log(res);
    if (res.data.status == 0) {
      image.value = res.data.data.url;
      imageID = res.data.data.id;
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

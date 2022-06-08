<template>
  <n-space vertical class="h-full">
    <n-card class="flex m-auto mt-4 rounded-md">
      <n-input
        class="text-2xl"
        size="large"
        placeholder="请输入文章标题"
        v-model:value="title"
        @change="addTitle"
      ></n-input>
      <div ref="domRef"></div>
      <n-card v-if="isLoading" class="h-900"></n-card>
    </n-card>

    <n-card class="flex m-auto mt-4 rounded-md">
      <n-h2 class="flex m-4 font-semibold">发布选项</n-h2>
      <n-space justify="space-around">
        <upload-button class="w-60 h-48 m-4 border-2 border-dashed rounded-md" ref="upload" @change="clickUploadImage">
          <div v-if="image == ''" class="m-18 text-gray-400">
            <div>点击发布封面</div>
            <div>.jpeg/.png/.svg</div>
          </div>
          <n-image
            v-else
            preview-disabled
            width="240"
            object-fit="cover"
            class="h-48 flex-none rounded-md"
            :src="image"
          />
        </upload-button>
        <n-space vertical class="my-4 mx-10 w-65">
          <n-space>
            <n-radio :checked="!isPubTag" @change="isPubTag = !isPubTag"> 不关联到标签 </n-radio>
            <n-radio :checked="isPubTag" @change="isPubTag = !isPubTag"> 关联到标签 </n-radio>
          </n-space>
          <article-add-tag :is-tag="isPubTag" ref="addTags" @tag-finish="handleFinishTag"></article-add-tag>
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
            <n-button type="primary" @click="handlePublish">发布文章</n-button>
            <n-button type="info" @click="handleSave">保存文章</n-button>
          </n-space>
        </n-space>
      </n-space>
    </n-card>
  </n-space>
  <article-resource-modal v-model:show="showModal" @finish-resource="handelFinishResource" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import type UploadButton from '@/components/common/UploadButton.vue';
import 'vditor/src/assets/scss/index.scss';
import { uploadImage } from '@/api/asset';
import { addArticle, addDraft, getArticle, getDraft, modifyArticle, modifyDraft, publishDraft } from '@/api/article';
import { useRoute, useRouter } from 'vue-router';
import type ArticleAddTag from '@/components/article/ArticleAddTag.vue';

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();
const title = ref('');
const image = ref('');
const tags = ref<Array<TagItem>>([]);
let imageID = 0;
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const addTags = ref<InstanceType<typeof ArticleAddTag> | null>(null);
const articleUpload = ref<ArticleUpload>({
  title: '',
  content: '',
  description: '',
  tags: [],
  private: false,
});
const isPubTag = ref(false);
const isPrivate = ref(false);
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const resourceSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0 0 32 272v112a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V272a16.65 16.65 0 0 0-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91c0 .13.05.26.07.39l26.93 127.88a4 4 0 0 1-3.92 4.82H320a15.92 15.92 0 0 0-16 15.82a48 48 0 1 1-96 0A15.92 15.92 0 0 0 192 256H72.65a4 4 0 0 1-3.92-4.82z" fill="currentColor"></path><path d="M368 160H144a16 16 0 0 1 0-32h224a16 16 0 0 1 0 32z" fill="currentColor"></path><path d="M384 224H128a16 16 0 0 1 0-32h256a16 16 0 0 1 0 32z" fill="currentColor"></path></svg>';
const tocSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect x="96" y="48" width="320" height="416" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 128h160"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 208h160"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 288h80"></path></svg>';

function handleFinishTag() {
  addTags.value?.multipleSelectValue.forEach((ele: any) => {
    articleUpload.value.tags.push(ele);
  });
}

const handelFinishResource = (url: string) => {
  let content = vditor.value?.getValue();
  content += '\n' + url + '\n';
  vditor.value?.setValue(content as string);
};

function addTitle() {
  let lines = vditor.value?.getValue() as string;
  let content = lines.substring(lines.indexOf('\n') + 1);
  vditor.value?.setValue('# ' + title.value + '\n' + content);
}

function renderVditor() {
  if (!domRef.value) return;
  isLoading.value = true;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 900,
    theme: 'dark',
    cache: {
      enable: false,
    },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      '|',
      {
        hotkey: '⇧⌘S',
        name: 'toc',
        tipPosition: 's',
        tip: '目录',
        className: 'toc',
        icon: tocSvg,
        click() {
          document.execCommand('insertHTML', false, '[toc]');
        },
      },
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'code',
      'inline-code',
      'insert-after',
      'insert-before',
      '|',
      'upload',
      {
        hotkey: '⇧⌘S',
        name: 'resource',
        tipPosition: 's',
        tip: '添加我的资源',
        className: 'resourceTab',
        icon: resourceSvg,
        click() {
          showModal.value = !showModal.value;
        },
      },
      'link',
      'table',
      'edit-mode',
      '|',
      'undo',
      'redo',
      '|',
      'fullscreen',
      'outline',
      'export',
      'help',
    ],

    preview: {
      markdown: {
        toc: true,
      },
      hljs: {
        enable: true,
        style: 'github',
      },
      theme: {
        path: 'http://kurino.top/cdn/dist/css/content-theme',
        current: 'dark',
      },
    },

    counter: {
      enable: true,
      type: 'text',
    },
    cdn: 'http://kurino.top/cdn',
    after: () => {
      isLoading.value = false;
    },

    upload: {
      accept: 'image/*,.jpg,.png,.jpeg,.svg',
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
        window.$message.error('图片发布失败');
      },
    },
  });
}

const handlePublish = () => {
  let type = route.params.type as string;
  let id = parseInt(route.params.id as string);
  if (type == 'draft') {
    publishDraftToArticle(id);
  } else if (type == 'article') {
    changeArticle(id);
  } else {
    uploadArticle();
  }
};

const handleSave = () => {
  let type = route.params.type as string;
  let id = parseInt(route.params.id as string);
  if (type == 'draft') {
    changeDraft(id);
  } else {
    uploadDraft();
  }
};

// 从修改文章而来，点击发布文章
function changeArticle(id: number) {
  fullfillArticle();
  modifyArticle(articleUpload.value, id).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章修改成功');
      router.push({ name: 'homepage' });
    } else {
      window.$message.error('文章修改失败');
    }
  });
}

// 从草稿箱而来，点击保存文章
function changeDraft(id: number) {
  fullfillArticle();
  modifyDraft(articleUpload.value, id).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章保存成功');
    }
  });
}

// 从写文章和修改文章而来，点击保存文章
function uploadDraft() {
  fullfillArticle();
  addDraft(articleUpload.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章已保存至草稿箱');
      router.push({ name: 'draft' });
    } else {
      window.$message.error('文章保存失败');
    }
  });
}

// 从草稿箱而来，点击发布文章
function publishDraftToArticle(id: number) {
  fullfillArticle();
  publishDraft(id).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章发布成功');
      router.push({ name: 'homepage' });
    }
  });
}

// 从写文章而来，点击发布文章
function uploadArticle() {
  fullfillArticle();
  console.log('upload');
  addArticle(articleUpload.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章发布成功');
      router.push({ name: 'homepage' });
    } else {
      window.$message.error('文章发布失败');
    }
  });
}

function fullfillArticle() {
  if (title.value == '') {
    window.$message.warning('标题不能为空');
    return;
  }
  articleUpload.value.title = title.value;
  articleUpload.value.content = vditor.value?.getValue() as string;
  articleUpload.value.description = articleUpload.value.content
    .substring(articleUpload.value.content.indexOf('\n') + 1)
    .replace(new RegExp('!\\[.*]\\(.*\\)', 'g'), '')
    .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
    .substring(0, 120);
  articleUpload.value.private = isPrivate.value;
  if (image.value != '') {
    articleUpload.value.imageID = imageID;
    articleUpload.value.image = image.value;
  }
}

const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    if (res.data.status == 0) {
      image.value = res.data.data.url;
      imageID = res.data.data.id;
    } else {
      window.$message.error('图片发布失败');
    }
  });
  upload.value?.clearFile();
};

onMounted(() => {
  renderVditor();
  if (route.params.type != undefined && route.params.id != undefined) {
    let type = route.params.type as string;
    let id = route.params.id as string;
    if (type == 'draft') {
      getDraft(id).then((res) => {
        if (res.data.status == 0) {
          title.value = res.data.data.draftInfo.title;
          vditor.value?.setValue(res.data.data.draftContent);
          image.value = res.data.data.draftInfo.thumbnail;
          tags.value = res.data.dara.draftInfo.tags;
        }
      });
    } else if (type == 'article') {
      getArticle(id);
    }
  }
});
</script>
<style scoped></style>

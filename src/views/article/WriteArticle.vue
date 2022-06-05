<template>
  <n-space vertical class="h-full">
    <n-card class="flex m-auto mt-4 rounded-md">
      <n-input
        class="bg-light-300 text-2xl"
        size="large"
        placeholder="请输入文章标题"
        v-model:value="title"
        @change="addTitle"
      ></n-input>
      <div ref="domRef"></div>
      <n-card v-if="isLoading" class="h-900 bg-light-400"></n-card>
    </n-card>

    <n-card class="flex m-auto mt-4 rounded-md">
      <n-h2 class="flex m-4 font-semibold">发布选项</n-h2>
      <n-space justify="space-around">
        <upload-button class="w-60 h-48 m-4 border-2 border-dashed rounded-md" ref="upload" @change="clickUploadImage">
          <div v-if="image == ''" class="m-18 text-gray-400">
            <div>点击发布封面</div>
            <div>.jpeg/.png/.svg</div>
          </div>
          <n-image v-else width="240" object-fit="cover" class="h-48 flex-none rounded-md" :src="image" />
        </upload-button>
        <n-space vertical class="my-4 mx-10">
          <n-space>
            <n-radio :checked="!isColumn" @change="isColumn = !isColumn"> 不发布到专栏 </n-radio>
            <n-radio :checked="isColumn" @change="isColumn = !isColumn"> 发布到专栏 </n-radio>
          </n-space>
          <n-select v-if="isColumn"></n-select>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import type UploadButton from '@/components/common/UploadButton.vue';
import 'vditor/src/assets/scss/index.scss';
import { uploadImage } from '@/api/asset';
import { addArticle, addDraft, getArticle, getDraft, modifyArticle, modifyDraft, publishDraft } from '@/api/article';
import { addArticleToColumn } from '@/api/columns';
import { useRoute, useRouter } from 'vue-router';

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();
const title = ref('');
const image = ref('');
const tags = ref<Array<TagItem>>([]);
let imageID = 0;
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const article = ref<ArticleUpload>({
  title: '',
  content: '',
  description: '',
  tags: [],
  private: false,
});
const isColumn = ref(false);
const selectedColumnID = ref(0);
const isPrivate = ref(false);
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();

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
  modifyArticle(article.value, id).then((res) => {
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
  modifyDraft(article.value, id).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章保存成功');
    }
  });
}

// 从写文章和修改文章而来，点击保存文章
function uploadDraft() {
  fullfillArticle();
  addDraft(article.value).then((res) => {
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
  addArticle(article.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('文章发布成功');
      if (isColumn.value) {
        addArticleToColumn(res.data.data.articleID, selectedColumnID.value).then((res) => {
          if (res.data.status != 0) {
            window.$message.error('添加专栏失败');
          }
        });
      }
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
  article.value.title = title.value;
  article.value.content = vditor.value?.getValue() as string;
  article.value.description = article.value.content
    .substring(article.value.content.indexOf('\n') + 1)
    .replace(new RegExp('!\\[.*]\\(.*\\)', 'g'), '')
    .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
    .substring(0, 120);

  article.value.tags = tags.value;
  article.value.private = isPrivate.value;
  if (image.value != '') {
    article.value.imageID = imageID;
    article.value.image = image.value;
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

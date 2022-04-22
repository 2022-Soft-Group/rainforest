<template>
  <div class="h-full">
    <n-card class="flex m-auto mt-4 rounded-md">
      <n-input placeholder="请输入标题" size="large"></n-input>
      <div ref="domRef"></div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();

function renderVditor() {
  if (!domRef.value) return;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 900,
    theme: 'classic', //主题
    cache: {
      enable: false,
    },
    counter: {
      enable: true,
      type: 'text',
    },
    //上传图片
    upload: {
      //允许的图片后缀
      accept: 'image/*,.wav,.jpg,.png,.gif,.jpeg,.svg',

      max: 10 * 1024 * 1024,

      multiple: false,
      // 上传图片要用的url
      url: '',

      filename(name) {
        return name
          .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
          .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
          .replace('/\\s/g', '');
      },

      //上传成功时执行
      success(editor, msg) {
        let responseData = JSON.parse(msg);
        console.log(responseData);
        let imageUrl = responseData.url;
        let succFileText = '';
        if (vditor && vditor.value?.getCurrentMode() === 'wysiwyg') {
          succFileText += `\n <img alt=${imageUrl} src="${imageUrl}">`;
        } else {
          succFileText += `\n![${imageUrl}](${imageUrl})`;
        }
        //将图片路径写入文本
        document.execCommand('insertHTML', false, succFileText);
        alert('成功');
      },
      error() {
        alert('失败');
      },
    },
  });
}

onMounted(() => {
  renderVditor();
});
</script>
<style scoped></style>

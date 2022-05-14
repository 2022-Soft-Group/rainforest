<template>
  <n-card>
    <n-input-group>
      <n-input v-model:value="comment" :maxlength="250" :show-count="true" placeholder="写下你的评论" />
      <n-button @click="uploadImg = !uploadImg">
        <template #icon>
          <n-icon><image-icon /></n-icon>
        </template>
      </n-button>
      <n-button type="primary" @click="handleUploadComment">发送评论</n-button>
    </n-input-group>
    <upload-button
      v-if="uploadImg"
      class="w-30 h-24 mt-2 border-2 border-dashed rounded-md"
      :show-file-list="false"
      ref="upload"
      @change="clickUploadImage"
    >
      <div v-if="image == ''" class="m-7 mt-9 text-gray-400">
        <div>上传图片</div>
      </div>
      <n-image v-else width="120" object-fit="cover" class="h-24 flex-none rounded-md" :src="image" />
    </upload-button>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Image as ImageIcon } from '@vicons/ionicons5';
import { uploadImage } from '@/api/asset';
import type UploadButton from '@/components/common/UploadButton.vue';
import { commentArticleComments } from '@/api/article';
const props = defineProps<{ articleId: number; toCommentId: number | null }>();
const emits = defineEmits(['comment-success']);
const comment = ref('');
const image = ref('');
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const uploadImg = ref(false);

const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file).then((res) => {
    console.log(res);
    if (res.data.status == 0) {
      image.value = res.data.data.url;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};

const handleUploadComment = () => {
  commentArticleComments(props.articleId, {
    toCommentID: props.toCommentId as number,
    content: comment.value,
    image: image.value,
  }).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('评论发送成功');
      emits('comment-success');
    } else {
      window.$message.info('评论发送失败');
    }
  });
};
</script>

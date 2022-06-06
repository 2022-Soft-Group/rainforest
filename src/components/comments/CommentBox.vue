<template>
  <n-card>
    <n-input-group>
      <n-input v-model:value="content" :maxlength="250" :show-count="true" placeholder="写下你的评论" />
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
      <n-image v-else preview-disabled width="120" object-fit="cover" class="h-24 flex-none rounded-md" :src="image" />
    </upload-button>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Image as ImageIcon } from '@vicons/ionicons5';
import { uploadImage } from '@/api/asset';
import type UploadButton from '@/components/common/UploadButton.vue';
import { commentArticleComments } from '@/api/article';
import { useAuthStore } from '@/store/auth';
import { getNowDate } from './CommentUtils';
const props = defineProps<{ articleId: number; toCommentId: number | null; toCommentorName: string | null }>();
const emits = defineEmits(['comment-success']);
const { userID } = useAuthStore();
const commentInfo = ref<CommentListItem>({
  commentorID: 0,
  content: '',
  image: '',
  toCommentID: 0,
  like: 0,
  createTime: '',
  commentID: 0,
  toCommentorName: '',
  deleted: false,
});
const content = ref('');
const image = ref('');
defineExpose({ commentInfo });
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const uploadImg = ref(false);

const clickUploadImage = () => {
  const file = upload.value?.file as File;
  // 此处上传的图片会在评论区显示
  uploadImage(file, 240, 192).then((res) => {
    if (res.data.status == 0) {
      image.value = res.data.data.url;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};

const handleUploadComment = () => {
  if (content.value == '' && image.value == '') {
    window.$message.info('评论信息不能为空');
    return;
  }
  commentArticleComments(props.articleId, {
    toCommentID: props.toCommentId as number,
    content: content.value,
    image: image.value as string,
  }).then((res) => {
    if (res.data.status == 0) {
      commentInfo.value.commentID = res.data.data.commentID;
      commentInfo.value.commentorID = parseInt(userID);
      commentInfo.value.toCommentID = props.toCommentId;
      commentInfo.value.content = content.value;
      commentInfo.value.image = image.value;
      commentInfo.value.createTime = getNowDate();
      commentInfo.value.toCommentorName = props.toCommentorName as string;
      content.value = '';
      image.value = '';
      uploadImg.value = false;
      emits('comment-success');
    } else {
      window.$message.info('评论发送失败');
    }
  });
};
</script>

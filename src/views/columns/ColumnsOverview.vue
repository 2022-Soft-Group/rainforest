<template>
  <div>
    <n-carousel
      effect="card"
      :current-index="index"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      style="height: 400px"
      :show-dots="true"
      @update-current-index="handleCurrentIndex"
    >
      <n-carousel-item :style="{ width: '60%' }" v-for="item in carouselItem">
        <img
          class="carousel-img cursor-pointer"
          :src="item.imgSrc"
          @click="router.push({ path: `/columns/${item.id}` })"
          :title="item.title"
        />
      </n-carousel-item>
    </n-carousel>
    <div>
      <n-button quaternary class="main-descript">
        <div
          class="font-bold text-xl hover:text-[#63e2b7]"
          @click="router.push({ path: `/columns/${carouselItem[index].id}` })"
        >
          {{ currentTitle }}
        </div></n-button
      >
    </div>

    <n-button strong type="primary" @click="showModal = true" class="main"> 申请开通专栏 </n-button>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      :style="bodyStyle"
      title="新建专栏"
      size="huge"
      :bordered="true"
      positive-text="新建专栏"
      negative-text="取消"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    >
      <n-card class="modalCard">
        <n-h1 class="text-center">新建专栏</n-h1>

        <n-space vertical size="large">
          <n-input v-model:value="title" type="text" placeholder="请输入专栏名称" class="mt-6" />
          <n-input
            type="textarea"
            placeholder="请输入一句话介绍"
            v-model:value="description"
            :autosize="{
              minRows: 3,
            }"
            class="mt-10"
          />
          <div v-if="description.length > 80" class="text-red-600">请输入少于80个字</div>
          <div>
            <upload-button
              class="w-138 h-48 border-2 border-dashed rounded-md"
              :show-file-list="false"
              ref="upload"
              @change="clickUploadImage"
            >
              <div v-if="imgSrc == ''" class="text-center mt-20 text-gray-400">
                <div>点击上传封面</div>
                <div>.jpeg/.png/.svg</div>
              </div>
              <n-image
                v-else
                preview-disabled
                width="240"
                object-fit="cover"
                class="h-48 flex-none rounded-md"
                :src="imgSrc"
              />
            </upload-button>
          </div>
        </n-space>

        <div class="flex-auto mt-10 justify-between">
          <n-button @click="onNegativeClick" class="w-67 mr-2">取消</n-button>
          <n-button type="primary" @click="onPositiveClick" class="w-67" v-if="description.length > 80" disabled
            >新建专栏</n-button
          >
          <n-button type="primary" @click="onPositiveClick" class="w-67" v-else>新建专栏</n-button>
        </div>
      </n-card>
    </n-modal>
  </div>
  <div class="ColumnHomeRecommendation">
    <h3 class="ColumnHomeTitle">
      <div class="ColumnHomeTitle-text">专栏 · 探索</div>
      <div class="ColumnHomeTitle-line"></div>
    </h3>
    <div class="ColumnHomeRecommendation-cardContainer w-full">
      <div v-for="item in columnList" class="m-2 flex-auto">
        <column-list-item :column-info="item"></column-list-item>
      </div>
    </div>
    <n-button class="Button Button-green mb-20" @click="handleRequest"> 浏览更多 </n-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { addColumn, getColumnListRecommand } from '@/api/columns';
import type UploadButton from '@/components/common/UploadButton.vue';
import { uploadImage } from '@/api/asset';
const index = ref(0);
const router = useRouter();
const columnList = ref<Array<ColumnListItem>>([]);
const carouselItem = [
  {
    imgSrc: 'https://bsmedia.business-standard.com/_media/bs/img/article/2019-09/20/full/1568958346-1806.jpg',
    id: 15,
    title: 'iOS到底强在哪里',
  },
  {
    imgSrc: 'http://n.sinaimg.cn/finance/transform/55/w550h305/20180528/USaQ-hcaquev2296731.jpg',
    id: 20,
    title: '区块链的前世与今生',
  },
  {
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    id: 15,
    title: 'iO',
  },
  {
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
    id: 15,
    title: 'i',
  },
];
let currentPage = 0;
const currentTitle = computed(() => {
  return carouselItem[index.value].title;
});
function handleCurrentIndex(currentIndex: number, lastIndex: number) {
  index.value = currentIndex;
}
onMounted(reload);
function reload() {
  getColumnListRecommand({ size: 8, page: currentPage }).then((res) => {
    if (res.data.status == 0) {
      columnList.value = res.data.data.columnInfos as Array<ColumnListItem>;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}
function handleRequest() {
  getColumnListRecommand({ size: 10, page: ++currentPage }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.columnInfos.forEach((element: any) => {
        columnList.value.push(element);
      });
    }
  });
}
const bodyStyle = { width: '600px' };
const showModal = ref(false);
function onNegativeClick() {
  showModal.value = false;
}
//上传图片
let imageID = 0;
const upload = ref<InstanceType<typeof UploadButton> | null>(null);
const clickUploadImage = () => {
  const file = upload.value?.file as File;
  uploadImage(file, null, null).then((res) => {
    console.log(res);
    if (res.data.status == 0) {
      imgSrc.value = res.data.data.url;
      imageID = res.data.data.id;
    } else {
      window.$message.error('图片上传失败');
    }
  });
  upload.value?.clearFile();
};
const title = ref('');
const description = ref('');
const imgSrc = ref('');

const column = ref<ColumnUpload>({
  cover: '',
  title: '',
  description: '',
  private: 0,
});
function onPositiveClick() {
  if (title.value == '') {
    window.$message.warning('标题不能为空');
  }
  column.value.title = title.value;
  column.value.description = description.value;
  column.value.cover = imgSrc.value;
  showModal.value = false;
  addColumn(column.value).then((res) => {
    if (res.data.status == 0) {
      window.$message.info('创建专栏成功');
    } else {
      window.$message.error('创建专栏失败');
    }
  });
}
</script>

<style scoped>
.carousel-img {
  margin-top: 15px;
  object-fit: fill;
}
.ColumnHomeTop {
  background: url() 50% no-repeat;
  height: 470px;
  position: relative;
}
.ColumnHomeTop:before {
  background: url(https://static.zhihu.com/heifetz/assets/bg@2x.033e5b2d.png) repeat-x;
  background-size: 20px 450px;
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}
.ColumnHomeTop-logo {
  background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_JF3LxhTeQi-N-8tXh5XEazs24rri3-2E_w&usqp=CAU)
    50% no-repeat;
  background-size: 700px 379px;
  height: 0;
  left: 50%;
  margin: 0 0 0 -65px;
  overflow: hidden;
  padding-top: 179px;
  position: absolute;
  top: 152px;
  width: 129px;
}
.ColumnHomeTop-subTitle {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.5em;
  line-height: 24px;
  margin: 0;
  position: absolute;
  text-align: center;
  top: 350px;
  width: 100%;
}
.ColumnHomeTop-requestButton {
  font-size: 14px;
  left: 50%;
  line-height: 12px;
  margin-left: -36px;
  position: absolute;
  top: 466px;
}
.Button--link,
.Button--plain {
  height: auto;
  padding: 0;
  line-height: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
}
.Button--green {
  color: #63e2b7;
  border-color: #63e2b7;
}
.ColumnHomeRecommendation {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 48px auto 0;
  width: 888px;
}
.ColumnHomeTitle {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 3px 32px;
  width: 100%;
}
.ColumnHomeTitle-text {
  font-size: 14px;
  line-height: 22px;
  margin: 0 16px;
  font-weight: 600;
  font-synthesis: style;
}
.ColumnHomeTitle-line {
  display: none;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 1px;
}
.ColumnHome-HomeBttom {
  margin-top: 48px;
}
.ColumnHomeBottom {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: url(https://static.zhihu.com/heifetz/assets/bg@2x.033e5b2d.png) repeat-x;
  background-size: 20px 450px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-top: 134px;
}
.ColumnHomeBottom-title {
  border: solid #97ffd8;
  border-width: 1px 0;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 14px;
  padding: 26px 0;
  text-align: center;
  white-space: nowrap;
  width: 345px;
}

.ColumnHomeRecommendation-cardContainer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.ColumnHomeRecommendation-card {
  margin: 0 8px 16px;
}
.ColumnHomeColumnCard {
  border-radius: 4px;
  -webkit-box-shadow: 0 8px 18px rgb(0 0 0 / 6%);
  box-shadow: 0 8px 18px rgb(0 0 0 / 6%);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 26px 0 23px;
  width: 206px;
}
.ColumnHomeColumnCard {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
}
a {
  color: inherit;
  text-decoration: none;
}
.ColumnHomeColumnCard-info {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  padding: 0 16px;
}
.ColumnHomeColumnCard-title {
  margin-top: 16px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 600;
  font-synthesis: style;
}
.ColumnHomeColumnCard-description {
  font-size: 14px;
  line-height: 21px;
  margin-top: 7px;
  text-align: center;
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ColumnHomeColumnCard-meta {
  font-size: 14px;
  margin-top: 14px;
}
.ColumnHomeColumnCard-meta {
  color: grey;
}
.ColumnHomeColumnCard-followButton {
  margin-top: 15px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.Button--green {
  color: #63e2b7;
  border-color: #63e2b7;
}
.Button--green:hover {
  background-color: rgba(133, 144, 166, 0.06);
}
.Button {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;

  border-radius: 3px;
}

.Button:focus {
  outline: none;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}

.Avatar {
  background: #fff;
  border-radius: 50%;
}
.ColumnHomeRecommendation-refreshButton {
  margin-top: 20px;
  width: 98px;
  margin-bottom: 20px;
}
.ColumnHomeRecommendation-refreshButton {
  color: #444;
}
.ColumnHomeRecommendation-refreshButton {
  border-color: #444;
}
.Button--grey {
  color: #8590a6;
  border-color: #8590a6;
}
.main {
  text-align: center;
  margin-top: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.main-descript {
  text-align: center;
  margin-top: 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modalCard {
  width: 100px;
  height: 600px;
  border-radius: 10px;
}
</style>

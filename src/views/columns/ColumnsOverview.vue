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
        <n-image
          class="carousel-img cursor-pointer rounded-lg"
          object-fit="cover"
          preview-disabled
          :src="item.imgSrc"
          @click="router.push({ path: `/columns/${item.id}` })"
          :title="item.title"
        />
      </n-carousel-item>
    </n-carousel>
    <div>
      <n-button quaternary class="main-descript">
        <div class="font-bold text-xl hover:text-[#63e2b7]" @click="handleClick">
          {{ currentTitle }}
        </div></n-button
      >
    </div>

    <add-column-button></add-column-button>
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
import { addColumn, getColumnListRecommand, getDevHot } from '@/api/columns';
import type UploadButton from '@/components/common/UploadButton.vue';
import { uploadImage } from '@/api/asset';
const index = ref(0);
const router = useRouter();
const columnList = ref<Array<ColumnListItem>>([]);
const carouselItems = ref<Array<ads>>([]);
const carouselItem = [
  {
    imgSrc: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    id: 62,
    title: 'ios相关知识',
  },
  {
    imgSrc: 'https://img2.baidu.com/it/u=3782122321,3540650825&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=450',
    id: 64,
    title: '算法学习日记',
  },
  {
    imgSrc:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.jikewenku.com%2Fwp-content%2Fuploads%2F2018%2F08%2F2018081912070473-800x450.jpg&refer=http%3A%2F%2Fcdn.jikewenku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657390682&t=da3604c1e0b27d18b4902fc0dc8bb756',
    id: 59,
    title: 'Mysql学习笔记',
  },
  {
    imgSrc:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-7611629ee07375f5a14acac9787d68cb_1200x500.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657390385&t=fcf47fa20cb785adbc5e09b4d73dd492',
    id: 56,
    title: 'Javascript学习',
  },
];
const handleClick = () => {
  window.open(`/columns/${carouselItem[index.value].id}`);
};
let currentPage = 0;
const currentTitle = computed(() => {
  return carouselItem[index.value].title;
});
// const currentTitle = carouselItems.value[index.value].title;
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
  getDevHot({ size: 4, page: currentPage }).then((res) => {
    if (res.data.status == 0) {
      carouselItems.value = res.data.data.ads as Array<ads>;
    } else {
      window.$message.error('获取推荐列表失败');
    }
  });
}
function handleRequest() {
  getColumnListRecommand({ size: 4, page: ++currentPage }).then((res) => {
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

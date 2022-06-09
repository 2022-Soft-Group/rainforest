<template>
  <n-carousel autoplay draggable class="h-40">
    <n-carousel-item v-for="item in carouselItem">
      <div class="absolute w-25 left-3 font-bold text-light-500">{{ item.title }}</div>
      <!-- < object-fit="cover" class=" rounded-md" :src="(img as string)" /> -->
      <n-image
        class="cursor-pointer max-h-40 rounded-lg"
        object-fit="cover"
        preview-disabled
        :src="item.imgSrc"
        @click="router.push({ path: `/columns/${item.id}` })"
        :title="item.title"
      />
    </n-carousel-item>
  </n-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
const router = useRouter();

const imgs = ref<Array<String>>([
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
]);
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
</script>

<template>
  <n-carousel autoplay draggable>
    <n-carousel-item v-for="(img, index) in imgs">
      <div class="absolute w-25 left-3 font-bold text-light-500"></div>
      <n-image object-fit="cover" class="max-h-40 rounded-md" :src="(img as string)" />
    </n-carousel-item>
  </n-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const imgs = ref<Array<String>>([
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
]);

const name = ref<Array<String>>([]);
</script>

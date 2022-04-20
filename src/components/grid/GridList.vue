<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="3">
    <!-- <div v-for="item in grids">
      <grid-list-item :grid-info="item" />
    </div> -->
    <n-grid-item v-for="item in grids">
      <div class="h-25 bg-light-500">
        <div class="grid-title">
          <router-link :to="gridDirection" class="font-bold text-xl m-2 text-green-600">
            {{ item.title }}
          </router-link>
        </div>
        <div class="flex justify-between mx-2 my-2">
          <n-image class="img" src="../../../public/grid/html5.png"></n-image>
          <div class="user-info-cont">safdsfasdfadsf</div>
        </div>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
const route = useRouter();
//const props = defineProps<{ grids: Array<GridListItem> }>();
const gridDirection = '/homepage';
const grids: GridListItem[] = [
  {
    title: '【学习 HTML】',
  },
  {
    title: '【学习 HTML5】',
  },
  {
    title: '【学习 CSS】',
  },
];
</script>

<style scoped>
.user-info-cont {
  padding-left: 10px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
.grid-title {
  padding-top: 15px;
}
.link {
  padding: 5px;
}
.img {
  width: 50px;
  height: 35px;
  padding-left: 10px;
}
</style>

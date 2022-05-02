<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="2">
    <!-- <div v-for="item in grids">
      <grid-list-item :grid-info="item" />
    </div> -->
    <n-grid-item v-for="item in tags">
      <div class="tagInfo">
        <div class="grid-title">
          <router-link :to="'/tag/' + item.id" target="_blank" class="font-bold text-xl hover:text-[#18a058] m-2 pl-2">
            {{ item.title }}
          </router-link>
        </div>
        <div class="flex justify-between mx-2 my-2">
          <n-image class="img" :src="item.img"></n-image>
          <div class="user-info-cont">{{ item.description }}</div>
        </div>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const route = useRouter();
const props = defineProps<{ tags: Array<TagItem> }>();
</script>

<style scoped>
.user-info-cont {
  padding-left: 10px;
  flex: 1;
  font-size: 14px;
  color: #666;
}
.link {
  padding: 5px;
}
.img {
  width: 50px;
  height: 35px;
  padding-left: 10px;
}

.tagInfo {
  width: 385px;
  padding: 10px;
  align-items: center;
  --tw-bg-opacity: 1;
  background-color: rgba(242, 242, 242, var(--tw-bg-opacity));
  border-radius: 10px;
  /* --tw-text-opacity: 1;
  color: rgba(24, 160, 88, var(--tw-text-opacity)); */
}
</style>

<template>
  <n-list :style="{ 'margin-top': 0, 'margin-bottom': 0 }">
    <template #header>
      <div class="font-bold text-xl text-yellow-400">作者热榜</div>
    </template>
    <n-list-item v-for="item in hotUsers">
      <router-link :to="'/user/' + item.id">
        <n-thing>
          <template #avatar>
            <n-avatar round :src="item.avatar"></n-avatar>
          </template>
          <template #header>
            <div>{{ item.name }}</div>
          </template>
          <template #description>
            <div class="flex text-gray-400">
              <div>粉丝数{{ item.followedNum }}</div>
              <div class="ml-3">获赞{{ item.likedNum }}</div>
            </div>
          </template>
        </n-thing>
      </router-link>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { getUserRankList } from '@/api/user';

import { onMounted, ref } from 'vue';
const hotUsers = ref<Array<UserFeature>>([]);
const size = 5;
onMounted(() => {
  getUserRankList({ size }).then((res) => {
    if (res.data.status == 0) {
      hotUsers.value = res.data.data.users;
    }
  });
});
</script>

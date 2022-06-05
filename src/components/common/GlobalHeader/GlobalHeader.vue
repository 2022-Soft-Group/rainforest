<template>
  <div class="global-header w-full top-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60">
    <div class="flex w-300 m-auto justify-between pr-30 py-1">
      <router-link to="/homepage" class="flex self-center h-9 w-20 ml-10 mr-5">
        <img :src="BrandImg" />
      </router-link>
      <div class="text-base text-gray-300 font-medium text-center">
        <router-link
          class="inline-block px-4 py-2"
          :class="{
            'text-[#63e2b7]': homepageSelected,
            'border-[#63e2b7]': homepageSelected,
            'border-b-2': homepageSelected,
          }"
          to="/homepage"
        >
          首页
        </router-link>
        <router-link
          class="inline-block px-4 py-2"
          :class="{
            'text-[#63e2b7]': sectionSelected,
            'border-[#63e2b7]': sectionSelected,
            'border-b-2': sectionSelected,
          }"
          to="/sections"
        >
          板块
        </router-link>
        <router-link
          class="inline-block px-4 py-2"
          :class="{
            'text-[#63e2b7]': columnSelected,
            'border-[#63e2b7]': columnSelected,
            'border-b-2': columnSelected,
          }"
          to="/columns"
        >
          专栏
        </router-link>
      </div>
      <div class="flex self-center w-110 mr-5">
        <search-dropdown />
      </div>
      <div class="flex justify-around w-50">
        <message-dropdown :messages="messages" :count="messagesCount" @mark-read-all="handleMarkReadAll" />
        <trend-dropdown :messages="trends" :count="trendsCount" @mark-read-all="" />
        <avatar-dropdown />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BrandImg from '/resource/svg.svg';
import AvatarDropdown from './AvatarDropdown.vue';

import { getMessages, markReadMessage } from '@/api/message';
import { useAuthStore } from '@/store/auth';

const route = useRoute();
const router = useRouter();

const { isLogin } = useAuthStore();
// const tabValue = ref("homepage");
// const isSelectedTab = computed(()=>{
//   return route.name == tabValue.value;
// })

const homepageSelected = computed(() => {
  return route.fullPath.split('/')[1] == 'homepage';
});

const sectionSelected = computed(() => {
  return route.fullPath.split('/')[1] == 'sections';
});

const columnSelected = computed(() => {
  return route.fullPath.split('/')[1] == 'columns';
});

const messages = ref<Array<MessageInfo>>([]);
const trends = ref<Array<MessageInfo>>([]);
const messagesCount = computed(() => {
  return messages.value.length;
});
const trendsCount = computed(() => {
  return trends.value.length;
});

const handleMarkReadAll = () => {
  messages.value.forEach((elm) => {
    markReadMessage(elm.msgID);
  });
  messages.value.length = 0;
};

function getUserMessages() {
  getMessages().then((res) => {
    messages.value = res.data.data.messages as Array<MessageInfo>;
  });
}

//TODO: implements get trend api
function getUserTrends() {}

onMounted(() => {
  if (isLogin) {
    getUserMessages();
    getUserTrends();
    window.setInterval(() => {
      setTimeout(getUserMessages, 0);
      setTimeout(getUserTrends, 0);
    }, 30000);
  }
});

// 每隔30s获取消息和动态
</script>

<style scoped>
.global-header {
  position: fixed;
  box-shadow: 0 3px 5px rgba(0, 10, 20, 0.08);
}
</style>

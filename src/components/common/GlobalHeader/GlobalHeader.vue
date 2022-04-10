<template>
  <div class="global-header sticky top-0 bg-light-200">
    <div class="flex w-300 m-auto justify-between pr-30 py-1">
      <router-link to="/homepage" class="flex self-center h-9 w-20 ml-10 mr-5">
        <img :src="BrandImg" />
      </router-link>
      <div class="flex self-end mr-5">
        <n-tabs type="bar" size="large" animated :value="(tabValue as string)">
          <n-tab name="homepage"><router-link to="/homepage">首页</router-link></n-tab>
          <n-tab name="sections"> <router-link to="/sections">板块</router-link></n-tab>
          <n-tab name="columns"><router-link to="/columns">专栏</router-link> </n-tab>
        </n-tabs>
      </div>
      <div class="flex self-center w-100 mr-5">
        <n-input
          round
          placeholder="请输入搜索的文章"
          class="mx-4"
          @focus="showButton = false"
          @blur="showButton = true"
        >
          <template #suffix>
            <n-icon><search-icon /></n-icon>
          </template>
        </n-input>
        <n-button v-if="showButton" round type="primary">写文章</n-button>
      </div>
      <div class="flex justify-around w-50">
        <div class="flex-center h-full cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]">
          <message-dropdown :messages="messages">
            <n-badge :value="9">
              <n-icon size="25">
                <mail-icon class="text-25px text-[#666]"></mail-icon>
              </n-icon>
            </n-badge>
          </message-dropdown>
        </div>
        <div class="flex-center h-full cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]">
          <n-badge :value="1">
            <n-icon size="25">
              <notification-icon class="text-25px text-[#666]"></notification-icon>
            </n-icon>
          </n-badge>
        </div>
        <div class="w-36px h-full pt-2">
          <avatar-dropdown />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BrandImg from '@/assets/svg.svg';
import AvatarDropdown from './AvatarDropdown.vue';
import { NotificationsSharp as NotificationIcon, Mail as MailIcon, Search as SearchIcon } from '@vicons/ionicons5';
import { computed } from '@vue/reactivity';

const route = useRoute();
const showButton = ref(true);

const tabValue = computed(() => {
  if (route.name == 'userhome') {
    return '';
  } else return route.name;
});

const messages = ref<Array<MessageInfo>>([]);

//TODO: implements get message api
function getMessages() {}

//TODO: implements get trend api
function getTrends() {}

onMounted(() => {
  getMessages();
  getTrends();
});

// 每隔30s获取消息和动态
window.setInterval(() => {
  setTimeout(getMessages, 0);
  setTimeout(getTrends, 0);
}, 30000);
</script>

<style scoped>
.global-header {
  box-shadow: 0 3px 5px rgba(0, 10, 20, 0.08);
}
</style>

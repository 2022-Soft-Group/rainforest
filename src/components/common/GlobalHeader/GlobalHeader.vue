<template>
  <div class="global-header sticky top-0 bg-light-200">
    <div class="flex w-300 m-auto justify-between pr-30 py-1">
      <router-link to="/homepage" class="flex self-center h-9 w-20 ml-10 mr-5">
        <img :src="BrandImg" />
      </router-link>
      <div class="flex self-center mr-5">
        <n-button text name="homepage">
          <router-link class="cursor-pointer rounded-sm px-5 py-3 hover:bg-gray-100" to="/homepage"> 首页 </router-link>
        </n-button>
        <n-button text name="homepage">
          <router-link class="cursor-pointer rounded-sm px-5 py-3 hover:bg-gray-100" to="/sections"> 板块 </router-link>
        </n-button>
        <n-button text name="homepage">
          <router-link class="cursor-pointer rounded-sm px-5 py-3 hover:bg-gray-100" to="/columns"> 专栏 </router-link>
        </n-button>
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
        <message-dropdown :messages="messages" :count="messagesCount" @mark-read="" />
        <trend-dropdown :messages="messages" :count="messagesCount" @mark-read="" />
        <avatar-dropdown />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BrandImg from '@/assets/svg.svg';
import AvatarDropdown from './AvatarDropdown.vue';
import { Search as SearchIcon } from '@vicons/ionicons5';
import { getMessages } from '@/api/user';

const route = useRoute();
const showButton = ref(true);
const tabValue = ref(route.name);

const messages = ref<Array<MessageInfo>>([]);
const messagesCount = ref(0);

const handleMardRead = () => {};

function getUserMessages() {
  getMessages().then((res) => {
    messages.value = res.data.data.messages as Array<MessageInfo>;
    messagesCount.value = messages.value.length;
  });
}

//TODO: implements get trend api
function getUserTrends() {}

onMounted(() => {
  getUserMessages();
  getUserTrends();
});

// 每隔30s获取消息和动态
window.setInterval(() => {
  setTimeout(getUserMessages, 0);
  setTimeout(getUserTrends, 0);
}, 30000);
</script>

<style scoped>
.global-header {
  box-shadow: 0 3px 5px rgba(0, 10, 20, 0.08);
}
</style>

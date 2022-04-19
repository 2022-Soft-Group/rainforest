<template>
  <n-popselect trigger="manual" :show="showPopover" @clickoutside="showPopover = false">
    <div class="flex-center h-full cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]" @click="handleClickLoad">
      <n-badge :value="count">
        <n-icon size="25">
          <trend-icon class="text-gray-600 hover:text-gray-700"></trend-icon>
        </n-icon>
      </n-badge>
    </div>
    <template #empty>
      <n-list>
        <n-list-item v-for="item in messagesList">
          <router-link :to="'/user/' + item.userID" class="hover:text-green-600">
            {{ item.userName }}
          </router-link>
          {{ item.actions }}了你的文章
          <router-link :to="'/article/' + item.articleID" class="hover:text-green-600">
            {{ item.articleTitle }}
          </router-link>
        </n-list-item>
      </n-list>
    </template>
    <template #action>
      <n-button size="medium" text @click="handleMarkRead">
        <template #icon>
          <n-icon><mark-read-icon /></n-icon>
        </template>
        全部已读
      </n-button>
    </template>
  </n-popselect>
</template>

<script setup lang="tsx">
import { MailOpen as MarkReadIcon, Compass as TrendIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
const props = defineProps<{ messages: Array<MessageInfo>; count: number }>();
const emits = defineEmits(['mark-read']);

const messagesList = ref<Array<MessageInfo>>([]);
const showPopover = ref(false);
const handleMarkRead = () => {
  showPopover.value = false;
  emits('mark-read');
};

const handleClickLoad = () => {
  showPopover.value = true;
  messagesList.value = props.messages;
};
</script>

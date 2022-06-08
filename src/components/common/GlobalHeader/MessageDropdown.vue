<template>
  <n-popselect trigger="manual" :show="showPopover" @clickoutside="showPopover = false">
    <div class="flex-center h-full">
      <n-badge :value="count">
        <n-icon class="cursor-pointer" size="22" @click="handleClickLoad">
          <notification-icon class="text-gray-300 hover:text-gray-400"></notification-icon>
        </n-icon>
      </n-badge>
    </div>
    <template #empty>
      <div class="w-70">
        <n-tabs type="line" default-value="like" justify-content="space-evenly">
          <n-tab-pane name="like" tab="点赞">
            <n-scrollbar style="max-height: 240px">
              <n-list v-if="likesList.length != 0">
                <n-list-item v-for="(item, index) in likesList">
                  <router-link
                    :to="'/user/' + item.userID"
                    class="hover:text-[#63e2b7]"
                    @click="handleMarkRead(index, 0)"
                  >
                    {{ item.userName }}
                  </router-link>
                  点赞了你的文章
                  <router-link
                    :to="'/article/' + item.articleID"
                    class="hover:text-[#63e2b7]"
                    @click="handleMarkRead(index, 0)"
                  >
                    {{ item.articleTitle }}
                  </router-link>
                </n-list-item>
              </n-list>
              <div class="my-4" v-else>
                <n-empty description="还没有新的点赞哦"></n-empty>
              </div>
            </n-scrollbar>
          </n-tab-pane>
          <n-tab-pane name="comment" tab="评论">
            <n-scrollbar style="max-height: 240px">
              <n-list v-if="commentsList.length != 0">
                <n-list-item v-for="(item, index) in commentsList">
                  <router-link
                    :to="'/user/' + item.userID"
                    class="hover:text-[#63e2b7]"
                    @click="handleMarkRead(index, 1)"
                  >
                    {{ item.userName }}
                  </router-link>
                  评论了你的文章
                  <router-link
                    :to="'/article/' + item.articleID"
                    class="hover:text-[#63e2b7]"
                    @click="handleMarkRead(index, 1)"
                  >
                    {{ item.articleTitle }}
                  </router-link>
                </n-list-item>
              </n-list>
              <div class="my-4" v-else>
                <n-empty description="还没有新评论哦"></n-empty>
              </div>
            </n-scrollbar>
          </n-tab-pane>
          <n-tab-pane name="follow" tab="关注">
            <n-scrollbar style="max-height: 240px">
              <n-list v-if="followList.length != 0">
                <n-list-item v-for="(item, index) in followList">
                  <router-link
                    :to="'/user/' + item.userID"
                    class="flex hover:text-[#63e2b7]"
                    @click="handleMarkRead(index, 2)"
                  >
                    <n-avatar :src="item.userAvatar"></n-avatar>
                    <div class="ml-8 self-center">{{ item.userName }}</div>
                  </router-link>
                </n-list-item>
              </n-list>
              <div class="my-4" v-else>
                <n-empty description="还没有新关注哦"></n-empty>
              </div>
            </n-scrollbar>
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>
    <template #action>
      <n-button size="medium" text @click="handleMarkReadAll">
        <template #icon>
          <n-icon><mark-read-icon /></n-icon>
        </template>
        全部已读
      </n-button>
    </template>
  </n-popselect>
</template>

<script setup lang="tsx">
import { likeComment } from '@/api/article';
import { markReadMessage } from '@/api/message';
import { MailOpen as MarkReadIcon, NotificationsSharp as NotificationIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps<{ messages: Array<MessageInfo>; count: number }>();
const emits = defineEmits(['mark-read-all']);

const likesList = ref<Array<MessageInfo>>([]);
const commentsList = ref<Array<MessageInfo>>([]);
const followList = ref<Array<MessageInfo>>([]);
const showPopover = ref(false);
const handleMarkReadAll = () => {
  showPopover.value = false;
  emits('mark-read-all');
};

const handleClickLoad = () => {
  showPopover.value = true;
  likesList.value.length = 0;
  commentsList.value.length = 0;
  followList.value.length = 0;
  props.messages.forEach((elm: MessageInfo) => {
    if (elm.actions == 0) {
      likesList.value.push(elm);
    } else if (elm.actions == 1) {
      commentsList.value.push(elm);
    } else if (elm.actions == 2) {
      followList.value.push(elm);
    }
  });
};

const handleMarkRead = (index: number, type: number) => {
  if (type == 0) {
    markReadMessage(likesList.value[index].msgID);
  } else if (type == 1) {
    markReadMessage(commentsList.value[index].msgID);
  } else if (type == 2) {
    markReadMessage(followList.value[index].msgID);
  }
};
</script>

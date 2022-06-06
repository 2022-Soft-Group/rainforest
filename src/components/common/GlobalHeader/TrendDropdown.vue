<template>
  <n-popselect trigger="manual" :show="showPopover" @clickoutside="handleMarkRead">
    <div class="flex-center h-full">
      <n-badge :value="count">
        <n-icon class="cursor-pointer" size="22" @click="handleClickLoad">
          <trend-icon class="text-gray-300 hover:text-gray-400"></trend-icon>
        </n-icon>
      </n-badge>
    </div>
    <template #empty>
      <n-scrollbar style="max-height: 240px">
        <n-list v-if="trends.length != 0">
          <n-list-item v-for="(item, index) in trends">
            <router-link :to="'/user/' + item.authorID" target="_blank" class="hover:text-[#63e2b7]">
              {{ item.author }}
            </router-link>
            发布了文章
            <router-link :to="'/article/' + item.articleID" target="_blank" class="hover:text-[#63e2b7]">
              {{ item.title }}
            </router-link>
          </n-list-item>
        </n-list>
        <div class="my-4" v-else>
          <n-empty description="还没有新动态哦"></n-empty>
        </div>
      </n-scrollbar>
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
import { markReadTrends } from '@/api/message';
import { MailOpen as MarkReadIcon, Compass as TrendIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps<{ trends: Array<ArticleItem>; count: number }>();
const emits = defineEmits(['mark-read']);

const trendsList = ref<Array<ArticleItem>>([]);
const showPopover = ref(false);
const handleMarkRead = () => {
  showPopover.value = false;
  markReadTrends();
  emits('mark-read');
};

const handleClickLoad = () => {
  showPopover.value = true;
  trendsList.value = props.trends;
};
</script>

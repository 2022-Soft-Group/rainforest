<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <div v-else>
    <router-link tag="a" target="_blank" :to="articleDirection" class="font-bold text-xl m-2 mt-0 hover:text-[#63e2b7]">
      {{ articleInfo.title }}
    </router-link>
    <div class="flex justify-between mx-2 my-4">
      <n-image
        v-if="articleInfo.thumbnail != null"
        preview-disabled
        width="150"
        object-fit="cover"
        class="h-30 flex-none rounded-md"
        :src="articleInfo.thumbnail"
      ></n-image>
      <div class="w-full ml-4 text-base self-center">
        {{ articleInfo.author + ': ' + articleInfo.description + '...' }}
        <router-link :to="articleDirection"><n-button type="primary" text>查看全文</n-button></router-link>
      </div>
    </div>
    <article-info-panel :article-info="articleInfo"></article-info-panel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ isLoading: boolean; articleInfo: ArticleItem }>();
const articleDirection = ref('/article/' + props.articleInfo.articleID);
</script>

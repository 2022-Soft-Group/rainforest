<template>
  <div v-if="isLoading">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
  </div>
  <div v-else>
    <router-link tag="a" target="_blank" :to="draftDirection" class="font-bold text-xl m-2 mt-0 hover:text-[#63e2b7]">
      {{ draftInfo.title }}
    </router-link>
    <div class="flex justify-between mx-2 my-4">
      <n-image
        v-if="draftInfo.thumbnail != null"
        preview-disabled
        width="200"
        object-fit="cover"
        class="h-40 flex-none rounded-md"
        :src="draftInfo.thumbnail"
      ></n-image>
      <div class="w-full ml-4 text-base self-center">
        {{ draftInfo.description }}
      </div>
    </div>
    <div class="text-gray-400">
      <n-space class="ml-2">
        <n-icon size="small" class="mt-2"><tags-icon /></n-icon>
        <div v-for="item in draftInfo.tags">
          <router-link :to="'/tag/' + item.id">
            <n-tag type="primary" class="cursor-pointer">{{ item.title }}</n-tag>
          </router-link>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ isLoading: boolean; draftInfo: DraftItem }>();
const draftDirection = ref('/article/write/draft/' + props.draftInfo.draftID);
</script>

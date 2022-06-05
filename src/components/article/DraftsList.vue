<template>
  <div v-if="isLoading">
    <div v-for="index of 10" :key="index">
      <n-divider v-if="index != 1"></n-divider>
      <n-skeleton text :repeat="2" />
      <n-skeleton text style="width: 60%" />
    </div>
  </div>
  <div v-else>
    <div v-if="drafts.length == 0">
      <n-empty description="还没有草稿哦"></n-empty>
    </div>
    <div v-for="(item, index) in drafts">
      <n-divider v-if="index != 0"></n-divider>
      <draft-list-item :is-loading="isLoading" :draft-info="item" />
    </div>
  </div>
  <n-divider />
  <n-button v-if="drafts.length != 0" text @click="emits('request-drafts')" class="flex m-auto"> 浏览更多</n-button>
</template>

<script setup lang="ts">
defineProps<{ drafts: Array<DraftItem>; isLoading: boolean }>();
const emits = defineEmits(['request-drafts']);
</script>

<style scoped></style>

<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="vertical ? 1 : 2">
    <n-grid-item v-for="item in tags">
      <div class="p-2 items-center bg-dark-200 rounded-lg max-h-25" :class="{ 'w-96': !vertical }">
        <div class="grid-title">
          <router-link :to="'/tag/' + item.id" target="_blank" class="font-bold text-xl hover:text-[#63e2b7] m-2 pl-2">
            {{ item.title }}
          </router-link>
        </div>
        <div class="flex justify-between mx-2 my-2">
          <n-image class="img" :src="item.img" preview-disabled></n-image>
          <div class="user-info-cont">{{ item.description.substring(0, 40) }}</div>
        </div>
      </div>
    </n-grid-item>
  </n-grid>
  <br />
  <br />
  <n-empty v-if="tags.length == 0" description="还没有标签哦"></n-empty>
</template>

<script setup lang="ts">
defineProps<{ tags: Array<TagItem>; vertical: boolean }>();
</script>

<style scoped>
.user-info-cont {
  padding-left: 10px;
  flex: 1;
  font-size: 14px;
  color: #666;
}
.link {
  padding: 5px;
}
.img {
  width: 50px;
  height: 35px;
  padding-left: 10px;
  border-radius: 3px;
}
</style>

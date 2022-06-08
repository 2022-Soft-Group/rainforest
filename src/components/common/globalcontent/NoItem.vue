<template>
  <div v-if="listNum == 0" class="text-center text-gray-500">
    <br />
    <n-icon size="70"><list-icon /></n-icon> <br />
    还没有{{ itemType }}哦~~~
    <n-divider></n-divider>
  </div>
</template>

<script setup lang="ts">
import { ListOutline as listIcon } from '@vicons/ionicons5';
const props = defineProps<{ listNum: number; itemType: string }>();
</script>

<template>
  <div>
    <router-link :to="gridDirection" class="font-bold text-xl m-2 mt-0 hover:text-green-600">
      {{ GridInfo.title }}
    </router-link>
    <div class="flex justify-between mx-2 my-4">
      <n-image
        v-if="GridInfo.image != ''"
        width="200"
        object-fit="cover"
        class="h-40 flex-none rounded-md"
        :src="GridInfo.image"
      ></n-image>
      <div class="w-full ml-4 text-base self-center">
        {{ GridInfo.intro }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {} from '@vicons/ionicons5';
const props = defineProps<{ GridInfo: GridListItem }>();
const gridDirection = ref('/grid/' + props.GridInfo.gridId);
</script>

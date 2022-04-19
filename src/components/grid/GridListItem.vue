<template>
  <div>
    <n-grid-item>
      <div class="light-green">
        <router-link :to="gridDirection" class="hover:text-green-600">
          {{ gridInfo.title }}
        </router-link>
      </div>
    </n-grid-item>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {} from '@vicons/ionicons5';
const props = defineProps<{ gridInfo: GridListItem }>();
const gridDirection = ref('/grid/' + props.gridInfo.gridId);
</script>

<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
</style>

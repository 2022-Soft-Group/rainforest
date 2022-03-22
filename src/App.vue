<template>
   <div class="flex-y-center h-full">
     <n-button type="primary" @click="num++">
       数字是：{{ num }}
     </n-button>
     <n-button>
       数字+1：{{ num + 1 }}
     </n-button>
   </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const num = ref(0)
</script>

<style scoped></style>

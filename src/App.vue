<template>
   <div class="flex flex-row">
     <div class="basis-1/4">
      <n-button type="primary" @click="num++">
        数字是：{{ num }}
      </n-button>
     </div>
     <div class="basis-1/4 hover:basis-1/2">
      <n-button>
        数字是：{{ num + 1 }}
      </n-button>
    </div>
    <div class="basis-1/2 hover:basic-1/4">
      <n-button>
        数字是：{{ num + 1 }}
      </n-button>
    </div>
   </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const num = ref(0)
</script>

<style scoped></style>

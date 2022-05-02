<template>
  <n-page-header subtitle="已认证账号">
    <template #title>
      <div class="text-lg font-bold">{{ name }}</div>
    </template>
    <template #avatar>
      <n-avatar src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg" />
    </template>
    <template #extra>
      <n-space>
        <n-button type="default" ghost> 已关注 </n-button>
      </n-space>
    </template>
    <template #footer>fsddddddddddddddddddddddddddddddddddd</template>
  </n-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMessage } from 'naive-ui';

export default defineComponent({
  data() {
    return {
      name: '小破孩',
    };
  },
  setup() {},
});
</script>

<template>
  <n-page-header>
    <n-grid :cols="2" class="text-center">
      <n-gi>
        <n-statistic label="关注了" :value="following" />
      </n-gi>
      <n-divider vertical />
      <n-gi>
        <n-statistic label="关注者" :value="followed" />
      </n-gi>
    </n-grid>
  </n-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMessage } from 'naive-ui';

export default defineComponent({
  data() {
    return {
      following: 125000,
      followed: 25,
    };
  },
  setup() {},
});
</script>

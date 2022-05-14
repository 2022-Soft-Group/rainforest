<template>
  <n-page-header>
    <n-grid :cols="2">
      <n-gi>
        <n-statistic label="获得点赞" :value="like" />
      </n-gi>
      <n-gi>
        <n-statistic label="获得收藏" :value="follow" />
      </n-gi>
    </n-grid>
    <template #title>
      <div style="text-decoration: none; color: inherit">我的成就</div>
    </template>

    <template #avatar>
      <n-icon size="30"><CheckmarkDone /></n-icon>
    </template>
  </n-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMessage } from 'naive-ui';
import { CheckmarkDone } from '@vicons/ionicons5';
// const props = defineProps<{ liked: number; followed: number }>();
export default defineComponent({
  data() {
    return {
      like: 230,
      follow: 100,
    };
  },
  components: {
    CheckmarkDone,
  },
  setup() {},
});
</script>

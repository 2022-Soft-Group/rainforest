<template>
  <n-button
    class="w-24"
    :bordered="false"
    type="primary"
    :secondary="followed"
    @mouseenter.native="buttonText = '取消关注'"
    @mouseleave.native="buttonText = '已关注'"
    @click="handleFollowUser"
  >
    {{ followed ? buttonText : buttonText2 }}
  </n-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { followUser, cancelFollowUser, getFollowUserStatus } from '@/api/user';
const props = defineProps<{ targetUserId: number; changeCount: number }>();
const followed = ref(true);
const buttonText = ref('已关注');
const buttonText2 = ref('+ 关注');
const emits = defineEmits(['change-follow']);

const handleFollowUser = () => {
  if (followed.value) {
    cancelFollowUser(props.targetUserId.toString()).then((res) => {
      if (res.data.status == 0 && res.data.data.isFan == false) {
        followed.value = false;
        emits('change-follow');
      } else {
        window.$message.error('现在不能取消关注该用户');
      }
    });
  } else {
    followUser(props.targetUserId.toString()).then((res) => {
      if (res.data.status == 0 && res.data.data.isFan == true) {
        followed.value = true;
        emits('change-follow');
      } else {
        window.$message.error('现在不能关注该用户');
      }
    });
  }
};

watch(
  () => [followed.value, props.changeCount],
  () => {
    getFollowUserStatus(props.targetUserId.toString()).then((res) => {
      if (res.data.status == 0) {
        followed.value = res.data.data.isFan;
        if (followed.value == true) {
          buttonText.value = '已关注';
        }
      }
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

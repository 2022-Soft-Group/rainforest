<template>
  <n-button
    v-if="followed"
    :bordered="false"
    color="gray"
    @mouseenter.native="buttonText = '取消关注'"
    @mouseleave.native="buttonText = '\xa0 已关注 \xa0'"
    @click="handleCancelFollow"
  >
    {{ buttonText }}
  </n-button>
  <n-button v-else :bordered="false" type="primary" @click="handleFollow"> {{ buttonText2 }} </n-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { followUser, cancelFollowUser, getFollowUserStatus } from '@/api/user';
const props = defineProps<{ targetUserId: number; changeCount: number }>();
const followed = ref(true);
const buttonText = ref('\xa0 已关注 \xa0');
const buttonText2 = ref('\xa0 + 关注 \xa0');
const emits = defineEmits(['change-follow']);

const handleFollow = () => {
  followUser(props.targetUserId.toString()).then((res) => {
    if (res.data.status == 0 && res.data.data.isFan == true) {
      followed.value = true;
      emits('change-follow');
    } else {
      window.$message.error('现在不能关注该用户');
    }
  });
};

const handleCancelFollow = () => {
  cancelFollowUser(props.targetUserId.toString()).then((res) => {
    if (res.data.status == 0 && res.data.data.isFan == false) {
      followed.value = false;
      emits('change-follow');
    } else {
      window.$message.error('现在不能取消关注该用户');
    }
  });
};

watch(
  () => [followed.value, props.changeCount],
  () => {
    getFollowUserStatus(props.targetUserId.toString()).then((res) => {
      if (res.data.status == 0) {
        followed.value = res.data.data.isFan;
        if (followed.value == true) {
          buttonText.value = '\xa0 已关注 \xa0';
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

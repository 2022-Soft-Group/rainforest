<template>
  <n-button
    v-if="followed"
    :bordered="false"
    color="gray"
    @mouseenter.native="buttonText = '取消关注'"
    @mouseleave.native="buttonText = '已关注'"
    @click="handleCancelFollow"
  >
    {{ buttonText }}
  </n-button>
  <n-button v-else :bordered="false" type="primary" @click="handleFollow">
    <n-icon><add-icon /></n-icon> 关注
  </n-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Add as addIcon } from '@vicons/ionicons5';
import { followUser, cancelFollowUser, getFollowUserStatus } from '@/api/user';
const props = defineProps<{ targetUserId: number }>();
const followed = ref(true);
const buttonText = ref('已关注');

const handleFollow = () => {
  followUser(props.targetUserId.toString()).then((res) => {
    if (res.data.status == 0 && res.data.data.isFan == true) {
      followed.value = true;
    } else {
      window.$message.error('现在不能关注该用户');
    }
  });
};

const handleCancelFollow = () => {
  cancelFollowUser(props.targetUserId.toString()).then((res) => {
    if (res.data.status == 0 && res.data.data.isFan == false) {
      followed.value = false;
    } else {
      window.$message.error('现在不能取消关注该用户');
    }
  });
};

watch(
  () => followed.value,
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

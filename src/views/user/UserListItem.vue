<template>
  <n-page-header subtitle="已认证账号">
    <template #title>
      <div class="text-lg font-bold">{{ userFeature.name }}</div>
    </template>
    <template #avatar>
      <n-avatar :src="userFeature.avatar" :size="60" />
    </template>
    <template #extra>
      <n-space>
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
      </n-space>
    </template>
    <template #footer>
      <div class="text-gray-500 leading-3">
        {{ userFeature.articleNum }} 篇文章 · {{ userFeature.followedNum }} 关注者 · {{ userFeature.likedNum }} 点赞
      </div>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Add as addIcon } from '@vicons/ionicons5';
import { useAuthStore } from '@/store/auth';
import { followUser, cancelFollowUser, getFollowUserStatus } from '@/api/user';
const { userID } = useAuthStore();
const props = defineProps<{ userFeature: UserFeature; isLoading: boolean; listType: String }>();
const buttonText = ref('');
const followed = ref(false);
if (props.listType == 'following') {
  buttonText.value = '已关注';
  followed.value = true;
} else if (props.listType == 'fan') {
  buttonText.value = '已关注';
  followed.value = false;
}

const handleFollow = () => {
  followUser(props.userFeature.id.toString(), userID).then((res) => {
    if (res.data.status == 0) {
      followed.value = true;
    } else {
      window.$message.error('现在不能关注该用户');
    }
  });
};

const handleCancelFollow = () => {
  cancelFollowUser(props.userFeature.id.toString(), userID).then((res) => {
    if (res.data.status == 0) {
      followed.value = false;
    } else {
      window.$message.error('现在不能取消关注该用户');
    }
  });
};

watch(
  () => props.userFeature,
  () => {
    getFollowUserStatus(props.userFeature.id.toString(), userID).then((res) => {
      if (res.data.status == 0) {
        followed.value = res.data.data.isFollowing;
      }
    });
  },
  {
    deep: true,
  }
);
</script>

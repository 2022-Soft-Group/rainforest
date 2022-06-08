<template>
  <n-page-header>
    <n-grid :cols="3">
      <n-gi>
        <n-statistic :value="[userInfo.coin, '币'].join('')">
          <template #prefix>
            <n-icon size="30">
              <point-icon />
            </n-icon>
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <div class="text-justify">
          <n-statistic :value="userInfo.email">
            <template #prefix>
              <n-icon size="30"><mail-icon /></n-icon>
            </template>
          </n-statistic>
        </div>
      </n-gi>
      <n-gi class="text-center">
        <n-statistic label="" :value="[articleNum, '篇'].join('')">
          <template #prefix>
            <n-icon size="30"><pencil-icon /></n-icon>
          </template>
        </n-statistic>
      </n-gi>
    </n-grid>
    <template #title>
      <span>
        <br /><br />
        <span class="text-2xl">{{ userInfo.name }}</span>
        <n-icon size="medium" class="text-gray-400" v-if="userInfo.sex == 1"><male-icon /></n-icon>
        <n-icon size="medium" class="text-gray-400" v-else-if="userInfo.sex == 2"><female-icon /></n-icon>
        <br /><br />
        <div class="text-base">
          <n-icon><today-icon /></n-icon> 在语林: {{ 2023 - Number(userInfo.createTime.substring(0, 4)) }}年
        </div>
      </span>
    </template>
    <template #avatar>
      <n-avatar :size="150" :src="userInfo.avatar" class="ring-3 ring-white" />
      <follow-button
        v-show="false"
        :target-user-id="userInfo.id"
        :change-count="changeCount"
        @change-follow="emits('change-follow')"
      />
    </template>
    <template #extra>
      <span>
        <br /><br />
        <edit-info
          v-if="userID == userInfo.id.toString()"
          :user-info="userInfo"
          @update-info="emits('update-info')"
          class="rounded-md shadow-sm"
        />
        <follow-button
          v-else
          :target-user-id="userInfo.id"
          :change-count="changeCount"
          @change-follow="emits('change-follow')"
        />
        <!-- <follow-button
          :target-user-id="userInfo.id"
          :change-count="changeCount"
          @change-follow="emits('change-follow')"
        />
        <follow-button
          :target-user-id="userInfo.id"
          :change-count="changeCount"
          @change-follow="emits('change-follow')"
        /> -->
      </span>
    </template>
    <template #footer>
      <n-collapse>
        <n-collapse-item title="个人简介">
          <n-gradient-text type="success">
            <div>{{ userInfo.description }}</div>
          </n-gradient-text>
        </n-collapse-item>
      </n-collapse>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { followUser } from '@/api/user';
import {
  Mail as MailIcon,
  Pencil as PencilIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Sparkles as PointIcon,
  Add as addIcon,
  Today as todayIcon,
} from '@vicons/ionicons5';
import EditInfo from './EditInfo.vue';

const userID = localStorage.getItem('userID') as string;
const props = defineProps<{ articleNum: number; userInfo: User; changeCount: number }>();
const emits = defineEmits(['update-info', 'change-follow']);
</script>

<style scoped></style>

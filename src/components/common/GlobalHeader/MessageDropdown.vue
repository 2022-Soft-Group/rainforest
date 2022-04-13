<template>
  <n-popselect trigger="click">
    <slot></slot>
    <template #empty>
      <n-list>
        <n-list-item v-for="item in messages">
          <router-link :to="'/user/' + item.userID" class="hover:text-green-600">
            {{ item.userName }}
          </router-link>
          {{ item.actions }}了你的文章
          <router-link :to="'/article/' + item.articleID" class="hover:text-green-600">
            {{ item.articleTitle }}
          </router-link>
        </n-list-item>
      </n-list>
    </template>
    <template #action> 所有信息</template>
  </n-popselect>
</template>

<script setup lang="tsx">
const props = defineProps<{ messages: Array<MessageInfo> }>();
</script>

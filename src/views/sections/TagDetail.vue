<template>
  <n-card class="flex m-auto rounded-md w-200">
    <!-- <template #cover v-if="articleInfo.image != ''">
      <img class="max-h-400" :src="articleInfo.image" />
    </template>
    <n-h1 class="font-bold">{{ articleInfo.title }}</n-h1>
    <router-link :to="'/user/' + articleInfo.authorID">
      <n-thing>
        <template #avatar>
          <n-avatar round :src="userInfo.avatar"></n-avatar>
        </template>
        <template #header>{{ userInfo.name }}</template>
        <template #description> {{ userInfo.description }} </template>
      </n-thing>
    </router-link>
    <n-divider />
    <markdown-it-vue class="markdown" :content="articleContent" /> -->
  </n-card>
  <!-- <upload-button style="width: 20%; margin-top: 10px" :show-file-list="false" ref="upload" @change="clickUpload">
    上传Markdown
  </upload-button> -->
</template>

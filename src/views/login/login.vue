<template>
  <div class="flex flex-col h-screen my-auto items-center bg-login-pattern bg-cover">
    <div class="relative flex-center wh-full">
      <n-card :bordered="false" size="large" class="w-100 h-120 rounded-10px shadow-sm">
        <n-gradient-text type="primary" :size="28">语林</n-gradient-text>
        <main class="pt-24px">
          <n-tabs class="card-tabs" size="large" animate justify-content="space-evenly">
            <n-tab-pane name="signin" tab="账户登录">
              <sign-in-form />
            </n-tab-pane>
            <n-tab-pane name="signup" tab="账户注册">
              <sign-up-form />
            </n-tab-pane>
          </n-tabs>
        </main>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

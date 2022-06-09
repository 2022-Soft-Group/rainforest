<template>
  <div class="flex-col basis-2/7 max-w-72">
    <n-card :bordered="false" class="my-4 rounded-md shadow-sm">
      <quick-guider />
    </n-card>
    <div class="sticky top-16">
      <carousel-card class="my-4 shadow-sm" />

      <n-card :bordered="false" class="my-4 rounded-md shadow-sm">
        <ranking-list />
      </n-card>
    </div>
  </div>
</template>

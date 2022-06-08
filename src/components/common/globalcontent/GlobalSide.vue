<template>
  <div class="flex-col basis-2/7 max-w-72">
    <n-card :bordered="false" class="my-4 rounded-md shadow-sm">
      <quick-guider />
    </n-card>
    <div class="sticky top-16">
      <n-card :bordered="false" class="my-4 rounded-md shadow-sm">
        <carousel-card />
      </n-card>
      <n-card :bordered="false" class="my-4 rounded-md shadow-sm">
        <ranking-list />
      </n-card>
    </div>
  </div>
</template>

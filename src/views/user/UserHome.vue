<template>
  <div id="body">
    <div id="header"></div>
    <div id="tableContainer">
      <div id="tableRow">
        <div id="main">
          <p>
            fdsafdfdasfdsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
          </p>
        </div>
        <div id="sidebar">
          <p>
            fdsaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- <n-card title="超大卡片" size="large" id="card1"> 卡片内容 </n-card>

  <div class="flex">
    <n-card :bordered="false" class="basis-5/7 m-4 rounded-md shadow-sm">
      <n-tabs type="line" size="large" class="mb-6">
        <n-tab-pane name="我的关注">我的关注---fdsafdsfasdfdsa</n-tab-pane>
        <n-tab-pane name="我的粉丝">我的粉丝fdsaf</n-tab-pane>
        <n-tab-pane name="我的文章">我的文dsf章</n-tab-pane>
        <n-tab-pane name="我的收藏">我的afsd收藏</n-tab-pane>
        <n-tab-pane name="我的资源">我的sdfa资源</n-tab-pane>
      </n-tabs>
      <articles-list :articles="articles" :is-loading="isLoading" />
    </n-card>
    <div class="flex-col basis-2/7">
      <n-card :bordered="false" class="my-4 rounded-md shadow-sm"> fdasfadsffda </n-card>
      <n-card :bordered="false" class="sticky top-16 my-4 rounded-md shadow-sm">
        fadsfdsafsdaffdsafdasfsdafdsafdasfsd
      </n-card>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref(0);
</script>

<style scoped>
#card1 {
  width: 99%;
  margin-left: 15px;
  margin-right: 30px;
}

body {
  width: 1000px;
  position: fixed;
}

#header {
  background-color: white;
  margin: 10px 10px 0px 10px;
  height: 108px;
}

#tableContainer {
  display: table;
  border-spacing: 10px;
}

#tableRow {
  display: table-row;
}

#main {
  background-color: white;
  display: table-cell;
  width: 70%;
  padding: 15px;
  vertical-align: top;
}

#sidebar {
  background-color: white;
  display: table-cell;
  width: 30%;
  padding: 15px;
  vertical-align: top;
}
</style>

<template>
   <div class="logo-box">
    <img style="height:140px;" alt="Vue logo" src="./assets/vue.png" />
    <span/> 
    <img style="height:140px;" alt="Vite logo" src="./assets/vite.svg" />
    <span/>
    <img style="height:140px;" alt="NaiveUI logo" src="./assets/naiveUI.svg">
  </div>
  <HelloWorld msg="Hello Vue 3 + NaiveUI + Vite + TypeScript" />
  <div class="static-public">
    Place static files into the <code>src/components</code> folder
    <img style="width:90px;" src="./assets/node.png" />
  </div>
</template>



<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue';
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.logo-box span {
  width: 74px;
}

.static-public {
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-public code {
  background-color: #eee;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

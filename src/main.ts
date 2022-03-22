import { createApp } from 'vue';
import { setupNaiveUI, setupAssets } from './plugins';
import App from './App.vue';

async function setupApp() {
  // 引入静态资源
  setupAssets()
  const app = createApp(App);
  // 按需引入naiveUI
  setupNaiveUI(app)
  // 路由准备就绪后挂载 App
  app.mount('#app');
}

setupApp();

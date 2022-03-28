import { createApp } from 'vue';
import { setupNaiveUI, setupAssets } from './plugins';
import AppProvider from './AppProvider.vue';

async function setupApp() {
  // 引入静态资源
  setupAssets();
  const app = createApp(AppProvider);
  // 按需引入naiveUI
  setupNaiveUI(app);
  // 路由准备就绪后挂载 App
  app.mount('#app');
}

setupApp();

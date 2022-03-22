import { createApp } from 'vue';
import { setupNaiveUI } from './plugins';
import App from './App.vue';

async function setupApp() {
  // 引入静态资源
  const app = createApp(App);
  setupNaiveUI(app)
  // 路由准备就绪后挂载 App
  app.mount('#app');
}

setupApp();

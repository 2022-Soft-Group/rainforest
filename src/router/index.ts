import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/homepage/HomePage.vue'),
  },
  {
    path: '/user',
    name: 'userhome',
    component: () => import('../views/user/UserHome.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

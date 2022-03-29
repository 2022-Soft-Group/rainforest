import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: { name: 'homepage' },
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
];

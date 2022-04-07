import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
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
    path: '/sections',
    name: 'sections',
    component: () => import('../views/sections/SectionsOverview.vue'),
  },
  {
    path: '/columns',
    name: 'columns',
    component: () => import('../views/colums/ColumnsOverview.vue'),
  },
  {
    path: '/user',
    name: 'userhome',
    meta: { title: 'userhome', requiresAuth: true },
    component: () => import('../views/user/UserHome.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    window.$message.warning('您还没有登录，请先登录');
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }
});

export default router;

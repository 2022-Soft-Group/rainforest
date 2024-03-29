import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const userID = localStorage.getItem('userID') as string;
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'homepage' },
  },
  {
    path: '/article',
    name: 'articleIndex',
    component: () => import('../views/article/index.vue'),
    children: [
      {
        path: ':id',
        name: 'article',
        component: () => import('../views/article/ArticleDetail.vue'),
      },
      {
        path: 'write',
        name: 'write',
        component: () => import('../views/article/WriteArticle.vue'),
      },
      {
        path: 'write/:type/:id',
        name: 'modify',
        component: () => import('../views/article/WriteArticle.vue'),
      },
      {
        path: 'draft',
        name: 'draft',
        component: () => import('../views/article/DraftBox.vue'),
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/SearchResult.vue'),
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
    redirect: '/sections/前端',
    children: [
      {
        path: ':sectionKey',
        name: 'sectionsTagList',
        component: () => import('../views/sections/SectionsTagList.vue'),
      },
    ],
  },
  {
    path: '/tag/:id',
    name: 'tagDetail',
    component: () => import('../views/sections/TagDetail.vue'),
  },

  {
    path: '/columns',
    name: 'columnsIndex',
    component: () => import('../views/columns/index.vue'),
    children: [
      {
        path: '',
        name: 'columns',
        component: () => import('../views/columns/ColumnsOverview.vue'),
      },
      {
        path: ':id',
        name: 'columnDetail',
        component: () => import('../views/columns/ColumnDetail.vue'),
      },
    ],
  },
  {
    path: '/resource/:id',
    name: 'resourceDetail',
    component: () => import('../views/resources/ResourceDetail.vue'),
  },
  {
    path: '/user',
    name: 'userhome',
    redirect: '/user/' + userID,
    meta: { requiresAuth: true },
    component: () => import('../views/user/index.vue'),
    children: [
      {
        path: ':id/direct/:target',
        name: 'userDirect',
        component: () => import('../views/user/UserHome.vue'),
      },
      {
        path: ':id',
        name: 'userhome',
        component: () => import('../views/user/UserHome.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginPage.vue'),
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('../views/other/ErrorPage.vue'),
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

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SpecificRoutes from './modules/specific';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
  },
  // 成员管理
  {
    path: '/member',
    name: 'member',
    component: Layout,
  },
  // 专用管理
  ...SpecificRoutes, // 引入专用路由模块
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

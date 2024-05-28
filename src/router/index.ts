import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import SpecificRoute from './modules/specific';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Layout
  },
  // 成员管理
  {
    path: '/member',
    name: 'member',
    component: Layout
  },
  // 专用管理
  ...SpecificRoute, // 引入专用路由模块
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

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void => {
    const isLoggedIn: boolean = !!localStorage.getItem('token');
    if (to.path !== '/login' && !isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  }
);

export default router;

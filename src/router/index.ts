import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import SpecificRoute from './modules/specific';
import Layout from '@/layout/index.vue';
import memberRoute from '@/router/modules/member.ts';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      { path: '', name: 'homeDefault', component: () => import('@/views/home/home.vue') }
    ]
  },
  // 成员管理
  ...memberRoute,
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

// 判断是否过期: 如果当前时间 - 签发时间 > 7天，则过期
function isTokenValid(token: string | null) {
  if (!token) return false;

  const payload = parseJwt(token);
  const iatTimestamp = payload.iat * 1000;
  const currentTimestamp = Date.now();
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;

  return currentTimestamp - iatTimestamp <= sevenDaysInMillis;
}

// 解析 JWT token
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // 使用 atob 解码
  const decodedPayload = atob(base64);
  return JSON.parse(decodedPayload);
}

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void => {
    const token = localStorage.getItem('token');

    if (to.path === '/login' || token && isTokenValid(token)) {
      next();
    } else {
      next('/login');
    }

  }
);

export default router;

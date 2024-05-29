/**
 * 专用管理
 */
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const memberRoute: Array<RouteRecordRaw> = [
  {
    path: '/member',
    name: 'member',
    component: Layout,
    children: [
      {
        path: '/member_join',
        name: 'member_join',
        component: () => import('@/views/member/join.vue'),
      },
      {
        path: '/member_cadre',
        name: 'member_cadre',
        component: () => import('@/views/member/cadre.vue'),
      }
    ]
  }
];

export default memberRoute;

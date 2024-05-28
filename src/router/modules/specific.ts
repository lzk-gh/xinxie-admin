/**
 * 专用管理
 */
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const specificRoute: Array<RouteRecordRaw> = [
  {
    path: '/specific',
    name: 'specific',
    component: Layout,

    children: [
      {
        path: '/specific_docs',
        name: 'specific_docs',
        component: () => import('@/views/specific/components/specific-docs.vue'),
      },
      {
        path: '/specific_tools',
        name: 'specific_tools',
        component: () => import('@/views/specific/components/specific-tools.vue'),
      }
    ]
  }
];

export default specificRoute;

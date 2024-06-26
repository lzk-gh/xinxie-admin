<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <info-panel v-for="panel in panels" :key="panel.id">
      <template #panel-title>
        <h2>{{ panel.title }}</h2>
      </template>
      <template #panel-button v-if="panel.button">
        <i class="fi fi-rr-menu-dots-vertical"></i>
      </template>
      <template #panel-content>
        <component :is="views[panel.chartComponent]" />
      </template>
    </info-panel>
  </div>
</template>

<script setup lang="ts">
import InfoPanel from '@/components/info-panel/info-panel.vue';
import { useChartDataStore } from '@/stores/models/chartData.ts';
import DepartmentCountChart from '@/views/home/components/department-count-chart.vue';
import ApplicationStatusChart from '@/views/home/components/application-status-chart.vue';
import DocumentToolTrendChart from '@/views/home/components/document-tool-trend-chart.vue';
import DocumentToolCountChart from '@/views/home/components/document-tool-count-chart.vue';
import TotalCountTrendChart from '@/views/home/components/total-visits-trend-chart.vue';

const views = {
  DepartmentCountChart,
  ApplicationStatusChart,
  DocumentToolTrendChart,
  DocumentToolCountChart,
  TotalCountTrendChart
};

interface Panels {
  id: number;
  title: string;
  button?: boolean;
  chartComponent: string;
}

const panels: Panels[] = [
  {
    id: 1,
    title: '网站访问量',
    chartComponent: 'TotalCountTrendChart'
  },
  {
    id: 2,
    title: '部门人数',
    button: true,
    chartComponent: 'DepartmentCountChart'
  },
  {
    id: 3,
    title: '申请状态',
    button: true,
    chartComponent: 'ApplicationStatusChart'
  },
  {
    id: 4,
    title: '文档工具数量',
    button: true,
    chartComponent: 'DocumentToolCountChart'
  },
  {
    id: 5,
    title: '文档工具访问量',
    chartComponent: 'DocumentToolTrendChart'
  }
];

// 部门人数数据
const departmentCountData = [
  { department: '技术部', count: 15 },
  { department: '秘书部', count: 8 },
  { department: '宣策部', count: 12 },
  { department: '外联部', count: 5 }
];

// 申请状态数据
const  applicationStatusData = [
  { status: '未通过', count: 5 },
  { status: '已通过', count: 20 },
  { status: '未批准', count: 10 },
  { status: '空邮箱', count: 2 }
];

// 文档和工具访问量趋势数据
const docToolTrendData = [
  {
    type: '前端相关',
    documentCount: 32,
    toolCount: 18,
    totalVisits: 120,
    date: '2024-06-15'
  },
  {
    type: '后端相关',
    documentCount: 25,
    toolCount: 15,
    totalVisits: 80,
    date: '2024-06-15'
  },
  {
    type: '插本相关',
    documentCount: 18,
    toolCount: 10,
    totalVisits: 60,
    date: '2024-06-15'
  },
  {
    type: 'UI相关',
    documentCount: 15,
    toolCount: 8,
    totalVisits: 40,
    date: '2024-06-15'
  },
  {
    type: 'AI相关',
    documentCount: 10,
    toolCount: 5,
    totalVisits: 20,
    date: '2024-06-15'
  },
  {
    type: '前端相关',
    documentCount: 38,
    toolCount: 22,
    totalVisits: 150,
    date: '2024-06-22'
  },
  {
    type: '后端相关',
    documentCount: 28,
    toolCount: 18,
    totalVisits: 90,
    date: '2024-06-22'
  },
  {
    type: '插本相关',
    documentCount: 20,
    toolCount: 12,
    totalVisits: 70,
    date: '2024-06-22'
  },
  {
    type: 'UI相关',
    documentCount: 18,
    toolCount: 10,
    totalVisits: 50,
    date: '2024-06-22'
  },
  {
    type: 'AI相关',
    documentCount: 12,
    toolCount: 8,
    totalVisits: 30,
    date: '2024-06-22'
  }
];

// 总量变化趋势数据
const totalVisitsTrendData = [
  { date: '2024-06-15', totalVisits: 320 },
  { date: '2024-06-22', totalVisits: 440 },
  { date: '2024-06-23', totalVisits: 210 },
  { date: '2024-06-24', totalVisits: 480 },
  { date: '2024-06-25', totalVisits: 760 }
];

// 文档工具数量数据
const docToolCountData = [
  [
    { date: '2024-06-15', type: '前端相关', totalVisits: 120 },
    { date: '2024-06-15', type: '后端相关', totalVisits: 80 },
    { date: '2024-06-15', type: '插本相关', totalVisits: 60 },
    { date: '2024-06-15', type: 'UI相关', totalVisits: 40 },
    { date: '2024-06-15', type: 'AI相关', totalVisits: 20 }
  ],
  [
    { date: '2024-06-22', type: '前端相关', totalVisits: 150 },
    { date: '2024-06-22', type: '后端相关', totalVisits: 90 },
    { date: '2024-06-22', type: '插本相关', totalVisits: 70 },
    { date: '2024-06-22', type: 'UI相关', totalVisits: 50 },
    { date: '2024-06-22', type: 'AI相关', totalVisits: 30 }
  ]
];

const chartDataStore = useChartDataStore();

chartDataStore.setDepartmentList(departmentCountData);
chartDataStore.setApplicationStatusList(applicationStatusData);
chartDataStore.setDocToolTrendList(docToolTrendData);
chartDataStore.setTotalVisitsTrendList(totalVisitsTrendData);
chartDataStore.setDocToolCountList(docToolCountData);
</script>

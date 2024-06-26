<template>
  <Chart :option="applicationStatusOptions" :data="applicationStatusData" />
</template>

<script setup lang="ts">
import Chart from '@/components/chart/chart.vue';
import { useChartDataStore } from '@/stores/models/chartData.ts';

const chartDataStore = useChartDataStore();
const applicationStatusData = chartDataStore.applicationStatusList;

const applicationStatusOptions = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom'
  },
  series: [
    {
      name: '申请结果',
      type: 'pie',
      radius: '50%',
      data: applicationStatusData.map(item => ({
        name: item.status,
        value: item.count
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
</script>

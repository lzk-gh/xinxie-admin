<template>
  <Chart :option="docToolTrendOptions" :data="docToolTrendData" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Chart from '@/components/chart/chart.vue';
import { useChartDataStore } from '@/stores/models/chartData.ts';

const chartDataStore = useChartDataStore();
const docToolTrendData = computed(() => chartDataStore.docToolTrendList);

const dates = computed(() => [
  ...new Set(docToolTrendData.value.map(item => item.date))
]);

const docToolTrendOptions = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['文档', '工具']
  },
  yAxis: [
    {
      type: 'category',
      data: dates.value,
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 20,
        fontSize: 14
      },
      axisPointer: {
        label: {
          show: true,
          margin: 30
        }
      }
    }
  ],
  xAxis: [
    {
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    }
  ],
  grid: {
    containLabel: true,
    left: 20
  },
  series: [
    {
      name: '文档',
      type: 'bar',
      data: docToolTrendData.value.map(item => item.documentCount),
      label: {
        show: true,
        position: 'right'
      }
    },
    {
      name: '工具',
      type: 'bar',
      data: docToolTrendData.value.map(item => item.toolCount),
      label: {
        show: true,
        position: 'right'
      }
    }
  ]
}));
</script>

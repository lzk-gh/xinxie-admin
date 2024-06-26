<template>
  <Chart :option="totalVisitsTrendOptions" :data="totalVisitsTrendData" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Chart from '@/components/chart/chart.vue';
import { useChartDataStore } from '@/stores/models/chartData.ts';

const chartDataStore = useChartDataStore();
const totalVisitsTrendData = computed(() => chartDataStore.totalVisitsTrendList);

const totalVisitsTrendOptions = computed(() => ({
  tooltip: {
    trigger: 'axis',
    showContent: false,
    axisPointer: {
      type: 'line',
      label: {
        show: true,
        backgroundColor: '#a9b5d9',
        formatter: (params: any) => {
          const date = params.value;
          const visits = totalVisitsTrendData.value.find(item => item.date === date)?.totalVisits;
          return `${date}\n网站访客量：${visits}`;
        }
      }
    }
  },
  xAxis: {
    type: 'category',
    data: totalVisitsTrendData.value.map(item => item.date)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '网站访客量',
      data: totalVisitsTrendData.value.map(item => item.totalVisits),
      type: 'line',
      smooth: true,
      areaStyle: {
        opacity: 0.3
      }
    }
  ]
}));
</script>

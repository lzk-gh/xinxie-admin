<template>
  <Chart :option="departmentOption" :data="departmentData" />
</template>

<script setup lang="ts">
import Chart from '@/components/chart/chart.vue';
import { useChartDataStore } from '@/stores/models/chartData.ts';
import { computed } from 'vue';

const chartDataStore = useChartDataStore();
const departmentData = computed(() => chartDataStore.departmentList);

const departmentOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: departmentData.value.map(item => item.department)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: departmentData.value.map(item => item.count),
      type: 'bar'
    }
  ]
}));
</script>

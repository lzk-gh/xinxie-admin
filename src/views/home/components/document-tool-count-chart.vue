<template>
  <Chart :option="docToolCountOptions" :data="docToolCountData" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Chart from '@/components/chart/chart.vue';
import { useChartDataStore } from '@/stores/models/chartData.ts';

const chartDataStore = useChartDataStore();
const docToolCountData = computed(() => chartDataStore.docToolCountList);

const dates = computed(() => [
  ...new Set(docToolCountData.value.flatMap(item => item.map(i => i.date)))
]);
const types = computed(() => [
  ...new Set(docToolCountData.value.flatMap(item => item.map(i => i.type)))
]);

const docToolCountOptions = computed(() => ({
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '70%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: dates.value,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: types.value,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 200,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '0%'
  },
  series: [
    {
      name: '访问量',
      type: 'heatmap',
      data: docToolCountData.value.flatMap((items, dateIndex) =>
        items.map((item, typeIndex) => [dateIndex, typeIndex, item.totalVisits])
      ),
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}));
</script>

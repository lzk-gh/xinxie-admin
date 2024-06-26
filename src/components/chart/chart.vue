<template>
  <div ref="chartRef" style="height: 320px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, Ref } from 'vue';
import { echarts, ECOption } from '@/utils/echarts.ts';

const props = defineProps<{
  option: ECOption;
  data: [];
}>();

let chartInstance: echarts.ECharts;
let isFinishedHandled = false;
let resizeObserver: ResizeObserver | null = null;
const chartRef = ref<HTMLElement | null>(null);

/**
 * 处理图表渲染完成事件
 * @param chartInstance
 * @param chartRef
 */
function handleChartRenderFinished(
  chartInstance: echarts.ECharts,
  chartRef: Ref<HTMLElement | null>
) {
  if (isFinishedHandled) return;
  isFinishedHandled = true;

  resizeObserver = new ResizeObserver(() => {
    chartInstance.resize();
  });

  resizeObserver.observe(chartRef.value!);
}

onMounted(() => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(props.option);

  // 监听图表渲染完成事件 - 响应宽度变化
  chartInstance.on('finished', () =>
    handleChartRenderFinished(chartInstance, chartRef)
  );
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  chartInstance?.dispose();
});

watch(
  () => props.option,
  newOption => {
    chartInstance?.setOption(newOption);
  }
);

watch(
  () => props.data,
  newData => {
    chartInstance?.setOption({ series: [{ data: newData }] });
  }
);
</script>

import * as Echarts from 'echarts/core';
import {
  BarChart,
  PieChart,
  LineChart,
  MapChart,
  HeatmapChart
} from 'echarts/charts';
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  DataZoomComponent,
  GraphicComponent,
  VisualMapComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  BarSeriesOption,
  PieSeriesOption,
  LineSeriesOption,
  HeatmapSeriesOption
} from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  ToolboxComponentOption,
  DataZoomComponentOption,
  GraphicComponentOption,
  VisualMapComponentOption
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

// 注册必须的组件
Echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  DataZoomComponent,
  GraphicComponent,
  VisualMapComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  MapChart,
  HeatmapChart
]);

export type ECOption = ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
  | HeatmapSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | ToolboxComponentOption
  | DataZoomComponentOption
  | GraphicComponentOption
  | VisualMapComponentOption
>;

export const echarts = Echarts;

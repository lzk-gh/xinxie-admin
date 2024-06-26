import { defineStore } from 'pinia';
import {
  ChartDataState,
  Department,
  ApplicationStatus,
  DocToolTrend,
  TotalVisitsTrend,
  DocToolCount
} from '@/types/models/chartData';

export const useChartDataStore = defineStore('chartData', {
  state: (): ChartDataState => ({
    departmentList: [],
    applicationStatusList: [],
    docToolTrendList: [],
    totalVisitsTrendList: [],
    docToolCountList: []
  }),

  actions: {
    setDepartmentList(data: Department[]) {
      this.departmentList = data;
    },
    setApplicationStatusList(data: ApplicationStatus[]) {
      this.applicationStatusList = data;
    },
    setDocToolTrendList(data: DocToolTrend[]) {
      this.docToolTrendList = data;
    },
    setTotalVisitsTrendList(data: TotalVisitsTrend[]) {
      this.totalVisitsTrendList = data;
    },
    setDocToolCountList(data: DocToolCount[][]) {
      this.docToolCountList = data;
    }
  }
});

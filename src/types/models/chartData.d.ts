// 部门数据
export interface Department {
  department: string;
  count: number;
}

// 申请状态数据
export interface ApplicationStatus {
  status: string;
  count: number;
}

// 文档工具趋势数据
export interface DocToolTrend {
  type: string;
  documentCount: number;
  toolCount: number;
  totalVisits: number;
  date: string;
}

// 总访问量趋势数据
export interface TotalVisitsTrend {
  date: string;
  totalVisits: number;
}

// 文档工具访问量数据
export interface DocToolCount {
  date: string;
  type: string;
  totalVisits: number;
}

// 图表数据状态
export interface ChartDataState {
  departmentList: Department[];
  applicationStatusList: ApplicationStatus[];
  docToolTrendList: DocToolTrend[];
  totalVisitsTrendList: TotalVisitsTrend[];
  docToolCountList: DocToolCount[][];
}

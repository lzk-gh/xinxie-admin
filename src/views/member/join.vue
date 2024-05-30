<template>
  <div class="join">
    <TableFilter :select-options="selectOptions" />

    <el-table
        :data="filteredTableData"
        stripe
        border
        @selection-change="selectedRows = $event"
    >
      <el-table-column type="index" width="50" align="center" />
      <el-table-column
          type="selection"
          width="55"
          align="center"
          :selectable="row => row.status === 0"
      />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="studentId" label="学号" />
      <el-table-column prop="studentId" label="邮箱" />
      <el-table-column prop="major" label="专业" />
      <el-table-column prop="department" label="意愿部门" />
      <el-table-column prop="reason" width="200" label="申请原因" />
      <el-table-column prop="status" label="是否通过">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">
            {{ getStatusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
              size="small"
              @click="handleApprove"
              :disabled="disabledBtnStatus(scope.row)"
          >
            批准
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleReject(scope.row.id)"
              :disabled="disabledBtnStatus(scope.row)"
          >
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showApproveDialog" title="发送邮箱通知" width="30%">
      <ul>
        <li v-for="row in selectedRows" :key="row.id">
          {{ row.name }} - {{ row.studentId }}
          <el-progress
              class="my-4"
              :percentage="percentage"
              :show-text="true"
              :duration="8"
          />
        </li>
      </ul>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showApproveDialog = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm" :loading="loading">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import TableFilter from '@/components/table-filter/table-filter.vue';

interface TableData {
  id: number;
  name: string;
  studentId: string;
  major: string;
  department: string;
  reason: string;
  status: number;
}

interface SelectOption {
  label: string;
  value: string | number | boolean;
}

interface SelectOptions {
  id: number;
  label: string;
  selectedValue: string | number | null;
  placeholder: string;
  options: SelectOption[];
}

const showApproveDialog = ref(false);
const percentage = ref(0);
const loading = ref(false);
const indeterminate = ref(true);
const selectedRows = ref<TableData[]>([]);
// const stillProgress = ref({
//   currentIndex: 0,
//   value: 0
// }); // 进度条-止水阀

/**
 * 点击批准按钮
 */

const selectOptions = reactive<SelectOptions[]>([
  {
    id: 1,
    label: '意愿部门',
    selectedValue: '',
    placeholder: '请选择部门',
    options: [
      { label: '技术部', value: '技术部' },
      { label: '产品部', value: '产品部' },
      { label: '设计部', value: '设计部' }
    ]
  },
  {
    id: 2,
    label: '通过状态',
    selectedValue: null,
    placeholder: '请选择状态',
    options: [
      { label: '待处理', value: 0 },
      { label: '通过', value: 1 },
      { label: '未通过', value: 2 }
    ]
  }
]);

const tableData = ref<TableData[]>([
  {
    id: 1,
    name: '张三',
    studentId: '2021001',
    major: '计算机科学与技术',
    department: '技术部',
    reason: '希望提升技术能力',
    status: 0
  },
  {
    id: 2,
    name: '李四',
    studentId: '2021002',
    major: '软件工程',
    department: '产品部',
    reason: '对产品设计感兴趣',
    status: 1
  },
  {
    id: 3,
    name: '李四',
    studentId: '2021002',
    major: '软件工程',
    department: '产品部',
    reason: '对产品设计感兴趣',
    status: 2
  },
  {
    id: 4,
    name: '李四',
    studentId: '2021002',
    major: '软件工程',
    department: '产品部',
    reason: '对产品设计感兴趣',
    status: 0
  }
]);


// 控制按钮是否禁用
const disabledBtnStatus = computed(() => (row: TableData) => {
  return row.status !== 0 || !selectedRows.value.includes(row);
});

/**
 * 筛选过滤后的表格数据
 * @returns {TableData[]}
 */
const filteredTableData = computed(() => {
  const department = selectOptions[0].selectedValue;
  const status = selectOptions[1].selectedValue;
  return tableData.value.filter(item => {
    const departmentMatch = !department || item.department === department;
    const statusMatch = item.status === (status ?? item.status);
    return departmentMatch && statusMatch;
  });
});

/**
 * 确认批准
 */
async function handleConfirm() {
  loading.value = true;
  indeterminate.value = false;

  // 模拟进度条加载
  const timer = setInterval(() => {
    percentage.value += 10;
    if (percentage.value >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        loading.value = false;
        showApproveDialog.value = false;
        percentage.value = 0;
        selectedRows.value.forEach(row => {
          console.log(`批准 ${row.name} - ${row.studentId}`);
        });
      }, 500);
    }
  }, 50);
}

// 批准申请
function handleApprove() {
  showApproveDialog.value = true;
  percentage.value = 0;
  loading.value = false;
  indeterminate.value = true;
}

// 拒绝申请
function handleReject(id: number) {
  console.log('拒绝申请', id);
}

const getStatusLabel = status => {
  switch (status) {
    case 0:
      return '待处理';
    case 1:
      return '已通过';
    case 2:
      return '未通过';
    default:
      return '未知状态';
  }
};

const getStatusTagType = status => {
  switch (status) {
    case 0:
      return 'warning';
    case 1:
      return 'success';
    case 2:
      return 'danger';
  }
};
</script>

<style scoped></style>

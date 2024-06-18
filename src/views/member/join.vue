<template>
  <div class="join">
    <TableFilter
      :search-disposition="searchDisposition"
      :select-options="selectOptions"
      @on-search="onSearch"
    />

    <el-table
      :data="filteredTableData"
      border
      stripe
      @selection-change="selectedRows = $event"
    >
      <el-table-column align="center" type="index" width="50" />
      <el-table-column
        :selectable="row => row.status === 0"
        align="center"
        type="selection"
        width="55"
      />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="学号" prop="studentId" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="专业" prop="profession" />
      <el-table-column label="意愿部门" prop="department" />
      <el-table-column label="申请原因" prop="reason" width="200" />
      <el-table-column label="是否通过" prop="status">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">
            {{ getStatusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            :disabled="disabledBtnStatus(scope.row)"
            size="small"
            @click="handleEmailSend(true)"
          >
            批准
          </el-button>
          <el-button
            :disabled="disabledBtnStatus(scope.row)"
            size="small"
            type="danger"
            @click="handleEmailSend(false)"
          >
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showApproveDialog" title="发送邮箱通知" width="30%">
      <ul>
        <li v-for="(row, index) in selectedRows" :key="row.id">
          {{ row.name }} - {{ row.studentId }}
          <el-progress
            :duration="8"
            :percentage="emailProgress[index] || 0"
            :show-text="true"
            class="my-4"
          />
        </li>
      </ul>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showApproveDialog = false">取消</el-button>
          <el-button :loading="loading" type="primary" @click="handleConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import TableFilter from '@/components/table-filter/table-filter.vue';
import {
  fetchInterviewResults,
  getAllJoinList,
  getOneJoin,
  updateJoinStatus
} from '@/api/app/join.ts';
import { DEV_BASE_API_URL } from '@/config';
import { useMessage } from '@/hooks/useMessage.ts';

interface TableData {
  id: number;
  name: string;
  studentId: string;
  email: string;
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

type EmailEventHandle = (data: {
  emailProgress: number[];
  successfulIds: number[];
  eventSource: EventSource;
  loading: any;
  type: string;
  emailIndexMap: Map<any, number>;
  handleEvent(event: MessageEvent): void;
  onComplete(handle?: EmailEventHandle): void;
}) => void;

const { showMessage } = useMessage();

const isPassed = ref();
const showApproveDialog = ref(false);
const loading = ref(false);
const selectedRows = ref<TableData[]>([]);

const tableData = reactive<TableData[]>([]);
const emailProgress = reactive<number[]>([]);
const selectOptions = reactive<SelectOptions[]>([
  {
    id: 1,
    label: '意愿部门',
    selectedValue: '',
    placeholder: '请选择部门',
    options: [
      { label: '技术部', value: '技术部' },
      { label: '宣策部', value: '宣策部' },
      { label: '外联部', value: '外联部' },
      { label: '秘书部', value: '秘书部' }
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

const searchDisposition = {
  label: '搜索姓名',
  placeholder: '请输入姓名'
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

onMounted(() => {
  fetchJoinList();
});

// 搜索成员
async function onSearch(value: string) {
  await getOneJoin(value).then(res => {
    tableData.splice(0, tableData.length, res.data);
  });
}

// 获取申请列表
async function fetchJoinList() {
  await getAllJoinList().then(res => {
    tableData.splice(0, tableData.length, ...res.data);
  });
}

// 控制按钮是否禁用
const disabledBtnStatus = computed(() => (row: TableData) => {
  return row.status !== 0 || !selectedRows.value.includes(row);
});

// 筛选过滤后的表格数据
const filteredTableData = computed(() => {
  const department = selectOptions[0].selectedValue;
  const status = selectOptions[1].selectedValue;
  return tableData.filter(item => {
    const departmentMatch = !department || item.department === department;
    const statusMatch = item.status === (status ?? item.status);
    return departmentMatch && statusMatch;
  });
});

// 显示邮件弹框
function handleEmailSend(isPassedStatus: boolean) {
  isPassed.value = isPassedStatus;
  showApproveDialog.value = true;
}

class EmailEventProcessor {
  public successfulIds: number[] = [];
  private eventSource: EventSource;
  private emailIndexMap: Map<any, number>;
  private readonly onCompletePromise: Promise<void>;
  private resolveComplete: (value: PromiseLike<void> | void) => void = null;

  constructor(
    private emailProgress: number[],
    mailerDto: any[],
    private loading: any
  ) {
    this.emailIndexMap = new Map(
      mailerDto.map((item: any, index: number) => [item.id, index])
    );
    this.eventSource = new EventSource(
      DEV_BASE_API_URL + '/mailer/email-events'
    );
    this.eventSource.onopen = () => (this.loading.value = true);
    this.eventSource.onmessage = this.handleEvent.bind(this);
    this.onCompletePromise = new Promise<void>(resolve => {
      this.resolveComplete = resolve;
    });
  }

  // 等待所有邮件处理完成
  onComplete() {
    return this.onCompletePromise;
  }

  // 处理邮件事件
  private handleEvent(event: MessageEvent) {
    const data = JSON.parse(event.data);
    const index = this.emailIndexMap.get(data.id);

    if (data.status === 'success') {
      this.emailProgress[index] = 100;
      this.successfulIds.push(data.id);
    }

    if (data.type === '[DONE]') {
      setTimeout(() => {
        this.eventSource.close();
        this.resolveComplete?.(undefined);
      }, 2000);
    }
  }
}

// 处理确认操作
async function handleConfirm() {
  emailProgress.length = 0;
  // 初始化邮件进度数组
  selectedRows.value.forEach(() => emailProgress.push(0));

  const mailerDto = selectedRows.value.map(row => ({
    id: row.id,
    email: row.email,
    username: row.name,
    isPassed: isPassed.value
  }));

  const emailEventProcessor = new EmailEventProcessor(
    emailProgress,
    mailerDto,
    loading
  );

  // 获取面试结果
  await fetchInterviewResults(mailerDto);
  // 等待所有邮件处理完成
  await emailEventProcessor.onComplete();

  try {
    await updateJoinStatus(
      isPassed.value ? 1 : 2,
      emailEventProcessor.successfulIds
    );
    await fetchJoinList();
  } catch (error) {
    showMessage('更新申请状态失败', 'error');
  } finally {
    loading.value = false;
    showApproveDialog.value = false;
  }
}
</script>

<style scoped></style>

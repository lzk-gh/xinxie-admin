<template>
  <div>
    <h1 class="mb-2">工具管理</h1>
    <div class="test">
      <!-- 表单区域 -->
      <table-header
        v-model="selectedDropdownId"
        v-model:showDialog="showDialog"
        :dialogTitle="dialogTitle"
        :disabledComplete="disabledComplete"
        :options="options"
        @close="handleClose"
        @confirm="handleConfirm"
      >
        <template #dialog-content>
          <span>* 标题</span>
          <el-input v-model="dialogForm.title" placeholder="" type="text" />
          <span>* 链接</span>
          <el-input v-model="dialogForm.link" placeholder="" type="text" />
          <span>* 概述</span>
          <el-input
            v-model="dialogForm.summarize"
            placeholder=""
            type="textarea"
          />
        </template>
      </table-header>
      <el-table
        :data="filterToolsTable"
        border
        max-height="600"
        size="large"
        stripe
        table-layout="auto"
      >
        <el-table-column label="序号">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" />
        <el-table-column label="概述" prop="summarize" />
        <el-table-column label="链接" prop="link" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              width="200"
              :title="deleteTip"
              @confirm="deleteConfirm(scope.row.id)"
            >
              <template #reference>
                <el-button
                  size="small"
                  @click="handleDelete(scope.row, scope.$index + 1)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, shallowReactive } from 'vue';
import TableHeader from '@/components/table-header/table-header.vue';
import {
  creatTool,
  deleteTool,
  getAllTools,
  Tool,
  updateTool
} from '@/api/app/tools.ts';

const showDialog = ref(false); // 控制模态框
const dialogTitle = ref('新建'); // 模态框的标题
const docsTableRowId = ref(); // 选中行的id(用于编辑)
const docsTable = reactive([]); // 文档表单数据集

const deleteTip = ref(''); // 删除提示

const options = [
  {
    label: '前端',
    id: 1
  },
  {
    label: '后端',
    id: 2
  },
  {
    label: 'UI',
    id: 3
  },
  {
    label: '专插本',
    id: 4
  }
];

// 控制模态框的确认按钮是否可点击
const disabledComplete = computed(() => {
  return Object.values(dialogForm).every(item => item);
});

const selectedDropdownId = ref(1); // 默认选中 ID

onMounted(() => {
  // 获取文档列表
  getDocsList();
});

const dialogForm = shallowReactive({
  // 添加表单
  title: '',
  link: '',
  summarize: ''
});

const filterToolsTable = computed(() => {
  return docsTable.filter(item => item.type === selectedDropdownId.value);
});

/**
 * 点击编辑按钮
 * 唤起模态框，将点击编辑行的元素赋值给对应的addFrom
 * @param row
 */
function handleEdit(row) {
  dialogTitle.value = '编辑';
  showDialog.value = true;
  docsTableRowId.value = row.id;
  Object.keys(dialogForm).forEach(key => {
    row.hasOwnProperty(key) && (dialogForm[key] = row[key]);
  });
}

async function getDocsList() {
  await getAllTools().then(res => {
    docsTable.splice(0, docsTable.length, ...res.data);
  });
}

// dialog确认按钮
async function handleConfirm() {
  if (dialogTitle.value === '编辑') {
    await updateTool(<Tool>{
      id: docsTableRowId.value,
      ...dialogForm
    }).then(() => getDocsList());
    return;
  }
  await creatTool(<Tool>{
    type: selectedDropdownId.value,
    ...dialogForm
  }).then(() => getDocsList());
}

// 关闭dialog时清空表单
function handleClose() {
  dialogTitle.value = '新建';
  showDialog.value = false;
  Object.keys(dialogForm).forEach(key => {
    dialogForm[key] = '';
  });
}

function handleDelete(row: object, index: number) {
  const rowType = options.find(item => item.id === row.type).label;
  deleteTip.value = `删除-${rowType}-序号${index} 吗？`;
}

async function deleteConfirm(id: Tool) {
  await deleteTool({ id: id }).then(() => {
    getDocsList();
  });
}
</script>

<style lang="scss" scoped>
.test {
  background-color: var(--theme-header-bg-color);
}
</style>

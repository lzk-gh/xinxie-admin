<template>
  <div>
    <h1 class="mb-2">文档管理</h1>
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
          <el-input v-model="modelFrom.title" placeholder="" type="text" />
          <span>* 链接</span>
          <el-input v-model="modelFrom.link" placeholder="" type="text" />
          <span>* 概述</span>
          <el-input
            v-model="modelFrom.summarize"
            placeholder=""
            type="textarea"
          />
        </template>
      </table-header>
      <el-table
        :data="filterDocsTable"
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
                <el-button size="small" @click="handleDelete(scope.row, scope.$index + 1)">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
            <!--<n-popconfirm-->
            <!--    @positive-click="handlePositiveClick(scope.row)"-->
            <!--    positive-text="确认"-->
            <!--    negative-text="取消"-->
            <!--&gt;-->
            <!--  <template #trigger>-->
            <!--    <el-button size="small" @click="showPopconfirm(scope.row)">删除</el-button>-->
            <!--  </template>-->
            <!--  删除 {{ scope.$index + 1 }} - {{ deleteRow.id }} - {{ deleteRow.type }}-->
            <!--</n-popconfirm>-->
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
  creatDoc,
  deleteDoc,
  Doc,
  getAllDocs,
  updateDoc
} from '@/api/app/docs.ts';

const showDialog = ref(false); // 控制模态框
const dialogTitle = ref('新建'); // 模态框的标题
const docsTableRowId = ref(); // 选中行的id(用于编辑)
const docsTable = reactive([]); // 文档表单数据集

const deleteTip = ref(''); // 删除提示
const deleteRow = reactive({}); // 删除行(存id, type)
const deleteFinishedFlag = ref(false); // 用于标识删除操作是否完成-更新视图

// const docsType = {
//   前端: 1,
//   后端: 2,
//   UI: 3
// };
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
  return Object.values(modelFrom).every(item => item);
});

const selectedDropdownId = ref(1); // 默认选中 ID

onMounted(() => {
  // 获取文档列表
  getDocsList();
});

const modelFrom = shallowReactive({
  // 添加表单
  title: '',
  link: '',
  summarize: ''
});

const filterDocsTable = computed(() => {
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
  Object.keys(modelFrom).forEach(key => {
    row.hasOwnProperty(key) && (modelFrom[key] = row[key]);
  });
}

async function getDocsList() {
  await getAllDocs().then(res => {
    docsTable.splice(0, docsTable.length, ...res.data);
  });
}

// dialog确认按钮
async function handleConfirm() {
  if (dialogTitle.value === '编辑') {
    await updateDoc(<Doc>{
      id: docsTableRowId.value,
      ...modelFrom
    }).then(() => getDocsList());
    return;
  }
  await creatDoc(<Doc>{
    type: selectedDropdownId.value,
    ...modelFrom
  }).then(() => getDocsList());
}

// 关闭dialog时清空表单
function handleClose() {
  dialogTitle.value = '新建';
  showDialog.value = false;
  Object.keys(modelFrom).forEach(key => {
    modelFrom[key] = '';
  });
}

function handleDelete(row: object, index: number) {
  const rowType = options.find(item => item.id === row.type).label;
  deleteTip.value = `删除-${rowType}-序号${index} 吗？`;
}

async function deleteConfirm(id: Doc) {
  await deleteDoc({id: id}).then(() => {
    getDocsList();
  });
}
</script>

<style lang="scss" scoped>
.test {
  background-color: var(--theme-header-bg-color);
}
</style>

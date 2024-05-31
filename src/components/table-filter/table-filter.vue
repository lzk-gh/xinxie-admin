<template>
  <div class="table-filter">
    <el-form inline :model="selectOptions">
      <template v-for="item in selectOptions" :key="item.id">
        <el-form-item :label="item.label" :prop="item.selectedValue">
          <el-select
            v-model="item.selectedValue"
            :placeholder="item.placeholder"
            clearable
            filterable
            style="width: 240px"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item :label="searchDisposition.label">
        <el-input
          v-model="searchValue"
          :placeholder="searchDisposition.placeholder"
          @keyup.enter="onSearch"
        >
          <template #append>
            <el-button @click="onSearch">
              <template #icon>
                <Search />
              </template>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

defineProps<{
  selectOptions: {
    id: number;
    label: string;
    value: string;
    selectedValue: string;
    placeholder: string;
    options: { label: string; value: string }[];
  }[];
  searchDisposition: {
    label: string;
    placeholder: string;
  };
}>();

const searchValue = ref('');

const emit = defineEmits(['on-search']);

function onSearch() {
  if (!searchValue.value) return;
  emit('on-search', searchValue.value);
}
</script>

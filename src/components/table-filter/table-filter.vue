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
    </el-form>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  selectOptions: {
    id: number;
    label: string;
    value: string;
    selectedValue: string;
    placeholder: string;
    options: { label: string; value: string }[];
  }[];
}>();
</script>

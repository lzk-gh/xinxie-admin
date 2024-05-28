<template>
  <el-dropdown
    :popper-options="options"
    class="mx-6 mr-2.5 my-4"
    trigger="click"
    @command="handleCommand"
  >
    <el-button>{{ currentOption }}</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item.id"
          :command="item"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-button class="my-4" plain @click="dialogStatus = true">+ 新建</el-button>

  <el-dialog
    v-model="dialogStatus"
    align-center
    width="480"
    @closed="handleDialogCancel"
  >
    <template #header>{{ dialogTitle }}</template>
    <div class="dialog-space">
      <slot name="dialog-content" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          :disabled="!disabledComplete"
          type="primary"
          @click="handleDialogConfirm"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineModel } from 'vue';

const props = defineProps<{
  options: Array<{ label: string; id: number }>;
  disabledComplete: boolean;
  dialogTitle: string;
}>();

const emit = defineEmits(['confirm', 'close']);

const selectedDropdownId = defineModel<number>();
const showDialog = defineModel('showDialog');

const dialogStatus = ref(showDialog);
const currentOption = ref(props.options[0].label);

function handleCommand(command: { label: string; id: number }) {
  currentOption.value = command.label;
  selectedDropdownId.value = command.id;
}

function handleDialogConfirm() {
  dialogStatus.value = false;
  emit('confirm');
}

function handleDialogCancel() {
  emit('close');
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-start;
}

.dialog-space {
  display: flex;
  flex-flow: column;
  gap: 8px 12px;
}
</style>

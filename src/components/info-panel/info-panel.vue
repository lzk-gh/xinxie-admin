<template>
  <div class="info-panel">
    <div class="m-auto mb-4 text-lg flex items-center justify-between">
      <div class="flex items-center">
        <span class="bg-violet-300 rounded-full w-2 h-2 mr-2"></span>
        <slot name="panel-title" />
      </div>
      <slot name="panel-button" />
    </div>
    <div class="w-full">
      <slot name="panel-content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-panel {
  border-radius: 10px;
  padding: 20px;
  background-color: var(--theme-main-bg-color);
}
</style>

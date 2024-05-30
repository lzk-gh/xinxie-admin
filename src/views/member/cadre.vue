<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="n in 9"
      :key="n"
      class="rounded-lg shadow-lg cadre-bg-white overflow-hidden"
    >
      <div class="p-6 group">
        <div class="flex flex-col items-center">
          <img
            class="w-24 h-24 rounded-full mb-3"
            src="@/assets/img/purple-boy.png"
            alt="用户头像"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900">用户名</h5>
          <span class="text-sm text-gray-500">会长</span>

          <div class="w-full mt-2 px-2 py-2 rounded-lg text-center relative">
            <p class="text-gray-700 font-medium text-sm">
              相信美好，追寻梦想，永不放弃！
            </p>
            <div
              class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-0 group-hover:w-full transition-all duration-300"
            ></div>
          </div>

          <div class="w-full mt-2">
            <div class="text-sm text-gray-500 mb-2">
              <span class="font-medium">Email:</span>
              134....qq.com
            </div>
            <div class="text-sm text-gray-500 mb-2">
              <span class="font-medium">电话:</span>
              123-456-7890
            </div>
            <div class="text-sm text-gray-500">
              <span class="font-medium">学院:</span>
              信息学院
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cadre-bg-white {
  border: 1px solid var(--el-border-color) !important;
  background-color: var(--el-bg-color) !important;
}
</style>

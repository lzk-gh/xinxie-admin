<template>
  <el-container>
    <Sidebar />
    <el-main>
      <el-header>
        <Header />
      </el-header>
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import Header from '@/layout/components/header/header.vue';
import Sidebar from '@/layout/components/sidebar/sidebar.vue';
</script>

<style lang="scss" scoped>
.main-content {
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: var(--theme-header-bg-color);
  overflow-y: scroll;
}
</style>

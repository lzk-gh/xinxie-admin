<template>
  <el-container>
    <Sidebar />
    <el-main>
      <el-header>
        <Header />
      </el-header>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import Header from '@/layout/components/header/header.vue';
import Sidebar from '@/layout/components/sidebar/sidebar.vue';
</script>

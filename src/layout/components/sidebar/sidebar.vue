<template>
  <el-aside :width="collapseMenu ? '64px' : '260px'">
    <div class="logo-container">
      <img src="@/assets/img/logo.webp" alt="" class="logo" />
      <span v-if="!collapseMenu" class="logo-text">ITA</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :router="true"
      :collapse-transition="false"
      :collapse="collapseMenu"
      :default-active="activeIndex"
    >
      <el-menu-item index="home">
          <el-icon>
            <i class="fi fi-sr-chart-line-up"></i>
          </el-icon>
          <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="member">
        <template #title>
          <el-icon>
            <i class="fi fi-ss-transporter"></i>
          </el-icon>
          <span>成员管理</span>
        </template>
        <el-menu-item index="member_cadre">现任干部</el-menu-item>
        <el-menu-item index="member_join">加入我们</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <i class="fi fi-rr-productivity"></i>
          </el-icon>

          <span>专用管理</span>
        </template>
        <el-menu-item index="specific_docs">文档管理</el-menu-item>
        <el-menu-item index="specific_tools">工具管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="hide-menu">
      <button class="hide-menu-btn" @click="collapseMenu = !collapseMenu">
        <el-icon v-if="!collapseMenu"><ArrowLeft /></el-icon>
        <el-icon v-else><ArrowRight /></el-icon>
      </button>
    </div>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, Edit } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const collapseMenu = ref(false);
const activeIndex = ref('home');

watchEffect(() => {
  activeIndex.value = route.path.slice(1) || 'home';
});
</script>
<style lang="scss" scoped>
.el-aside {
  position: relative;
  height: 100vh;
  overflow: hidden;
  transition: all 0.2s;

  .el-menu {
    height: calc(100% - 60px);
  }

  .logo-container {
    display: flex;
    align-items: center;
    padding: 16px;
    height: 60px;
  }

  .logo {
    height: 32px;
  }

  .logo-text {
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
  }

  .hide-menu {
    position: absolute;
    top: 45%;
    right: -10px;

    .hide-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border: 0;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>

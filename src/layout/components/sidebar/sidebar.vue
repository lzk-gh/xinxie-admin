<template>
  <el-aside :width="collapseMenu ? '64px' : '260px'">
    <div class="logo-container">
      <img src="@/assets/img/logo.webp" alt="" class="logo" />
      <span v-if="!collapseMenu" class="logo-text">ITA</span>
    </div>
    <el-menu
        :collapse="collapseMenu"
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse-transition="false"
        @select="selectMenu"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Edit /></el-icon>
          <span>成员管理</span>
        </template>
        <el-menu-item index="member_cadre">现任干部</el-menu-item>
        <el-menu-item index="member_join">加入我们</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Edit /></el-icon>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { Edit, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
const router = useRouter();
const collapseMenu = ref(false);

function selectMenu(index) {
  router.push('/' + index);
}
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

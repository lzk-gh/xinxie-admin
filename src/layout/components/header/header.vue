<template>
  <div class="flex items-center justify-end px-4 py-3">
    <div class="flex items-center relative">
      <div
        class="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
        @click="handleThemeToggle"
      >
        <svg
          v-if="!isSun"
          class="w-5 h-5 transform transition-transform duration-300 hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#475569"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="2s"
            repeatCount="indefinite"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 transform transition-transform duration-300 hover:scale-110"
          viewBox="0 0 24 24"
          fill="#475569"
          stroke="#475569"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          <animate attributeName="r" values="5;6;5" dur="1s" repeatCount="indefinite" />
        </svg>
      </div>
      <img src="@/assets/img/productivity-bg-1.webp" alt="Avatar" class="w-8 h-8 rounded-full ml-2 mr-2" />
      <span class="mr-2 cursor-pointer" @click="showDropdown = !showDropdown">{{ username }}</span>
      <el-icon
        class="cursor-pointer transform transition-transform duration-200"
        :class="{ 'rotate-180': showDropdown }"
        @click="showDropdown = !showDropdown"
      >
        <ArrowDown />
      </el-icon>
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="showDropdown"
          class="absolute right-0 top-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200"
          @mouseover="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              我的资料
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              设置
            </a>
            <div
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click="logout"
            >
              退出登录
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useTheme } from '@/hooks/useTheme.ts';
import { useRouter } from 'vue-router';
import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';

const router = useRouter();
const isSun = ref(false);
const showDropdown = ref(false);
const { switchDark } = useTheme();

const username = ref('User');

onMounted(() => {
  const login = localStorage.getItem('login');
  if (login) {
    username.value = JSON.parse(login).username;
  }
})

function handleThemeToggle(e: MouseEvent) {
  switchDark(e);
  isSun.value = !isSun.value;
}

function logout() {
  const loading = ElLoading.service({ fullscreen: true });
  localStorage.removeItem('token');
  localStorage.removeItem('login');
  setTimeout(() => {
    loading.close();
    router.push('/login');
  }, 1000);
}
</script>

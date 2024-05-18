import { defineStore } from 'pinia';

interface GlobalState {
  // 深色模式
  isDark: boolean;
  // 折叠菜单
  isCollapse: boolean;
}

export const useGlobalStore = defineStore({
  id: 'xinxie-theme',
  state: (): GlobalState => ({
    isDark: false,
    isCollapse: false
  }),
  getters: {},
  actions: {
    /**
     * 设置全局状态
     * @param key 要设置的属性名
     * @param value 属性值
     */
    setGlobalState<T extends keyof GlobalState>(key: T, value: GlobalState[T]) {
      this.$patch({ [key]: value });
    }
  },
  persist: {
    key: 'xinxie-theme'
  }
});

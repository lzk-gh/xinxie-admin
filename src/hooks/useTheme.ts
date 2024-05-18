import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/models/global.ts';

// 定义接口
interface ThemeHook {
  initTheme: () => void;
  switchDark: (e: MouseEvent) => void;
}

/**
 * 全局主题 hook
 * @returns {ThemeHook} 包含初始化主题和切换主题方法的对象
 */
export const useTheme = (): ThemeHook => {
  const globalStore = useGlobalStore();
  const { isDark } = storeToRefs(globalStore);
  const docElement = document.documentElement;

  /**
   * 切换主题动画
   * @param e 鼠标事件对象
   */
  const applyThemeTransition = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const targetRadius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY)
    );
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${targetRadius}px at ${clientX}px ${clientY}px)`
    ];
    const isDarkMode = docElement.classList.contains('dark');
    const animationOptions: KeyframeAnimationOptions = {
      duration: 400,
      pseudoElement: isDarkMode
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)'
    };
    docElement.animate(
      {
        clipPath: isDarkMode ? clipPath.reverse() : clipPath
      },
      animationOptions
    );
  };

  /**
   * 切换暗黑模式
   * @param e 鼠标事件对象
   */
  const switchDark = (e: MouseEvent) => {
    globalStore.setGlobalState('isDark', !isDark.value);
    const toggleStatus = (document as any).startViewTransition?.(() => {
      docElement.classList.toggle('dark');
    });

    toggleStatus?.ready.then(() => {
      applyThemeTransition(e);
    });
  };

  /**
   * 初始化主题
   */
  const initTheme = () => {
    docElement.classList.toggle('dark', isDark.value);
  };

  return { initTheme, switchDark };
};

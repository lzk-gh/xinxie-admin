import { ElMessage } from "element-plus";

const useMessage = () => {
  const showMessage = (
    message: string,
    type?: 'success' | 'warning' | 'info' | 'error',
    duration: number = 2000
  ) => {
    ElMessage({
      message,
      type,
      duration,
      plain: true
    });
  };

  return {
    showMessage
  };
}

export { useMessage };

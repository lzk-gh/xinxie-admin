import { createPinia, Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 将持久化存储插件添加到pinia实例上
const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

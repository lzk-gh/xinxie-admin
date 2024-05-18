import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';
import router from './router';
import pinia from '@/stores/index.js';

createApp(App).use(router).use(pinia).mount('#app');

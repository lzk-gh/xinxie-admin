/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, any>, Record<string, any>>;
  export default component;
}

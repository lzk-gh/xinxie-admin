import { DEV_BASE_API_URL } from '@/config';
import { post } from "@/utils/request.ts";

interface LoginConfig {
  username: string;
  password: string
}

// 登录
export const postLogin = (config: LoginConfig) => post(DEV_BASE_API_URL, '/auth/login', config);

// 注册
export const postRegister = (config: LoginConfig) => post(DEV_BASE_API_URL, '/auth/register', config);

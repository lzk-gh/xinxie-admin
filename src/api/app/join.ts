import { DEV_BASE_API_URL } from '@/config';
import { post, get, put } from '@/utils/request.ts';

export const getAllJoinList = () => get(DEV_BASE_API_URL, '/join/list');

export const getOneJoin = (config: string) =>
  post(DEV_BASE_API_URL, '/join/list_one', {
    name: config
  });

// 通知后台需操作的邮箱信息
export const fetchInterviewResults = (
  config: {
    isPassed: boolean;
    email: string;
    username: string;
  }[]
) => post(DEV_BASE_API_URL, '/mailer/inform', config);

// 更新面试状态
export const updateJoinStatus = (status: number, ids: number[]) =>
  put(DEV_BASE_API_URL, '/join/update_status', {
    status,
    ids
  });

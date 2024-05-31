import { DEV_BASE_API_URL } from '@/config';
import { post, get } from '@/utils/request.ts';

export const getAllJoinList = () => get(DEV_BASE_API_URL, '/join/list');
export const getOneJoin = (config: string) => post(DEV_BASE_API_URL, '/join/list_one', { name: config });

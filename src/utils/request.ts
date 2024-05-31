import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import 'element-plus/dist/index.css';
import { useMessage } from '@/hooks/useMessage.ts';
const { showMessage } = useMessage();

const service: AxiosInstance = axios.create({
  timeout: 120000
});

interface RequestFunction {
  (host: string, url: string, ...args: any[]): Promise<AxiosResponse<any>>;
}

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const errorMessage =
        (error.response.data as { message: string }).message || '出错啦~';
      showMessage(errorMessage, 'error' );
      return Promise.reject(error);
    } else {
      showMessage('网络加载失败', 'error' );
      return Promise.reject(error);
    }
  }
);

// Record<string, any> 用于描述一个对象，其中所有的键都是字符串类型，所有的值可以是任何类型
export const get: RequestFunction = (
  host: string,
  url: string,
  params?: Record<string, any>
) => {
  return service({
    url: host + url,
    method: 'get',
    params
  });
};

export const post: RequestFunction = (
  host: string,
  url: string,
  data?: any
) => {
  return service({
    url: host + url,
    method: 'post',
    data: data
  });
};

export const put: RequestFunction = (host: string, url: string, data?: any) => {
  return service({
    url: host + url,
    method: 'put',
    data: data
  });
};

export const deleteRequest: RequestFunction = (host: string, url: string) => {
  return service({
    url: host + url,
    method: 'delete'
  });
};

export { service };

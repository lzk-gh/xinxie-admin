import { DEV_BASE_API_URL } from "@/config";
import { post, get, put } from "@/utils/request.ts";

export interface Tool {
  id: number,
  type?: number,
  title?: string,
  link?: string,
  summarize?: string
}

export const getAllTools = () => get(DEV_BASE_API_URL, '/tools/list');
export const creatTool = (config: Tool) => post(DEV_BASE_API_URL, '/tools/create', config);
export const updateTool = (config: Tool) => put(DEV_BASE_API_URL, '/tools/update', config);
export const deleteTool = (config: { id: Tool }) => post(DEV_BASE_API_URL, '/tools/delete', config);

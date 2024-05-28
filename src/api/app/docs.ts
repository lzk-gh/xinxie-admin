import { DEV_BASE_API_URL } from "@/config";
import { post, get, put } from "@/utils/request.ts";

export interface Doc {
  id: number,
  type?: number,
  title?: string,
  link?: string,
  summarize?: string
}

export const getAllDocs = () => get(DEV_BASE_API_URL, '/docs/list');
export const creatDoc = (config: Doc) => post(DEV_BASE_API_URL, '/docs/create', config);
export const updateDoc = (config: Doc) => put(DEV_BASE_API_URL, '/docs/update', config);
export const deleteDoc = (config: { id: Doc }) => post(DEV_BASE_API_URL, '/docs/delete', config);

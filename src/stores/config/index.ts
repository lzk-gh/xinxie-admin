/**
 * 配置 Pinia 状态持久化参数
 * @param {String} key 存储到持久化的名称
 * @param {Array} paths 需要持久化的状态名称数组
 * @returns {{paths: Array, storage: Storage, key: String}}
 */

export const piniaPersistConfig = (key: string, paths = []) => {
  return {
    key,
    storage: localStorage,
    paths: paths
  };
};

/**
 * 原始数据
 */
const treeData: Array<Util.NodeInfo> = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

/**
 * 设置节点路径
 */
const setNodePath = (targetData: Array<Util.NodeInfo>, path: string = '') => {
  return targetData.map((item) => {
    item.path = path ? `${path}/${item.key}` : item.key;
    if (item.children && item.children.length > 0) {
      item.children = setNodePath(item.children, item.path);
    }
    return item;
  });
};

/**
 * 设置节点标题
 */
export const setNodeTitleByPath = (targetData: Array<Util.NodeInfo>, pathArray: Array<string>, value: string, level: number = 0) => {
  return targetData.map((item) => {
    if (item.key === pathArray[level]) {
      if (level < pathArray.length - 1) {
        if (item.children && item.children.length > 0) {
          item.children = setNodeTitleByPath(item.children, pathArray, value, level + 1);
        }
      } else {
        item.title = value;
      }
    }
    return item;
  });
};

export const defaultTreeData = setNodePath(treeData);

/**
 * 获取节点KEYS
 */
export const getNodesKeys = (targetData: Array<Util.NodeInfo>) => {
  const keys: Array<string> = [];
  targetData.forEach((item) => {
    keys.push(item.key);
    if (item.children && item.children.length > 0) {
      const childrenKeys: Array<string> = getNodesKeys(item.children);
      keys.push(...childrenKeys);
    }
  });
  return keys;
};

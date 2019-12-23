/** 用于树Tree */
export function mapTreeNode(nodeList) {
  return nodeList.map(node => {
    const { children, name, id } = node;
    const newNode = { key: id, title: name };
    if (children && children.length > 0) {
      newNode.children = mapTreeNode(children);
    }
    return newNode;
  });
}

/**
 * 找到key对应treeNode
 * @param {array} treeData 原始数据
 * @param {string|nubmer} key 目标key
 */
export function findTreeNode(treeData, key) {
  const len = treeData.length;
  let target;
  for (let i = 0; i < len; i++) {
    const node = treeData[i];
    if (node.key === key) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      target = findTreeNode(node.children, key);
      if (target) {
        return target;
      }
    }
  }
  return target;
}

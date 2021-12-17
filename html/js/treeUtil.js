export function arrayToTree (arr, parentId) {
  const temp = []
  const treeArr = arr

  treeArr.forEach((item, index) => {
    if (item.parentId === parentId) {
      const cta = arrayToTree(treeArr, treeArr[index].id)
      if (cta.length > 0) {
        treeArr[index].children = cta
      }

      temp.push(treeArr[index])
    }
  })

  return temp
}

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

function getNodePath (nodeList, id) {
  const len = nodeList.length
  for (let i = 0; i < len; i++) {
    const node = nodeList[i]
    temppath.push(node.title)
    if (node.key === id) {
      // eslint-disable-next-line no-throw-literal
      throw 'GOT IT!'
    }
    if (node.children && node.children.length > 0) {
      getNodePath(node.children, id)
      // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
      temppath.pop()
    } else {
      // 找到叶子节点时，删除路径当中的该叶子节点
      temppath.pop()
    }
  }
}

let temppath
export function getPathNameById (nodeList, id) {
  // 定义变量保存当前结果路径
  temppath = []
  try {
    getNodePath(nodeList, id)
  } catch (e) {
    var result = temppath.join('-')
    return result
  }
  return ''
};

// 过滤树，根据筛选条件返回新的树
export function treeFilter (list, callback, childrenName = 'children') {
  list.forEach(item => {
    if (!callback(item) && item[childrenName] && item[childrenName].length) {
      item[childrenName] = treeFilter(item[childrenName], callback)
      if (item[childrenName].length) {
        console.log('title: ' + item.title)
        item.has = true
      }
    }
  })

  return list.filter(item => callback(item) || item.has)
}

// 设置了 has 属性， 下次过滤会产生脏数据，调用treeFilter2 前，最好深度复制
function treeFilter2 (list, callback){
  list.forEach(item => {
    if(item.children && item.children.length){
      item.children = treeFilter(item.children, callback);
      if(item.children.length === 0){
        delete item.children
      }else{
        item.has = true
      }
    }
  })

  return list.filter(item => callback(item) || item.has)
}

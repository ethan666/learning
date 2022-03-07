/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2021-05-17 20:26:09
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-02-28 11:11:26
 */
let list =[
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
];

let time = 0
function convert(source, parentId = 0){
  let trees = [];
  for (let item of source) {
    time++; 
    console.log('time:',time)
    if(item.parentId === parentId) {
      let children = convert(source, item['id']);
      if(children.length) {
        item.children = children
      }
      trees.push(item);
    }
  }
  return trees;
}

// const tree = convert(list)
// console.log('tree: ', tree)
// time 72


let time2 = 0
function convert2(list) {
	const res = []
	// const map = list.reduce((res, v) => (res[v.id] = v, res), {})
  const map = list.reduce((res, v) => {
    res[v.id] = v
    return res
  }, {})
	for (const item of list) {
    time2++
    console.log('time2:',time2)
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}

const tree = convert2(list)
console.log('tree: ', tree)
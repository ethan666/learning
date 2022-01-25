/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-25 14:40:07
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-25 15:50:12
 */

// 模拟new关键字实现，第一个参数构造函数，其他参数为构造函数参数
function _new() {
  const args = [].slice.call(arguments);
  const fn = args.shift();
  const context = Object.create(fn.prototype);
  const obj = fn.apply(context, args);

  return typeof obj === "object" && obj !== null ? obj : context;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

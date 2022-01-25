/*
 * @Descripttion: 作用域、作用域链
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2021-12-22 11:24:08
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-21 16:54:38
 */

var a1 = "eee";
const a2 = "34324";

function f1() {
  const a3 = "3423";
  console.log(this);
  return [a1, a2, a3];
}

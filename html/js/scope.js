/*
 * @Descripttion: 作用域、作用域链
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2021-12-22 11:24:08
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-02-28 09:17:49
 */

var a1 = "eee";
const a2 = "34324";

function f1() {
  const a3 = "3423";
  console.log(this);
  return [a1, a2, a3];
}


// function aa(){
//   let a = 2
//   if(a>1){
//     let a = 3
//     console.log(`1:${a}`)
//     a = 5
//     console.log(`1.1:${a}`)
//   }
//   console.log(`2:${a}`)
// }

var b = 10;
(function b() {
  var b = 20; // IIFE内部变量
  console.log(b); // 20
  console.log(window.b); // 10 
})();
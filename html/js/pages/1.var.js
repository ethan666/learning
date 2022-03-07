/*
 * @Descripttion: var、let、var区别
 * var
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-02-17 14:23:02
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-02-23 11:20:32
 */

// var 
var a = 2
function tvar(){
    console.log(`a: ${a}`)
    // var a = 20
    var a
}
tvar()
console.log(`global a: ${a}`)

// let 不存在变量提升
function tlet(){
    console.log(`b:${b}`)
    let b = 5
}
// tlet()


// 是否受外部影响
var b = 5
function tlet2(){
    console.log(`b:${b}`)
    let b
}
// tlet2()

// 循环中的块级作用域
// var funcs = [];
// var i
// for ( i = 0; i < 3; i++) {
//     funcs[i] = function () {
//         console.log(i);
//     };
// }
// funcs[0](); // 3

// var funcs = [];
// for (var i = 0; i < 3; i++) {
//     funcs[i] = (function(i){
//         return function() {
//             console.log(i);
//         }
//     }(i))
// }
// funcs[0](); // 0

// var funcs = [];
// for (let i = 0; i < 3; i++) {
//     funcs[i] = function () {
//         console.log(i);
//     };
// }
// funcs[0](); // 0
// console.log(i)

for (var i = 0; i < 3; i++) {
    var i = 'abc';
    console.log(i);
}
console.log('t:'+i)
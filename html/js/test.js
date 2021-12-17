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
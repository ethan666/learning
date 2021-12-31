/*
 * @Descripttion: 闭包测试
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2021-12-22 11:24:08
 * @LastEditors: 谭义洋
 * @LastEditTime: 2021-12-22 13:47:31
 */

function f1(p){
    function f2(){
        console.log(p)
    }
    return f2
}

for(var i=0; i<3; i++){
    setTimeout(f1(i), 50)
}

for(var i=0; i<3; i++){
    (function(num){
        setTimeout(() => {
            console.log(`num: ${num}`)
        }, 50)
    })(i);
}

function makeAdder(x){
    return function(y){
        return x+y
    }
}

const adder1 = makeAdder(5)
const adder2 = makeAdder(8)


/*
 * @Descripttion: 有n个台阶，两步的次数：x, 一步的次数:n-2x, 一共的次数:n-x
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-03-11 15:25:33
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-03-16 17:44:34
 */

// 11 
// 144

// 两步的次数：x, 一步的次数:n-2x, 一共的次数:n-x


// n-x * n-x-1 
// c(n-x, x)
// c(11, 0) + c(11)

// n: 11, x：0~5 ，
// 一共的次数6~11

// c(11, 0) + c(10, 1) + c(9, 2) + c(8, 3) ... c(6, 5)
// 1 + 10 + 9*8 + 8*7*6 + 

// 求组合, C(m, n). 0<n<=m


// 有问题
function c(m, n){
    if(n === 0){
        return 1
    }
    if(n === 1){
        return m
    }
    return m*c(m-1, n-1)
}

// c(5, 2) = 5*4
// c(5, 3) = 5*4*3

// 阶乘，n > 0
function factorial(n){
    if(n<0){
        throw new Error("n必须大于0")
    }
    if(n === 0){
        return 1
    }
    if(n === 1){
        return 1
    }
    return n * factorial(n-1)
}

// c(5, 3)
// 5*4*3*2*1/3*2*1（5-3）！=5*4*3*2*1/3*2*1*2*1=10。
function c2(m, n){
    return factorial(m)/(factorial(n)*factorial(m-n))
}


let sum = 0
for(var i = 0; i<6; i++){
    sum += c2(11-i, i)
}
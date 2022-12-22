console.log('hello world!')
// setTimeout(() => {
//     console.log('s o')
// }, 10000)
// console.log(process)
// setInterval(()=> {
//     console.log('aa')
// }, 1000)

const buffer1 = Buffer.from('abc')
const buffer2 = Buffer.from([1, 2, 3, 4])
const buffer3 = Buffer.alloc(20)

console.log(buffer1)
console.log(buffer2)
console.log(buffer3)
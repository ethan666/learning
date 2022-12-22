const obj = {
    c: {
        d: 'tt'
    }
}

const key = 'c.d'
const func = new Function(`return obj.${key}`)

var output = func()
console.log('output:',output)
console.log('over')
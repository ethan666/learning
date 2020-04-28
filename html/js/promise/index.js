const promise = new Promise(function(resolve, reject){
    setTimeout(()=>{
        var a = 0
        if(a>1){
            resolve({status:'success', a})
        }else{
            reject({status:'fail', a})
        }
    }, 1000)
})

promise.then(
    res => {
        const {status, a} = res
        console.log(`status:${status}, a:${a}`)
    },
    res => {
        const {status, a} = res
        console.log(`status:${status}, a:${a}`)
    }
)

Promise.reject('fail').then(res => {console.log(`resolve:${res}`)},res => {console.log(`reject:${res}`)})
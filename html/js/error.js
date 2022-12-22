async function test(){
    console.log('11')
    try {
        throw new Error('abc')
    } catch (error) {
        console.log(error)
    }
    console.log('22')
}

function init(){
    try {
        test()
    } catch (error) {
        console.log('err:',error)
    }
}

init()
const excute = () => {
    id = null
    console.log('excute')
}


let id
const handle = () => {
    if(!id){
        id = requestAnimationFrame(excute)
    }
}

const load = () => {
    console.log('load start') 
    handle()
    console.log('load end') 
}

const setScene = () => {
    console.log('setScene start') 
    handle()
    console.log('setScene end') 
}

load()
setScene()
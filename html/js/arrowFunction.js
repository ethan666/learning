var arr = [1, 2, 3, 4, 5]

function abc(){
  aaa((name)=>{
    console.log(name)
    return
  })
  console.log('abc')
}

function aaa(callback){
  var name = 'beijing'
  callback(name)
}
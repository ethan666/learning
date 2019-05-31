var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

const arr3 = array1.concat(array2)
console.log(arr3);
console.log(this);

arr3.forEach(item=>{
  console.log(`forEach this arrow func:${this},${item}`)
})

arr3.forEach(function(item){
  console.log(`forEach this:${this},${item}`)
})

function onClick(event){
  console.log(event)
  console.log(this)
}

window.onload = function(){
  const target = document.getElementsByClassName('target')[0];
  if(target){
    target.addEventListener('click', clickHandler);
  }
}
function clickHandler(...arg){
  console.log(arg)
  console.log(this)
}
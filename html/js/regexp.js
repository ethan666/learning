
function getResult () {
  const sourceText = document.getElementById('sourceText')
  const patternStr = document.getElementById('regexp').value;
  const pattern = new RegExp(patternStr, 'g')
  
  const list = sourceText.value.match(pattern)
  
  let output = ''
  list.forEach( (s, index) => {
    output += s
    if(index !== list.length-1){
      output += ', '
    }
  })
  document.getElementById('output').value = output;
  // console.log(output)
}
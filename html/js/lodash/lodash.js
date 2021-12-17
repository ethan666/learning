function debounce(func, wait) {
  let timeId;
  return function(...args) {
    let _this = this;
    clearTimeout(timeId);
    timeId = setTimeout(function() {
      func.apply(_this, args);
    }, wait);
  };
}

function print(query){
  console.log(`Results for "${query}"`);
}

let searchDebounce = debounce(function(query) {
  console.log(`Results for "${query}"`);
}, 500);

function onInput(input) {
  console.log(`this:${this}`)
  console.log(`input:${input}`)
  console.log(`arg:${arguments}`)
  searchDebounce(event.target.value);
  // debounce(query => {
  //   console.log(`Results for "${query}"`);
  // }, 1000)(event.target.value)
}

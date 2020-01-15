function debounce(func, wait) {
  let timeId;
  return function(...args) {
    let _this = this;
    console.log("_this:" + _this);
    clearTimeout(timeId);
    timeId = setTimeout(function() {
      func.apply(_this, args);
    }, wait);
  };
}
let searchDebounce = debounce(function(query) {
  console.log(`Results for "${query}"`);
}, 500);

function onInput() {
  searchDebounce(event.target.value);
}

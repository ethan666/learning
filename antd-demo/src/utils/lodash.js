export function debounce (func, wait) {
  let timeId
  return function (...args) {
    let _this = this
    clearTimeout(timeId)
    timeId = setTimeout(function () {
      func.apply(_this, args)
    }, wait)
  }
}

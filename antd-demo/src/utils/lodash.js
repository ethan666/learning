/**
 * 防抖函数
 * @param {Function} func 要防抖动的函数
 * @param {nmber} wait 需要延迟的毫秒数
 */
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

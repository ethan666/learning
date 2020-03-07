/**
 * 检查变量类型， 示例用法
 * var a = '123'
 * checkType(a) === 'String'
 */
export const checkType = val =>
  Object.prototype.toString.call(val).slice(8, -1)

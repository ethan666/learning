"use strict";

function checkType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

var a = 123;
console.log(checkType(a));

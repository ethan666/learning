/*
 * @Descripttion: async await用法示例
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-25 18:11:49
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-03-15 10:41:37
 */

// const response = await ajax("/xxx").catch(handleError)
// 记得要在 handleError 里 reject 或 throw

// 返回promise
async function hello() {
  return "hello";
}

function pt() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("erro");
      // resolve('success')
    }, 1000);
  });
}

// hello();

const handleError = (err) => {
  console.log("handleError", err);
  // return Promise.reject(err);
  return err;
};

async function test() {
  const res = await pt().catch(handleError);
  console.log("res:", res);
}

/* 另一种方案 */
//https://www.cnblogs.com/chrissong/p/10841760.html
//https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
function to(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

function taskPromise(status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === "fail") {
        return reject("error");
      } else {
        return resolve("success");
      }
    }, 1000);
  });
}

async function asyncTasks() {
  let err, result;
  [err, result] = await to(taskPromise(""));
  if (err) {
    console.log("it‘s error");
  } else {
    console.log("it‘s" + result);
  }

  [err, result] = await to(taskPromise("fail"));
  if (err) {
    console.log("it‘s error");
  } else {
    console.log("it‘s" + result);
  }
}

asyncTasks(); //it‘ssuccess it‘s error
/* 另一种方案 */

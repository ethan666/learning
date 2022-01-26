/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2020-04-28 14:03:23
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-26 10:03:42
 */
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    var a = 0;
    if (a > 1) {
      resolve({ status: "success", a });
    } else {
      reject({ status: "fail", a });
    }
  }, 1000);
});

promise
  .then(
    (res) => {
      const { status, a } = res;
      console.log(`status:${status}, a:${a}`);
    },
    (res) => {
      const { status, a } = res;
      console.log(`status:${status}, a:${a}`);
    }
  )
  .catch((err) => console.log(`err: ${err}`));

Promise.reject("fail").then(
  (res) => {
    console.log(`resolve:${res}`);
  },
  (res) => {
    console.log(`reject:${res}`);
  }
);

function getProjectId() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(100);
    }, 1000);
    setTimeout(() => {
      resolve(0);
    }, 50);
  });
}

async function aaa() {
  const res = await getProjectId();
  console.log(res);
}

// aaa()

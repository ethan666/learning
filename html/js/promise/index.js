/*
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2020-04-28 14:03:23
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-03-14 12:00:29
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
    // (res) => {
    //   const { status, a } = res;
    //   console.log(`status:${status}, a:${a}`);
    // }
  )
  .catch((err) => {
    const { status, a } = err
    console.log(`err-- status:${status}, a:${a}`)
  });

// Promise.reject("fail").then(
//   (res) => {
//     console.log(`resolve:${res}`);
//   },
//   (res) => {
//     console.log(`reject:${res}`);
//   }
// );

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


function abc(isResolved = true){
  return new Promise(function (resolve, reject) {
    console.log('abc promise new', new Date().getTime())
    setTimeout(() => {
      if(isResolved){
        resolve('ok')
        console.log('111', new Date().getTime())
      }else{
        reject('fail')
      }
    }, 1000)
  })
}

async function test(){
  const res = await abc()
  console.log(`res: ${res}`)
  const bb = await abc(false)
  console.log(`bb: ${bb}`)
}

// Promise.all([abc(), abc(false)]).catch(error => {
//   console.log('error:',error)
// })

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const textToFile = async () => {
  await wait(1000)
  return 'textToFile result'
}

const p = Promise.resolve().then(() => {
  const result = textToFile()
  console.log('result:'+ result)
  return result
})

// p.then( (res) => {
//   console.log(res)
// })

{
  const promise = new Promise(function (resolve, reject) {
    console.log('test1')
    resolve(1)
    console.log('test2')
    resolve(2)
    console.log('test3')
  });

  promise.then(res => {
    console.log('result:', res)
  })
}
const jimp = require('jimp');
const http = require('http')
const cRotate = require('./tRotate')

async function main() {
  const image = await jimp.read('./assets/input/t4.jpeg');
  // 295X413
  image.contain(295, 413, 'vertical', () => {
    console.log('resize ok')
    const path = './assets/output/t4.jpeg'
    image.write(path, () => {
      console.log('write ok')
    })
  })
  // image.resize(295, 413, 'bezierInterpolation', () => {
  //   console.log('resize ok')
  //   const path = './assets/output/t4.jpeg'
  //   image.write(path, () => {
  //     console.log('write ok')
  //   })
  // })
  //   debugger
  // cRotate.rotate(image, 90, () => {
  //   console.log('rotate ok')
  //   const path = './assets/output/t2.jpeg'
  //   image.write(path, () => {
  //     console.log('write ok')
  //   })
  // })
}

// async function main(){
//     const image = await jimp.read('5.jpeg');
//     image.flip(false, true, () => {
//         console.log('flip ok')
//         const path = './assets/output/flip.jpeg'
//         image.write(path, () => {
//             console.log('write ok')
//         })
//     })
// }

main()
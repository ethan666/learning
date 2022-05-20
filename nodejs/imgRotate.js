const jimp = require('jimp');
const http = require('http')
const cRotate = require('./tRotate')
global.atob = require("atob");
global.btoa = require("btoa");

async function main() {
  const image = await jimp.read('./assets/input/t6.jpeg');
  console.log('image:',image);
  cRotate.rotate(image, 90, () => {
    console.log('rotate ok')

    // 改dpi

    const path = './assets/output/t6.jpeg'
    image.write(path, () => {
      console.log('write ok')
    })
  })
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
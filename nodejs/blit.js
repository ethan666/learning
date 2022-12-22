import jimp from 'jimp';
// jimp = require('jimp')

async function main() {
  const image = await jimp.read('./assets/input/blit1.png');
  const parrot = await jimp.read('./assets/input/blit2.png');

  await image.blit(parrot, 0, 0);
  const path = './assets/output/blit.png'
  image.write(path, () => {
    console.log('write ok')
  })
}

main();
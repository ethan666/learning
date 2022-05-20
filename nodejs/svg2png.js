// const Svg2 = require("oslllo-svg2");

// Svg2("./assets/a.svg")
//   .png()
//   .toFile("example.png")
//   .then(() => {
//     console.log("done");
//   })
//   .catch((error) => {
//     throw error;
//   });

//   console.log('ok')
const Svg2 = require("oslllo-svg2");
// const sharp = require("sharp");
// var fs = require('fs');

var instance = Svg2("./assets/a.svg");
var svg = instance.svg;
console.log(svg.dimensions());

const w = 1067 * 150 / 25.4
const h = 1580 * 150 /25.4

svg
    .resize({ width: w, height: h })
    .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4'
    })
    .toFile("5.jpeg")
    .then(() => {
        console.log("jpeg done");
    })
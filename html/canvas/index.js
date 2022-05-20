var canvas = document.getElementById("canvas");
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';



const img = document.getElementById('img')
var context = canvas.getContext("2d");
const pixelRatio = 1
context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

context.drawImage(img, 0, 0, 500, 500);

// ctx.fillStyle = "blue";
// ctx.fillRect(10, 10, 100, 100);
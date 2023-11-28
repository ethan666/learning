var canvas = document.getElementById("canvas");
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';



// const img = document.getElementById('img')
// var context = canvas.getContext("2d");
// const pixelRatio = 1
// context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

// context.drawImage(img, 0, 0, 500, 500);

// ctx.fillStyle = "blue";
// ctx.fillRect(10, 10, 100, 100);


// const ctx = canvas.getContext("2d");
// ctx.font='30px verdana';
// ctx.textAlign='center';
// ctx.textBaseline='middle';


// ctx.rotate(45 * Math.PI / 180);
// ctx.fillRect(50, 20, 100, 50);
// ctx.fillText('M', 250, 250)
const angle = 30 * Math.PI / 180;


const ctx = canvas.getContext("2d");
ctx.fillStyle = 'green';
// ctx.transform(1, 0, -0.5, 1, 0, 0);
// ctx.fillRect(0, 0, 1000, 500);
ctx.transform(1, 0, -Math.tan(angle), 1, Math.tan(angle)*250, 0);

ctx.arc(500, 250, 5, 0, 2*Math.PI);
ctx.fill();


// ctx.transform(1, 0, 0, 1, 0, 0);
ctx.font = `100px 微软雅黑`
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'
ctx.strokeText('24', 500, 250);
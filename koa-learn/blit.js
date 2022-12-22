
const Koa = require("koa"),
  router = require("koa-router")(),
  path = require("path"),
  bodyParser = require("koa-bodyparser"),
  jimp = require('jimp'),

const app = new Koa();

//跨域中间件
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  // ignore favicon
  if (ctx.path === "/favicon.ico") {
    return;
  }
  await next();
});

// 配置post提交数据的中间件
app.use(bodyParser());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

//x-response-timer
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});


async function main(fileName1, fileName2) {
  const prefix = './assets/input/'
  const image1 = await jimp.read(prefix+fileName1)
  const image2 = await jimp.read(prefix+fileName2)
  // if(image.errno === -2){
  //   return {
  //     resCode: 0,
  //     resDesc: `文件路径“${image.path}”不正确。`
  //   }
  // }
  image1.blit(image2, x, y);
  console.log('main done')
  return {
    resCode: 1, 
    resDesc: '成功。',
    data: path
  }
}

router.post('/rotate', async (ctx, next) => {
  const params = ctx.request.body
  console.log('ctx.request.body:', params)
  const res = await main(params.fileName1, params.fileName2)
  console.log('res:',res)
  ctx.body = res
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3006, () => {
  console.log("服务已经启动");
});

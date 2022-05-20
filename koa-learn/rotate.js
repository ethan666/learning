
const Koa = require("koa"),
  router = require("koa-router")(),
  path = require("path"),
  bodyParser = require("koa-bodyparser"),
  jimp = require('jimp'),
  jimpRotate = require('./jimpRotate')

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


async function main(fileName, angle) {
  const prefix = './assets/input/'
  const image = await jimp.read(prefix+fileName).catch(err => {
    return err;
  })
  if(image.errno === -2){
    return {
      resCode: 0,
      resDesc: `文件路径“${image.path}”不正确。`
    }
  }
  const path = await rotate(image, angle)
  console.log('main done')
  return {
    resCode: 1, 
    resDesc: '转向成功。',
    data: path
  }
}

function rotate(image, angle){
  return new Promise(resolve => {
    jimpRotate.rotate(image, Number.parseInt(angle), () => {
      console.log('rotate ok')
      const path = './assets/output/t2.jpeg'
      image.write(path, () => {
        console.log('write ok')
        resolve(path)
      })
    })
  })
}

router.post('/rotate', async (ctx, next) => {
  const params = ctx.request.body
  console.log('ctx.request.body:', params)
  if(params.angle === undefined) {
    ctx.body = {
      resCode: 0,
      resDesc: "angle参数必传",
      data: null,
    };
    return
  }

  if(!['90', '180', '270'].includes(params.angle)) {
    ctx.body = {
      resCode: 0,
      resDesc: "angle参数值必须是90、180、270中的一个",
      data: null,
    };
    return
  }
  
  if(params.fileName === undefined) {
    ctx.body = {
      resCode: 0,
      resDesc: "fileName参数必传",
      data: null,
    };
    return
  }

  const res = await main(params.fileName, params.angle)
  debugger
  console.log('res:',res)
  ctx.body = res
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3006, () => {
  console.log("服务已经启动");
});

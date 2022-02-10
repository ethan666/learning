const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const bodyParser = require("koa-bodyparser"),
const app = new Koa();

// 过滤ico
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
    next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

router.get('/news', (ctx, next) => {
    ctx.body = {
        code: 200,
        msg: "请求成功",
        data: [{
            id: 1, name: '小明', age: 20
        },
        {
            id: 2, name: '小明', age: 28
        }],
    };
});


app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000, () => {
    console.log('starting at port 3000');
});
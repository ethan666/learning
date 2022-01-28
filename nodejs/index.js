/*
 * @Descripttion: koa学习
 * 框架 express（web） meteor\remix(全栈框架) next.js
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-26 18:12:49
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-28 17:53:32
 */

const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const md5 = require("md5");
const bodyParser=require('koa-bodyparser'),
const DB=require('./mongoDB.js');
let app = new Koa();
// post提交允许上传文件
app.use(bodyParser());

let router = new Router();

// 查找学员
router.get('/list',async (ctx)=>{
  var result=await DB.find('user',{});
  await ctx.render('student',{
      list:result
  });
})


app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("服务器在3000端口启动");
});

/*
 * @Descripttion: koa学习
 * 框架 express（web） meteor\remix(全栈框架) next.js
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-26 18:12:49
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-27 17:04:25
 */

const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello World!!!";
});

app.listen(3001);

/*
 * @Descripttion: nodejs学习
 * 框架 express（web） meteor\remix(全栈框架) next.js
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-26 18:12:49
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-27 13:42:31
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

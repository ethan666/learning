/*
 * @Descripttion: get请求示例
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-27 14:33:57
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-27 15:12:44
 */

const https = require("https");

//https://lf3-cdn-tos.bytescm.com/obj/rc-web-sdk/acrawler.js

const options = {
  hostname: "lf3-cdn-tos.bytescm.com",
  port: 443,
  path: "/obj/rc-web-sdk/acrawler.js",
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (err) => {
  console.error(`error:${err}`);
});

req.end();

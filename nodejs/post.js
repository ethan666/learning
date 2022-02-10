/*
 * @Descripttion: post请求示例
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2022-01-27 14:33:57
 * @LastEditors: 谭义洋
 * @LastEditTime: 2022-01-27 15:06:24
 */

const https = require("https");

//掘金上扒出来的post请求
//https://mcs.snssdk.com/v1/list

const data = `[{"events":[{"event":"applog_trace","params":"{\"count\":1,\"state\":\"net\",\"key\":\"pv\",\"params_for_special\":\"applog_trace\",\"aid\":2608,\"platform\":\"web\",\"_staging_flag\":1,\"sdk_version\":\"4.1.49\",\"event_index\":1643267163901}","local_time_ms":1643266397079}],"user":{"user_unique_id":"6917162831351809543","user_id":"2946346894498344","user_is_login":true,"web_id":"6917162831351809543","ssid":"1234ee9a-1769-41c2-89da-45730cb87fed"},"header":{"app_id":2608,"os_name":"windows","os_version":"10","device_model":"Windows NT 10.0","language":"en","platform":"Web","sdk_version":"4.1.49","sdk_lib":"js","timezone":8,"tz_offset":-28800,"resolution":"1600x900","browser":"Chrome","browser_version":"97.0.4692.71","referrer":"https://juejin.cn/","referrer_host":"juejin.cn","width":1600,"height":900,"screen_width":1600,"screen_height":900,"utm_source":"bdpcjjqd02389","utm_medium":"sem_baidu_jj_pc_dc01","utm_campaign":"sembaidu","custom":"{\"student_verify_status\":\"not_student\",\"user_level\":0}"},"local_time":1643266397}]`;

const options = {
  hostname: "mcs.snssdk.com",
  port: 443,
  path: "/v1/list",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();

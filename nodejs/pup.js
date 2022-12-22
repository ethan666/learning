const puppeteer = require('puppeteer')
const koa2Req = require("koa2-request");

const url = 'http://gxzn.free.obs.glinsunai.com/custom/2022/5/27/custom-20220527-164105-005-a39b495c9beb4896945d586f1c72c3bb.svg'

async function getFileBody(url) {
  const { err, body } = await koa2Req({
    method: "get",
    responseType: 'text',
    uri: url,
  });
  if (err) {
    return {
      resCode: 0,
      resDesc: "在线URL获取失败",
      data: null,
    };
  }
  return body;
}

(async () => {
  const start = new Date();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // const svgTxt = ``
  const svgTxt = await getFileBody(url)

  await page.setContent(svgTxt);

  await page.setViewport({ width: 2156, height: 2578, deviceScaleFactor: (150/25.4) });

  await page.screenshot({ path: 'c3.jpg' })
  await browser.close()
  const ms = new Date() - start;
  console.log(`耗时 - ${ms}ms`);
})();

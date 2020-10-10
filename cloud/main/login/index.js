// 云函数入口文件

const cloud = require('wx-server-sdk');
let got = require("got");
let host = "https://www.xinliceliang.com:39666/wxapp"

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  let url = host + "" + event.url;
  // let url = host;

  const response = await got(url, {
    method: 'GET',
    searchParams:{
      event: JSON.stringify(event),
    },
  });
  return response.body;
}
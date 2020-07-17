export default function getParams(cx){
  // 这是我们的url地址
    let url ="pages/indexDetail/index?id=2&__key_=15949969426921"
    const reg = new RegExp(cx+"=([^&]+)");
    reg.test(url);
    
    return RegExp.$1			
  }
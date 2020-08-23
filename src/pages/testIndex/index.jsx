import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, WebView } from "@tarojs/components"
// import { AtList, AtListItem, AtDivider  }from 'taro-ui'
import './index.scss'
const threeurl = 'http://101.32.22.170:39000/appLogin'
export default class TestIndex extends Component {
  constructor () {
    super(...arguments)
    this.state ={
      htmlUrl: 'http://101.32.22.170:39080/testList.html'
    }
  }

  render() {
    const { htmlUrl } = this.state
    return(
      <View>
        111
        <WebView src={htmlUrl} onMessage={this.handleMessage} />
      </View>
    )
  }
  componentWillMount () {
    this.getTestHtml()
  }
  getTestHtml()  {
    const openId = Taro.getStorageSync('openId')
    let userInfo = Taro.getStorageSync('userInfo')
    let authcode = 'RYRtTMIbPqS9nnHP2y8qnF9x'
    let sexName = '未知'
    if(userInfo.gender == 1) {
      sexName = '男'
    }else if(userInfo.gender == 2) {
      sexName = '女'
    }
    console.log('PARAMS',userInfo, authcode, openId)
  Taro.request({
    url: threeurl,
    data: {
      'authCode': authcode,
      'userId': openId,
      'userName': userInfo.nickName,
      'sex': sexName,
      'country': userInfo.country,
      'province': userInfo.province
    }
  }).then((res) => {
    console.log('html', res)
  })
  }
}
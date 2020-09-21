/*
 * @Description: 
 * @Autor: Bonny.meng
 * @Date: 2020-07-13 22:54:13
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-13 23:13:10
 */ 
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
const httpurl = 'https://www.xinliceliang.com:39666/wxapp/my/getOpenId'

class App extends Component {
  componentWillMount() {
    Taro.getSetting()
      .then(res=>{
        if(res.authSetting["scope.userInfo"]){
          return true;
        }else {
          throw new Error('没有授权')
        }
      })
      .then(res=>{
        return Taro.getUserInfo();
      })
      .then(res=>{
        Taro.setStorage({
          key: 'iv',
          data: res.iv
        })
        Taro.setStorage({
          key: 'encryptedData',
          data: res.encryptedData
        })
        Taro.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      })
      .catch(err=>{
        console.log(err)
      })  
  }

  componentDidMount () {
    this.getLogin()
    wx.cloud.init({
      // env: '',
      env: 'joush-bonny-jqru5',
      traceUser: true
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}
  //登录
  getLogin() {
  var that = this
  Taro.login({
    success: function (res) {
      let encryptedData = Taro.getStorageSync('encryptedData')
      let iv = Taro.getStorageSync('iv')
      if (res.code) {
        Taro.request({
          url:  httpurl,
          data: {
            code: res.code,
            encryptedData: encryptedData,
            iv:iv
          },
          success: function (res) {
            that.setState({
              openId: res.data
            })
            Taro.setStorage({
              key: "openId",
              data: res.data
            });
          }
        })
        console.log('----sucess', res)
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
  }
  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App

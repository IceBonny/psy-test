import React, { Component } from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Image } from "@tarojs/components"
import './index.scss'
// import  loginFile from '../../asset/images/login-arranging.png'
const httpurl = 'http://www.rexjoush.com:3000/wxapp/my/getOpenId'

export default class Login extends Component {
  state = {
    oauthBtnStatus: true, // 授权按钮是否显示 默认为显示
    userInfo: null, // 用户信息
    btnText: '微信授权登录',
    unlogin: true,
    logined: false,
    encryptedData: '',
    iv: ''
  }
  componentWillMount() {
    // 获取授权状态
    this.getOauthStatus()
    //检查是否失效
    this.checkAuth()
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  // 获取用户授权结果
  getOauthStatus = () => {
    Taro.getSetting().then(res => {
      console.log(res)
      if(Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']){ // 用户信息无授权
        console.log(res.authSetting)
        console.log('用户无授权信息')
      }else{ // 用户允许授权获取用户信息
        // 隐藏授权按钮
        this.setState({oauthBtnStatus: false})
        // 获取用户信息
        this.getUserInfo()
      }
    })
    .catch(err => console.log(err))
  }
  // 检查授权信息是否失效
  checkAuth =() => {
    var that = this
    Taro.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        that.setState({
          unlogin: false,
          logined: true,
        })
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        console.log("fail");
        // console.log("fail");
        that.getLogin() //重新登录
      }
    })
  }
  //登录
    getLogin =(val,iv) => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          Taro.request({
            url:  httpurl,
            data: {
              code: res.code,
              encryptedData: val,
              iv: iv
            }
          })
          console.log('----sucess', res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  // 获取用户信息
  getUserInfo = () => {
    Taro.getUserInfo({
      lang: 'zh_CN'
    }).then( res => { // 获取成功
      this.setState(()=>({
        userInfo: res.userInfo,
        iv: res.iv,
        encryptedData: res.encryptedData
      })
    )
      console.log('---iv----', res.iv)
      console.log('encryptedData', res.encryptedData)
    }).catch( err => console.log(err) )
  }
  // 用户授权操作后按钮回调
  onGotUserInfo = res => {
    if(res.detail.userInfo){ // 返回的信息中包含用户信息则证明用户允许获取信息授权
      console.log('授权成功')
    }else{ // 用户取消授权，进行提示，促进重新授权
      Taro.showModal({
        title: '温馨提示',
        content: '简单的信任，是你我俩故事的开始',
        showCancel: false
      })
        .then(ModalRes => {
          if(ModalRes.confirm){ // 点击确定按钮
            this.setState({btnText:'重新授权登录'})
          }
        })
    }
  }
  render() {
    const { oauthBtnStatus, userInfo, btnText } = this.state
    return (
      <View className='login-page'>
        {/* <Image src={loginFile} mode='aspectFit' className='login-img' /> */}
        { oauthBtnStatus ? <Button className='login-btn' openType='getUserInfo' onGetUserInfo={this.onGotUserInfo}>{btnText}</Button> : ''}
        { userInfo ? JSON.stringify(userInfo) : ''}
        { userInfo ? <Image src={userInfo.avatarUrl} /> : ''}
      </View>
    )
  }
}
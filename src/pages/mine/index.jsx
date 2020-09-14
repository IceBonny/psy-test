import React, { Component } from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Image, Text } from "@tarojs/components"
import { AtList, AtListItem, AtDivider  }from 'taro-ui'
import './index.scss'
import defaultImg from '../../assets/images/default_avatar.jpeg'
const httpurl = 'https://www.xinliceliang.com:39666/wxapp/my/getOpenId'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      oauthBtnStatus: true, // 授权按钮是否显示 默认为显示
      userInfo: null, // 用户信息
      btnText: '微信授权登录',
      unlogin: true,
      logined: false,
      encryptedData: '',
      iv: '',
      openId: '',
      isTest: 'isTest',
      isCon: 'isCon',
      isCourse: 'isCourse',
      isGrow: 'isGrow',
    }
  }
  componentWillMount() {
    // 获取授权状态
    this.getOauthStatus()
    //检查是否失效
    this.checkAuth()
  }
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
    getLogin =(encryptedData, iv) => {
      var that = this
    Taro.login({
      success: function (res) {
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
  // 获取用户信息
  getUserInfo = (e) => {
    Taro.getUserInfo({
      lang: 'zh_CN'
    }).then( res => { // 获取成功
      console.log('res获取用户信息', res)
      this.setState({
        userInfo: res.userInfo,
        iv: res.iv,
        encryptedData: res.encryptedData
      },() => {
        this.getLogin(res.encryptedData,res.iv)
      })
    }).catch( err => console.log(err) )
  }
  // 用户授权操作后按钮回调
  onGotUserInfo = res => {
    Taro.switchTab({
      url: '/pages/mine/index'
    })
    if(res.detail.userInfo){ // 返回的信息中包含用户信息则证明用户允许获取信息授权
      console.log('授权成功')
    }else{ // 用户取消授权，进行提示，促进重新授权
      Taro.showModal({
        title: '温馨提示',
        content: '简单的信任，是我们故事的开始',
        showCancel: false
      })
        .then(ModalRes => {
          if(ModalRes.confirm){ // 点击确定按钮
            this.setState({btnText:'重新授权登录'})
          }
        })
    }
  }
  historyList(openId, flag, e) {
    Taro.navigateTo({
      url: `/pages/historyList/index?openId=${encodeURIComponent(openId)}&flag=${flag}`
    })
  }
  render() {
    const { oauthBtnStatus, userInfo, btnText, openId, isTest, isCon, isCourse,isGrow } = this.state
    return (
      <View className='mine-page'>
        { oauthBtnStatus ? <Button className='login-btn' type='warn' openType='getUserInfo' onGetUserInfo={this.onGotUserInfo}
        onClick={this.getUserInfo}
        >{btnText}</Button> : ''}
        <View className='mine-item'>
          { userInfo ? 
            <Image src={userInfo.avatarUrl} className='my-avatar' /> 
            : 
            <Image src={defaultImg}  className='my-avatar' />
          }
          { userInfo ? 
            <View className='my-info'>
              <View className='info-name'>{userInfo.nickName}</View>
              <View className='info-city'>{userInfo.country}
                &nbsp;&nbsp;|&nbsp;&nbsp;{userInfo.province}</View>
            </View>
          : <View>获取信息失败</View>}
        </View>
        <View className='mine-nav'>
          <AtList>
            <AtListItem
              title='心理测评'
              extraText='最近测试'
              arrow='right'
              iconInfo={{ size: 25, color: '#78A4FA', value: 'bullet-list', }}
              onClick={this.historyList.bind(this,openId,isTest)}
            />
            <AtListItem
              title='心理咨询'
              extraText='最近咨询'
              arrow='right'
              iconInfo={{ size: 25, color: '#FF4949', value: 'heart-2', }}
              onClick={this.historyList.bind(this, openId, isCon)}
            />
            <AtListItem
              title='心理课程'
              extraText='最近记录'
              arrow='right'
              iconInfo={{ size: 25, color: '#FF9966', value: 'folder', }}
              onClick={this.historyList.bind(this, openId, isCourse)}
            />
            <AtListItem
              title='心理成长活动'
              extraText='最近记录'
              arrow='right'
              iconInfo={{ size: 25, color: '#33CC66', value: 'analytics', }}
              onClick={this.historyList.bind(this, openId,isGrow)}
            />
        </AtList>
        </View>
        <AtDivider content='--关于我们--' fontColor='#ed3f14' lineColor='#ed3f14' />
      </View>
    )
  }
}
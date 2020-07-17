import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'

export default class Mine extends Component {
  constructor() {
    super()
    this.state= {
      unlogin: true,
      logined: false,
    }
  }

  componentWillMount () { }

  componentDidMount () {
    var that = this;
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
        // this.login() //重新登录
      }
    })
  }

  render () {
    return (
      <View className='mine'>
  
        
      </View>
    )
  }
}

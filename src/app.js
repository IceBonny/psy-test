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
import './app.scss'

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
          key: 'userInfo',
          data: res.userInfo
        })
      })
      .catch(err=>{
        console.log(err)
      })  
  }

  componentDidMount () {
    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App

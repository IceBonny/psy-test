import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Button, Image } from '@tarojs/components'
import img from '../../assets/images/avator.jpg'
import './index.scss'


class Index extends Component {
  tobegin = () => {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  };

  componentDidMount(){
    try {
      const value = Taro.getStorageSync('userInfo')
      if (value) {
        Taro.switchTab({
          url: '/pages/index/index'
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    
  }

  render () {
    return (
      <View className='init'>
        <Image src={img} className='avator'></Image>
        <Button className='btn' openType='getUserInfo' onGetUserInfo={this.tobegin} type='primary' lang='zh_CN'>
           授权登录
        </Button>
      </View>
    )
  }
}
export default Index
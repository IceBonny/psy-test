import React, { Component } from 'react'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { menus } from './constdata'
import api from '../../utils/api'
import './index.scss'

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      bannerData: [],
      testData: [],
    }
    this.handleMenu = this.handleMenu.bind(this)
  }
  render () {
    const { current, bannerData } = this.state
    return (
      <View className='index'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
            {bannerData.map((item, index) => {
              return (
                <SwiperItem  key={index}>
                  <image src={item.img_url} className="banner" mode="widthFix" />
                </SwiperItem>
              )
            })}
        </Swiper>
        <view className="tab">
        <AtTabBar
          tabList={menus}
          onClick={this.handleMenu}
          current={current}
        />
        </view>
      </View>
    )
  }
  componentWillMount () {
    this.getBannerData()
    this.getContent()
   }

  componentDidMount () { 
  }

  handleMenu (value) {
    this.setState({
      current: value
    })
    switch (value) {
      case 0:
          Taro.redirectTo({
              url: `/pages/index/index`
          })
          break;
      case 1:
          Taro.redirectTo({
              url: `/pages/pinglun/index`
          })
          break;
      case 2:
          Taro.redirectTo({
              url: `/pages/yindao/index`
          })
          break;
      case 3:
          Taro.redirectTo({
              url: `/pages/wode/index`
          })
          break;            
      default:
          break;
    }
  }
  
  getBannerData() {
    api.get('/home/getBannerData').then((res) => {
      const data = res.data.data
      this.setState({
        bannerData: data
      })
      console.log('res',res.data.data)
    })
  }

  // 获取心理测评数据
  getContent() {
    api.get('/home/getPsyTestData')
    .then((res) => {
      const data = res.data.data
      this.setState({
        testData: data
      })
    })
  }
}

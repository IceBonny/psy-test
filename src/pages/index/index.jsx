import React, { Component } from 'react'
import { View, Text, Swiper, SwiperItem, ScrollView,Image  } from '@tarojs/components'

import api from '../../utils/api'
import './index.scss'
import img1 from '../../assets/images/health.png'
import img2 from '../../assets/images/consult.png'
import img3 from '../../assets/images/online_course.png'
import img4 from '../../assets/images/eap.png'

export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      currentNavtab: 0,
      bannerData: [],
      navTab: [
        {
          name:'心理测评',
          img: img1,
        },
        {
          name:'心理咨询',
          img: img2,
        },
        {
          name:'线上课程',
          img: img3,
        },
        {
          name:'EAP',
          img: img4,
        },
       
      ],
      testData: [],
    }
  }
  render () {
    const {  bannerData, currentNavtab,navTab } = this.state
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
        <View className='top-tab flex-wrp flex-tab' >
        {
          navTab.map((item,index) => {
            return (<View className={currentNavtab === index ? 'toptab flex-item active' : 'toptab flex-item' } key={index} 
            onClick={this.switchTab.bind(this,index)}>
              <Image src={item.img} className='icon'></Image>
              <Text className='text'>{item.name}</Text>
            </View>)
          })
        }
        </View>
        <ScrollView scroll-y className='container withtab'>
          <View className={currentNavtab==0 ? 'show' : 'hide'}>
              心理测试
          </View>
            <View className={currentNavtab==1 ? 'show' : 'hide'}>
              <Text>心理咨询</Text>
            </View>
            <View className={currentNavtab==2 ? 'show' : 'hide'}>
              <Text>课程</Text>
            </View>
            <View className={currentNavtab==3 ? 'show' : 'hide'}>
              <Text>eap</Text>
            </View>
        </ScrollView>
      </View>
    )
  }
  componentWillMount () {
    this.getBannerData()
    this.getContent()
   }

  componentDidMount () { 
  }

  switchTab(index,e) {
    this.setState({
      currentNavtab: index
    },()=> {
      console.log('rrrrr',index)
    });
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

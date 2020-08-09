import React, { Component } from 'react'
import Taro from '@tarojs/taro'
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
      conData: [],
      courseData: [],
      eapData: []
    }
  }
  render () {
    const {  bannerData, currentNavtab, navTab, testData, conData, courseData, eapData } = this.state
    return (
      <View className='content'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
            {bannerData.map((item, index) => {
              return (
                <SwiperItem  key={index}>
                  <Image src={item.img_url} className='banner' mode='widthFix' />
                </SwiperItem>
              )
            })}
        </Swiper>
        <View className='tab_menu' >
        {
          navTab.map((item,index) => {
            return (<View className={currentNavtab === index ? 'menu_item point' : 'menu_item'} key={index} 
              onClick={this.switchTab.bind(this,index)}
            >
              <Image src={item.img} className='menu_icon' />
              <Text className='menu_name'>{item.name}</Text>
            </View>)
          })
        }
        </View>
        <ScrollView scroll-y className='container withtab'>
          <View className={currentNavtab==0 ? 'show' : 'hide'}>
              {
                testData.map((item,index) => 
                <View className='test-item' key={index} onClick={this.goDetail.bind(this, item.test_id)}>
                  <View className='test-title'>{item.name}</View>
                  <View className='test-intro'>{item.introduction}</View>
                </View>
                )
              }
          </View>
            <View className={currentNavtab==1 ? 'show' : 'hide'}>
            {
                conData.map((item,index) => 
                <View className='haveImg-item' key={index}
                  onClick={this.goconDetail.bind(this, item.consultant_id)}
                >
                  <Image src={item.img_url} />
                  <View className='item-info'>
                      <View className='item-title'>{item.expertise}</View>
                      <View className='item-text'>{item.introduction}</View>
                      <View className='item-price'>{item.price}</View>
                      <View className='item-form'>{item.form}</View>
                  </View>
                </View>
                )
              }
            </View>
            <View className={currentNavtab==2 ? 'show' : 'hide'}>
            {
                courseData.map((item,index) => 
                <View className='haveImg-item' key={index}
                  onClick={this.gocourseDetail.bind(this, item.course_id)}
                >
                  <Image src={item.img_url} />
                  <View className='item-info'>
                      <View className='item-text'>{item.introduction}</View>
                      <View className='item-title'>{item.title}</View>
                      <View className='item-subtitle'>{item.subtitle}</View>
                  </View>
                </View>
                )
              }
            </View>
            <View className={currentNavtab==3 ? 'show' : 'hide'}>
            {
                eapData.map((item,index) => 
                <View className='haveImg-item' key={index}
                  onClick={this.goeapDetail.bind(this, item.eap_id)}
                >
                  <Image src={item.img_url} />
                  <View className='item-info'>
                      <View className='item-title'>{item.title}</View>
                      <View className='item-subtitle'>{item.subtitle}</View>
                  </View>
                </View>
                )
              }
            </View>
        </ScrollView>
      </View>
    )
  }
  componentWillMount () {
    this.getData()
   }

  componentDidMount () { 
  }
  getData() {
    this.getBannerData()
    this.getContent()
    this.getConsultant()
    this.getCourse()
    this.getEap()
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
  //获取咨询师
  getConsultant() {
    api.get('/home/getPsyCounseling')
    .then((res) => {
      const data = res.data.data
      this.setState({
        conData: data
      })
    })
  }

  //获取课程
  getCourse() {
    api.get('/home/getCourseData')
    .then((res) => {
      const data = res.data.data
      this.setState({
        courseData: data
      })
    })
  }
  //获取eap
  getEap() {
    api.get('/home/getEap')
    .then((res) => {
      const data = res.data.data
      this.setState({
        eapData: data
      })
    })
  }
  goDetail(testid, e) {
    Taro.navigateTo({
      url: `/pages/indexDetail/index?testid=${encodeURIComponent(testid)}`
    })
  }

  goconDetail(conid, e) {
    Taro.navigateTo({
      url: `/pages/consultantDetail/index?conid=${encodeURIComponent(conid)}`
    })
  }

  gocourseDetail(courseid, e) {
    Taro.navigateTo({
      url: `/pages/indexDetail/index?courseid=${encodeURIComponent(courseid)}`
    })
  }
  goeapDetail(eapid, e) {
    Taro.navigateTo({
      url: `/pages/indexDetail/index?eapid=${encodeURIComponent(eapid)}`
    })
  }
}

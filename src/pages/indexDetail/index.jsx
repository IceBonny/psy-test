import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button  } from '@tarojs/components'
import api from '../../utils/api'
const threeurl = 'http://101.32.22.170:39000/appLogin'

export default class Detail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      test_id: null,
      testData: [],
      consultant_id: '',
      course_id: null,
      eap_id: null,
      courseData: [],
      eapData: [],
      openId: ''
    }
  }
  render () {
    const { testData, test_id, course_id, eap_id, eapData } = this.state
    return (
      <View className='detail'>
        <View className='img-wrap'>
          {
            testData.map((item,index) => {
              return(
                 <Image className='test_detailImg' 
                 src={item.details_img_url} 
                 key={index}
                 mode="widthFix"></Image>
              )
            })
          }
        </View>
        <View className={ eap_id ? 'show' : 'hide'}>
        {
            eapData.map((item,index) => {
              return(
                 <Image className='eap_detailImg' src={item.details_img_url}
                 key={index}
                 mode="widthFix"></Image>
              )
            })
          }
        </View>
        <View className='fixed-foot' className={ !test_id ? 'hide' : 'show'}>
            <Button onClick={this.gotoTest.bind(this,test_id)}
              type='warn' 
              className='payBtn'
            >开始测试</Button>
        </View>
      </View>
    )
  }
  componentWillMount () {
   this.getId()
   console.log('//////////sss', this.props.tid)
  }

  componentDidMount () {
  }
  getId() {
    let url = this.props.tid
    let testId = this.queryURLParams(url, "testid")
    let courseId = this.queryURLParams(url, "courseid")
    let eapId = this.queryURLParams(url, "eapid")
    console.log('--res',testId,courseId,eapId)
    this.setState({
      test_id: testId,
      course_id: courseId,
      eap_id: eapId
    },() => {
      this.getTest(testId)
      this.getCourseData(courseId)
      this.getEapdetail()
    })
  }
  queryURLParams(url, name) {
    var pattern = new RegExp("[?&#]+" + name + "=([^?&#]+)");
    var res = pattern.exec(url);
    console.log(res);
    if (!res) return;
    if (!res[1]) return;
    return res[1];
  }
  gotoTest(id, w) {
    const openId = Taro.getStorageSync('openId')
    let userInfo = Taro.getStorageSync('userInfo')
    let authcode = 'RYRtTMIbPqS9nnHP2y8qnF9x'
    let sexName = '未知'
    if(userInfo.gender == 1) {
      sexName = '男'
    }else if(userInfo.gender == 2) {
      sexName = '女'
    }
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
    })
  }
  

  // 获取心理测评数据
  getTest(res) {
    api.get('/home/getPsyTestDetails', {test_id: res})
    .then((res) => {
      const data = res.data.data
      this.setState({
        testData: data
      })
    })
  }

  //获取咨询师详情
  getConData(id) {
    api.get('/home/getConsultantDetails', {consultant_id: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        conData: data
      })
    })
  }

  getCourseData(id) {
    // api.get('')
  }

  getEapdetail(id) {
    api.get('/home/getEapDetails')
    .then((res) => {
      const data = res.data.data
      this.setState({
        eapData: data
      })
    })
  }

}

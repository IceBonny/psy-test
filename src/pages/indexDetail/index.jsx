import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button  } from '@tarojs/components'
import api from '../../utils/api'

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
    })
    if(eapId) {
      this.getEapdetail()
    }
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
    Taro.navigateTo({
      url: `/pages/testIndex/index`
    })
  }
  

  // 获取心理测评数据
  getTest(res) {
    wx.cloud.callFunction({
      name: 'api',
      data: {
        url: '/home/getPsyTestDetails',
        test_id: res
      },
      success: (res) => {
        let data = JSON.parse(res.result);
        console.log(data);
        this.setState({
          testData: data.data
        })
      }
    })
  }

  //获取咨询师详情
  getConData(id) {
    wx.cloud.callFunction({
      name: 'api',
      data: {
        url: '/home/getConsultantDetails',
        consultant_id: id
      },
      success: (res) => {
        let data = JSON.parse(res.result);
        console.log(data);
        this.setState({
          conData: data.data
        })
      }
    })
  }

  getCourseData(id) {
  }

  getEapdetail(id) {
    wx.cloud.callFunction({
      name: 'api',
      data: {
        url: '/home/getEapDetails',
        eap_id: id
      },
      success: (res) => {
        let data = JSON.parse(res.result);
        console.log(data);
        this.setState({
          eapData: data.data
        })
      }
    })
  }
}

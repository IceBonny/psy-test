import React, { Component } from 'react'
import { View, Text  } from '@tarojs/components'
import api from '../../utils/api'
import { AtList, AtListItem, AtAccordion  } from 'taro-ui'
import './index.scss'

export default class Detail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      open: false,
      flag: '',
      isTest: false,
      isCon: false,
      isCourse: false,
      isGrow: false,
      testList: [
        {
          test_id: "aa043be8-7019-4516-bbbb-b8bfd3e18934",
          name: "抑郁症",
          date: "2020-06-30",
          time: "16:05:23"
        },
        {
          test_id: "aa043be8-7019-4516-bbbb-b8bfd3e18934",
          name: "心理疾病",
          introduction: "这是一个常用测试",
          date: "2020-06-30",
          time: "16:05:23"
        }
      ],
      conList: [
        {
          consultant_id: '2',
          consultant_name: 'Rex Joush',
          form: '333',
          price: '666',
          subscribe_time: '444',
          times: '555',
          date: '2020-7-14',
          time: '17:53:54'
        },
        {
          consultant_id: '3',
          consultant_name: 'Ice Bonny',
          form: '333',
          price: '666',
          subscribe_time: '444',
          times: '555',
          date: '2020-7-14',
          time: '17:53:54'
        }
      ],
      courseList: [
        {
          course_id: "aa043be8-7019-4516-bbbb-b8bfd3e18934",
          name: "抑郁症",
          price: "20",
          date: "2020-06-30",
          time: "16:05:23"
        },
        {
          course_id: "aa043be8-7019-4516-bbbb-b8bfd3e18934",
          name: "心理疾病",
          price: "10",
          date: "2020-06-30",
          time: "16:05:23"
        }
      ],
      growList: [
        {
          course_id: "aa043be8-7019-4516-bbbb-b8bfd3e18934",
          name: "抑郁症",
          price: "20",
          date: "2020-06-30",
          time: "16:05:23"
        },
        {
          course_id: "aa043be8-7019-4516-bbbb-b8bfd3e18934",
          name: "心理疾病",
          price: "10",
          date: "2020-06-30",
          time: "16:05:23"
        },
      ]
    }
  }
  render () {
    const { open, isTest, isCon, isCourse, isGrow, testList, conList, courseList, growList} = this.state
    return (
      <View className='history'>
        <View className={ isTest ? 'item' : 'hide'}>
          <View className='item-title'>最近心理测试记录</View>
          <AtList>
            {
              testList.map((item,index) => {
                return(
                  <AtListItem
                    key={index}
                    title={`测试名称：${item.name}`}
                    note={item.introduction}
                    extraText={item.date}
                    iconInfo={{ size: 25, color: '#FF9966', value: 'edit', }}
                  />
                )
              })
            }
          </AtList>
        </View>
        <View className={ isCon ? 'item' : 'hide'}>
          <View className='item-title'>最近心理咨询记录</View>
          <AtList>
            {
              conList.map((item,index) => {
                return(
                  <AtListItem
                    key={index}
                    title={`咨询师：${item.consultant_name}`}
                    note={`咨询形式:${item.form} 价格:${item.price}`}
                    extraText={item.date}
                    iconInfo={{ size: 25, color: '#66CCFF', value: 'user', }}
                  />
                )
              })
            }
          </AtList>
        </View>
        <View className={ isCourse ? 'item' : 'hide'}>
          <View className='item-title'>最近心理课程</View>
          <AtList>
            {
              courseList.map((item,index) => {
                return(
                  <AtListItem
                    key={index}
                    title={item.name}
                    note={`价格：${item.price}`}
                    extraText={item.date}
                    iconInfo={{ size: 25, color: '#FF3333', value: 'clock', }}
                  />
                )
              })
            }
          </AtList>
        </View>
        <View className={ isGrow ? 'item' : 'hide'}>
          <View className='item-title'>最近心理成长活动</View>
          <AtList>
            {
             growList.map((item,index) => {
                return(
                  <AtListItem
                    key={index}
                    title={item.name}
                    note={`价格：${item.price}`}
                    extraText={item.date}
                    iconInfo={{ size: 25, color: '#00CC33', value: 'analytics', }}
                  />
                )
              })
            }
          </AtList>
        </View>
      </View>
    )
  }
  componentWillMount () {
   this.getId()
  }

  componentDidMount () { 
    console.log('//////////sss', this.props.tid)
  }
  
  getId() {
    let url = this.props.tid
    let openId = this.queryURLParams(url, "openId")
    let flag = this.queryURLParams(url, "flag")
    if(flag == 'isTest') {
      this.setState({
        isTest: true
      })
    }else if(flag == 'isCon') {
      this.setState({
        isCon: true
      })
    }
    else if(flag == 'isCourse') {
      this.setState({
        isCourse: true
      })
    }
    else if(flag == 'isGrow') {
      this.setState({
        isGrow: true
      })
    }
    console.log('-----res',flag)
    this.setState({
      openId: openId
    },() => {
      this.getUserPsyTest(openId)
      this.getUserConsultant(openId)
      this.getUserConsultant(openId)
      this.getUserGrow(openId)
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
  

  //获取做过的心理测试
  getUserPsyTest(id) {
    api.get('/my/getUserPsyTest', {openId: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        testList: data
      })
      console.log('++++++++++',data)
    })
  }
  //获取做过的心理咨询
  getUserConsultant(id) {
    api.get('/my/getUserConsultant', {openId: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        conList: data
      })
      console.log('++++++++++',data)
    })
  }

  //获取用户的线上课程
  getUserCourse(id) {
    api.get('/my/getUserCourse', {openId: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        courseList: data
      })
      console.log('++++++++++',data)
    })
  }

  //获取用户所做的心理成长
  getUserGrow(id) {
    api.get('/my/getUserGrow', {openId: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        growList: data
      })
      console.log('++++++++++',data)
    })
  }
}

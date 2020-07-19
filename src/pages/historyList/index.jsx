import React, { Component } from 'react'
import { View, Text, Image, Radio,RadioGroup,Label  } from '@tarojs/components'
import api from '../../utils/api'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class Detail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      isTest: '',
      isCon: '',
      isCourse: '',
      isGrow: '',
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
      conList: [],
      courseList: [],
      growList: []
    }
  }
  render () {
    const { isTest, isCon, isCourse, testList, isGrow,conList, courseList, growList} = this.state
    return (
      <View className='history'>
        <View>
        
        <AtList>
          {
            testList.map((item,index) => {
              return(
                <AtListItem
                  title={item.name}
                  note={item.introduction}
                  extraText={item.date}
                  iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark', }}
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
   
  }

  componentDidMount () { 
    console.log('//////////sss', this.props.tid)
  }
  
  getId() {
    let url = this.props.tid
    let conId = this.queryURLParams(url, "conid")
    console.log('--res',conId)
    this.setState({
      // consultant_id: conId
    },() => {

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
  gotoPay(id, w) {
    console.log('---gotoPay------id', id)
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

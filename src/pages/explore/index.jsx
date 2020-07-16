import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

import api from '../../utils/api'
import TabsControl from '../../components/tabsControl/index'

import './index.scss'

export default class Explore extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      categoryList: [],  //全部分类列表
      testData: [],  //按分类列表获取的数据
      // consultantList: [], //全部咨询师
      // courseData: [], //全部线上课程
      // growList: [], //心理成长活动列表
    }
    // this.getPsyTestByCategory= this.getPsyTestByCategory.bind(this)
    // this.getCourseList = this.getCourseList.bind(this)
  }

  render () {
    const { categoryList, testData } = this.state

    return (
      <View className='index'>
         <TabsControl>
           <View name="心理测评">
            <TabsControl className='testcate'>
              {categoryList.map((item,id) => 
                <View name={item.category_name} key={item.category_id} 
                onClick={() => {this.getPsyTestByCategory(item.category_id)}}>
                  {
                    testData.map((val,idx) =>
                    <View>{ val.name}</View>
                    )
                  }
                </View>
              )}
            </TabsControl>
           </View>
           <View name="咨询服务"></View>
           <View name="线上课程">

           </View>
           <View name="心理成长活动"></View>
           <View name="心理测评通用平台"></View>
           <View name="员工辅助计划（EAP）"></View>
				</TabsControl>

      </View>
    )
  }
  componentWillMount () { 
    this.getCategoryData()
    // this.getConsultantList()
  }

  componentDidMount () { }


  // 获取全部分类列表
  getCategoryData() {
    api.get('/discover/getCategoryList').then((res) => {
      const data = res.data.data
      this.setState({
        categoryList: data
      })
    })
  }
  // 获取全部咨询师
  // getConsultantList() {
  //   api.get('/discover/getConsultantList').then((res) => {
  //     const data = res.data.data
  //     this.setState({
  //       consultantList: data
  //     })
  //     console.log('getConsultantList',res.data.data)
  //   })
  // }
  //按分类获取心理测试
  getPsyTestByCategory=(val) => {
    console.log('testData',val)
    // debugger
    // api.get('/discover/getPsyTestByCategory',{category_id: val})
    // .then((res) => {
    //   const data = res.data.data
    //   this.setState({
    //     testData: data
    //   })
    //   console.log('testData',testData)
    // })
  }
  // 按标签获取心理咨询师
  // getConsultantByCategory(id) {
  //   api.get('/discover/getConsultantList',id).then((res) => {
  //     const data = res.data.data
  //     this.setState({
  //       conList: data
  //     })
  //     console.log('getConsultantList',res.data.data)
  //   })
  // }
  // // 获取全部线上课程
  // getCourseList() {
  //   api.get('/discover/getCourseList')
  //   .then((res) => {
  //     const data = res.data.data
  //     this.setState({
  //       courseData: data
  //     })
  //   })
  // }

  // // 获取全部心理成长活动
  // getPsyGrowList() {
  //   api.get('/discover/getPsyGrowList').then((res) => {
  //     const data = res.data.data
  //     this.setState({
  //       growList: data
  //     })
  //     console.log('growList',res.data.data)
  //   })
  // }
}

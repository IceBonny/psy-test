import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

import api from '../../utils/api'
// import TabsControl from '../../components/tabsControl/index'

import './index.scss'
const navTab = [
  {
    name:'心理测评',
    id: 'nav1',
  },
  {
    name:'咨询服务',
    id: 'nav2',
  },
  {
    name:'线上课程',
    id: 'nav3',
  },
  {
    name:'心理成长活动',
    id: 'nav4',
  },
  {
    name:'心理测评通用平台',
    id: 'nav5',
  },
  {
    name:'员工辅助计划（EAP）',
    id: 'nav6',
  },
]
export default class Explore extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      navTabActive: 0,
      testTab: 0,
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
    const { navTabActive, testTab, categoryList, testData } = this.state

    return (
      <View className='explore'>
        <View className='ex-wrp ex-tab'>
          {navTab.map((item,index) => 
            <View key={item.id} className={navTabActive === index ? 'ex-item active' : 'ex-item'} 
              onClick={this.switchTab.bind(this,index)}>
                {item.name}
            </View>
          )}
        </View>
        <View className='tab-content'>
            <View className={navTabActive==0 ? 'show' : 'hide'}>
              <View className='test-tab ex-wrp ex-tab'>
                {categoryList.map((item,index) => 
                  <View key={item.category_id} className={testTab === item.category_id ? 'ex-item active' : 'ex-item'} 
                    onClick={this.testToggle.bind(this,item.category_id)}>
                      {item.category_name}
                  </View>
                )}
              </View>
              <View className='test-content'>
                <View className='show'></View>
              </View>
            </View>
            <View className={navTabActive==1 ? 'show' : 'hide'}>
              <Text>心理咨询</Text>
            </View>
            <View className={navTabActive==2 ? 'show' : 'hide'}>
              <Text>课程</Text>
            </View>
            <View className={navTabActive==3 ? 'show' : 'hide'}>
              <Text>心理成长活动</Text>
            </View>
            <View className={navTabActive==2 ? 'show' : 'hide'}>
              <Text>心理测评通用平台</Text>
            </View>
            <View className={navTabActive==3 ? 'show' : 'hide'}>
              <Text>员工辅助计划（EAP）</Text>
            </View>
        </View>
          
           

      </View>
    )
  }
  componentWillMount () { 
    this.getCategoryData()
    // this.getConsultantList()
  }

  componentDidMount () { }

  switchTab(index,e) {
    this.setState({
      navTabActive: index
    },()=> {
      console.log('rrrrr',index)
    });
  }
  testToggle(id,e) {
    this.getPsyTestByCategory(id)
    this.setState({
      testTab: id
    })    
  }
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
  getPsyTestByCategory(val)  {
    api.get('/discover/getPsyTestByCategory',{category_id: val})
    .then((res) => {
      const data = res.data.data
      this.setState({
        testData: data
      })
    })
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

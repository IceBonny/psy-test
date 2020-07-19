import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import api from '../../utils/api'
import { navTab, conTabList} from './const'
import './index.scss'

export default class Explore extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      navTabActive: 0,     
      testTab: 0,             //test二级分类标识
      conTab: 0,              //咨询服务二级分类标识
      categoryList: [],       //全部分类列表
      testData: [],           //按分类列表获取的数据
      consultantList: [], //全部咨询师
      courseData: [],     //全部线上课程
      growList: [],       //心理成长活动列表
    }
  }
  handleClick (value) {
    this.setState({
      conTab: value
    })
  }

  render () {
    const { navTabActive, testTab,conTab, categoryList, consultantList,  testData, courseData, growList } = this.state

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
                  {return (
                    <View key={item.category_id} className={testTab === item.category_id ? 'ex-item active' : 'ex-item'} 
                      onClick={this.testToggle.bind(this, index, item.category_id)}>
                        {item.category_name}
                    </View>
                  )}
                )}
              </View>
              <View className='test-content'>
                <View>
                  {testData.map((item,index) => {
                    return(
                      <View key={item.test_id} className={ testTab === item.category_id ? 'show test-item': 'hide'}
                      onClick={this.gotoPsyTest.bind(this, item.test_id)}
                      >
                        {item.name}
                        {item.introduction}
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>
            <View className={navTabActive==1 ? 'show' : 'hide'}>
            <AtTabs
              scroll
              current={conTab}
              tabList={conTabList}
              onClick={this.handleClick.bind(this)}>
              <AtTabsPane current={conTab} index={0}>
                <AtList>
                  {consultantList.map((item,index) => {
                    return (
                      <AtListItem
                        key={index}
                        title={`咨询师名称：${item.consultant_name}`}
                        // arrow='right'
                        thumb={item.img_url}
                        onClick={this.goconDetail.bind(this, item.consultant_id)}
                      />
                      )
                    })
                  }
              </AtList>
              </AtTabsPane>
              <AtTabsPane current={conTab} index={1}>
                <View>标签页2的内容</View>
              </AtTabsPane>
              <AtTabsPane current={conTab} index={2}>
                <View>标签页3的内容</View>
              </AtTabsPane>
              <AtTabsPane current={conTab} index={3}>
                <View>标签页4的内容</View>
              </AtTabsPane>
              </AtTabs>
            </View>
            <View className={navTabActive==2 ? 'show courseList' : 'hide'}>
              {courseData.map((item,index) => {
                return(
                  <View key={item.course_id}  className='course-item'
                  onClick={this.gocourseDetail.bind(this, item.course_id)}
                  >
                   <Text className='item-title'>课程名称：{item.title}</Text> 
                    {/* {item.price} */}
                  </View>
                )
              })}
            </View>
            <View className={navTabActive==3 ? 'show courseList' : 'hide'}>
              {growList.map((item,index) => {
                  return(
                    <View key={item.course_id}  className='course-item'
                    onClick={this.gocourseDetail.bind(this, item.course_id)}
                    >
                    <Text className='item-title'>课程名称：{item.title}</Text> 
                    <Text className='item-price'>价格：{item.price}</Text> 
                    </View>
                  )
                })}
            </View>
            <View className={navTabActive==4 ? 'show' : 'hide'}>
              <Text>心理测评通用平台</Text>
            </View>
            <View className={navTabActive==5 ? 'show' : 'hide'}>
              <Text>员工辅助计划（EAP）</Text>
            </View>
        </View>
          
           

      </View>
    )
  }
  componentWillMount () { 
    this.getCategoryData()
    this.getCourseList()
    this.getPsyGrowList()
    this.getConsultantList()
  }

  componentDidMount () { }

  switchTab(index,e) {
    this.setState({
      navTabActive: index
    },()=> {
      console.log('rrrrr',index)
    });
  }
  testToggle(index, id, e) {
    this.setState({
      testTab: id
    })  
    console.log('toggle', id)
    this.getPsyTestByCategory(id)
      
  }
  // 获取全部分类列表
  getCategoryData() {
    api.get('/discover/getCategoryList').then((res) => {
      const data = res.data.data
      this.setState({
        categoryList: data
      }, () => {
        setTimeout(() => {
          this.setState({
            testTab: data[0].category_id
          },() => {
            this.getPsyTestByCategory(data[0].category_id)
          })
        },10)
      })
    })
  }
  // 获取全部咨询师
  getConsultantList() {
    api.get('/discover/getConsultantList').then((res) => {
      const data = res.data.data
      this.setState({
        consultantList: data
      })
      console.log('getConsultantList',res.data.data)
    })
  }
  goconDetail(conid, e) {
    Taro.navigateTo({
      url: `/pages/exploreDetail/index?conid=${encodeURIComponent(conid)}`
    })
  }
  gocourseDetail() {
    
  }
  //按分类获取心理测试
  getPsyTestByCategory(val)  {
    api.get('/discover/getPsyTestByCategory',{category_id: val})
    .then((res) => {
      const data = res.data.data
      console.log('const data = res.data.data' ,data)
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
  // 获取全部线上课程
  getCourseList() {
    api.get('/discover/getCourseList')
    .then((res) => {
      const data = res.data.data
      this.setState({
        courseData: data
      })
      console.log('courseData', data)
    })
  }

  // 获取全部心理成长活动
  getPsyGrowList() {
    api.get('/discover/getPsyGrowList')
    .then((res) => {
      const data = res.data.data
      this.setState({
        growList: data
      })
      console.log('growList',res.data.data)
    })
  }
  //心理测试 二级页面
  gotoPsyTest(testid, e) {
    Taro.navigateTo({
      url: `/pages/indexDetail/index?testid=${encodeURIComponent(testid)}`
    })
  }
  //课程-二级页面
  gotoCourse(coureseid, e) {
    Taro.navigateTo({
      url: `/pages/indexDetail/index?coureseid=${encodeURIComponent(coureseid)}`
    })
  }

  //心理成长活动 跳转二级
  gotoGrow(growid, e) {
    Taro.navigateTo({
      url: `/pages/indexDetail/index?growid=${encodeURIComponent(growid)}`
    })
  }
}

import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import api from '../../utils/api'
import TestItem from '../../components/TestList/index'
import './index.scss'

const tabList = [
  { title: '心理测评' }, 
  { title: '咨询服务' }, 
  { title: '线上课程' },
  { title: '心理成长活动'},
  { title: '心理测评通用平台'},
  { titile: '员工辅助计划（EAP）'}
]
export default class Explore extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,    //  一级分类idx
      cateIndex: 22, // test下分类idx
      categoryList: [], 
      categoryData: [] 
    }
    this.handleTabs = this.handleTabs.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
  }

  render () {
    const { current, cateIndex, categoryData } = this.state
    return (
      <View className='index'>
        <AtTabs current={current} scroll tabList={tabList} onClick={this.handleTabs}>
        <AtTabsPane current={current} index={0} >    
           <TestItem></TestItem>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <View>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          <View>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={5}>
          <View>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
      </View>
    )
  }
  handleTabs (value) {
    this.setState({
      current: value
    })
  }
  handleCategory(val) {
    this.setState({
      cateIndex: val
    })
  }

  getCategoryData() {
    api.get('/discover/getCategoryList').then((res) => {
      const data = res.data.data
      this.setState({
        categoryData: data
      })
      console.log('categoryData',res.data.data)
    })
  }
  componentWillMount () { 
    this.getCategoryData()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
}

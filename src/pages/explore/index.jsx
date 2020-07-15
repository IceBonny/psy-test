import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import api from '../../utils/api'
// import TabsControl from '../../components/tabsControl/index'
import { ClTabs } from 'mp-colorui'
// import './index.scss'

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
      currentNavtab: 0, // test下分类idx
      categoryList: [],  //全部分类列表
      categoryData: [],  //按分类列表获取的数据
      consultantList: [], //全部咨询师
      growList: [], //心理成长活动列表
    }
    this.handleTabs = this.handleTabs.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
  }

  render () {
    const { current, categoryList } = this.state
    return (
      <View className='index'>
        <AtTabs current={current} scroll tabList={tabList} onClick={this.handleTabs}>
          <AtTabsPane current={current} index={0} >
          <ClTabs tabs={categoryList} type='center'>
            {categoryList.map(item => (
              <View key={item.category_id} id={item.category_id}>
                {item.category_name}
              </View>
            ))}
          </ClTabs>
            {/* <TabsControl>
              <View name="社会新闻">
                  社会新闻的内容
              </View>
              <View name="体育世界">
                  体育世界的内容
              </View>
              <View name="娱乐圈">
                  娱乐圈的内容
              </View>
            </TabsControl>   */}
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
  componentWillMount () { 
    this.getCategoryData()
  }

  componentDidMount () { }

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
  // 获取全部分类列表
  getCategoryData() {
    api.get('/discover/getCategoryList').then((res) => {
      const data = res.data.data
      this.setState({
        categoryData: data
      })
      console.log('categoryData',res.data.data)
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
  // 按标签获取心理咨询师
  getConsultantByCategory(id) {
    api.get('/discover/getConsultantList',id).then((res) => {
      const data = res.data.data
      this.setState({
        conList: data
      })
      console.log('getConsultantList',res.data.data)
    })
  }

  // 获取全部心理成长活动
  getPsyGrowList() {
    api.get('/discover/getPsyGrowList').then((res) => {
      const data = res.data.data
      this.setState({
        growList: data
      })
      console.log('growList',res.data.data)
    })
  }
}

import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem, AtButton } from 'taro-ui'
import api from '../../utils/api'
import './index.scss'

export default class ConDetail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      condata: [],
      consultant_id: ''
    }
  }
  render () {
    const { condata } = this.state
    return (
      <View className='conDetail'>
        {condata.map((item,i) =>
          <View className='at-article' key={i}>
            <View className='at-article__h1'>
              咨询师名称：{item.consultant_name}
            </View>
            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__h2'>擅长领域：{item.expertise}</View>
                <View className='at-article__h3'>性别：{item.sex}</View>
                <View className='at-article__h3'>简介：{item.introduction}</View>
                <View className='at-article__h3'>咨询形式：{item.form}</View>
                <View className='at-article__h3'>咨询价格：{item.price}</View>
                <View className='at-article__h3'>咨询师照片：</View>
                {item.img_url && 
                  <Image
                  className='at-article__img' 
                  src={item.img_url} 
                  mode='widthFix' />
                }
                <View className='at-article__h3'>具体介绍：</View>
                {item.img_url && 
                  <Image
                  className='at-article__img' 
                  src={item.details_img_url} 
                  mode='widthFix' />
                }
              </View>
            </View>
            <AtButton type='primary' onClick={this.goReserve.bind(this, item.consultant_id)}>预约</AtButton>
          </View>
        )}
      </View>
    )
    
  }
  componentWillMount () { 
    this.getId()
  }
  getId() {
    let url = this.props.tid
    let conId = this.queryURLParams(url, "conid")
    console.log('--res',conId)
    this.setState({
      consultant_id: conId
    },() => {
      this.getDetail(conId)
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
  getDetail(conId) {
    api.get('/home/getConsultantDetails',{'consultant_id': conId})
    .then((res) => {
      const data = res.data.data
      this.setState({
        condata: data
      })
    })
  }
  goReserve(conid, e) {
    Taro.navigateTo({
      url: `/pages/exploreDetail/index?conid=${encodeURIComponent(conid)}`
    })
  }
}
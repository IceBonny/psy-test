import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
class TestItem extends Component{
	render () {
    const { testItem } = this.props
    return (
      <View>
        <View>{testItem.name}</View>
        <View>年龄：{testItem.introduction}</View>
        {/* <hr /> */}
      </View>
    )
  }
}

export default TestItem
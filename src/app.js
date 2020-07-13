/*
 * @Description: 
 * @Autor: Bonny.meng
 * @Date: 2020-07-13 22:54:13
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-13 23:13:10
 */ 
import { Component } from 'react'
import './app.scss'
import 'taro-ui/dist/style/index.scss'

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App

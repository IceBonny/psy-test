import React, { Component } from 'react'
import { View, Text, Image, Radio,RadioGroup,Label  } from '@tarojs/components'
import api from '../../utils/api'
import { AtButton, AtAvatar, AtForm, AtInput,AtInputNumber,AtCard,AtDivider,AtNoticebar     } from 'taro-ui'
import './index.scss'

export default class Detail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      consultant_id: '',
      conData: [],
      value: '1',
      formList: [
        {
          value: '面对面咨询',
          text: '面对面咨询',
          checked: true
        },
        {
          value: '线上咨询',
          text: '线上咨询',
          checked: false
        }
      ]
    }
  }
  render () {
    const { conData, consultant_id, formList } = this.state
    return (
      <View className='ex-detail'>
        {
          conData.map((item,index) => {
            return(
              <AtCard
              note='小Tips'
              extra='查看预约须知'
              title='预约信息'
            >
              <AtForm
              onSubmit={this.onSubmit.bind(this)}
              >
                <View className='form-item'>
                  <Text>预约老师</Text><AtAvatar circle image={item.img_url}></AtAvatar>
                </View>
                <View className='form-item'>
                  <Text>咨询方式</Text>
                  <RadioGroup>
                    {formList.map((item, i) => {
                      return (
                        <Label className='radio-list__label' for={i} key={i}>
                          <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                        </Label>
                      )
                    })}
                  </RadioGroup>
                </View>
                <View className='form-item'>
                  <Text>咨询次数</Text>
                  <AtInputNumber
                    min={0}
                    max={10}
                    step={1}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                  />
                </View>
                <View className='form-item'>
                  <Text>预约时间</Text>
                </View>
                <AtNoticebar>预约时间仅对首次咨询生效，剩余咨询时间需另外协商</AtNoticebar>
                <AtDivider />
                <View className='form-item'>
                  <Text>{item.consultant_name}</Text>
                  <Text>￥{item.price}</Text>
                </View>
                <View className='form-item'>
                  <Text>优惠券</Text>
                  <Text>暂无可用</Text>
                </View>
                <AtDivider />
                <View style='display:flex;justifiy-content:flex-end'>
                  <Text>小计：￥{item.price}</Text>
                </View>
                <AtButton formType='submit'>提交</AtButton>
              </AtForm>
              这也是内容区 可以随意定义功能
            </AtCard>
            )
          })
        }
      </View>
    )
  }
  componentWillMount () {
   this.getId()
  //  this.getEapdetail()
  }

  componentDidMount () { 
    console.log('//////////sss', this.props.tid)
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  onSubmit (event) {
    console.log(this.state.value)
  }
  getId() {
    let url = this.props.tid
    let conId = this.queryURLParams(url, "conid")
    console.log('--res',conId)
    this.setState({
      consultant_id: conId
    },() => {
      this.getConData(conId)
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
  

  //获取咨询师详情
  getConData(id) {
    api.get('/home/getConsultantDetails', {consultant_id: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        conData: data
      })
      console.log('++++++++++',data)
    })
  }
}

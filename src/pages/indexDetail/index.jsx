import React, { Component } from 'react'
import { View, Text, Image, Button  } from '@tarojs/components'
import api from '../../utils/api'

export default class Detail extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      test_id: '',
      testData: [],
      consultant_id: '',
      conData: [],
      course_id: '',
      courseData: [],
      eapData: []
    }
  }
  render () {
    const { testData, test_id, conData, consultant_id, course_id, courseData, eapData } = this.state
    return (
      <View className='detail'>
        <View className='img-wrap'>
          {
            testData.map((item,index) => {
              return(
                 <Image className='test_detailImg' src={item.details_img_url} mode="widthFix"></Image>
              )
            })
          }
          <View className='fixed-foot' className={ test_id ? 'show' : 'hide'}>
            <Button onClick={this.gotoPay.bind(this,test_id)}
            >开始测试</Button>
          </View>
        </View>
        <View className='con-wrap'>
          {
            conData.map((item,index) => {
              return(
                <View className='con-item' key={item.consultant_id}>
                  <View className="item-title">咨询师详情</View>
                    <View className="condetail">
                      <Image className='item-img' src={item.img_url} />
                      <View className="item-main">
                        <View className="item-tit">擅长领域：{item.expertise}</View>
                        <View className="item-tit">描述：{item.introduction}</View>
                          <View className="item-form">
                            <Text>形式：{item.form}</Text>
                            <Text>价格：{item.price}</Text>
                          </View>
                      </View>
                    </View>
                    <Image mode="widthFix" src={item.details_img_url} className="item-detailimg" />
                </View>
              )
            })
          }
        </View>
        <View className='course-wrap'>
      
        </View>
        <View className='eap-wrap'>
        {
            eapData.map((item,index) => {
              return(
                 <Image className='eap_detailImg' src={item.details_img_url} mode="widthFix"></Image>
              )
            })
          }
        </View>
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
  getId() {
    let url = this.props.tid
    let testId = this.queryURLParams(url, "testid")
    let conId = this.queryURLParams(url, "conid")
    let courseId = this.queryURLParams(url, "courseid")
    let eapId = this.queryURLParams(url, "eapid")
    console.log('--res',testId,conId,courseId,eapId)
    this.setState({
      test_id: testId,
      consultant_id: conId,
      course_id: courseId,
      eap_id: eapId
    },() => {
      this.getTest(testId)
      this.getConData(conId)
      this.getCourseData(courseId)
      this.getEapdetail(eapId)
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
    console.log('---------id', id)
  }
  

  // 获取心理测评数据
  getTest(res) {
    api.get('/home/getPsyTestDetails', {test_id: res})
    .then((res) => {
      const data = res.data.data
      this.setState({
        testData: data
      })
      console.log('++++++++++',data)
    })
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

  getCourseData(id) {
    // api.get('')
  }

  getEapdetail(id) {
    api.get('/home/getEapDetails', {eap_id: id})
    .then((res) => {
      const data = res.data.data
      this.setState({
        eapData: data
      })
    })
  }

}

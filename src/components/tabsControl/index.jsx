import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class TabsControl extends Component{
  constructor(props){
    super(props)
    this.state={ 
      currentIndex : 0
    }
  }

  render(){
      // let _this=this
      return(
          <View>
              {/*动态生成Tab导航*/}
              <View className="Tab_tittle_wrap">
                  { Taro.Children.map( this.props.children , (ele,index) => {
                      return(
                        /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                        <View onClick={ () => 
                          { this.setState({currentIndex : index}) } } 
                          className={ this.check_tittle_index(index) }
                        >
                            { ele.props.name }
                        </View>
                      );
                  }) }
              </View>
              {/*Tab内容区域*/}
              <View className="Tab_item_wrap">
                  {Taro.Children.map(this.props.children, (ele,index)=>{
                      return(
                        <View className={ this.check_item_index(index) }>{ ele }</View>
                      );
                  })}
              </View>
          </View>
          );
  }

  
  check_tittle_index(index){
    return index===this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
  }

  check_item_index(index){
    return index===this.state.currentIndex ? "Tab_item show" : "Tab_item";
  }
}
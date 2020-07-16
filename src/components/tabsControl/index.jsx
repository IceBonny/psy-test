import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'


class TabsControl extends Component{
	constructor(  ){
		super()
		this.state = { 
			currentIndex : 0
		}
	}
	check_title_index( index ){
		return index === this.state.currentIndex ? "tab_title active" : "tab_title"
	}
	check_item_index( index ){
		return index === this.state.currentIndex ? "tab_item show" : "tab_item"
	}
	render(){

		return(
			<View>
				<View className="tab_title_wrap">
					{ 
						React.Children.map( this.props.children , ( element,index ) => {
							return(
                <View onClick={ () => { this.setState({ currentIndex : index }) } } 
                className={ this.check_title_index( index ) }>{ element.props.name }</View>
							)
						}) 
					}
				</View>
				<View className="tab_item_wrap">
					{
						React.Children.map(this.props.children,( element,index )=>{
							return(
								<View className={ this.check_item_index( index ) }>{ element }</View>
							)
						})
					}
				</View>
			</View>
		)
	}
}

export default TabsControl
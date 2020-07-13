
import React, { Component } from 'react'
import { AtList, AtListItem } from "taro-ui"

export default function TestItem(props) {
  //样式的右方优化方式1：
  const baseStyle = {
    fontSize: 16
  };

    <div>
      <AtList>
        <AtListItem style={baseStyle} title={props.name} note={props.introduction} />
      </AtList>
    </div>
}
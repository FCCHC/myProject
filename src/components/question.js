import React, { Component } from 'react';

import {Text,TextInput,View,} from 'react-native';

class Question extends Component {

render(){
  return(
   <View>
    <Text style={this.props.styleText}>{this.props.pregunta}</Text>

    <TextInput style={{height: 40}}
               maxLength = {40}
               placeholder ={this.props.placeholder}
               onChangeText={this.props.onChange}
               underlineColorAndroid={this.props.condition}/>

</View>
  )
}


}


export default Question;

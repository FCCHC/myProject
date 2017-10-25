import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,} from 'react-native';

class Question extends Component {

render(){
  return(
   <View style={styles.Container}>
    <Text style={this.props.styleText}>{this.props.pregunta}</Text>

    <TextInput style={styles.textInput}
               maxLength = {40}
               placeholder ={this.props.placeholder}
               onChangeText={this.props.onChange}
               underlineColorAndroid={this.props.condition}/>

</View>
  )
}


}

const styles = StyleSheet.create({
  Container:{
    flexDirection:'row',
  },
  textInput:{
    width:250,
    height:40,
    borderStyle: 'solid',
    marginLeft:30
  },
})

export default Question;

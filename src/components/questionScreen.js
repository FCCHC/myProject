import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RadioQuestion from './radioQuestion.js';

 class QuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:0
     }
   }
   static navigationOptions={
     title:'QUESTION'
   }
  render(){


        const radio_props = [
          {label: 'Si', value: 1},
          {label: 'No', value: 2}
        ];
    return (
  <RadioQuestion pregunta='Te gusta viajar?'
                  radioProps={radio_props}
                  buttonColor='orange'
                  onPress={(value)=>this.setState({value:value})}
                />
    )
  }
}




export default QuestionScreen;

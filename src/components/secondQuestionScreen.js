import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,Button,Alert} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RadioQuestion from './radioQuestion.js';

 class SecondQuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:0,
       color: false,
     }
   }
   static navigationOptions={
     title:'QUESTION'
   }
  render(){

     const color = this.state.color


        const radio_props = [
          {label: '2017', value: 1},
          {label: '2018', value: 2}
        ];
    return (

      <View style={styles.container}>
  <RadioQuestion pregunta='En que año le interesa el viaje?'
                  radioProps={radio_props}
                  buttonColor={color ? 'red' : '#007AFF'}
                  onPress={(value)=>this.setState({value:value, color:false})}
                />

                <View style={styles.buttonContainer} >
                <Button
                         onPress={()=> this.state.value ? Alert.alert('DONE'): this.setState({color:true})}
                         title = 'Terminar'
                         color='#007AFF'
                       />

                 </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft:110,
    flexDirection: 'column',
    justifyContent:'center',
    width:200,
    height:40,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop:50,
  },
})


export default SecondQuestionScreen;

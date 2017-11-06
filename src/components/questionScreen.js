import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,Button, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RadioQuestion from './radioQuestion.js';

 class QuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:0,
       color:false,
     }
   }

   static navigationOptions={
     title:'QUESTION'
   }
  render(){
        const {navigate} = this.props.navigation;

        const radio_props = [
          {label: 'Si', value: 1},
          {label: 'No', value: 2}
        ];

        const valor = this.state.value;
        const color = this.state.color;
    return (
      <Image source={require('./playa.jpg')}
             style={styles.backgroundImage}
             resizeMode={Image.resizeMode.strech}>
      <View style={styles.container}>
         <RadioQuestion pregunta='Te gusta viajar?'
                        radioProps={radio_props}
                        buttonColor= {color ? 'red' : '#007AFF'}
                        onPress={(value)=>this.setState({value:value, color:false})}
                />

           <View style={styles.buttonContainer} >
                <Button
                        onPress={()=> valor ? navigate('SecondQuestionScreen') : this.setState({color:true})}
                        title = 'SIGUIENTE'
                        color='#007AFF'
                      />
           </View>
      </View>
    </Image>
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
  backgroundImage:{
    flex:1,
    width:null,
    height:null,
  },
})


export default QuestionScreen;

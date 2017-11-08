import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,Button, Image,  TouchableHighlight,ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RadioQuestion from './radioQuestion.js';

 class QuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:0,
       color:false,
       data:[
        {
          question:'Te gusta viajar?',
          choice:['Si','no']
       },
       {
         question:'Te gusta viajar solo o acompanado',
         choice:['solo','acompañado']
       },
       {
         question:'Viajarias este año',
         choice:['si','no']
       },
       {
         question:'Viajarías por una semana?',
         choice:['si','no']
       },

     ],
          }
   }



  render(){
        const {navigate} = this.props.navigation;

        const valor = this.state.value;
        const color = this.state.color;
    return (
      <Image source={require('./playa.jpg')}
             style={styles.backgroundImage}
             resizeMode={Image.resizeMode.strech}>
      <View style={styles.container}>
           <ScrollView>
          {this.state.data.map((survey,i)=>(
            <View style={styles.container} key={i}>
            <Text style={styles.question} >{survey.question}</Text>
                {survey.choice.map((choice,i)=>(
                  <TouchableHighlight underlayColor='white' key={i}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText} >{choice}</Text>
                    </View>
                  </TouchableHighlight>
                ))}
                <View style={styles.buttonContainer} >
                     <Button
                             //onPress={ }
                             title = 'SIGUIENTE'
                             color='#007AFF'
                           />
                </View>
            </View>
          ))}
          </ScrollView>

      </View>
    </Image>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems:'center',
    flexDirection: 'column',
    width:200,
    height:40,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop:50,
    alignItems:'center'
  },
  backgroundImage:{
    flex:1,
    width:null,
    height:null,
  },
  button:{
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  question: {
    fontSize: 20,
    color: 'white',
    justifyContent:'center',
    marginLeft:30,
    marginTop:10,
    marginBottom:0,
    fontWeight:'bold',
  },

})


export default QuestionScreen;

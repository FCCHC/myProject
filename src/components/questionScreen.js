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

       ],
          }
   }

   componentDidMount(){
     console.log('Network request');
       return fetch('http://192.168.1.182:8000/Surveys')
          .then((response)=> {
            return response.json()
          })
          .then((responseJson)=>{
            newData=[]
            responseJson.map((item,i)=>{
              newData.push(item)
            })
            this.setState({
              data:newData
            })
          })
          .catch((error)=>{
            console.warn(error);
          })
   }

  render(){
        const {navigate} = this.props.navigation;

    console.log(this.state,'<--------')
    return (

      <View style={styles.container}>
           <ScrollView>
          {this.state.data.map((survey,i)=> {
            return(
              <View style={styles.container} key={i}>
              <Text style={styles.question} >{survey.question}</Text>
              <Text style={styles.question}>{survey.survey_name}</Text>
                  {/*{survey.choice.map((choice,i)=>(
                    <TouchableHighlight underlayColor='white' key={i}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText} >hola</Text>
                      </View>
                    </TouchableHighlight>
                  ))}*/}
                {/*  <View style={styles.buttonContainer} >
                       <Button
                               //onPress={ }
                               title = 'SIGUIENTE'
                               color='#007AFF'
                             />
                  </View>*/}
              </View>
            )
          }
          )}
          </ScrollView>

      </View>

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
    color: 'black',
    justifyContent:'center',
    marginTop:10,
    marginBottom:0,
    fontWeight:'bold',
  },

})


export default QuestionScreen;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Picker,

} from 'react-native';

import Question from './src/components/question.js'

import RadioQuestion from './src/components/radioQuestion.js'

//import {FormLabel, FormInput} from 'react-native-elements'
export default class App extends Component<{}> {
  constructor(props){
    super(props);
     this.state = {
     value : 0,
     nombre: '',
     ciudad: '',
     color: false,
     genero: '',

  }

  this.ValidateInfo = this.ValidateInfo.bind(this);

}


ValidateInfo(){

  name = this.state.nombre
  param = this.state.value
  city = this.state.ciudad


  if(name && param && city){

  Alert.alert('BIEN!');

   this.setState({
     value : 0,
     nombre: '',
     ciudad: '',
     color: false
   })
 }

 else {
  this.setState({

    color : true
  })
 }
}

  render() {


    const radio_props = [
      {label: 'Si', value: 1},
      {label: 'No', value: 2}
    ];

    return (
      <View style={styles.container}>
         {console.log('running')}
        <View style={styles.containerQuestion}>
          <Text style={styles.welcome}>ENCUESTA</Text>

          <Question pregunta="Ingresa tu nombre"
                    styleText={styles.question}
                    placeholder='Nombre Completo'
                    onChange = {(text) => this.setState({nombre:text,color:false})}
                    condition = {this.state.color && this.state.nombre === '' ? 'red': '#007AFF'}/>

          <Question pregunta = "Ingresa tu ciudad"
                    styleText={styles.question}
                    placeholder='Ciudad'
                    onChange = {(text) => this.setState({ciudad :text, color:false})}
                    condition = {this.state.color && this.state.ciudad === '' ? 'red' : '#007AFF'} />


         <Text style={styles.question}>Genero</Text>
         <Picker selectedValue ={this.state.genero}
                 onValueChange={(itemValue, itemIndex) => this.setState({genero:itemValue})}
                 mode='dropdown'>

                <Picker.Item label='Femenino' value="femenino"/>
                <Picker.Item label='Masculino' value = 'masculino'/>
         </Picker>

         <RadioQuestion pregunta="Te gusta viajar?"
                        styleText={styles.question}
                        radioProps={radio_props}
                        buttonColor={this.state.color && (this.state.value === 0) ?  'red': ''}
                        onPress={(text)=>{this.setState({value:text})}}
                        />
       </View>
       <View style={styles.buttonContainer}>
          <Button
                onPress={this.ValidateInfo}
                title = 'ENVIAR'
                color='#007AFF'
                />
        </View>

    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  question: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'black',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: 'Roboto'

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop:200,
    marginLeft:110,
    flexDirection: 'column',
    justifyContent:'center',
    width:200,
    height:40,
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width:40,
    height:40
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  picker: {
    backgroundColor:'blue'
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  containerQuestion:{
    flexDirection:'column',
    justifyContent:'space-between',
  },
});

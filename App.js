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
  TouchableNativeFeedback,
  ScrollView,
  Image,
  FlatList,
  ListView,
  ActivityIndicator,
  Picker,
  YearPicker,
  CheckBox,
  StatusBar,
  Navigator,
  TouchableOpacity,

} from 'react-native';

import Question from './src/components/question.js'

import RadioForm, {RadioButton,
                   RadioButtonInput,
                   RadioButtonLabel} from 'react-native-simple-radio-button';



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
          <Question pregunta="Ingresa tu nombre"
                    placeholder='Nombre Completo'
                    onChange = {(text) => this.setState({nombre:text,color:false})}
                    condition = {this.state.color && this.state.nombre === '' ? 'red': 'blue'}/>

          <Question pregunta = "Ingresa tu ciudad"
                    placeholder='Ciudad'
                    onChange = {(text) => this.setState({ciudad :text, color:false})}
                    condition = {this.state.color && this.state.ciudad === '' ? 'red' : 'blue'} />


         <Text style={styles.question}>Genero</Text>
         <Picker selectedValue ={this.state.genero}
                 onValueChange={(itemValue, itemIndex) => this.setState({genero:itemValue})}
                 mode='dropdown'>

                <Picker.Item label='Femenino' value="femenino"/>
                <Picker.Item label='Masculino' value = 'masculino'/>
         </Picker>


        <Text style={styles.question}>Te gusta viajar?</Text>

        <RadioForm
            radio_props={radio_props}
            initial={-1}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={this.state.color && (this.state.value === 0) ?  'red': ''}
            onPress={(text)=>{this.setState({value:text})}}
            labelStyle={{margin:2}}
          />


        <Button
               onPress={this.ValidateInfo}
               title = 'ENVIAR'/>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2119F3'
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
});

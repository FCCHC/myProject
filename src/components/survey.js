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
  ViewPagerAndroid,
  DatePickerAndroid,

} from 'react-native';

import Question from './question.js';

import RadioQuestion from './radioQuestion.js';

import DatePicker from 'react-native-datepicker';

class Survey extends Component{

  constructor(props){
    super(props);
     this.state = {
     value : 0,
     nombre: '',
     ciudad: '',
     color: false,
     genero: '',
     date:'',

  }

  this.ValidateInfo = this.ValidateInfo.bind(this);

  }


  ValidateInfo(){

  name = this.state.nombre
  param = this.state.value
  city = this.state.ciudad
  fecha = this.state.date


  if(name && param && city && fecha){

  Alert.alert('BIEN!');

   this.setState({
     value : 0,
     nombre: '',
     ciudad: '',
     date:'',
     color: false,
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
<Text style={styles.welcome}>ENCUESTA</Text>
         {console.log('running')}
        <View style={styles.containerQuestion}>





          <Question pregunta= "Nombre"
                    styleText={styles.question}
                    placeholder='Nombre Completo'
                    onChange = {(text) => this.setState({nombre:text,color:false})}
                    condition = {this.state.color && this.state.nombre === 'transparent' ? 'red': 'transparent'}/>

          <Question pregunta = "Ciudad "
                    styleText={styles.question}
                    placeholder='Ciudad'
                    onChange = {(text) => this.setState({ciudad :text, color:false})}
                    condition = {this.state.color && this.state.ciudad === 'transparent' ? 'red' : 'transparent'} />


  <View style={{flexDirection:'row',marginTop:20}}>
          <Text style={styles.question}>Fecha Nacimiento</Text>
          <DatePicker style={{width:160,marginLeft:40}}
                      date={this.state.date}
                      mode='date'
                      placeholder="Select date"
                      format="YYYY-MM-DD"
                      confirmBtnText='Confirm'
                      cancelBtnText="Cancel"
                      androidMode='spinner'
                      onDateChange={(date)=> {this.setState({date:date})}}
                      customStyles= {this.state.color && this.state.date === '' ? {dateInput: {borderColor:'red', marginLeft:0}, dateIcon:{position:'absolute',left:0,top:4,marginLeft:0}} : {dateIcon: {
                                     position: 'absolute',
                                     left: 0,
                                     top: 4,
                                     marginLeft: 0
                                     },
                                     dateInput: {
                                     marginLeft:0
                                    }}}
                               />


     </View>

        <View style={{flexDirection:'row', marginTop:20}}>
         <Text style={styles.question}>Genero</Text>
         <Picker selectedValue ={this.state.genero}
                 onValueChange={(itemValue, itemIndex) => this.setState({genero:itemValue})}
                 mode='dropdown'
                 style={{width:170,marginLeft:110}}
               >

                <Picker.Item label='Femenino' value="femenino"/>
                <Picker.Item label='Masculino' value = 'masculino'/>
         </Picker>
         </View>
    </View>
         <RadioQuestion pregunta="Te gusta viajar?"
                        styleText={styles.question}
                        radioProps={radio_props}
                        buttonColor={this.state.color && (this.state.value === 0) ?  'red': ''}
                        onPress={(text)=>{this.setState({value:text})}}
                        />






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
  },

  question: {
    fontSize: 15,
    color: 'black',
    marginLeft:50,
    marginTop:10,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontFamily: 'Roboto',

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
    color: 'white',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width:40,
    height:40,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  picker: {
    backgroundColor:'blue',
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  containerQuestion:{
    flexDirection:'column',
    justifyContent:'center',
    width:400,

  },
});

export default Survey;

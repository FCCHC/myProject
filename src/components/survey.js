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
  Image,

} from 'react-native';

import Question from './question.js';

import RadioQuestion from './radioQuestion.js';

import DatePicker from 'react-native-datepicker';

import {StackNavigator} from 'react-navigation';

import QuestionScreen from './questionScreen.js';

class Survey extends Component{

  constructor(props){
    super(props);
     this.state = {
     value : 0,
     nombre: '',
     apellido: '',
     color: false,
     genero: '',
     date:'',
     telefono:'',
     correo:'',

  }

  this.ValidateInfo = this.ValidateInfo.bind(this);

  }


  ValidateInfo(){

  name = this.state.nombre
  param = this.state.value
  lastname = this.state.apellido
  fecha = this.state.date
  cel = this.state.telefono
  mail = this.state.correo

  if(name && param && lastname && fecha && telefono && mail){

     navigate('QuestionScreen');
  }

  else {
  this.setState({

    color : true
  })
  }
  }

  static navigationOptions={
    title:'welcome',
  };


  render() {


    const radio_props = [
      {label: 'Si', value: 1},
      {label: 'No', value: 2}
    ];

   const {navigate} = this.props.navigation;

    return (

 <Image source={require('./borabora.jpg')}
        style={styles.backgroundImage}
        resizeMode={Image.resizeMode.strech}>

      <View style={styles.container}>

         {console.log('running')}
        <View style={styles.containerQuestion}>

          <Question pregunta= "Nombre"
                    styleText={styles.question}
                    placeholder='Nombre'
                    onChange = {(text) => this.setState({nombre:text,color:false})}
                    condition = {this.state.color && this.state.nombre === '' ? 'red': 'transparent'}/>
            </View>
            <View style={styles.containerQuestion}>
          <Question pregunta = "Apellido "
                    styleText={styles.question}
                    placeholder='Apellido'
                    onChange = {(text) => this.setState({apellido :text, color:false})}
                    condition = {this.state.color && this.state.ciudad === '' ? 'red' : 'transparent'} />
          </View>

          <View style={styles.containerQuestion}>
        <Question pregunta = "Celular "
                  styleText={styles.question}
                  placeholder='000000000'
                  onChange = {(text) => this.setState({telefono :text, color:false})}
                  condition = {this.state.color && this.state.telefono === '' ? 'red' : 'transparent'} />
        </View>

        <View style={styles.containerQuestion}>
      <Question pregunta = "Correo "
                styleText={styles.question}
                placeholder='example@tucorreo.com'
                onChange = {(text) => this.setState({correo :text, color:false})}
                condition = {this.state.color && this.state.correo === '' ? 'red' : 'transparent'} />
      </View>


  <View style={{flexDirection:'row',marginTop:40}}>
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
                                     borderColor:'#d9d9d9',
                                     borderRadius:5,
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
       <View style={styles.buttonContainer}>
       <Button
               onPress={()=> this.state.nombre ? navigate('QuestionScreen'):''}
                title = 'SIGUIENTE'
                color='#007AFF'
              />

        </View>
    </View>
</Image>
    );
  }
}


const styles = StyleSheet.create({
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
  question: {
    fontSize: 15,
    color: 'black',
    marginLeft:30,
    marginTop:10,
    marginBottom:0,
    fontWeight:'bold',
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
    marginTop:10,
  },
});

export default Survey;

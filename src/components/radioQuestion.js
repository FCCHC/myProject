import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,} from 'react-native';

import RadioForm, {RadioButton,
                   RadioButtonInput,
                   RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioQuestion extends Component {


  render(){
    const radio_props = [
      {label: 'Si', value: 1},
      {label: 'No', value: 2}
    ];
    return(
<View style={styles.container}>
  <Text style={styles.question}>{this.props.pregunta}</Text>
    <View style={styles.radioContainer}>
      <RadioForm
          radio_props={radio_props}
          initial={-1}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={this.props.buttonColor}
          onPress={this.props.onPress}
          labelStyle={{ fontWeight:'bold',fontSize:25}}
        />
    </View>
</View>
    )
  }
}

const styles = StyleSheet.create({
     radioContainer:{
       marginTop:100,

     },
     container: {
       flexDirection:'column',
       alignItems:'center',
       flex:1

     },
     question: {
       fontSize: 20,
       color: 'white',
       marginLeft:30,
       marginTop:10,
       marginBottom:0,
       fontWeight:'bold',

     },
})

export default RadioQuestion;

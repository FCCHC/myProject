import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,} from 'react-native';

import RadioForm, {RadioButton,
                   RadioButtonInput,
                   RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioQuestion extends Component {


  render(){

    return(
<View style={styles.container}>
  <Text style={styles.question}>{this.props.pregunta}</Text>
    <View style={styles.radioContainer}>
      <RadioForm
          radio_props={this.props.radioProps}
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
       fontSize: 40,
       color: 'black',
       marginLeft:30,
       marginTop:10,
       marginBottom:0,
       fontWeight:'bold',

     },
})

export default RadioQuestion;

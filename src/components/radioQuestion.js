import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,} from 'react-native';

import RadioForm, {RadioButton,
                   RadioButtonInput,
                   RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioQuestion extends Component {

  render(){

    return(
<View style={styles.container}>
  <Text style={this.props.styleText}>{this.props.pregunta}</Text>
    <View style={styles.radioContainer}>
      <RadioForm
          radio_props={this.props.radioProps}
          initial={-1}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={this.props.buttonColor}
          onPress={this.props.onPress}
          labelStyle={{marginRight:10}}
        />
    </View>
</View>
    )
  }
}

const styles = StyleSheet.create({
     radioContainer:{
       marginLeft:30,

     },
     container: {
       flexDirection:'row',
     }
})

export default RadioQuestion;

import React, { Component } from 'react';

import {Text,TextInput,View,} from 'react-native';

import RadioForm, {RadioButton,
                   RadioButtonInput,
                   RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioQuestion extends Component {

  render(){

    return(
<View>
      <Text style={this.props.styleText}>{this.props.pregunta}</Text>

      <RadioForm
          radio_props={this.props.radioProps}
          initial={-1}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={this.props.buttonColor}
          onPress={this.props.onPress}
          labelStyle={{margin:2}}
        />
</View>
    )
  }
}


export default RadioQuestion;

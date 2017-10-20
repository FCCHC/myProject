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

import RadioForm, {RadioButton,
                   RadioButtonInput,
                   RadioButtonLabel} from 'react-native-simple-radio-button'

export default class App extends Component<{}> {
  constructor(props){
    super(props);
     this.state = {
     value : 0

  }

}


  render() {


    const radio_props = [
      {label: 'param1', value: 0},
      {label: 'param2', value: 1}
    ];

    return (
      <View>

        <Text>PREGUNTA NUMERO UNO</Text>
        <RadioForm
         radio_props={radio_props}
         initial= {0}
         onPress={(value) => {this.setState({value:value})}}
         buttonColor={'#f48042'}
         animation={true}
       />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
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
  }
});

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
  ViewPagerAndroid,

} from 'react-native';


import Survey from './src/components/survey.js'

//import {FormLabel, FormInput} from 'react-native-elements'

export default class App extends Component<{}> {
  render(){
    return(
      <Survey />
    )
  }
}

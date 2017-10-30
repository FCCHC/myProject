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

import {StackNavigator} from 'react-navigation';
import Survey from './src/components/survey.js';
import QuestionScreen from './src/components/questionScreen.js';
import SecondQuestionScreen from './src/components/secondQuestionScreen.js';

//import {FormLabel, FormInput} from 'react-native-elements'

const SurveyApp = StackNavigator({
  Home: { screen: Survey},
  QuestionScreen: {screen: QuestionScreen},
  SecondQuestionScreen: {screen: SecondQuestionScreen},
});


export default class App extends Component<{}> {
  render(){
    return <SurveyApp/>;
  }
}

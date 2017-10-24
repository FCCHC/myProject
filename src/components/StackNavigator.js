import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {View, Text, Button,StyleSheet} from 'react-native';


const HomeScreen = ({navigation}) => (
  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

    <Text>Home Screen</Text>
    <Button onPress={()=> navigation.navigate('Details')}
            title= 'Go to details'/>

  </View>
);

const DetailsScreen = () =>(
  <View style={{ alignItems: 'center', justifyContent:'center'}}>
  <Text>DetailsScreen</Text>
  </View>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'black',
    marginBottom: 10,
  },
})
export default RootNavigator;

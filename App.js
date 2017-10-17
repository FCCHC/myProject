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
  Navigator

} from 'react-native';



export default class App extends Component<{}> {
  constructor(props){
    super(props);
     this.state = {

       isLoading: true

  }
}

 componentDidMount() {
   console.log('comentario');
   return fetch('http://192.168.1.40:8000/v2/Sucursales/')
     .then((response) => response.json())
     .then((responseJson) => {
       console.log('responseJson', responseJson);
       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.setState({
         isLoading: false,
         dataSource: ds.cloneWithRows(responseJson)
       })

     })
     .catch((error) => {
       console.warn(error);
     });
 }

 _Post(){
   fetch('http://192.168.1.40:8000/v2/update-perfil/',{
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'content-Type': 'application/json',
     },
     body: JSON.stringify({
       token: 'adb47dd08a4a5b215f87225e878b6044464d908d',
       avatar : newBlob,
       password: 'password',
       nickname: 'nickname',
       descripcion : 'descripcion'
     })
   })
 }
  render() {
    if(this.state.isLoading){
      return (
        <View style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
                  renderRow={(rowData) => <View>
                  <Text>{rowData.titulo}</Text>
                    <Text>{rowData.subtitulo}</Text>
                    <Text>{rowData.estado}</Text>
                    <Text> {rowData.longitud}</Text>
                    <Text>{rowData.latitud}</Text>
                  </View>}
                />

          <Button style={styles.button}
                  title='CLICKME'
                  onPress={this._Post}/>
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

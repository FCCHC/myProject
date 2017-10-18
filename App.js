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

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');




export default class App extends Component<{}> {
  constructor(props){
    super(props);
     this.state = {

       isLoading: true

  }
  this._Post = this._Post.bind(this);
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
   console.log('CLICK');

   var image = new FormData();
       image.append('picture', {uri: , name:'avatar.jpg', type: 'image/jpg'});
    const data ={
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Authorization': '85f174a8a4039b4835da182c8fcfdfd35f2d0e55'
      },
      body: JSON.stringify({
        avatar: image,
        password : '54321',
        nickname :'aortega',
        descripcion : 'descripcion ',
      })
    }
    console.log(JSON);
   fetch("http://192.168.1.40:8000/v2/update-perfil/", data)
     .then((responseJson) => {
       console.log(responseJson);
     })
     .catch(err =>{
       console.error(err);
     })
     console.log(data);

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

          <TouchableOpacity style={styles.button} onPress={this.chooseImage}><Text>CHOOSEIMAGES</Text></TouchableOpacity>        
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

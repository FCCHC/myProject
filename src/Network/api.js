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

import RNFetchBlob from 'react-native-fetch-blob'

var ImagePicker = require('react-native-image-picker');

export default class App extends Component<{}> {
  constructor(props){
    super(props);
     this.state = {
     value : 0
       isLoading: true,
       image: '',

  }
  this._Post = this._Post.bind(this);
  this.chooseImage = this.chooseImage.bind(this);
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
    path=this.state.image.uri

     RNFetchBlob.fetch('POST','http://192.168.1.40:8000/v2/update-perfil/',{
       Authorization : 'Bearer 7e9448ff945688c22e514e7bacf01d619c8061b0',
       'Content-Type': 'multipart/form-data',
     }, [
       {
         name : 'avatar',
         filename : 'avatar.jpg',
         data: RNFetchBlob.wrap(path)
       },
       //elements that will be sent as plain text
       { name : 'token', data :'7e9448ff945688c22e514e7bacf01d619c8061b0'},
       { name : 'password', data : '54321'},
       { name : 'nickname', data : 'aortega'},
       {name : 'descripcion', data : 'descripcion'},

     ]).then((resp)=>{
          console.log(resp);
     }).catch((err) => {console.error(err)

   })

}

 chooseImage(){
   ImagePicker.showImagePicker((response)=> {
     console.log('Response = ', response);

     if(response.didCancel){
       console.log('User cancelled image picker');
     }else if(response.error){
       console.log('ImagePicker error: ', response.error);
     }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else{

        let source ={uri: response.uri.replace('file://', ''), isStatic: true};

        if(Platform.OS === 'android'){
           source = {uri: response.path, isStatic: true};
        }

        this.setState({image: source});
        console.log(this.state.image);
      }
   });
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
         {this.state.image ? <Image style={{flex:1}} source={this.state.image}></Image>:null}
          <Button style={styles.button}
                  title='POST'
                  onPress={this._Post}/>

          <Button style={styles.button}
                  onPress={this.chooseImage}
                  title='PHOTO'/>
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

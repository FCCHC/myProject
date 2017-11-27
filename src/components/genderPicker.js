import React, { Component } from 'react';
import {Text,TextInput,View,  StyleSheet, Picker,} from 'react-native';

class GenderPicker extends Component{
  render(){
    return(
      <View style={{flexDirection:'row', marginTop:20}}>
       <Text style={styles.text}>Género</Text>
         <Picker selectedValue ={this.props.genero}
                  onValueChange={this.props.onChange}
                 mode='dropdown'
                 style={{width:170,marginLeft:110}}
               >
            <Picker.Item label='Femenino' value="femenino"/>
            <Picker.Item label='Masculino' value = 'masculino'/>
         </Picker>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    justifyContent:'center',
    marginTop:10,
    marginBottom:0,
    fontWeight:'bold',
  },
})

export default GenderPicker;

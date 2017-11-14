import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,Button, Image,  TouchableHighlight,ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RadioQuestion from './radioQuestion.js';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);

 class QuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:0,
       color:false,
       data:[],
          }
   }

   componentDidMount(){
     console.log(this.state.data,'componentDidMount');
     if(this.state.data == ''){
     console.log('Network request');
       return fetch('http://192.168.1.182:8000/Surveys')
          .then((response)=> {
            return response.json()
          })
          .then((responseJson)=>{
            newData=[]
            responseJson.map((item,i)=>{
              newData.push(item)
            })

            this.setState({
              data:newData
            })
          })
          .catch((error)=>{
            console.warn(error);
          })
        }
   }

   errorCB(err){
     console.log('SQL Error: ' + err);
   }

   successCB(){
     console.log('SQL executed fine');
   }

   openCB(){
     console.log('Database OPENED');
   }


  //  addQuestionDB(){
   //
  //       console.log('addquestionDB');
  //       const questionData = this.state.data
   //
  //       questionData.map((quest,q)=>{
   //
  //         db.transaction((tx)=>{
  //          var query = "INSERT INTO questions (id,question) VALUES (?,?)";
   //
  //         tx.executeSql(query, [quest.id_question,quest.question],function(tx,result){
  //            console.log('rowsAffected' + result.rowsAffected);
  //         },
  //         function(tx,error){
  //          console.log('INSERT error: ' + error.message);
  //         });
  //       }, function(error){
  //          console.log('transaction error: '+ error.message);
  //        },function(){
  //           console.log('transaction ok');
  //       });
  //       })
   //
  //  }

      // addChoiceDB(){
      //   const datos = this.state.data
      //   datos.map((item,i)=>{
      //     console.log(item.id_question);
      //     const ch = item.choices
      //     ch.map((option,o)=>{
      //
      //     db.transaction(function (tx){
      //       console.log(option.choice,'option.choice',item.id_question,'item.id_question');
      //       var query ='INSERT INTO choices(choice,question) VALUES (?,?)'
      //
      //       tx.executeSql(query,[option.choice,item.id_question],function(tx,result){
      //           console.log('rowsAffected: '+result.rowsAffected);
      //       },
      //         function(tx,error){
      //           console.log('INSERT error: ' + error.message);
      //       });
      //     }, function(error){
      //       console.log('transaction error: '+ error.messaage);
      //     },function(){
      //       console.log('transaction ok');
      //     });
      //     })
      //   })
      // }

  // deleteDB(){
  //   db.transaction(function (tx){
  //     var query = "DELETE FROM questions";
  //
  //     tx.executeSql(query,[], function(tx,res){
  //         console.log('removeId: '+ res.insertId);
  //     },
  //     function(tx, error){
  //       console.log('DELETE error: ' + error.message);
  //     });
  //   },function(error){
  //       console.log('transaction error: '+ error.message);
  //   }, function(){
  //     console.log('transaction ok');
  //   });
  // }

   getData(){

     db.transaction(function(tx){
     var query = "SELECT questions.id,questions.question,choices.choice FROM questions INNER JOIN choices ON choices.question = questions.id ";

     tx.executeSql(query,[], function(tx,resultSet){
            arrayResult=[]

            for (var i = 0; i < resultSet.rows.length; i++) {

              arrayResult.push(resultSet.rows.item(i))
            }
            console.log(arrayResult);
     },
    function(tx, error){
      console.log('SELECT error: '+error.message);
    });
  }, function(error){
      console.log('transaction error: ' + error.message);
  }, function(){
      console.log('transaction ok');
    });
  }



  render(){
        const {navigate} = this.props.navigation;

    console.log(this.state,'<--------')
    return (

      <View style={styles.container}>
          {this.getData()}
           <ScrollView>
          {this.state.data.map((survey,i)=> {
            return(
              <View style={styles.container} key={i}>
              <Text style={styles.question} >{survey.question}</Text>
                  {survey.choices.map((ch,c)=>{
                    return(
                      <TouchableHighlight underlayColor='white' key={c}>
                        <View style={styles.button}>
                          <Text style={styles.buttonText} >{ch.choice}</Text>
                        </View>
                      </TouchableHighlight>
                    )
                  })}
              </View>
            )
          }
          )}
          </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems:'center',
    flexDirection: 'column',
    width:200,
    height:40,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems:'center'
  },
  backgroundImage:{
    flex:1,
    width:null,
    height:null,
  },
  button:{
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  question: {
    fontSize: 20,
    color: 'black',
    justifyContent:'center',
    marginTop:10,
    marginBottom:0,
    fontWeight:'bold',
  },

})


export default QuestionScreen;

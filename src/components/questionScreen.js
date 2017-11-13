import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,Button, Image,  TouchableHighlight,ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';

import RadioQuestion from './radioQuestion.js';

import SQLite from 'react-native-sqlite-storage';

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


  //  addQuestionDB(question){
   //
  //    const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);
  //       console.log('addquestionDB');
  //       console.log(question);
  //       console.log(db);
  //      db.transaction((tx)=>{
  //       var query = "INSERT INTO questions (question) VALUES (?)";
   //
  //      tx.executeSql(query, [question],function(tx,result){
  //           console.log('insertId' + result.insertId);
  //         console.log('rowsAffected' + result.rowsAffected);
  //      },
  //      function(tx,error){
  //       console.log('INSERT error: ' + error.message);
  //      });
  //    }, function(error){
  //       console.log('transaction error: '+ error.message);
  //     },function(){
  //        console.log('transaction ok');
  //    });
  //  }

      addChoiceDB(choice,question){
        const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);

        db.transaction(function (tx){
          var query = "INSERT INTO choices (choice) VALUES (?,(SELECT id FROM questions WHERE question = ))";

          tx.executeSql(query,[],function(tx,result){
              console.log('insertId: '+result.insertId);
              console.log('rowsAffected: '+result.rowsAffected);
          },
            function(tx,error){
              console.log('INSERT error: ' + error.message);
          });
        }, function(error){
          console.log('transaction error: '+ error.messaage);
        },function(){
          console.log('transaction ok');
        });
      }

  // deleteDB(){
  //   const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);
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

  //  getData(){
  //     const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);
  //
  //    db.transaction(function(tx){
  //    var query = "SELECT question FROM questions";
  //
  //    tx.executeSql(query,[], function(tx,resultSet){
  //           for (var i = 0; i < resultSet.rows.length; i++) {
  //             console.log(resultSet.rows.item(i));
  //           }
  //
  //    },
  //   function(tx, error){
  //     console.log('SELECT error: '+error.message);
  //   });
  // }, function(error){
  //     console.log('transaction error: ' + error.message);
  // }, function(){
  //     console.log('transaction ok');
  //   });
  // }



  render(){
        const {navigate} = this.props.navigation;

    console.log(this.state,'<--------')
    return (

      <View style={styles.container}>
           <ScrollView>
          {this.state.data.map((survey,i)=> {
            return(
              <View style={styles.container} key={i}>
              <Text style={styles.question} >{survey.question}</Text>
                  {survey.choices.map((ch,c)=>{
                    this.addChoiceDB(ch.choice,survey.choice)
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

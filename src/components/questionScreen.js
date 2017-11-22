import React, { Component } from 'react';

import {Text,TextInput,View,  StyleSheet,Button, Image,  TouchableHighlight,ScrollView} from 'react-native';

import {StackNavigator} from 'react-navigation';

import SQLite from 'react-native-sqlite-storage';

import Swiper from 'react-native-swiper';

const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);

 class QuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:'',
       color:false,
       data:[],
       selectedIndex:0,
          }

          this.getData= this.getData.bind(this);
          this.onPressButton = this.onPressButton.bind(this);
   }

   componentDidMount(){
     console.log(this.state.data,'componentDidMount');
     if(this.state.data == ''){
         this.getData()
     } else {
         console.log('Network request');

          return fetch('http://192.168.1.171:8000/Surveys')
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
     console.log('getData function ');

     var query ='SELECT id,question FROM questions'
     const arrayQuestion=[]
     var secondQuery = 'SELECT choice,question FROM choices'
      var arrayResult=[]
     db.transaction(tx => {

       tx.executeSql(query,[],(tx,resultSet) => {
              for (var i = 0; i < resultSet.rows.length; i++) {
                  const result = resultSet.rows.item(i)
                  arrayQuestion.push(result);
                }
       }),
       tx.executeSql(secondQuery,[],(tx,resultSet) => {
         for (var x = 0; x < arrayQuestion.length; x++) {
            chArray=[]
           for (var i = 0; i < resultSet.rows.length; i++) {
               const result = resultSet.rows.item(i)
               if(arrayQuestion[x].id == result.question){

                      choices ={
                        choice_id: result.question,
                        choice:result.choice
                      }
                       chArray.push(choices)
               }
             }
               info = {
                 id_question: arrayQuestion[x].id,
                 question: arrayQuestion[x].question,
                 choices:chArray
               }
               arrayResult.push(info)

               this.setState({
                 data: arrayResult
               })
           }
         }),
       function(tx, error){
        console.log('SELECT error: '+error.message);
      };
    }, function(error){
        console.log('transaction error: ' + error.message);
    }, function(){
        console.log('transaction ok');
      });
  }


  onPressButton(){
      this.setState({
        selectedIndex:2
      })
      console.log('selected');
  }

  static navigationOptions={
    title:'QUESTIONS'
  }

  render(){
        const {navigate} = this.props.navigation;

    console.log(this.state,'<--------')
    return (
      <Swiper showsButtons={false}
              index={0}
              onIndexChanged={(index)=>this.setState({selectedIndex:index})}>

          {this.state.data.map((survey,i)=> {
            return(

              <View style={styles.container} key={i}>
                <View style={styles.text} >
                  <Text style={styles.question} >{survey.question}</Text>
                </View>
                  {survey.choices=='' ? <TextInput multiline={true}
                                                   style={styles.textInput}
                                                   placeholder='Write your comment here'
                                                   autoGrow={true}
                                                   onChangeText={(val)=>this.setState({value:val})}
                                                 />
                                      : survey.choices.map((ch,c)=>{
                                          return(

                                                  <TouchableHighlight underlayColor='white'
                                                                      key={c}>
                                                    <View style={styles.button}>
                                                      <Text style={styles.buttonText} >{ch.choice}</Text>
                                                    </View>
                                                  </TouchableHighlight>
                                                )
                                            }
                                          )
                                        }
              </View>
                )
              }
            )
          }
      </Swiper>
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
    alignItems:'center',
  },
  backgroundImage:{
    flex:1,
    width:null,
    height:null,
  },
  button:{
    width: 260,
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent:'space-between',
    marginTop:30,
  },
  question: {
    fontSize: 20,
    color: 'black',
    justifyContent:'center',
    alignItems:'center',
    fontWeight:'bold',
  },
  textInput:{
    width:250,
    backgroundColor: '#d9d9d9',
    fontSize: 12,
    color: 'black',
    borderRadius: 10,
    borderStyle:'solid',
    // justifyContent:'center',
    // alignItems:'center',
    // marginTop:10,
    marginBottom:0,
  },
  text:{
    marginTop:50,
    marginBottom:50,
  },
  touchableContainer:{
    justifyContent:'space-between',
  },
})


export default QuestionScreen;

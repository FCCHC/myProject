import React, { Component } from 'react';

import {Text, TextInput, View,  StyleSheet, Button, Image, Dimensions,  TouchableOpacity, Alert} from 'react-native';

import {StackNavigator, NavigationActions} from 'react-navigation';

import SQLite from 'react-native-sqlite-storage';//to save data

import Swiper from 'react-native-swiper';//to swipe every question

import Orientation from 'react-native-orientation';

import RNFetchBlob from 'react-native-fetch-blob'


const db = SQLite.openDatabase({name: 'surveyDB', createFromLocation : '~surveyDB', location:'Library'}, this.openCB,this.errorCB);

 class QuestionScreen extends Component {
   constructor(props){
     super(props);
     this.state ={
       value:'',
       color:false,
       data:[],
       selectedIndex:0,
       answer:[],
       database:false,
       count:1,
       width:window.width,
       height: window.height,
          }

          this.getData= this.getData.bind(this);
          this.onPressButton = this.onPressButton.bind(this);
          this.addQuestionDB = this.addQuestionDB.bind(this);
          this.addChoiceDB = this.addChoiceDB.bind(this);
          this._orientationDidChange = this._orientationDidChange.bind(this);

   }

   _orientationDidChange(orientation){
     console.log('orientation');
     let window = Dimensions.get(window)
     this.setState({
       width:window.width,
       height:window.height
     })
   }

   componentDidMount(){
     console.log(Orientation,'orientation');
     Orientation.addOrientationListener(this._orientationDidChange);

     console.log('componentDidMount');
     if(this.state.database == true){
            this.getData()
     }else{
         console.log('Network request');

          return fetch('http://192.168.1.172:8000/Surveys')
              .then((response)=> {
                return response.json()
              })
              .then((responseJson)=>{
                newData=[]
                responseJson.map((item,i)=>{
                  newData.push(item)
                })

                this.setState({
                  data:newData,
                })
              })
              .then(()=>{
                this.addQuestionDB();
              })
              .then(()=>{
                this.addChoiceDB();
                this.setState({
                  database:true
                })
                console.log(this.state.database,'database');
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



   addQuestionDB(){//add questions to storage

        console.log('addquestionDB');
        const questionData = this.state.data
        questionData.map((quest,q)=>{

          db.transaction((tx)=>{
             var query = "INSERT INTO questions (question,question_id) VALUES (?,?)";

            tx.executeSql(query, [quest.question,quest.id_question],function(tx,result){
               console.log('rowsAffected' + result.rowsAffected);
            },
            function(tx,error){
             console.log('INSERT error: ' + error.message);
            });
          }, function(error){
           console.log('transaction error: '+ error.message);
          },function(){
            console.log('transaction ok');
          });
        })


   }

      addChoiceDB(){//add choices to storage
        console.log('addChoiceDB');
        const datos = this.state.data
        datos.map((item,i)=>{
          const ch = item.choices
          ch.map((option,o)=>{
            db.transaction(function (tx){
            var query ='INSERT INTO choices(choice,question,choice_id) VALUES (?,?,?)'

            tx.executeSql(query,[option.choice,item.id_question,option.choice_id],function(tx,result){
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
          })
        })
      }

   getData(){//get Data saved in the local storage
     console.log('Loading data from local storage ');

     var query ='SELECT question_id,question FROM questions'
     const arrayQuestion=[]
     var secondQuery = 'SELECT choice,question,choice_id FROM choices'
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
                        choice_id: result.choice_id,
                        choice:result.choice
                      }
                       chArray.push(choices)
               }
             }
               info = {
                 id_question: arrayQuestion[x].question_id,
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


  onPressButton(){//function to send answers to server and swipe to next question

      // var cont= this.state.count
      // questionsLength = this.state.data.length
      // const backAction = NavigationActions.back({
      //       key:null
      //     })
      //
      // cont == questionsLength ? Alert.alert('ENCUESTA TERMINADA','Gracias! ',[{text: 'OK', onPress: () => this.props.navigation.dispatch(backAction)}]) : ''
      //


      // RNFetchBlob.fetch('POST','http://192.168.1.172:8000/Answers', {
      //     'Content-Type': 'multipart/form-data',
      // }, [
      //   { name: 'answer_choice', data: String(id)},
      //   { name: 'client_response', data: String(ans)},
      //   { name: 'answer_comment', data : String(text)},
      // ]).then((resp)=>{console.log(resp)
      // }).catch((err) => console.log(err))
      this._swiper.scrollBy(1);
      // this.setState({
      //   count: cont + 1,
      //   value:'',
      // })
  //     console.log(this.state.count);
  //
  //     console.log(this.state.count,this.state.data.length);
   }


  static navigationOptions={
    title:'QUESTIONS',
  }

  render(){
    const {navigate} = this.props.navigation;
    console.log(this.state,'<--------')

    return (
      // <View style={{width: this.state.width, height: this.state.height, position: 'absolute', left: 0, top:0, right: 0, bottom: 0}}>
      // Swiper works when screen is rotated
      <Swiper ref={(Swiper)=>this._swiper=Swiper}
        showsButtons={true}
      >
        {this.renderViews()}
      {/* {this.state.data.map((nQuestion,i)=>{
        return(
          <View style={{width: this.state.width, height: this.state.height, position: 'absolute', left: 0, top:0, right: 0, bottom: 0}} key={i}>
            <View style={styles.text} >
              <Text style={styles.question} >{nQuestion.question}</Text>
            </View>
          </View>
        )
      }
    )} */}


          {/* {this.state.data.map((survey,i)=> {
            console.log(this.state.data);
            return(
              <View style={styles.container} key={i}>
                <View style={styles.text} >
                  <Text style={styles.question} >{survey.question}</Text>
                </View>

                 {survey.choices.map((ch,c)=>{
                        return( ch.choice == ' ' ? <TextInput onSubmitEditing={()=>this.onPressButton()}
                                                             style={styles.textInput}
                                                             placeholder='Escribe tu comentario aquí'
                                                             autoGrow={true}
                                                             onChangeText={(val)=>this.setState({value:val})}
                                                             autoFocus={true}
                                                             underlineColorAndroid='transparent'
                                                             key={c}
                                                             />
                                                : <TouchableOpacity underlayColor='white'
                                                                    key={c}
                                                                    onPress={()=>this.onPressButton()}>
                                                      <View style={styles.button}>
                                                        <Text style={styles.buttonText}>{ch.choice}</Text>
                                                      </View>
                                                    </TouchableOpacity>
                                                  )
                                                }
                                              )
                                            }
              </View>
                )
               }
              )
             }*/}

          </Swiper>
        // </View>
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
    // flex: 1,
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
    backgroundColor: '#d9d9d9',
    justifyContent:'space-between',
    marginTop:30,
    borderColor: '#d9d9d9',
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

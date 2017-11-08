var url='http://192.168.1.40:8000/Surveys/'

export.getSurvey(){
  fetch(url)
    .then((response)=> response.json())
    .then((responseJson)=>{console.log('responseJson',responseJson);})
    .catch((error)=>{
      console.warn(error);
    })
}

export.postSurvey(){
  fetch(url),{
    method:'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      question:'question',
      answer:'answer',
    })
  }
}

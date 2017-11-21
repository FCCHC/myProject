
exports.getSurvey = function() {
  return fetch('http://192.168.1.171:8000/Surveys')
    .then((response)=>
      return response.json())
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

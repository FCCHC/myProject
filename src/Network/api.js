var apiURL = 'http://192.168.1.40:8000/v2/Sucursales/  ';

export.getSucursales = function(){
  fetch(apiURL)
    .then((response) => response.json())
    .then((responseData) => {
       this.setState({
         data: responseData,
         sucursalCount: responseData.length,
       })
    })
    .catch((error) => {
       console.warn(error)
    })
    .done();/
};

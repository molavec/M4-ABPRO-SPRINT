class ConnectionManager {
  
  
  constructor(){
    this.API_URL = 'https://bsite.net/metalflap/';
    this.CURRENT_SUCURSAL = 5;
    // url inicio API
  }

  async getCurrentSucursal() {
    
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const value = await fetch(this.API_URL + "td-sucursal", requestOptions)
    .then(response => response.text())
    .then(result => {
      const sucursales = JSON.parse(result);
      const currentSucursal = sucursales.find((sucursal => (sucursal.id == this.CURRENT_SUCURSAL)))
      // const currentSucursal = result;
      console.log('currentSucursal', currentSucursal)
    })
    .catch(error => console.log('error', error));
  }

}

export default ConnectionManager;
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
      // console.log('currentSucursal', currentSucursal);
      return currentSucursal;
    })
    .catch(error => console.log('error', error));

    return value;
  }

  async getProducts() {
    
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const value = await fetch(this.API_URL + "td-producto", requestOptions)
    .then(response => response.text())
    .then(result => {
      const resultObj = JSON.parse(result);
      console.log('result', result);
      return resultObj;
    })
    .catch(error => console.log('error', error));

    return value;
  }

  async getProductsCurrentSucursal() {
    const allProducts = await this.getProducts();
    const filteredProducts = allProducts.filter((p)=> (p.idSucursal == this.CURRENT_SUCURSAL));
    return filteredProducts;
  }



  

}

export default ConnectionManager;
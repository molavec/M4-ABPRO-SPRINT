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
      // console.log('result', result);
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

  async addProduct(product) {
    const productObj = { 
      nombre: product.getNombre(), 
      precio: parseInt(product.getPrecio()), 
      link: product.getLink(), 
      stock: product.getStock(),         
      etiqueta: product.getEtiqueta(), 
      descripcion: product.getDescripcion(),
      idCategoria: product.getIdCategoria(), 
      idSucursal: product.getIdSucursal(), 
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(productObj);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch("https://bsite.net/metalflap/td-producto", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        return
      })
      .catch(error => console.log('error', error));
  }




  

}

export default ConnectionManager;
class Product {
  constructor(id, nombre, precio, link, stock, etiqueta, descripcion, idCategoria, idSucursal) {
    this.id = id; 
    this.nombre = nombre; 
    this.precio = precio; 
    this.link = link; 
    this.stock = stock;         
    this.etiqueta = etiqueta; 
    this.descripcion = descripcion;
    this.idCategoria = idCategoria; 
    this.idSucursal = idSucursal; 
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getNombre() { return this.nombre; }
  setNombre(nombre) { this.nombre = nombre; }

  getPrecio() { return this.precio; }
  setPrecio(precio) { this.precio = precio; }

  getLink() { return this.link; }
  setLink(link) { this.link = link; }

  getStock() { return this.stock; }
  setStock(stock) { this.stock = stock; }

  getEtiqueta() { return this.etiqueta; }
  setEtiqueta(etiqueta) { this.etiqueta = etiqueta; }

  getDescripcion() { return this.descripcion; }
  setDescripcion(descripcion) { this.descripcion = descripcion; }

  getIdCategoria() { return this.idCategoria; }
  setIdCategoria(idCategoria) { this.idCategoria = idCategoria; }

  getIdSucursal() { return this.idSucursal; }
  setIdSucursal(idSucursal) { this.idSucursal = idSucursal; }

}

export default Product;

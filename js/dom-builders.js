const getStockMessage = (stock) => {
  if(stock == 0) {
   return 'No hay stock';
  } else if (stock == 1) {
    return 'Último disponible';
  } else if (stock <= 3) {
    return `Últimos ${stock} disponibles`;
  } else {
    return '';
  }
};

const getProductListHome = (productList) => {

  const productListHome = productList.map((product) => {

    const getAddToCart = () => {
      if (product.getStock() > 0) {
        return `
          <div class="add-to-cart-box row my-4">
            <div class="box-cantidad col-md-4 pl-2">
              <input class="input-cantidad" type="number" placeholder="cantidad" min="0" value="1"/>
            </div>
            <div class="box-cta col-md-8">
              <button 
                class="add-button btn btn-outline-success btn-sm" 
                info="${JSON.stringify(product).replace(/\"/g, '\'')}" 
                type="button">Añadir</button>
              <button 
                class="added-button btn btn-outline-success btn-sm" 
                type="button" 
                style="display:none;">Añadido</button>
            </div>
          </div>
        `;
      } else {
        return ''
      }
    }

    const productBlock = `
      <div id="${product.getId()}" class="col-sm-3">
        <div class="single-feature">
          <img src="${product.getImage()}" alt="feature image">
          <div class="single-feature-txt text-center">
            <h3><a href="#">${product.getName()}</a></h3>
            <p class="stock-message"> ${getStockMessage(product.getStock())} </p>
            <h5>$${product.getPrice()}</h5>
            <p class="">${product.getId()}</p>
            <p class="text-left">${product.getDescription()}</p>
          </div>

          ${getAddToCart()}
          
        </div>
      </div>
    `;
    return productBlock;
    });

    return productListHome.join('\n');
};

const getProductListCart = (itemList) => {

  const productListCart = itemList.map( (item) => {
      return `

        <li>

          <div class="row">

            <div class="col-4 cart-image-box pt-1">
              <img src="${item.product.getImage()}" class="cart-image" alt="Image ${item.product.getName()}">
            </div>

            <div class="col-8">
              <p class='cart-product-title'><b>${item.product.getName()}</b></p>
              <p class="stock-message"> ${getStockMessage(item.product.getStock())} </p>
              <p style="font-size: 10px;">${item.product.getId()}</p>
              <div class="row cart-info-box">
                <div class="col-4 cart-quantity">
                  <input class="cart-quantity-input pr-0" style="width: 100%" type="number" value=${item.quantity}></input>
                </div>
                <div class="col-8 pl-0">
                  x ${item.product.getPrice()}
                </div>
              </div>
              <div class="cart-cta-box py-2">
                  <button class="cart-refresh pr-2" qty=${item.quantity} uuid="${item.product.getId()}"> Actualizar </button>
                  <button class="cart-remove" qty=${item.quantity} uuid="${item.product.getId()}"> Eliminar </button>
              </div>
            </div>
            
          </div>

        </li>
        <br>

  `
  });
  return productListCart.join('\n');
};

const getProductListRowsAdmin = (productList) => {
  const productListRows = productList.map((product)=>{
    return `
      <tr class="info-row">
        <th class="td-info" scope="row">${product.getNombre()}</th>
        <td class="td-info">${product.getId()}</td>
        <td class="td-info">${product.getPrecio()}</td>
        <td class="td-info">...${product.getLink().substring(product.getLink().length - 10)}</td>
        <td class="td-info">${product.getStock()}</td>
        <td class="td-info">${product.getEtiqueta()}</td>
        <td class="td-info">${product.getDescripcion().substring(product.getDescripcion().length - 10)}...</td>
        <td class="td-info">${product.getIdCategoria()}</td>
        <td class="td-info">${product.getIdSucursal()}</td>
        <td class="td-info"> 
          <button class="edit-product-cta">Editar</button> 
          <button uuid="${product.getId()}" class="delete-product-cta" >Eliminar</button> 
        </td>

        <th class="td-input hide" scope="row">
          <input value="${product.getNombre()}" type="text" class="input-name" placeholder="nombre">
        </th>
				<td class="td-input hide">
          <input value="${product.getId()}" type="text" class="input-id" placeholder="id">
        </td>
				<td class="td-input hide">
          <input value="${product.getPrecio()}" type="text" class="input-description" placeholder="descripcion">
        </td>
				<td class="td-input hide">
          <input value="${product.getLink()}" type="text" class="input-image" placeholder="imagen">
        </td>
				<td class="td-input hide">
          <input value="${product.getStock()}" type="text" class="input-category-id" placeholder="categoria">
        </td>
				<td class="td-input hide">
          <input value="${product.getEtiqueta()}" type="number" class="input-price" placeholder="precio">
        </td>
				<td class="td-input hide">
          <input value="${product.getDescripcion()}" type="number" class="input-stock" placeholder="stock">
        </td>
        <td class="td-input hide">
          <input value="${product.getIdCategoria()}" type="number" class="input-stock" placeholder="stock">
        </td>
        <td class="td-input hide">
          <input value="${product.getIdSucursal()}" type="number" class="input-stock" placeholder="stock">
        </td>
				<td class="td-input hide">
          <button class="save-product-cta">guardar</button>
        </td>
      </tr>
    `;
  })

  
  return productListRows; 
}

export { getProductListHome, getProductListCart,  getProductListRowsAdmin };

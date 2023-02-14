import catalog from "./data/catalog.js";
import categoriesExamples from "./data/categories.js";
import { getProductListHome, getProductListCart, getProductListRowsAdmin } from "./dom-builders.js";

import ConnectionManager from "./class/ConnectionManger.js";

import Product from "./class/product.js";
import Cart from "./class/cart.js";
import Inventory from "./class/inventory.js";
import Category from "./class/category.js";


const cm = new ConnectionManager();


/**
 * Actualiza los totales en el carro
 */
const updateTotals = () => {
	// console.log('updateTotals', cart.getTotal());
	$("#total-neto").html(`$ ${cart.getTotal()}`);
	$("#iva").html(`$ ${cart.getTax()}`);
	$("#total").html(`$ ${cart.getTotal() + cart.getTax()}`);
	$("#shipping").html(`$ ${cart.getShippingCost()}`);
	$("#total-with-shipping").html(`$ ${cart.getTotal() + cart.getTax() + cart.getShippingCost()}`);
}

const updateSucursalName = async () => {
	const currentSucursal = await cm.getCurrentSucursal();
	$('#sucursal-name').html(currentSucursal.nombre);
}

// Crea el objeto inventory.
let products = [];
const inventory = new Inventory(products);

const updateSucursalProducts = async () => {
	const productsFromAPI = await cm.getProductsCurrentSucursal();
	console.log(products);
	// $('#sucursal-name').html(products);

	products = productsFromAPI.map((product) => {
		return new Product(
			product.id, 
			product.nombre, 
			product.precio, 
			product.link, 
			product.stock,         
			product.etiqueta, 
			product.descripcion,
			product.idCategoria, 
			product.idSucursal, 
		);
	});

	// actualizo listado de productos
	inventory.updateProducts(products);

	updateProductRowsInTable();


}



const updateProductRowsInTable = () => {
	
	// --> ADMIN: AÑADIR PRODUCTOS DINÁMINCAMENTE EN LA TABLA
	console.log('inventory.getProducts()', inventory.getProducts());
	$('#product-rows').html(getProductListRowsAdmin(inventory.getProducts()));
	
	// -> ADMIN: Eliminar productos de la lista
	$('.delete-product-cta').click(function () {
		// Eliminar producto del inventario
		const productId = $(this).attr('uuid');
		// console.log('uuid aqui', productId);

		inventory.removeProduct(productId)
		// console.log('products', inventory.getProducts());

		// --> ADMIN: AÑADIR PRODUCTOS DINÁMINCAMENTE EN LA TABLA
		updateProductRowsInTable();

	});


	// -> ADMIN: Editar productos de la lista
	$('.edit-product-cta').click(function () {
		$(this).parent().parent().children('.td-info').hide();
		$(this).parent().parent().children('.td-input').show();
	});

	// -> ADMIN: Guardar productos de la lista
	$('.save-product-cta').click(function () {
		const updateProduct = new Product(
			$(this).parent().parent().children('.td-input').children('.input-id').val(),
			$(this).parent().parent().children('.td-input').children('.input-name').val(),
			$(this).parent().parent().children('.td-input').children('.input-price').val(),
			$(this).parent().parent().children('.td-input').children('.input-image').val(),
			$(this).parent().parent().children('.td-input').children('.input-description').val(),
			$(this).parent().parent().children('.td-input').children('.input-stock').val(),
			$(this).parent().parent().children('.td-input').children('.input-category-id').val(),
			// document.getElementById("input-label-Etiqueta").val()
		)

		// console.log(updateProduct)

		inventory.updateProduct(updateProduct)
		// console.log(inventory.getProducts())

		// --> ADMIN: AÑADIR PRODUCTOS DINÁMINCAMENTE EN LA TABLA
		updateProductRowsInTable();

	});

}

// crea un arreglo de productos a partir de la 'base de datos' del API
updateSucursalProducts();

const categories = categoriesExamples.map((category) => {
	return new Category(category.id, category.name)
});


// Crea el objeto carro.
const cart = new Cart();




// --> MANEJO DEL DOM
$(document).ready(function () {
	"use strict";

	/**===============================
	 * Llenado dinámico de datos
	 ===============================*/

	// Obtengo el valor de la sucursal
	updateSucursalName();

	// --> ADMIN: AÑADIR PRODUCTOS DINÁMINCAMENTE EN LA TABLA
	updateProductRowsInTable();

	/**===============================
	 * Gestión de eventos
	 ===============================*/

	// -> CLICK SHOW INPUT: Accion de mostrar formulario agregar producto.
	$("#new-product-cta").click(function () {
		$("#add-product-admin-box").show();
	});

	// -> CLICK ADD NEW PRODUCT
	$("#save-new-product").click(async function () {

		// obtiendo valores del input
		let inputId = $("#inputId").val();
		let inputNombre = $("#inputNombre").val();
		let inputPrecio = $("#inputPrecio").val();
		let inputLink = $("#inputLink").val();
		let inputStock = $("#inputStock").val();
		let inputEtiqueta = $("#inputEtiqueta").val();
		let inputDescripcion = $("#inputDescripcion").val();
		let inputIdCategoria = $("#inputIdCategoria").val();
		let inputIdSucursal = $("#inputIdSucursal").val();

		// se crea el objeto producto
		const newProduct = new Product(
			inputId,
			inputNombre,
			inputPrecio,
			inputLink,
			inputStock,
			inputEtiqueta,
			inputDescripcion,
			inputIdCategoria,
			inputIdSucursal,
		);

		
		// crea un producto en la bbdd
		await cm.addProduct(newProduct);

		// Agrega producto a inventario
		// inventory.addProduct(newProduct);
		products = await cm.getProductsCurrentSucursal();

		await updateSucursalProducts()
		// console.log('products AQUI', products)
		// inventory.updateProducts(products);
		
		// repintar filas en tabla inventario
		// --> ADMIN: AÑADIR PRODUCTOS DINÁMINCAMENTE EN LA TABLA
		updateProductRowsInTable();

		// Limpia inputs formularios
		inputImg.val('');
		inputName.val('');
		inputCode.val('');
		inputDescription.val('');
		inputPrice.val('');
		inputStock.val('');
		inputCategoryId.val('');

		//esconder formulario nuevo producto
		$("#add-product-admin-box").hide();
		

	});

});


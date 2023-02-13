import catalog from "./data/catalog.js";
import categoriesExamples from "./data/categories.js";
import { getProductListHome, getProductListCart, getProductListRowsAdmin } from "./dom-builders.js";

import ConnectionManager from "./class/ConnectionManger.js";

import Product from "./class/product.js";
import Cart from "./class/cart.js";
import Inventory from "./class/inventory.js";
import Category from "./class/category.js";

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
	const cm = new ConnectionManager();
	const currentSucursal = await cm.getCurrentSucursal();
	$('#sucursal-name').html(currentSucursal.nombre)
}
const updateProductRowsInTable = () => {
	
	// --> ADMIN: AÑADIR PRODUCTOS DINÁMINCAMENTE EN LA TABLA
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

// crea un arreglo de productos a partir de la 'base de datos' catalog.js
export const products = catalog.map((product) => {
	return new Product(
		product.code,
		product.name,
		product.price,
		product.image,
		product.description,
		product.stock,
		product.categoryId,
	);
}
);

const categories = categoriesExamples.map((category) => {
	return new Category(category.id, category.name)
});


// Crea el objeto carro.
const cart = new Cart();

// Crea el objeto inventory.
const inventory = new Inventory(products);


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
	$("#save-new-product").click(function () {

		// obtiendo valores del input
		let inputImg = $("#inputImg")
		let inputName = $("#inputName")
		let inputCode = $("#inputCode")
		let inputDescription = $("#inputDescription")
		let inputPrice = $("#inputPrice")
		let inputStock = $("#inputStock")
		let inputCategoryId = $("#inputCategoryId")

		// se crea el objeto producto
		const newProduct = new Product(
			inputCode.val(),
			inputName.val(),
			inputPrice.val(),
			inputImg.val(),
			inputDescription.val(),
			inputStock.val(),
			inputCategoryId.val(),
		);

		// Agrega producto a inventario
		inventory.addProduct(newProduct);
		console.log('inventaRIO updatedd', inventory.getProducts())

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


// establecer el router
// import express from "express";
// ruta principal es /api/carts
// la ruta raiz POST/ debera crear un nuevo carrito con la siguiente estructura
// Id:Number/String (autoincremental), evitando duplicados y no negativos y autoasignado
// products:Array de productos
// la ruta raiz GET/ debera devolver los productos del carrito con el parametro cid (carrito id)
// la ruta POST /:cid/product/:pid debera agregar el producto al arreglo "products" del carrito seleccionado como un objeto bajo el siguiente formato":
// producto: solo debe conetener el id del producto (NO agregar el objeto completo)
// quantity: debe contener el numero de ejemplares de dicho producto, se agregara de uno en uno, si un producto ya existe en el carrito, solo se aumentara la cantidad

const express = require("express");

const { Router } = express;
const carritosRouter = new Router();

// importamos la clase Container
const ContenedorArchivosCarritos = require("../contenedores/ContenedorArchivosCarritos");
const ContenedorArchivo = require("../contenedores/ContenedorArchivo");

// Se instancia la clase contenedor
const CartService = new ContenedorArchivosCarritos("./db/dbCarritos.json");
const ProductService = new ContenedorArchivo("./db/dbProductos.json");

// Endpoints
carritosRouter.post("/", async (req, res) => {
  res.json(await CartService.newCart());
});

carritosRouter.delete("/:id", async (req, res) => {
  res.json(await CartService.borrar(req.params.id));
});

carritosRouter.get("/:id/products", async (req, res) => {
  res.json(await CartService.listar(parseInt(req.params.id)));
});

carritosRouter.post("/:idCart/:idProduct/products", async (req, res) => {
  const newProduct = await ProductService.listar(req.params.idProduct);
  res.json(
    await CartService.actualizar(newProduct, parseInt(req.params.idCart))
  );
});

carritosRouter.delete("/:idCart/:idProduct/products", async (req, res) => {
  res.json(
    await CartService.borrarProducto(
      parseInt(req.params.idCart),
      parseInt(req.params.idCart)
    )
  );
});

module.exports = carritosRouter;

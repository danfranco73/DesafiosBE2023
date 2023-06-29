// Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
// La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
// Status es true por defecto y stock es 0 por defecto
// Todos los campos son obligatorios, a excepción de thumbnails
// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

// Path: 1-Entrega/src/routes/products.router.js

const express = require("express");

const { Router } = express;
const productsRouter = new Router();

// importamos la clase Container
const ContenedorArchivo = require("../contenedores/ContenedorArchivo");

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("./db/dbProductos.json");

// Endpoints
productsRouter.get("/", async (req, res) => {
  res.json(await ProductService.listar());
}
);

productsRouter.get("/:id", async (req, res) => {
  res.json(await ProductService.listar(req.params.id));
}
);

productsRouter.post("/", async (req, res) => {
    res.json(await ProductService.guardar(req.body));
    }
);

productsRouter.put("/:id", async (req, res) => {
    res.json(await ProductService.actualizar(req.body, req.params.id));
    }
);

productsRouter.delete("/:id", async (req, res) => {
    res.json(await ProductService.borrar(req.params.id));
    }
);

module.exports = productsRouter;


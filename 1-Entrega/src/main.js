// Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:
// Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
//La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
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
// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado
// Para el manejo de carritos, el cual tendrá su router en /api/carts/ , configurar las siguientes rutas:
// La ruta raíz GET / deberá listar todos los carritos de la base. (Incluyendo la limitación ?limit del desafío anterior)
// La ruta GET /:cid deberá traer sólo el carrito con el id proporcionado
// La ruta raíz POST / deberá agregar un nuevo carrito vacío y devolver su id
// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
//quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.
// La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
// No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

// Path: 1-Entrega/src/main.js

const express = require("express");
const app = express();
const productsRouter = express.Router();
const cartsRouter = express.Router();
const PORT = 8080;

// Servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Importamos el contenedor

const ContenedorArchivo = require("./contenedores/ContenedorArchivo");

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("./db/dbProductos.json");

// Endpoints
productsRouter.get("/", async (req, res) => {
  res.json(await ProductService.listar());
});

productsRouter.get("/:id", async (req, res) => {
  res.json(await ProductService.listar(req.params.id));
});

productsRouter.post("/", async (req, res) => {
  res.json(await ProductService.guardar(req.body));
});

productsRouter.put("/:id", async (req, res) => {
  res.json(await ProductService.actualizar(req.params.id, req.body));
});

productsRouter.delete("/:id", async (req, res) => {
  res.json(await ProductService.borrar(req.params.id));
});

// Se exporta el router
module.exports = productsRouter;

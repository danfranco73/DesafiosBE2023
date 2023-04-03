// desarrolar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos
// aspectos a incluir:
// ultilizar la clase product manager que actualmente utilizamos con persistencia de archivos
// desarrollar un servidor express que en su archivo app.js importe el archivo de ProductManager que actualmente utilizamos
// el servidor deve contar con los siguientes endpoints:
// ruta'/products' la cual debe leer el archivo de productos y devolverlos dentro de un objeto json, agregar el soporte para recibir por query param el valor ?limit+ el cual recibira un limite de resultados
// si no se recibe el parametro limit, devolver todos los productos
// si se recibe el parametro limit, devolver la cantidad de productos indicada por el parametro limit
// ruta '/products/:pid' la cual debe recibir por req.params el pid (id del producto) y devolver el producto con ese id
// si no existe el producto con ese id, devolver un objeto json con el mensaje 'producto no encontrado'
// lee archivo con promesas, recuerda usar async await en los endpoints
// utilizar arvchivos que ya tengan productos
// testing: arhivo de productos con al menos 10 productos
// correr el servidor en el puerto 8080
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
// se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.

const express = require("express"); // llamo a express
const app = express(); // creo la app
const ProductManager = require("./ProductManager"); // llamo al archivo ProductManager
const productManager = new ProductManager("sku.json"); // creo una instancia de la clase ProductManager
const PORT = 8080; // creo la variable PORT

app.use(express.json()); // le digo a express que use json
app.use(express.urlencoded({ extended: true })); // le digo a express que use urlencoded

async function getProducts(limit) {
    // creo la funcion getProducts
    try {
        const productos = await productManager.getProducts(); // llamo al metodo getProducts
        if (limit) {
        // si limit es true
        return productos.slice(0, limit); // devuelvo los productos desde el 0 hasta el limite
        } else {
        return productos; // si no devuelvo todos los productos
        }
    } catch (error) {
        console.log(error);
    }
    }

app.get("/products", async (req, res) => {
    // creo el endpoint /products
    try {
        const productos = await getProducts(req.query.limit); // llamo a la funcion getProducts
        res.json(productos); // devuelvo los productos
    } catch (error) {
        console.log(error);
    }
}
);

app.get("/products/:pid", async (req, res) => {
    // creo el endpoint /products/:pid
    try {
        const productos = await getProducts(); // llamo a la funcion getProducts
        const producto = productos.find((p) => p.id == req.params.pid); // busco el producto por su id
        if (producto) {
        // si el producto existe
        res.json(producto); // devuelvo el producto
        } else {
        res.json({ error: "producto no encontrado" }); // si no devuelvo un error
        }
    } catch (error) {
        console.log(error);
    }
}
);

const server = app.listen(PORT, () => {
    // creo el servidor
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
}
);



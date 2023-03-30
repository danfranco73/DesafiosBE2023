// Consigna
// Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
// Aspectos a incluir
// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos para leer y escribir productos. 
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
// El servidor debe contar con los siguientes endpoints:
// ruta ‘/products’, la cual debe leer el archivo de productos  de productos.json y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
// Si no se recibe query de límite, se devolverán todos los productos
// Si se recibe un límite, sólo devolver el número de productos solicitados
// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
// Sugerencias
// Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
// Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 
// Formato del entregable
// Link al repositorio de Github con el proyecto completo, el cual debe incluir:
// carpeta src con app.js dentro y tu ProductManager dentro.
// package.json con la info del proyecto.
// NO INCLUIR LOS node_modules generados.

const express = require('express');
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));

const ProductManager = require('./ProductManager');

const productManager = new ProductManager('productos.txt');

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
    }
);

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const products = await productManager.getProducts();
    const product = products.find(p => p.id == pid);
    res.json(product);
}
);

const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
}
);
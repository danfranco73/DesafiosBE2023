// Consigna
// Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
// Aspectos a incluir
// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
// El servidor debe contar con los siguientes endpoints:
// ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
// Si no se recibe query de límite, se devolverán todos los productos
// Si se recibe un límite, sólo devolver el número de productos solicitados
// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
// Sugerencias
// Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
// Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 


const express = require('express');
const app = express();
const port = 8080;
const ProductManager = require('../ProductManager.js');

const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.send(products);
}
);
app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProduct(pid);
    res.send(product);
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);


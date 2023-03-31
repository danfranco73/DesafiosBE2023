// Manejo de archivos
// Se creará una instancia de la clase “ProductManager”
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
//	Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// 	description:”Este es un producto prueba”
// 	price:200,
// thumbnail:”Sin imagen”
//	code:”abc123”,
// stock:25
//	El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
//	Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
//	Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
//	Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
//	Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir

const ProductManager = require("./ProductManager"); // importo la clase ProductManager

const productManager = new ProductManager("./sku.json"); // creo una instancia de la clase ProductManager y le paso el nombre del archivo donde se guardaran los productos

const fs = require("fs"); // llamo a fs para poder usarlo
const path = require("path"); // llamo a path para poder usarlo


(async () => {
  // verifico si el archivo existe
  try {
    await fs.promises.access(path.resolve("./", "sku.json"));
  } catch (error) {
    await fs.promises.writeFile(
      path.resolve("./", "sku.json"),
      JSON.stringify([], null, 2)
    );
  }
})();


    (async () => {
  // creo una funcion asyncrona
  const productos = await productManager.getProducts(); // llamo al metodo getProducts
  console.log(productos);
  console.log(" No hay Productos"); // verifico que no hay productos

  const id = await productManager.addProduct({
    // llamo al metodo addProduct
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "url imagen",
    code: "abc123",
    stock: 25,
  });
  console.log(id);

  const productos2 = await productManager.getProducts(); // llamo al metodo getProducts
  console.log(productos2);
  console.log(" Verifico el producto agregado");

  const producto = await productManager.getProductById(1); // llamo al metodo getProductById
  console.log(producto);
  console.log("Verifico el producto con el id 1");

  const productoActualizado = await productManager.updateProduct(1, {
    // llamo al metodo updateProduct
    title: "producto prueba Modificado", // cambio el titulo
    description: "Este es un producto prueba",
    price: 600, // cambio el precio
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 20, // cambio el stock
  });
  console.log(productoActualizado);
  console.log("Producto modificado");

  const productoEliminado = await productManager.deleteProduct(1); // llamo al metodo deleteProduct y le paso el id del producto a eliminar
  console.log(productoEliminado);
  console.log(" Producto eliminado");
})();



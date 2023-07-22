// Realizar una clase de nombre “ProductManager”  y manejarlo en persistencia de archivos (utilizar el módulo fs de node.js). Para ello, se debe crear un archivo llamado ProductManager.js, el cual debe exportar una clase llamada ProductManager. Esta clase debe tener los siguientes métodos:
// La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
// Debe guardar objetos con el siguiente formato: id (se debe incrementar automáticamente, no enviarse desde el cuerpo), title, price, thumbnail, code, stock
// Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo)
// Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
// Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
// Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
// Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
// Formato del entregable
// Archivo de javascript con el nombre ProductManager.js

const fs = require("fs"); // llamo a fs para poder usarlo
const path = require("path"); // llamo a path para poder usarlo

class ProductManager {
  // creo la clase ProductManager
  constructor(path, producto) {
    // creo el constructor
    this.path = path; // creo la variable path
    this.producto = producto; // creo la variable productos
  }

  producto = []; // creo el array productos vacio

  async addProduct(producto) {
    // creo el metodo addProduct
    try {
      const productos = await this.getProducts(); // llamo al metodo getProducts
      if (productos.length === 0) {
        // si el array esta vacio le asigno el id 1
        producto.id += 1;
      } else {
        producto.id = productos[productos.length - 1].id + 1; // si no le asigno el id del ultimo producto + 1
      }
      productos.push(producto);
      await fs.promises.writeFile(
        // escribo en el archivo
        path.resolve("./", this.path), // le paso la ruta y el nombre del archivo
        JSON.stringify(productos, null, 2) // le paso el contenido del archivo
      );
      return producto.id;
    } catch (error) {
      // si hay un error lo muestro por consola
      console.log(error);
    }
  }

  async getProducts() {
    // creo el metodo getProducts
    try {
      const contenido = await fs.promises.readFile(
        path.resolve("./", this.path),
        "utf-8"
      );
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const productos = await this.getProducts();
      const producto = productos.find((producto) => producto.id === id);
      return producto;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, producto) {
    try {
      const productos = await this.getProducts();
      const index = productos.findIndex((producto) => producto.id === id);
      productos[index] = producto;
      await fs.promises.writeFile(
        // escribo en el archivo
        path.resolve("./", this.path), // le paso la ruta y el nombre del archivo
        JSON.stringify(productos, null, 2) // le paso el contenido del archivo actualizado
      );
      return producto; // devuelvo el producto actualizado
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productos = await this.getProducts();
      const productosFiltrados = productos.filter(
        (producto) => producto.id !== id
      );
      await fs.promises.writeFile(
        path.resolve("./", this.path),
        JSON.stringify(productosFiltrados, null, 2)
      );
      return productosFiltrados;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager; // exporto la clase ProductManager

// create a class ProductManager to manage a set of products
class ProductManager {
  // initialize the array of products in the constructor method empty
  constructor() {
    this.products = [];
  }
  // add a product to the initial array of products with the following properties: title, description, price, thumbnail, code, stock
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      // the id of the product is the length of the array of products plus 1
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    // check the code parameter is not yet in the array of products and if it is, show an error message
    if (this.products.find((product) => product.code === code)) {
      console.log("El codigo ya existe");
    } else {
      // check all parameters are not empty using object destructuring
      if (Object.values(product).every((value) => value)) {
        this.products.push(product);
      } else {
        // if any parameter is empty, show an error message
        console.log("Es necesario completar todos los campos");
      }
    }
  }
  // return the array of products with the method getProducts
  getProducts() {
    return this.products;
  }
  // return the product with the id passed as parameter with the method getProductById
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      // if the id does not exist, show an error message
      console.log("El producto no existe");
    }
  }
}

// testing
// create a new instance of the class ProductManager
const productManager = new ProductManager();
// add some products
productManager.addProduct(
  "Yerba",
  "Con Palo",
  1145,
  "https://www.molinos.com.ar/wp-content/uploads/2020/06/noblezagaucha1kg.png.webp",
  1,
  120
);
productManager.addProduct(
  "Harina",
  "Leudante",
  1400,
  "https://www.molinos.com.ar/wp-content/uploads/2020/06/blancaLeudante_producto-1.png.webp",
  // the code 1 is already in the array of products, so it will show an error message
  1,
  150
);
productManager.addProduct(
  "Fideos",
  "Semolados",
  950,
  "https://www.molinos.com.ar/wp-content/uploads/2020/05/mostachol_productos.jpg.webp",
  2,
  14
);
productManager.addProduct(
  "Arroz",
  "Largo Fino",
  850,
  "https://www.molinos.com.ar/wp-content/uploads/2020/06/gallo-oro_producto.png.webp",
  3,
  25
);

// show the array of products
console.log(productManager.getProducts());

// show the product with the id 1 and 3
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));

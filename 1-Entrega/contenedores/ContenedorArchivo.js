// se crea la clase contenedor
const fs = require("fs");
const path = require("path");

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
        this.id = 0;
        this.data = [];
    }
    
    async save() {
        try {
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.data, null, 2));
        } catch (error) {
        console.log("Error al guardar el archivo", error);
        }
    }
    
    async getAll() {
        try {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        this.data = JSON.parse(data);
        return this.data;
        } catch (error) {
        console.log("Error al leer el archivo", error);
        }
    }
    
    async getById(id) {
        try {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        this.data = JSON.parse(data);
        const product = this.data.find((product) => product.id === id);
        return product;
        } catch (error) {
        console.log("Error al leer el archivo", error);
        }
    }
    
    async deleteById(id) {
        try {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        this.data = JSON.parse(data);
        const product = this.data.find((product) => product.id === id);
        const index = this.data.indexOf(product);
        this.data.splice(index, 1);
        await this.save();
        return product;
        } catch (error) {
        console.log("Error al leer el archivo", error);
        }
    }
    
    async deleteAll() {
        try {
        this.data = [];
        await this.save();
        return this.data;
        } catch (error) {
        console.log("Error al leer el archivo", error);
        }
    }
    
    async saveProduct(product) {
        try {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        this.data = JSON.parse(data);
        this.id = this.data.length + 1;
        product.id = this.id;
        this.data.push(product);
        await this.save();
        return product;
        } catch (error) {
        console.log("Error al leer el archivo", error);
        }
    }
    
    async updateProduct(id, product) {
        try {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        this.data = JSON.parse(data);
        const productToUpdate = this.data.find((product) => product.id === id);
        const index = this.data.indexOf(productToUpdate);
        this.data[index] = product;
        await this.save();
        return product;
        } catch (error) {
        console.log("Error al leer el archivo", error);
        }
    }
}

module.exports = ContenedorArchivo;
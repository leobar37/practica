const NAME_ITEM = "products";
// const IMAGES_BAS = "IMAGES";
const COMPRAS_BAS = "compras";
class ProductcApi {
    constructor() {}

    static AddProduct(prduct) {
        let products = this.getProducts();
        products.push(prduct);
        this.saveProducts(products);
    }
    static saveProducts(products) {
        let prodString = JSON.stringify(products);
        localStorage.setItem(NAME_ITEM, prodString);
    }
    static getProducts() {
        let products;
        if (localStorage.getItem(NAME_ITEM)) {
            products = JSON.parse(localStorage.getItem(NAME_ITEM));
        } else {
            products = [];
        }
        return products;
    }
    static deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(product => product.id != id);
        localStorage.removeItem(NAME_ITEM);
        this.saveProducts(products);
    }

    static generateId() {
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = "";
        for (let i = 0; i < 10; i++) {
            let ram = Math.floor(Math.random() * letters.length);
            id += letters.charAt(ram);
        }
        if (this.searchForId(id)) {
            this.id = this.generateId();
        }
        return id;
    }
    static searchForId(id) {
        let products = this.getProducts();
        let product = products.find(product => product.id == id);
        return product ? product : false;
    }
    static editProduct(id, product) {
        product.id = id;
        this.deleteProduct(id);
        this.AddProduct(product);
    }
    static getImages() {
        return [
            "reloj.jpg",
            "zapatilla2.jpg",
            "zapatillas.jpg",
            "reloj.jpg",
            "zapatilla2.jpg",
            "zapatillas.jpg"
        ]
    }
}

class Compra {
    nombre;
    email;
    productos;
    fecha;
    constructor(nombre, email, productos) {
        this.nombre = nombre;
        this.email = email;
        this.fecha = new Date();
        this.productos = productos;

    }
    static addCompra(compra) {
        let compras = this.getCompras();
        compras.push(compra);
        localStorage.setItem(COMPRAS_BAS, JSON.stringify(compras));
    }

    static getCompras() {
        let compras = [];
        if (localStorage.getItem(COMPRAS_BAS)) {
            compras = JSON.parse(localStorage.getItem(COMPRAS_BAS));
        };

        return compras;
    }
}

class Product {
    id;
    name;
    price;
    image;
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = ProductcApi.generateId();
    }
}
import fs from "fs";

class ProductManager {
    constructor() {
        this.path = './Products.json';
    }

    async #getNewId() {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(fileContent);
            if (products.length == 0) {
                return 1;
            } else {
                let lastProduct = products[products.length - 1];
                return lastProduct.id + 1;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(fileContent);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        let newProduct = {
            id: await this.#getNewId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        }

        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(fileContent);
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(fileContent);
            let result = products.find(elem => elem.id == id);
            if (result === undefined) {
                return false;
            } else {
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(fileContent);

            let productIndex = products.findIndex(product => product.id == id);

            if (productIndex === -1) {
                return false
            } else {
                products[productIndex].title = updatedProduct.title;
                products[productIndex].description = updatedProduct.description;
                products[productIndex].code = updatedProduct.code;
                products[productIndex].price = updatedProduct.price;
                products[productIndex].status = updatedProduct.status;
                products[productIndex].stock = updatedProduct.stock;
                products[productIndex].category = updatedProduct.category;
                products[productIndex].thumbnail = updatedProduct.thumbnail;

                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(fileContent);
            let productIndex = products.findIndex(product => product.id == id);

            if (productIndex === -1) {
                return false
            } else {
                let productsUpdated = products.filter(product => product.id != id);
                products = productsUpdated;
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return true
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager;
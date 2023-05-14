import fs from "fs";

class CartManager {
    constructor() {
        this.path = "./Carts.json"
    }

    async #getNewId() {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let carts = JSON.parse(fileContent);
            if (carts.length == 0) {
                return 1;
            } else {
                let lastCart = carts[carts.length - 1];
                return lastCart.id + 1;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addCart() {
        let newCart = {
            id: await this.#getNewId(),  
            products: []
        }

        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let carts = JSON.parse(fileContent);
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
        } catch (error) {
            console.log(error);
        }
    }

    async getCart(id) {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let carts = JSON.parse(fileContent);

            let cart = carts.find(elem => elem.id == id);

            if (cart === undefined) {
                return false;
            } else {
                return cart.products;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            let fileContent = await fs.promises.readFile(this.path, "utf-8");
            let carts = JSON.parse(fileContent);

            let cartIndex = carts.findIndex(elem => elem.id == cartId);
            if (cartIndex === -1) {
                return false
            } else {
                let cart = carts[cartIndex];
                let productIndex = cart.products.findIndex(elem => elem.id == productId);
                
                if (productIndex === -1) {
                    cart.products.push({
                        id: productId,
                        quantity: 1
                    })
                } else {
                    cart.products[productIndex].quantity += 1;
                }

                await fs.promises.writeFile(this.path, JSON.stringify(carts));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager;
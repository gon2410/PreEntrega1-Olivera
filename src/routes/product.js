import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productRouter = Router();
const manager = new ProductManager();

productRouter.get("/", async (req, res) => {
    let { limit } = req.query;
    let products = await manager.getProducts();
    res.send(products.slice(0, limit));
})

productRouter.get("/:pid", async (req, res) => {
    let product = await manager.getProductById(req.params.pid);
    if (product === false) {
        res.status(400).send({status: "Error", error: "Product not found."})
    } else {
        res.send(product);
    }
})

productRouter.post("/", async (req, res) => {
    let product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
        res.status(400).send({status: "Error", error: "Invalid parameter."})
    } else {
        await manager.addProduct(product.title, product.description, product.code, product.price, product.status, product.stock, product.category, product.thumbnail);
        res.send({status: "success", payload: product});
    }
})

productRouter.put("/:pid", async (req, res) => {
    let id = req.params.pid;
    let updatedProduct = req.body;
    if (!updatedProduct.title || !updatedProduct.description || !updatedProduct.code || !updatedProduct.price || !updatedProduct.status || !updatedProduct.stock || !updatedProduct.category) {
        res.status(400).send({status: "Error", error: "Invalid parameter."})
    } else {
        let result = await manager.updateProduct(id, updatedProduct);
        if (result === false) {
            res.status(400).send({status: "Error", error: "Product not found."})
        } else {
            res.send({status: "success", payload: updatedProduct, msg: `Product with id: ${id} updated successfully.`})
        }
    }
})

productRouter.delete("/:pid", async (req, res) => {
    let id = req.params.pid;
    let result = await manager.deleteProduct(id);
    
    if (result === false) {
        res.status(400).send({status: "Error", error: "Product not found."})
    } else {
        res.send({status: "success", msg: `Product with id: ${id} deleted successfully.`})
    }
})

export default productRouter;
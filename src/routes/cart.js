import { Router } from "express";
import CartManager from "../CartManager.js";

const cartRouter = Router();
const manager = new CartManager();

cartRouter.post("/", async (req, res) => {
    await manager.addCart();
    res.send({status: "success", msg: "Cart created successfully."})
})

cartRouter.get("/:cid", async (req, res) => {
    let id = req.params.cid;
    let result = await manager.getCart(id);

    if (result === false) {
        res.status(400).send({status: "Error", error: "Cart not found."})
    } else {
        res.send(result);
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let result = await manager.addProductToCart(cartId, productId);

    if (result === false) {
        res.status(400).send({status: "Error", error: "Cart not found."})
    } else {
        res.send({status: "success", msg: `Product with id:${productId} added to cart: ${cartId} successfully.`});
    }
})



export default cartRouter;
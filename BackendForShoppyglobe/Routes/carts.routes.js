import express from "express";
import { authenticateToken } from "../Middlewere/auth.js";
import { addToCart, getCartItems, removeCartItem, updateCartItem } from "../Controllers/carts.controller.js";


const router = express.Router();

router.post("/cart", authenticateToken,addToCart);
router.get("/cart",authenticateToken,getCartItems);
router.put("/cart/:productId",authenticateToken,updateCartItem);
router.delete("/cart/:productId",authenticateToken,removeCartItem);



export default router;
import express from "express";
import { createProduct, getAllProducts, getProductById } from "../Controllers/products.controller.js";


const router = express.Router();

router.get("/products",getAllProducts);
router.get("/products/:id",getProductById);
router.post("/products",createProduct);

export default router;
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productRoutes from "./Routes/products.routes.js";
import cartRoutes from "./Routes/auth.routes.js";
import authRoutes from "./Routes/carts.routes.js";

dotenv.config();

const app = express();
app.use(express.json());


const port = 3000;


// using routes product relate, cart related and authentication related
app.use(productRoutes);
app.use(cartRoutes);
app.use(authRoutes);

//connet to mongodb
mongoose.connect("mongodb://localhost:27017/shoppy_db");

const db = mongoose.connection;
db.on("open", () => {
              console.log("Connection is successfull.");
});

db.on("error", () => {
  console.log("Connection is not succesful");
});


// start server
app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});     

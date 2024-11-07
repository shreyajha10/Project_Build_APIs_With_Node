import express from "express";

import { register, login } from "../Controllers/auth.controller.js";

const router = express.Router();

// For User Registration
router.post("/register", register);

//For User Login
router.post("/login", login);

export default router;

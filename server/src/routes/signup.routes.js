// src/routes/signup.routes.js
import express from "express";
import { signupController } from "../controllers/signup.controller.js";  // Import du contrôleur pour l'inscription

const router = express.Router();

// Routes publiques

router.post("/signup", signupController);  // Inscription d'un utilisateur

export default router;

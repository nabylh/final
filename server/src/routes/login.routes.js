import express from "express";
import { loginController } from "../controllers/login.controller.js";
// import withAdminAuth from "../middlewares/withAdminAuth.js"; // Middleware pour l'authentification des admins

const router = express.Router();

// Routes publiques

router.post("/login", loginController);  // Connexion d'utilisateur

// Routes protégées (exemple si vous avez des fonctionnalités pour les admins)
// router.get("/admin", withAdminAuth, (req, res) => {
//   res.json({ message: "Accès réservé aux administrateurs" });
// });

export default router;




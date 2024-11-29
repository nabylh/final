


import express from "express";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import { login, logout, signup } from "../controllers/auth.controller.js";
// import withAdminAuth from "../middlewares/withAdminAuth.js"; // Exemple de middleware pour les admins

const router = express.Router();

// Routes publiques
router.post("/login", login); // Connexion d'utilisateur
router.post("/logout", logout); // Déconnexion d'utilisateur
router.post("/signup", signup); // Inscription d'utilisateur

// Routes protégées pour les administrateurs (exemple)
router.get("/dashboard", withAdminAuth , (req, res) => {
  res.json({ message: "Bienvenue sur le tableau de bord, admin !" });
});
export default router;

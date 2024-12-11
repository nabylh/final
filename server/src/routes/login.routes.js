import express from "express";
import { loginController } from "../controllers/login.controller.js";
import withAdminAuth from "../middlewares/withAdminAuth.js"; 

const router = express.Router();


router.post("/login", loginController);  


router.get("/dashboard", withAdminAuth, (req, res) => {
  res.json({ message: "Bienvenue sur le tableau de bord administrateur !" });
});

export default router;

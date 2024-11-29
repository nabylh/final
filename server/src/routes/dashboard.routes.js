import express from "express";
import withAdminAuth from "../middlewares/withAdminAuth.js"; // Importation du middleware
import {
    // getAllUsersController,
    // getUserByIdController,
    // createUserController,
    // updateUserController,
    // deleteUserController,
    // getAllArticlesController,
    // getArticleByIdController,
    // createArticleController,
    // updateArticleController,
    // deleteArticleController
} from "../controllers/dashboard.controller.js";

const router = express.Router();

// Appliquer le middleware à toutes les routes pour les utilisateurs et articles
router.use("/dashboard",withAdminAuth);

// // Routes pour la gestion des utilisateurs
// router.get("/users", getAllUsersController);
// router.get("/users/:id", getUserByIdController);
// router.post("/users", createUserController);
// router.put("/users/:id", updateUserController);
// router.delete("/users/:id", deleteUserController);

// // Routes pour la gestion des articles
// router.get("/articles", getAllArticlesController);
// router.get("/articles/:id", getArticleByIdController);
// router.post("/articles", createArticleController);
// router.put("/articles/:id", updateArticleController);
// router.delete("/articles/:id", deleteArticleController);

export default router;

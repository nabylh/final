// src/controllers/dashboard.controller.js
import Dashboard from "../models/Dashboard.js";

// Récupérer tous les utilisateurs
const getAllUsersController = async (req, res) => {
    try {
        const users = await Dashboard.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par ID
const getUserByIdController = async (req, res) => {
    try {
        const user = await Dashboard.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel utilisateur
const createUserController = async (req, res) => {
    try {
        const { pseudo, email, password, role } = req.body;
        const newUser = await Dashboard.createUser({ pseudo, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
const updateUserController = async (req, res) => {
    try {
        const { pseudo, email, role } = req.body;
        const updatedUser = await Dashboard.updateUser(req.params.id, { pseudo, email, role });
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un utilisateur
const deleteUserController = async (req, res) => {
    try {
        const result = await Dashboard.deleteUser(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer tous les articles
const getAllArticlesController = async (req, res) => {
    try {
        const articles = await Dashboard.getAllArticles();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un article par ID
const getArticleByIdController = async (req, res) => {
    try {
        const article = await Dashboard.getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel article
const createArticleController = async (req, res) => {
    try {
        const { title, content, source, undercategoryId } = req.body;
        const newArticle = await Dashboard.createArticle({ title, content, source, undercategoryId });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un article
const updateArticleController = async (req, res) => {
    try {
        const { title, content, source, undercategoryId } = req.body;
        const updatedArticle = await Dashboard.updateArticle(req.params.id, { title, content, source, undercategoryId });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un article
const deleteArticleController = async (req, res) => {
    try {
        const result = await Dashboard.deleteArticle(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController,
    getAllArticlesController,
    getArticleByIdController,
    createArticleController,
    updateArticleController,
    deleteArticleController
};

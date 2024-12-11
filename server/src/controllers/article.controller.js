// src/controllers/articleController.js

import Article from "../models/Article.js";

// Récupérer tous les articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer des articles par nom 
const getArticlesByName = async (req, res) => {
    try {
        const articles = await Article.findByName(req.params.name);
        if (articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé avec ce nom" });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer les articles par nom de sous-catégorie
const getArticlesByUndercategoryName = async (req, res) => {
    try {
        const undercategoryName = req.params.name;
        const articles = await Article.findByUndercategoryName(undercategoryName);
        
        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé pour cette sous-catégorie" });
        }
        
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer des articles par nom de catégorie
const getArticlesByCategoryName = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const category = await Category.findByName(categoryName);
        
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        
        const articles = await Article.findByCategoryId(category.id);
        
        if (articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé dans cette catégorie" });
        }
        
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel article
const createArticle = async (req, res) => {
    try {
        const {
            title, content,source,created_at,underCategory_id, undercategory_name, category_name, image_url } = req.body;
        const newArticle = await Article.create({  title, content, source, created_at, underCategory_id, undercategory_name, category_name,image_url });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un article
const updateArticle = async (req, res) => {
    try {
        const {title, content, source, created_at, underCategory_id, undercategory_name,category_name, image_url } = req.body;
        const updatedArticle = await Article.update({ title, content, source, created_at, underCategory_id, undercategory_name,category_name,
            image_url }, req.params.id);
        
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un article
const deleteArticle = async (req, res) => {
    try {
        const result = await Article.remove(req.params.id);
        
        if (!result) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        
        res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
    getAllArticles, 
    getArticlesByName, 
    createArticle, 
    updateArticle, 
    deleteArticle,
    getArticlesByUndercategoryName,
    getArticlesByCategoryName
};





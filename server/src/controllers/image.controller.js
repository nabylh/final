// src/controllers/image.controller.js
import Image from "../models/Image.js";

// Récupérer toutes les images
const getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une image par ID
const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image non trouvée" });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer les images par article_id
const getImagesByArticleId = async (req, res) => {
    try {
        const images = await Image.findByArticleId(req.params.article_id);
        if (images.length === 0) {
            return res.status(404).json({ message: "Aucune image trouvée pour cet article" });
        }
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer une nouvelle image
const createImage = async (req, res) => {
    try {
        const { url, description, article_id, file_name, file_path } = req.body;
        const newImage = await Image.create({ url, description, article_id, file_name, file_path });
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une image
const updateImage = async (req, res) => {
    try {
        const { url, description, article_id, file_name, file_path } = req.body;
        const updatedImage = await Image.update(
            { url, description, article_id, file_name, file_path },
            req.params.id
        );
        if (!updatedImage) {
            return res.status(404).json({ message: "Image non trouvée" });
        }
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une image
const deleteImage = async (req, res) => {
    try {
        const result = await Image.remove(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Image non trouvée" });
        }
        res.status(200).json({ message: "Image supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllImages,
    getImageById,
    getImagesByArticleId,
    createImage,
    updateImage,
    deleteImage
};
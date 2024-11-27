// src/controllers/undercategoryController.js
import Undercategory from "../models/Undercategory.js";

// Récupérer toutes les sous-catégories
const getAllUndercategories = async (req, res) => {
    try {
        const undercategories = await Undercategory.findAll();
        res.status(200).json(undercategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Récupérer une sous-catégorie par nom
const getUndercategoryByName = async (req, res) => {
    try {
        const undercategory = await Undercategory.findByName(req.params.name);
        if (!undercategory) {
            return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        }
        res.status(200).json(undercategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { 
    getAllUndercategories, 
    getUndercategoryByName, 
};





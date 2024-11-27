import express from 'express';
import {
    getAllUndercategories,
    getUndercategoryByName,
    
} from '../controllers/undercategory.controller.js';

const router = express.Router();

// Route pour récupérer toutes les sous-catégories
router.get('/', getAllUndercategories);


// Route pour récupérer une sous-catégorie par nom
router.get('/:name', getUndercategoryByName);




// Route pour ajouter une sous-categorie
// Route pour modifier une sous-categorie
// Route pour supprimer une sous-categorie




export default router;


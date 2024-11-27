// src/routes/category.routes.js

import express from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory,getCategoryByName,getUndercategoriesByCategoryName, getCategoryBy_Name } from '../controllers/category.controller.js';
import withAdminAuth from '../middlewares/withAdminAuth.js';

const router = express.Router();

// Routes publiques (PAS de middleware)
router.get('/', getAllCategories); // Récupérer toutes les catégories
router.get('/:name', getCategoryByName); // Récupérer une catégorie par le nom
router.get('/:name/undercategory', getUndercategoriesByCategoryName);
router.get('/category/:name', getCategoryBy_Name);




// Routes protégées (avec withAdminAuth) pour la création, la modification et la suppression des catégories
router.post('/', withAdminAuth, createCategory); // Créer une nouvelle catégorie
router.put('/:id', withAdminAuth, updateCategory); // Mettre à jour une catégorie existante
router.delete('/:id', withAdminAuth, deleteCategory); // Supprimer une catégorie

export default router;




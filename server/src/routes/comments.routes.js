import express from 'express';
import { 
    getAllComments, 
    getCommentsByArticle, 
    createComment, 
    updateComment, 
    deleteComment }
from '../controllers/comments.controller.js';
import withAuth from '../middlewares/withAuth.js'; // Si tu as besoin d'une authentification pour certaines routes

const router = express.Router();

// Routes publiques
router.get('/', getAllComments); // Obtenir tous les commentaires

router.get('/article/:articleId', getCommentsByArticle); // Obtenir les commentaires d'un article spécifique

// Routes protégées
router.post('/comments', withAuth, createComment); // Créer un commentaire (authentifié si nécessaire)
router.put('/:id', withAuth, updateComment); // Mettre à jour un commentaire (authentifié si nécessaire)
router.delete('/:id', withAuth, deleteComment); // Supprimer un commentaire (authentifié si nécessaire)

export default router;

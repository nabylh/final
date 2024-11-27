import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    getUserByPseudo, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controller.js';
import withAdminAuth from '../middlewares/withAdminAuth.js';

const router = express.Router();

// Routes publiques
router.get('/', getAllUsers); // Récupérer tous les utilisateurs
router.get('/:id', getUserById); // Récupérer un utilisateur par son ID
router.get('/pseudo/:pseudo', getUserByPseudo); // Récupérer un utilisateur par son pseudo

// Routes protégées (administrateurs uniquement)
router.post('/', withAdminAuth, createUser); // Créer un utilisateur
router.put('/:id', withAdminAuth, updateUser); // Mettre à jour un utilisateur
router.delete('/:id', withAdminAuth, deleteUser); // Supprimer un utilisateur

export default router;

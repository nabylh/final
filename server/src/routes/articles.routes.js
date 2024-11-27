import express from 'express';
import { 
    getAllArticles, 
    getArticlesByName, 
    createArticle, 
    updateArticle, 
    deleteArticle, 
    getArticlesByUndercategoryName,
    getArticlesByCategoryName,
} from '../controllers/article.controller.js'; 
import withAdminAuth from '../middlewares/withAdminAuth.js'; 

const router = express.Router();

// Routes publiques
router.get('/', getAllArticles);

router.get('/name/:name', getArticlesByName);
router.get('/undercategory/:name', getArticlesByUndercategoryName);
router.get('/category/:name', getArticlesByCategoryName);


// Routes protégées
router.post('/', withAdminAuth, createArticle);
router.put('/:id', withAdminAuth, updateArticle);
router.delete('/:id', withAdminAuth, deleteArticle);

export default router;



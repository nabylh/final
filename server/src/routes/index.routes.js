import express from 'express';
import articleRoutes from './articles.routes.js';
import categoryRoutes from './category.routes.js';
import imageRoutes from './images.routes.js';
import undercategoryRoutes from './undercategory.routes.js';
import loginRoutes from './login.routes.js';
import SignupRoutes from './signup.routes.js';
import UserRoutes from './user.routes.js';



const router = express.Router();

//  les routes principales de mon blog
router.use('/article', articleRoutes);       
router.use('/category', categoryRoutes);    
router.use('/image', imageRoutes);           
router.use('/undercategory', undercategoryRoutes); 
router.use('/login', loginRoutes);
router.use('/signup', SignupRoutes);
router.use('/user', UserRoutes);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'test de connexion OK' });
});


export default router;


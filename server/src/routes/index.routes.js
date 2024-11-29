import express from 'express';
import articleRoutes from './articles.routes.js';
import categoryRoutes from './category.routes.js';
import imageRoutes from './images.routes.js';
import undercategoryRoutes from './undercategory.routes.js';
import loginRoutes from './login.routes.js';
import signupRoutes from './signup.routes.js';
import userRoutes from './user.routes.js';
import dashboardRoutes from "./dashboard.routes.js";
import withAdminAuth from '../middlewares/withAdminAuth.js'; // Importation du middleware
import logoutRoutes from  "./logout.routes.js";
const router = express.Router();

//  les routes principales de mon blog
router.use('/article', articleRoutes);
router.use('/category', categoryRoutes);
router.use('/image', imageRoutes);
router.use('/undercategory', undercategoryRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/user', userRoutes);
router.use("/logout",logoutRoutes);

// Application du middleware pour protéger la route /dashboard
router.use('/dashboard', withAdminAuth, dashboardRoutes);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'test de connexion OK' });
});

export default router;

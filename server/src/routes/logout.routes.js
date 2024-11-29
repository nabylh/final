// routes/logout.routes.js
import express from 'express';
import { logout } from '../controllers/logout.controller.js';

const router = express.Router();

// Route de déconnexion
router.post('/logout', logout);

export default router;

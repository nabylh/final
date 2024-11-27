import express from 'express';
import { getAllImages,}
from '../controllers/image.controller.js';

const router = express.Router();


router.get('/', getAllImages);

export default router;



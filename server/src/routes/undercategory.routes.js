import express from 'express';
import {
    getAllUndercategories,
    getUndercategoryByName,
    
} from '../controllers/undercategory.controller.js';

const router = express.Router();


router.get('/', getAllUndercategories);



router.get('/:name', getUndercategoryByName);








export default router;


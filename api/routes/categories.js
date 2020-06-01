const express =require('express');
const router = express.Router();

const {
    getAllCategories,
    createCategories,
    getCategory,
    updateCategories,
    deleteCategories
} = require('../controllers/categories');

router.get('/',getAllCategories)
router.post('/',createCategories)
router.get('/:CategoriesID',getCategory)
router.patch('/:CategoriesID',updateCategories)
router.delete('/:CategoriesID',deleteCategories)

module.exports = router;
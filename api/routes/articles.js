const express =require('express');
const router = express.Router();

const upload = require('../middlewares/upload');
const checkAuth= require('../middlewares/checkAuth')

const {
    getAllArticles,
    createArticles,
    getArticle,
    updateArticles,
    deleteArticles
} = require('../controllers/articles');

router.get('/',getAllArticles);
router.get('/:articleID',getArticle)

router.post('/',checkAuth ,upload.single('image') ,createArticles);
router.patch('/:articleID',checkAuth  ,updateArticles);
router.delete('/:articleID',checkAuth ,deleteArticles);

module.exports = router;

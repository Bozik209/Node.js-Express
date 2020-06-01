const mongoose = require('mongoose')
const Article = require('../models/articles');
const Category = require('../models/category')

module.exports = {
    // GetAll
    getAllArticles: (req, res) => {
        Article.find().populate('categoryId', 'title').then((article) => {
            res.status('200').json({
                article
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    //Create
    createArticles: (req, res) => {
        
        const { path: image } = req.file; 
        const { title, description, content, categoryId } = req.body;

        Category.findById(categoryId).then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: 'category not found'
                })
            }
            
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title,
                description,
                content,
                categoryId,
                image: image.replace('\\','/')
            });

            return article.save();
        }).then(() => {
            res.status(200).json({
                message: 'Create article'
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });

    },
    getArticle: (req, res) => {
        const articleID = req.params.articleID;

        Article.findById(articleID).then((article) => {
            res.status(200).json({
                article
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    //Update
    updateArticles: (req, res) => {
        const articleID = req.params.articleID;
        const { categoryId } = req.body;

        // Article.findById(articleID).then((article) => {
        //     if (!article) {
        //         return res.status(404).json({
        //             message: 'category not found'
        //         })
        //     }
        // }).then(()=>{})

        if (categoryId) {
            return Category.findById(categoryId).then((category) => {
                if (!category) {
                    return res.status(404).json({
                        message: 'category not found'
                    })
                }


                return Article.updateOne({ _id: articleID }, req.body);
            }).then(() => {
                res.status(200).json({
                    message: 'article updated'
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }


        Article.updateOne({ _id: articleID }, req.body).then(() => {
            res.status('200').json({
                message: `Article Update`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    //Delete
    deleteArticles: (req, res) => {
        const articleID = req.params.articleID

        // Article.findById(articleID).then((article) => {
        //     if (!article) {
        //         return res.status(404).json({
        //             message: 'category not found'
        //         })
        //     }
        // }).then(()=>{})

        Article.deleteOne({ _id: articleID }).then(() => {
            res.status('200').json({
                message: `Article _id: ${articleID} Deleted`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    }
}
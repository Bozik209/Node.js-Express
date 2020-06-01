const mongoose = require('mongoose')
const Category = require('../models/category')

module.exports = {
    getAllCategories : (req ,res)=>{
        Category.find().then((Categories)=>{
            res.status(200).json({
                Categories
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    },
    createCategories :(req ,res)=>{
        const { title,description}= req.body;

        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            title,
            description
        });

        category.save().then(()=>{
            res.status(200).json({
                message:'Create new category'
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        });
    },
    getCategory:(req ,res)=>{
        const CategoriesID =req.params.CategoriesID;

        Category.findById(CategoriesID).then((category)=>{
            res.status(200).json({
                category
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        });
    },
    updateCategories :(req ,res)=>{
        const CategoriesID = req.params.CategoriesID;

        Category.updateOne({_id:CategoriesID},req.body).then(()=>{
            res.status(200).json({
                message: `category Updated`
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        });
    },
    deleteCategories :(req ,res)=>{
        const CategoriesID = req.params.CategoriesID

        Category.deleteOne({_id:CategoriesID}).then(()=>{
            res.status('200').json({
                message: `category _id: ${CategoriesID} Deleted`
            })   
        }).catch(error=>{
            res.status(500).json({
                error
            })
        });
    }
}
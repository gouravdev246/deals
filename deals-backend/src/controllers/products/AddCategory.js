const Category = require('../../model/category.model')
const AddCategory = async (req , res) =>{
    try{
        const {name} = req.body
        const category = new Category({name})
        const savedCategory = await category.save()
        res.status(201).json({message: "Category added successfully" , category: savedCategory})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
module.exports = AddCategory
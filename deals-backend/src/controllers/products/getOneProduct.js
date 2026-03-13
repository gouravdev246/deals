const mongoose = require('mongoose')
const Product = require('../../model/products.model')

const getOneProduct = async (req , res) =>{
    const {id} = req.params
    try{
        const product = await Product.findById(id).populate('user' , 'name email regid').populate('category' , 'name')
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product found" , product})

    }catch(err){
        res.status(500).json({message: err.message})
    }

}
module.exports = getOneProduct

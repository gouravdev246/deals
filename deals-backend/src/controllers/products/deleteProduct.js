const Product = require("../../model/products.model")

const deleteProduct = async (req , res) =>{
    try{
        const {id} = req.param
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted successfully"})

    }catch(err){
        res.status(500).json({message: err.message})
    }
}
module.exports = deleteProduct
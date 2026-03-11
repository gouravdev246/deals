const Product = require("../../model/products.model")
const jwt = require("jsonwebtoken")

const AddProduct = async (req , res) =>{
    const {name , description , price , image , category , user} = req.body
    try{
        const userID = jwt.verify(user, process.env.JWT_SECRET)
        const actualUserID = userID.id
        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            user: actualUserID // Link the product to the user
        });
        const savedProduct = await product.save();
        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct
        });

    }catch(err){
        res.status(500).json({message: err.message})
    }
}
module.exports = AddProduct
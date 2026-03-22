const mongoose = require('mongoose')
const Product = require("../../model/products.model")

const getAllProducts = async (req , res)=>{
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
    const skipIndex = (page - 1) * limit; // Calculate how many documents to skip

    try {
        // Fetch the subset of data using skip() and limit()
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .populate('user' , 'name')
            .populate('category' , 'name')
            .skip(skipIndex)
            .limit(limit)
            .exec(); // exec() returns a promise

        // Get the total count of documents for metadata (optional but recommended)
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        // Send the response with data and pagination metadata
        res.status(200).json({
            totalItems: totalProducts,
            currentPage: page,
            totalPages: totalPages,
            products: products
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

module.exports = getAllProducts
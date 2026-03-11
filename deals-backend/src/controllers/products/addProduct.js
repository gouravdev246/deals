const Product = require("../../model/products.model");

const AddProduct = async (req, res) => {
    const { name, description, price, image, category, brand } = req.body;
    
    try {
        // req.user is populated by the verifyToken middleware
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Please log in first" });
        }

        const product = new Product({
            name,
            description,
            price,
            image, // Should be an array of image URLs
            category,
            brand,
            user: req.user._id // Automatically link to the logged-in user
        });

        const savedProduct = await product.save();
        
        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct
        });

    } catch (err) {
        console.error("Add Product Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = AddProduct;
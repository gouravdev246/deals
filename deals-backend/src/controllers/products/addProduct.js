const Product = require("../../model/products.model");
const AddProduct = async (req, res) => {
    try {
        const { name, description, price, category , condition } = req.body;
        
        // req.user is populated by the verifyToken middleware
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Please log in first" });
        }

        // Handle multiple images from Cloudinary via req.files
        let imageFiles = [];
        if (req.files && req.files.length > 0) {
            imageFiles = req.files.map(file => file.path);
        }

        if (imageFiles.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }

        const product = new Product({
            name,
            description,
            price,
            image: imageFiles, // Array of URLs from Cloudinary
            category: category || null, // Handle empty string as null for ObjectId
            condition: condition || "Used",
            user: req.user._id 
        });

        const savedProduct = await product.save();
        
        return res.status(201).json({
            message: "Product added successfully",
            product: savedProduct
        });

    } catch (err) {
        // Detailed logging to help find the [object Object] source
        console.error("Add Product Error Details:", err);
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: err.message || "Unknown error"
        });
    }
};

module.exports = AddProduct;
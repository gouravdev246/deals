const Product = require("../../model/products.model");

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, condition, existingImages } = req.body;

        // req.user is populated by the verifyToken middleware
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Please log in first" });
        }

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Verify the user owns this product
        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only edit your own products" });
        }

        // Build the image array
        let imageFiles = [];

        // Keep existing images that the user didn't remove
        if (existingImages) {
            try {
                const parsed = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
                if (Array.isArray(parsed)) {
                    imageFiles = parsed;
                }
            } catch (e) {
                // If parsing fails, ignore existing images
            }
        }

        // Add new images from Cloudinary via req.files
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            imageFiles = [...imageFiles, ...newImages];
        }

        if (imageFiles.length === 0) {
            return res.status(400).json({ message: "Please keep at least one image or upload new ones" });
        }

        // Update the product
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = imageFiles;
        product.category = category || product.category;
        product.condition = condition || product.condition;

        const updatedProduct = await product.save();

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (err) {
        console.error("Edit Product Error:", err);
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message || "Unknown error"
        });
    }
};

module.exports = editProduct;

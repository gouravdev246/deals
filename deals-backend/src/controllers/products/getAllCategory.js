const Category = require("../../model/category.model");

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({categories});
    } catch (err) {
        console.error("Get All Category Error Details:", err);
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: err.message || "Unknown error"
        });
    }
};

module.exports = getAllCategory;
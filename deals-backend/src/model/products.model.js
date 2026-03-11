const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true

    },
    price: {
        type: Number,
        require: true
    },
    image: [{
        type: String,
        require: true
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User' ,
        require: true
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product
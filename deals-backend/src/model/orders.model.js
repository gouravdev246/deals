const mongoose = require('mongoose')
const Product = require('./products.model')
const User = require('./user.model')
const OrderSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Product'
    } ,
    quantity : {
        type : Number ,
        default : 1
    } ,
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    } ,
    total : {
        type : Number ,
        require : true
    } ,
    
})

const Order = mongoose.model("Order" , OrderSchema)
module.exports = Order
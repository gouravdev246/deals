const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        require: true 
    },
    regid : {
        type : Number ,
        require : true ,
        unique : true ,
        indexedDB : true ,

    },
    email : {
        type : String ,
        require : true ,
        unique : true ,
        indexedDB : true ,
        lowercase : true ,
        trim : true ,
    },
    password : {
        type : String ,
        require : true ,
    } ,

},{ timestamps: true })

const User = mongoose.model("User" , userSchema)
module.exports = User 
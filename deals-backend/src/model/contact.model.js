const mongoose = require('mongoose')
 
const ContactModel = new mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    email : {
        type : String ,
        required : true 
    } ,
    message :{
        type : String ,
        required : true 
    }
})

const Contact = mongoose.model('Contact' , ContactModel)
module.exports = Contact
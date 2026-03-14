const Contact = require('../../model/contact.model')

async function  ContactAdmin(req , res) {
    const {name , email , message} = req.body

    try{
        const newContact = await Contact.create({
            name , email , message
        })
        res.status(200).json({message : "Message Sent"})
    }catch(err){
        res.status(500).json({message : "Failed To create "})
    }


    
}
module.exports = ContactAdmin
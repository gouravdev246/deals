const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require('../../model/user.model')


const UpdateUser = async (req , res) =>{
    const {name , regid , email ,phone, hostel} = req.body 
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({
            message:"User not found"
        })
    }
    user.name = name
    user.regid = regid
    user.email = email
    user.phone = phone
    user.hostel = hostel
    await user.save()
    res.status(200).json({
        message:"User updated successfully"
    })

}

module.exports = UpdateUser
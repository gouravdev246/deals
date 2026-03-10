const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require('../../model/user.model')

const loginUser = async (req,res)=>{
    try{
        const {email , password}= req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })

        }
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
        })
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email

        }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            partitioned: true
        })

        user.password = undefined
        res.status(200).json({
            message: "User logged in successfully",
            user: user
        })

    }
    catch(err){
        console.log("Error",err)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }

}

module.exports = loginUser
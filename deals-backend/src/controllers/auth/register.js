const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require('../../model/user.model')
const OTP = require('../../model/otp.model')

const registerUser = async (req , res)=>{
    try{
        const {name , regid , email , password , otp} = req.body 
        const user  = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10 )
        const otpData = await OTP.findOne({otp})
        if(!otpData){
            return res.status(400).json({
                message:"Invalid OTP"
            })
        }
       
        const newUser =  await User.create({
            name ,
            regid ,
            email ,
            password : hashedPassword
        })
        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email

        }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            partitioned: true
        })
        return res.status(201).json({
            message:"User registered successfully",
            user : newUser
        })

    }catch(err){
        console.log("Error", err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


module.exports = registerUser
const mongoose = require("mongoose");
const User = require('../../model/user.model')
const OTP = require('../../model/otp.model')
const bcrypt = require("bcryptjs")
const ForgetUser = async (req , res) =>{
    const {email , otp , password} = req.body 
    const user = await User.findOne({email})
    if(!user){
        res.status(404).json({
            message:"User not found"
        })
    }
    const otpData = await OTP.findOne({otp})
    if(!otpData){
        res.status(400).json({
            message:"Invalid OTP"
        })
    }
    const hashedPassword = await bcrypt.hash(password , 10 )
    user.password = hashedPassword
    await user.save()
    res.status(200).json({
        message:"Password reset successfully"
    }) 
    

}
module.exports = ForgetUser 
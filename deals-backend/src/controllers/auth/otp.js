const nodemailer = require('nodemailer')
const OTP = require('../../model/otp.model')

const otpGenerator = async (req, res) => {
    const { email } = req.body
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        await OTP.create({ email, otp })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS

            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'LPUDEALS - Your OTP Verification Code',
            html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #d32f2f; margin: 0;">LPU Deals</h1>
            <p style="color: #757575; font-size: 14px;">Exclusive Campus Offers & Discounts</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 8px; text-align: center;">
            <p style="font-size: 16px; color: #333; margin-bottom: 10px;">Hello student,</p>
            <p style="font-size: 16px; color: #333;">Use the following One-Time Password (OTP) to verify your account:</p>
            <div style="margin: 25px 0; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1a73e8;">
                ${otp}
            </div>
            <p style="font-size: 12px; color: #999;">This code is valid for 10 minutes. Do not share it with anyone.</p>
        </div>
        <div style="margin-top: 25px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 12px; color: #757575;">If you did not request this code, please ignore this email.</p>
            <p style="font-size: 12px; color: #757575;">&copy; ${new Date().getFullYear()} LPU Deals. All rights reserved.</p>
        </div>
    </div>
    `
        });



    } catch (err) {
        console.log("Error", err)
        res.status(500).send('Error sending OTP');
    }

}
module.exports = otpGenerator
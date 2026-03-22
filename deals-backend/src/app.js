const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('../src/routes/auth.route')
const otpRouter = require('../src/routes/otp.route')
const productRouter = require('../src/routes/product.route')
const UserRouter = require('../src/routes/user.route')
const connectDB = require("./db/connectDB");
require("dotenv").config();

// Ensure DB is connected for every request (cached by mongoose)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin : true,
    credentials : true 
}));
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/otp', otpRouter)
app.use('/api/products', productRouter)
app.use('/api/user' , UserRouter)



app.get('/' , (req , res) => {
    res.send("Welcome to Deals API")
})
module.exports = app;
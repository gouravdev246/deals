const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('../src/routes/auth.route')
const otpRouter = require('../src/routes/otp.route')
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/otp', otpRouter)
module.exports = app;
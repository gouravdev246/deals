const app = require("./src/app");
const dotenv = require("dotenv");
const connectDB = require("./src/db/connectDB");

dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

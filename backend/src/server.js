const app = require("./app");
const dotEnv = require("dotenv");
dotEnv.config();

const connectDB = require("./config/database");
const cloudinary = require("./config/cloudinary");

connectDB();

cloudinary.cloudinaryConnect();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on this ${process.env.PORT} Port`);
});
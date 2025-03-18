import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${config.DB_URI}/${config.DB_NAME}`
        );
        console.log(
            `DB connected !! DB host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("DB connection failed: ", error);
        process.exit(1);
    }
};

export default connectDB;

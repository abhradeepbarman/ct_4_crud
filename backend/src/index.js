import express from "express";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import biodataRoutes from "./routes/biodata.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/biodata", biodataRoutes);

connectDB()
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch(() => {
        console.log("DB connection failed");
    });

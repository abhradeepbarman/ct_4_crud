import "dotenv/config";

const config = {
    PORT: process.env.PORT || 8000,
    DB_URI: process.env.DB_URI || "",
    DB_NAME: process.env.DB_NAME || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
};

export default config;
import axios from "axios";
import { config } from "../config/config";

const axiosInstance = axios.create({
    baseURL: config.BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;

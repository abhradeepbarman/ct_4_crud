import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request",
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized request",
        });
    }
};

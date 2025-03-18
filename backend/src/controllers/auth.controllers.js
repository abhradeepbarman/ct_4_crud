import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with email already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            email,
            name,
            password: hashedPassword,
        });

        // generate tokens
        const payload = {
            id: user._id,
            email,
            name,
        };
        const accessToken = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "7d",
        });

        // update refresh token
        user.refreshToken = refreshToken;
        await user.save();

        user.password = undefined;
        user.refreshToken = undefined;

        // return response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find the user in db
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // password check
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // generate tokens
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
        };
        const accessToken = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "7d",
        });

        // update refresh token
        user.refreshToken = refreshToken;
        await user.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const logoutController = async (req, res) => {
    try {
        const userId = req.user._id;

        // make refresh token null
        await User.findOneAndUpdate(
            { _id: userId },
            { refreshToken: null },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const refreshAccessTokenController = async (req, res) => {
    try {
        const incomingRefreshToken = req.body?.refresh_token;

        //validation
        if (!incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request",
            });
        }

        // fetch userId from decoded token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            config.JWT_SECRET
        );

        // fetch user
        const user = await User.findById(decodedToken?.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request",
            });
        }

        if (user?.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request",
            });
        }

        // generate tokens
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        const accessToken = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "1d",
        });
        const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: "7d",
        });

        // update refresh token
        user.refreshToken = refreshToken;
        await user.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

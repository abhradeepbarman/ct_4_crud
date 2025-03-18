import Biodata from "../models/biodata.model.js";

export const createBiodata = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, phone, school, college, address } = req.body;

        if (!name || !email || !address) {
            // only these fields are mandatory
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const biodata = await Biodata.create({
            name,
            email,
            phone,
            school,
            college,
            address,
            user: userId,
        });

        return res.status(201).json({
            success: true,
            message: "Biodata created successfully",
            biodata,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getBiodataById = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: biodataId } = req.params;

        const biodata = await Biodata.findOne({ user: userId, _id: biodataId });

        if (!biodata) {
            return res.status(404).json({
                success: false,
                message: "Biodata not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Biodata fetched successfully",
            biodata,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getAllBiodata = async (req, res) => {
    try {
        const userId = req.user._id;

        const biodatas = await Biodata.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Biodata fetched successfully",
            biodatas,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const updateBiodata = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: biodataId } = req.params;
        const { name, email, phone, school, college, address } = req.body;

        if (!name || !email || !address) {
            // only these fields are mandatory
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const biodata = await Biodata.findOneAndUpdate(
            { user: userId, _id: biodataId },
            {
                name,
                email,
                phone,
                school,
                college,
                address,
            },
            { new: true }
        );

        if (!biodata) {
            return res.status(404).json({
                success: false,
                message: "Biodata not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Biodata updated successfully",
            biodata,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const deleteBiodata = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: biodataId } = req.params;

        const biodata = await Biodata.findOneAndDelete({
            user: userId,
            _id: biodataId,
        });

        if (!biodata) {
            return res.status(404).json({
                success: false,
                message: "Biodata not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Biodata deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

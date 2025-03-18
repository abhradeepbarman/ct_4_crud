import mongoose from "mongoose";

const biodataSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        school: {
            type: String,
        },
        college: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Biodata = mongoose.model("Biodata", biodataSchema);
export default Biodata;

import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { Loader2, Pen, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
    const [biodatas, setBiodatas] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBiodatas = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/biodata");
                setBiodatas(response.data.biodatas);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBiodatas();
    }, []);

    const deleteBioData = async (id) => {
        try {
            await axiosInstance.delete(`/biodata/${id}`);
            toast.success("Biodata deleted successfully");
            setBiodatas(biodatas.filter((biodata) => biodata._id !== id));
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex items-center flex-col gap-y-5 my-5">
            <div>
                <button
                    onClick={() => navigate("/form")}
                    className="flex justify-center items-center cursor-pointer gap-1 bg-gray-900 py-2 px-3 text-white rounded-md"
                >
                    <Plus />
                    Add Biodata
                </button>
            </div>
            <div className="border p-5 rounded-md w-xl flex flex-col gap-3">
                {biodatas.map((biodata) => (
                    <div
                        key={biodata._id}
                        className="flex justify-between border-2  p-3 rounded-xl"
                    >
                        <div>
                            <p>
                                <span className="font-semibold">Name: </span>
                                {biodata.name}
                            </p>
                            <p>
                                <span className="font-semibold">Email: </span>
                                {biodata.email}
                            </p>
                            <p>
                                <span className="font-semibold">Phone: </span>
                                {biodata.phone}
                            </p>
                            <p>
                                <span className="font-semibold">College: </span>
                                {biodata.college}
                            </p>
                            <p>
                                <span className="font-semibold">Address: </span>
                                {biodata.address}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <div
                                onClick={() =>
                                    navigate(`/form/${biodata._id}/edit`)
                                }
                            >
                                <Pen size={20} className="cursor-pointer" />
                            </div>
                            <div onClick={() => deleteBioData(biodata._id)}>
                                <Trash2 size={20} className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                ))}
                {biodatas.length === 0 && (
                    <p className="text-center text-xl text-gray-500 font-semibold">
                        No biodata found
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;

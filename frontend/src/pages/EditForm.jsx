import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

const EditForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [_, setBiodata] = useState({});
    const navigate = useNavigate();

    const fetchBiodata = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/biodata/${id}`);
            setBiodata(response.data.biodata);
            setValue("name", response.data.biodata.name);
            setValue("email", response.data.biodata.email);
            setValue("phone", response.data.biodata.phone);
            setValue("college", response.data.biodata.college);
            setValue("address", response.data.biodata.address);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchBiodata();
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(`/biodata/${id}`, data);
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
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
        <div className="w-full h-screen flex items-center flex-col gap-y-5 my-5">
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex justify-center items-center cursor-pointer gap-1 bg-gray-900 py-2 px-3 text-white rounded-md"
                >
                    <ArrowLeft />
                    Back
                </button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border p-5 rounded-md w-xl flex flex-col gap-3"
            >
                <h1 className="text-2xl font-semibold text-center underline">
                    Edit Biodata
                </h1>
                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">Name</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">Email</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">Phone</span>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            {...register("phone", {
                                required: "Phone number is required",
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>

                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">College</span>
                        <input
                            type="text"
                            name="college"
                            placeholder="Enter your college"
                            {...register("college", {
                                required: "College is required",
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.college && <span>{errors.college.message}</span>}
                </div>

                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">Address</span>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            {...register("address", {
                                required: "Address is required",
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.address && <span>{errors.address.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center items-center cursor-pointer gap-1 bg-gray-900 py-2 px-3 text-white rounded-md mt-2 w-full"
                >
                    {loading ? <Loader2 /> : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default EditForm;

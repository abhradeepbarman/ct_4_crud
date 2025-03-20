import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Register = ({ setIsLoggedIn }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/auth/register", data);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            toast.success(response.data.message);
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex items-center flex-col gap-y-5 my-5">
            <h1 className="text-2xl font-semibold text-center underline">
                Register
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border p-5 rounded-md w-full md:w-lg flex flex-col gap-3"
            >
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
                    {errors.name && (
                        <span className="text-red-500">
                            {errors.name.message}
                        </span>
                    )}
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
                    {errors.email && (
                        <span className="text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">Password</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.password && (
                        <span className="text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="flex flex-col">
                        <span className="font-semibold">Confirm Password</span>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter your confirm password"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                            })}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    {errors.confirmPassword && (
                        <span className="text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <div className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className=" font-semibold ">
                        Login
                    </Link>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center items-center cursor-pointer gap-1 bg-gray-900 py-2 px-3 text-white rounded-md mt-2 w-full"
                >
                    {loading ? <Loader2 /> : "Create Account"}
                </button>
            </form>
        </div>
    );
};

export default Register;

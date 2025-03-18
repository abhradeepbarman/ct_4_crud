import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axiosInstance from "./../lib/axios";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/login", data);
            localStorage.setItem("accessToken", response?.data?.accessToken);
            localStorage.setItem("refreshToken", response?.data?.refreshToken);
            toast.success(response?.data?.message);
            navigate("/");
        } catch (error) {
            console.log("Error:", error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen h-screen w-full">
            <div className="w-full h-full flex justify-center items-center">
                <main className="w-xl flex justify-center flex-col items-center px-3">
                    <h1 className="font-bold text-4xl text-white">
                        Login to Biodata Form ✨
                    </h1>

                    <p className="mt-4 leading-relaxed text-gray-400">
                        This contains all you biodata. You can add, update and
                        delete your biodata.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 flex flex-col gap-y-2 w-full"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full text-sm shadow-xs bg-gray-800 text-gray-200 mt-2 rounded-md py-1 px-2"
                                {...register("email", {
                                    required: true,
                                })}
                            />

                            {errors.email && (
                                <span className="text-red-500">
                                    Email is required
                                </span>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full text-sm shadow-xs bg-gray-800 text-gray-200 mt-2 rounded-md py-1 px-2"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <div className=" text-white">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-gray-400">
                                Register
                            </Link>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition focus:ring-3 focus:outline-hidden hover:bg-blue-700 hover:text-white w-full flex justify-center items-center cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? <Loader2 /> : "Login"}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;

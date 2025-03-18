import { HeartPulse } from "lucide-react";
import React, { useEffect } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) {
            setIsLoggedIn(false);
        }
    }, [accessToken, setIsLoggedIn]);

    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className="w-full h-16 bg-gray-900 text-white">
            <div className="max-w-5xl mx-auto flex justify-between items-center h-full px-4">
                <div className="text-2xl italic font-semibold flex items-center gap-1.5">
                    <HeartPulse />
                    YourBio
                </div>
                {isLoggedIn && (
                    <button
                        onClick={logout}
                        className="bg-red-800 px-4 py-2 rounded font-semibold cursor-pointer"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;

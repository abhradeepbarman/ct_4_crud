import { HeartPulse } from "lucide-react";
import React, { useEffect } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, [accessToken, setIsLoggedIn]);

    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            toast.success("Logout successful");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className="w-full h-16 bg-gray-900 text-white">
            <div className="w-full md:w-4xl mx-auto flex justify-between items-center h-full px-4">
                <div className="test-lg md:text-2xl italic font-semibold flex items-center gap-1.5">
                    <HeartPulse />
                    YourBio
                </div>
                {isLoggedIn && (
                    <button
                        onClick={logout}
                        className="bg-red-800 px-2 md:px-4 py-1 md:py-2 rounded font-semibold cursor-pointer"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;

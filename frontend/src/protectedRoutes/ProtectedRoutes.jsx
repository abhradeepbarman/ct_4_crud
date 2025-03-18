import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const accessToken = localStorage.getItem("accessToken");
    const publicRoutes = ["/login", "/register"];

    if (!accessToken && !publicRoutes.includes(window.location.pathname)) {
        return <Navigate to="/login" replace />;
    }

    if (accessToken && publicRoutes.includes(window.location.pathname)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoutes;

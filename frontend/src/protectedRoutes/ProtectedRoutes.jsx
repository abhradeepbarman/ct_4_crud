import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes;

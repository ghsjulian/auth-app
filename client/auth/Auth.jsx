import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuth";

const Auth = ({ children }) => {
    const { authUser } = useAuthStore();
    return (
        <>{authUser && authUser?._id ? children : <Navigate to="/login" />}</>
    );
};

export default Auth;

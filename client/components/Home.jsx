import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";

const Home = () => {
    document.title = "Auth App Created By Ghs Julian"
    return (
        <MainContainer>
            <h3>User Auth App</h3>
            <p>
                Hello, this is an advance example of user authentication with
                rest API.
            </p>
            <div className="links">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/edit-profile">Edit Profile</NavLink>
                <NavLink to="/reset-password">Reset Password</NavLink>
            </div>
        </MainContainer>
    );
};

export default Home;
